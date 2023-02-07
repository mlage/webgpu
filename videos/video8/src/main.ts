import { initGPU, createGPUBuffer } from "./helper";
import { Shaders } from "./shader";

const createSquare=async()=>{
    const gpu=await initGPU();
    const device=gpu.device;
    
    const vertexData=new Float32Array([
        //vertex        //color
        -0.5, -0.5,     1,0,0,
        0.5, -0.5,      0,1,0,
        -0.5, 0.5,      0,0,1,
        -0.5, 0.5,      0,0,1,
        0.5, -0.5,      0,1,0,
        0.5, 0.5,       1,0,0
    ])


    const vertexBuffer=createGPUBuffer(device, vertexData);

    const shaders=Shaders();
    const pipeline = device.createRenderPipeline({
        vertex:{
            module:device.createShaderModule({
                code:shaders.vertex
            }),
            entryPoint:"main",
            buffers:[
                {
                    arrayStride:4*(2+3),
                    attributes:[{
                        shaderLocation:0,
                        format:"float32x2",
                        offset:0
                    },{
                        shaderLocation:1,
                        format:"float32x3",
                        offset:8
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
    renderPass.draw(6);
    renderPass.end();

    device.queue.submit([commandEncoder.finish()]);
}

createSquare();
