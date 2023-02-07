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

    draw(n:number, rin:number, rout:number, center:vec3, height:number, isAnimation: boolean){
        this.scene = new Scene(this, n, rin, rout, center, height);

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

let height = 3;
let rin = 0.5;
let rout = 1.5;
let center: vec3 = [0,0,0];
let n = 20;
let isAnimation = true;

Main.build().then((main)=>{
    main.draw(n, rin, rout, center, height, isAnimation);

    document.querySelector("#id-radio")?.addEventListener("click", e=>{
        const target=e.target as HTMLInputElement;

        console.log(target);

        if(target.value=="animation")isAnimation = true;
        else isAnimation = false;

        main.draw(n, rin, rout, center, height, isAnimation);
    })

    document.querySelector("#btn-redraw")?.addEventListener("click", e=>{
        let radiusIn =  Number((<HTMLInputElement>document.querySelector("#id-rin")).value) || rin;
        let radiusOut = Number((<HTMLInputElement>document.querySelector("#id-rout")).value) || rout;
        let inN = Number((<HTMLInputElement>document.querySelector("#id-n")).value) || n;

        if(radiusIn>=radiusOut){
            alert("O raio interno precisa ser menor que o raio externo.");
            return;
        }else if(inN<2){
            alert("O número de fatias precisa ser maior que 2.");
            return;
        }

        height = Number((<HTMLInputElement>document.querySelector("#id-height")).value) || height;
        rin = radiusIn;
        rout = radiusOut;
        n = inN;

        const center_str = (<HTMLInputElement>document.querySelector("#id-center")).value || center.toString();
        center = center_str.split(",").map(Number.parseFloat) as vec3;

        main.draw(n, rin, rout, center, height, isAnimation);
    })

});

