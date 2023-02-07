import { initGPU, createGPUBuffer } from "./helper";
import { Shaders } from "./shader";

const createSquare=async()=>{
    const gpu=await initGPU();
    const device=gpu.device;
    
    const vertexData=new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        -0.5, 0.5,
        -0.5, 0.5,
        0.5, -0.5,
        0.5, 0.5
    ])

    const colorData=new Float32Array([
        1,0,0,
        0,1,0,
        0,0,1,
        0,0,1,
        0,1,0,
        1,0,0,
    ])

    const vertexBuffer=createGPUBuffer(device, vertexData);
    const colorBuffer=createGPUBuffer(device, colorData);

    const shaders=Shaders();
    const pipeline = device.createRenderPipeline({
        vertex:{
            module:device.createShaderModule({
                code:shaders.vertex
            }),
            entryPoint:"main",
            buffers:[
                {
                    arrayStride:8,
                    attributes:[{
                        shaderLocation:0,
                        format:"float32x2",
                        offset:0
                    }]
                },                
                {
                    arrayStride:12,
                    attributes:[{
                        shaderLocation:1,
                        format:"float32x3",
                        offset:0
                    }]
                }
            ]
        },
        fragment:{
            module:device.createShaderModule({
                code:shaders.fragment
            }),
            entryPoint:"main",
            targets:[{
                format:gpu.swapChainFormat as GPUTextureFormat
            }]
        },
        primitive:{
            topology:"triangle-list"
        },
        layout:'auto'
    })

    const commandEncoder=device.createCommandEncoder();
    const textureView=gpu.context.getCurrentTexture().createView();

    const renderPass=commandEncoder.beginRenderPass({
        colorAttachments:[{
            clearValue:[0.0, 0.0, 0.0, 1.0],
            storeOp:"store",
            loadOp:"clear",
            view: textureView
        }]
    });
    renderPass.setPipeline(pipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.setVertexBuffer(1, colorBuffer);
    renderPass.draw(6);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

createSquare();
