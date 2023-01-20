import { vec3 } from "gl-matrix";
import Scene from "./scene";

export default class Main{
    device?: GPUDevice;
    canvas?: HTMLCanvasElement;
    context?: GPUCanvasContext;
    depthTexture?: GPUTexture;
    scene?: Scene;

    async init(){
        await this.initGPU();

        this.depthTexture=this.device!.createTexture({
            format: "depth24plus",
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            size: [this.canvas!.width, this.canvas!.height, 1]
        })

    }

    draw(u:number, v:number, radius:number, center:vec3, isAnimation: boolean){
        this.scene = new Scene(this, u, v, radius, center);

        requestAnimationFrame(this.scene.draw.bind(this.scene, this, isAnimation));
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
        this.canvas.width = 900 * devicePixelRatio;
        this.canvas.height = 675 * devicePixelRatio;
    
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

let u = 20;
let v = 15;
let radius = 2;
let center = [0,0,0] as vec3;
let isAnimation = true;

Main.build().then((main)=>{
    main.draw(u, v, radius, center, true);

    document.querySelector("#id-radio")?.addEventListener("click", e=>{
        const target=e.target as HTMLInputElement;

        console.log(target);

        if(target.value=="animation")isAnimation = true;
        else isAnimation = false;

        main.draw(u, v, radius, center, isAnimation);
    })

    document.querySelector("#btn-redraw")?.addEventListener("click", e=>{
        radius = Number((<HTMLInputElement>document.querySelector("#id-radius")).value);
        u = Number((<HTMLInputElement>document.querySelector("#id-u")).value);
        v = Number((<HTMLInputElement>document.querySelector("#id-v")).value);

        const center_str = (<HTMLInputElement>document.querySelector("#id-center")).value;
        center = center_str.split(",").map(Number.parseFloat) as vec3;

        main.draw(u, v, radius, center, isAnimation);
    })

});

