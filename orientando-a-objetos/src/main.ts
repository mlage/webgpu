import Scene from "./scene";
import { Shaders } from "./shader";
import { CubeData } from "./vertex_data";
import Camera from "./camera";
import Mesh from "./webgpu/mesh";
import Pipeline from "./webgpu/pipeline";
import Program from "./webgpu/program";
import { mat4 } from "gl-matrix";

export default class Main{
    device?: GPUDevice;
    canvas?: HTMLCanvasElement;
    context?: GPUCanvasContext;
    depthTexture?: GPUTexture;
    scene?: Scene;
    isAnimation: boolean = true;

    async init(){
        await this.initGPU();


        this.depthTexture=this.device!.createTexture({
            format: "depth24plus",
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            size: [this.canvas!.width, this.canvas!.height, 1]
        })
    }

    checkWebGPU(){
        if(navigator.gpu) return "webGPU suportado"
        return "webGPU não suportado"
    }
    
    async initGPU(){
        const checkGpu = this.checkWebGPU();
    
        if(checkGpu==="webGPU não suportado"){
            console.log(checkGpu);
            throw("Seu navegador atual não suporta webGPU!");
        }
    
        this.canvas = document.querySelector("#canvas-webgpu") as HTMLCanvasElement;
    
        const devicePixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = 1024 * devicePixelRatio;
        this.canvas.height = 768 * devicePixelRatio;
    
        const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        this.device = await adapter?.requestDevice() as GPUDevice;
        this.context = this.canvas.getContext("webgpu") as unknown as GPUCanvasContext;
    

        this.context.configure({
            device: this.device,
            format:"bgra8unorm",
            alphaMode:"premultiplied"
        })
    }

    static async build(): Promise<Main>{
        const nova = new Main();
        await nova.init();
        
        return nova;
    }
}

Main.build().then((main)=>{
    const cubeData = CubeData();

    const cube = new Mesh(main.device!, 3);
    cube.appendBuffer(cubeData.positions);
    cube.appendBuffer(cubeData.colors);
    const shaders = Shaders();

    const pipeline = new Pipeline(main.device!, shaders.vertex, shaders.fragment, "triangle-list");
    pipeline.enableDepthTest();
    pipeline.addVertexBuffer({location: 0});
    pipeline.addVertexBuffer({location: 1});

    const camera = new Camera(main.canvas!);
    camera.projectionType = "orthogonal";
    camera.camPosition = [2, 2, -6];

    const program = new Program(main.device!, pipeline, cube);

    const mvp = mat4.create();
    mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);
    
    program.appendUniformBuffer(0, 0, new Float32Array(mvp));

    program.draw(main.context!, main.depthTexture);

    document.addEventListener("keypress", e=>{
        if (e.key == "p") {
            camera.projectionType = "perspective";
            mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);

            program.appendUniformBuffer(0, 0, new Float32Array(mvp));
            program.draw(main.context!, main.depthTexture);
        } else if (e.key == "o") {
            camera.projectionType = "orthogonal";
            mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);

            program.appendUniformBuffer(0, 0, new Float32Array(mvp));
            program.draw(main.context!, main.depthTexture);
        }
    })
})

