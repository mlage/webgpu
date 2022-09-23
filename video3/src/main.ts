import $ from "jquery";
import { checkWebGPU } from "./helper";
import { Shaders } from "./shader";

const createTriangle=async()=>{
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
    //const swapChain=canvas.getContext('gpuswapchain')
    context.configure({
        device,
        format:swapChainFormat,
        alphaMode:"premultiplied"
    })

    /*context.configureSwapChain({
        device:device,
        format:swapChainFormat
    })*/

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
                format:swapChainFormat
            }]
        },
        primitive:{
            topology:"triangle-list"
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
    renderPass.draw(3,1,0,0);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

createTriangle();
