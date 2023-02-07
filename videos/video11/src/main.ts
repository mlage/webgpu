import { initGPU, createGPUBuffer, createViewProjection, createTransforms, createAnimation } from "./helper";
import { Shaders } from "./shader";
import  { mat4, vec3 } from "gl-matrix";
import { CubeData } from "./vertex_data";
const createCamera = require('3d-view-controls');

const create3DObject=async(isAnimation=true)=>{
    const gpu=await initGPU();
    const device=gpu.device;
    
    const cubeData=CubeData();
    const numberOfVertices=cubeData.positions.length/3;
    const vertexBuffer=createGPUBuffer(device, cubeData.positions);
    const colorsBuffer=createGPUBuffer(device, cubeData.colors);

    const shaders=Shaders();
    const pipeline = device.createRenderPipeline({
        vertex:{
            module:device.createShaderModule({
                code:shaders.vertex
            }),
            entryPoint:"main",
            buffers:[
                {
                    arrayStride:12,
                    attributes:[{
                        shaderLocation:0,
                        format:"float32x3",
                        offset:0
                    }]
                },{
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
        layout:'auto',
        depthStencil:{
            format:"depth24plus",
            depthWriteEnabled:true,
            depthCompare:"less"
        }
    })

    const vp=createViewProjection(gpu.canvas.width/gpu.canvas.height);
    const modelMatrix=mat4.create();
    let vMatriz=mat4.create();
    const vpMatrix=vp.viewProjMatrix;
    const mvpMatrix=mat4.create()

    let rotation=vec3.fromValues(0,0,0);
    let camera=createCamera(gpu.canvas, vp.cameraOption);

    const uniformBuffer = device.createBuffer({
        size:64,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })

    const uniformBindingGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding:0,
                resource:{
                    buffer: uniformBuffer,
                    offset:0,
                    size:64
                }
            }
        ]
    })

    const depthTexture=device.createTexture({
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
        size: [gpu.canvas.width, gpu.canvas.height, 1]
    })
    let textureView=gpu.context.getCurrentTexture().createView();

    const attachment={
        clearValue:[0.0, 0.0, 0.0, 1.0],
        storeOp:"store",
        loadOp:"clear",
        view: textureView
    }

    const renderPassDescriptor={
        colorAttachments:[attachment],
        depthStencilAttachment:{
            view: depthTexture.createView(),
            depthStoreOp: "store",
            depthClearValue: 1.0,
            depthLoadOp: "clear"
        }
    } as GPURenderPassDescriptor;

    function draw(){
        if(!isAnimation && camera.tick()){
            const pMatriz=vp.projectionMatrix;
            vMatriz=camera.matrix;
            mat4.multiply(vpMatrix, pMatriz, vMatriz);
        }

        createTransforms(modelMatrix, [0,0,0], rotation);
        mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);
        device.queue.writeBuffer(uniformBuffer, 0, mvpMatrix as ArrayBuffer);
        
        textureView=gpu.context.getCurrentTexture().createView();
        attachment.view=textureView;

        const commandEncoder=device.createCommandEncoder();
        const renderPass=commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.setPipeline(pipeline);
        renderPass.setVertexBuffer(0, vertexBuffer);
        renderPass.setVertexBuffer(1, colorsBuffer);
        renderPass.setBindGroup(0,uniformBindingGroup);
        renderPass.draw(numberOfVertices);
        renderPass.end();
    
        device.queue.submit([commandEncoder.finish()]);
    }

    createAnimation(draw, rotation, isAnimation);
}


create3DObject();

document.querySelector(".btn-group")?.addEventListener("click", e=>{
    const target=e.target as HTMLInputElement;
    if(target.value=="animation")create3DObject(true);
    else create3DObject(false);
})