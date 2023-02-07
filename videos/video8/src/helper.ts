export const checkWebGPU=()=>{
    if(navigator.gpu)return "webGPU suportado"
    return "webGPU não suportado"
}

export const initGPU=async ()=>{
    const checkGpu=checkWebGPU();

    if(checkGpu==="webGPU não suportado"){
        console.log(checkGpu);
        throw("Seu navegador atual não suporta webGPU!");
    }

    const canvas = document.querySelector("#canvas-webgpu") as HTMLCanvasElement;

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = 1024 * devicePixelRatio;
    canvas.height = 768 * devicePixelRatio;

    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;

    const swapChainFormat='bgra8unorm';
    context.configure({
        device,
        format:swapChainFormat,
        alphaMode:"premultiplied"
    })

    return {device, canvas, swapChainFormat, context}
}

export const createGPUBuffer=(device: GPUDevice, data: Float32Array, 
    usageFlag:GPUBufferUsageFlags=GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST)=>{
        const buffer=device.createBuffer({
            size:data.byteLength,
            usage:usageFlag,
            mappedAtCreation:true
        });
        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
}