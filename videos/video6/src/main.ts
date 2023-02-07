import { checkWebGPU } from "./helper";
import { Shaders } from "./shader";

const createPrimitive=async(typePrimitive="triangle-list")=>{
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

    let indexFormat=undefined;
    if(typePrimitive==="triangle-strip") indexFormat="uint32";



    const shaders=Shaders();
    const pipeline = device.createRenderPipeline({
        vertex:{
            module:device.createShaderModule({
                code:shaders.vertex
            }),
            entryPoint:"main",
        },
        fragment:{
            module:device.createShaderModule({
                code:shaders.fragment
            }),
            entryPoint:"main",
            targets:[{
                format:swapChainFormat as GPUTextureFormat
            }]
        },
        primitive:{
            topology:typePrimitive as GPUPrimitiveTopology,
            stripIndexFormat: indexFormat as GPUIndexFormat
        },
        layout:'auto'
    })

    const commandEncoder=device.createCommandEncoder();
    const textureView=context.getCurrentTexture().createView();

    const renderPass=commandEncoder.beginRenderPass({
        colorAttachments:[{
            clearValue:[0.0, 0.0, 0.0, 1.0],
            storeOp:"store",
            loadOp:"clear",
            view: textureView
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.draw(9);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

document.querySelector("#primitives")?.addEventListener("change", (e)=>{
    const select=e.target as HTMLSelectElement;
    const type=select.options[select.selectedIndex].value;

    createPrimitive(type);
});

createPrimitive();
