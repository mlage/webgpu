export default class GPUParams{
    device?: GPUDevice;
    private on = false;

    async init(){
        if(!navigator.gpu) throw("Seu navegador atual não suporta webGPU!");
    
        const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        this.device = await adapter?.requestDevice() as GPUDevice;
    }

    getCanvasParams(canvas: HTMLCanvasElement){
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = 1024 * devicePixelRatio;
        canvas.height = 768 * devicePixelRatio;

        const context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;

        context.configure({
            device: this.device!,
            format:"bgra8unorm",
            alphaMode:"premultiplied"
        });
    
        const depthTexture = this.device!.createTexture({
            format: "depth24plus",
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
            size: [canvas!.width, canvas!.height, 1]
        });

        return {
            context,
            depthTexture
        };
    }

    static async build(): Promise<GPUParams>{
        const nova = new GPUParams();
        await nova.init();
        
        return nova;
    }
}