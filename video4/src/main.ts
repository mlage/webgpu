import $ from "jquery";
import glsLangModule from "../node_modules/@webgpu/glslang/dist/web-devel-onefile/glslang";
import { checkWebGPU } from "./helper";
import { GLSLShaders } from "./shader";

const createTriangle=async()=>{

    const glslang=await glsLangModule() as any;
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

    const shaders=GLSLShaders();
    const pipeline = device.createRenderPipeline({
        vertex:{
            module:device.createShaderModule({
                code:glslang.compileGLSL( shaders.vertex , "vertex" )
            }),
            entryPoint:"main",
        },
        fragment:{
            module:device.createShaderModule({
                code:glslang.compileGLSL( shaders.fragment , "fragment" )
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
