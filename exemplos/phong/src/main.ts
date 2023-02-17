import Light from "./light";
import { Shaders } from "./shader";
import Sphere from "./sphere";
import Camera from "./camera";
import IndexedMesh from "./webgpu/indexed_mesh";
import Pipeline from "./webgpu/pipeline";
import Program from "./webgpu/program";

export default class Main{
    device?: GPUDevice;
    canvas?: HTMLCanvasElement;
    context?: GPUCanvasContext;
    depthTexture?: GPUTexture;

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
    
        const adapter = await navigator.gpu?.requestAdapter({powerPreference: "high-performance"}) as GPUAdapter;
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
    const data = new Sphere(1, [0,0,0]);

    const sphere = new IndexedMesh(main.device!, data.indexes!, 6, data.vertices!, 0);
    sphere.scale = [2, 2, 2];
    const shaders = Shaders();

    const pipeline = new Pipeline(main.device!, shaders.vertex, shaders.fragment, "triangle-list");

    const light = new Light([2, 2, -1, 1]);

    const camera = new Camera(main.canvas!);
    camera.camPosition = [0, 0, 4];

    const program = new Program(main.device!, pipeline, sphere);

    program.appendUniformBuffer(0, 0, 
        new Float32Array(sphere.modelMatrix), 
        new Float32Array(camera.viewMatrix),
        new Float32Array(camera.projMatrix)
    );

    light.createUniformBuffer(program, 0, 1);

    program.draw(camera, main.context!, main.depthTexture);

    document.addEventListener("keypress", e=>{
        if(e.key === "p" || e.key === "o"){
            program.appendUniformBuffer(0, 0, 
                new Float32Array(sphere.modelMatrix), 
                new Float32Array(camera.viewMatrix),
                new Float32Array(camera.projMatrix)
            );

            if (e.key == "p") camera.projectionType = "perspective";
            else camera.projectionType = "orthogonal";

            program.draw(camera, main.context!, main.depthTexture);
        }
    })

    let param = 0;

    const draw = ()=>{
        light.newPos(param);
        light.createUniformBuffer(program, 0, 1);
        program.draw(camera, main.context!, main.depthTexture);
        param+=0.01;
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})


