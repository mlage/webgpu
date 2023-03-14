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

Main.build().then(async (main)=>{
    //criando a esfera
    const data = new Sphere(1, [0,0,0]);

    //criando malha e adicionando array de vértices e de normais
    const earth = new IndexedMesh(main.device!, data.indexes!);
    earth.appendBuffer(data.vertices!);
    earth.appendBuffer(IndexedMesh.calculateNormals(data.indexes!, data.vertices!, 5));

    //criando shaders
    const shaders = Shaders();

    //criando pipeline e acionando depth test
    const pipeline = new Pipeline(main.device!, shaders.vertex, shaders.fragment, "triangle-list");
    pipeline.enableDepthTest();

    //adicionando ao pipeline a forma de ler os dados dos buffers de vértice
    pipeline.addVertexBuffer({location: 0}, {location: 1, format: "float32x2"});
    pipeline.addVertexBuffer({location: 2, format: "float32x4"});

    //instanciando a luz
    const light = new Light([-4, 0, -2, 1]);

    //criando a camera
    const camera = new Camera(main.canvas!);
    camera.camPosition = [0, 0, 3];

    //criando o programa
    const program = new Program(main.device!, pipeline, earth);

    //enviando as matrizes
    program.appendUniformBuffer(0, 0, 
        new Float32Array(earth.modelMatrix), 
        new Float32Array(camera.viewMatrix),
        new Float32Array(camera.projMatrix)
    );

    //enviando os parametros da camera
    light.createUniformBuffer(program, 0, 1);


    //setando a textura
    await program.setTexture("./assets/earth.png")

    //desenhando
    program.draw(main.context!, main.depthTexture);

    document.addEventListener("keypress", e=>{
        if(e.key === "p" || e.key === "o"){
            if (e.key == "p") camera.projectionType = "perspective";
            else camera.projectionType = "orthogonal";

            program.appendUniformBuffer(0, 0, 
                new Float32Array(earth.modelMatrix), 
                new Float32Array(camera.viewMatrix),
                new Float32Array(camera.projMatrix)
            );

            program.draw(main.context!, main.depthTexture);
        }
    })

    let param = 0;

    const draw = ()=>{
        earth.rotationAngles[1] = param;
        program.appendUniformBuffer(0, 0, 
            new Float32Array(earth.modelMatrix), 
            new Float32Array(camera.viewMatrix),
            new Float32Array(camera.projMatrix)
        );
        program.draw(main.context!, main.depthTexture);
        param+=0.01;
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})


