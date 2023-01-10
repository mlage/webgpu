import Scene from "./scene";


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

        this.scene = new Scene(this);
    }

    draw(){
        this.scene!.draw(this, this.isAnimation);
        console.log("ta animando");
        requestAnimationFrame(this.draw.bind(this));
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
    let myReq = requestAnimationFrame(main.draw.bind(main));

    document.querySelector(".btn-group")?.addEventListener("click", e=>{
        const target=e.target as HTMLInputElement;

        if(target.value=="animation")main.isAnimation=true;
        else main.isAnimation=false;
    })
});

