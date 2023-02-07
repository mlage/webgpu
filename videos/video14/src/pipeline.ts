import Main from "./main";

export default class Pipeline{
    renderPipeline: GPURenderPipeline
    
    renderPassDescriptor: GPURenderPassDescriptor;
    attachment: GPURenderPassColorAttachment;

    constructor(main: Main, vertShader: string, fragShader: string){
        this.renderPipeline=main.device!.createRenderPipeline({
            vertex:{
                module:main.device!.createShaderModule({
                    code:vertShader
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
                    }
                ]
            },
            fragment:{
                module:main.device!.createShaderModule({
                    code:fragShader
                }),
                entryPoint:"main",
                targets:[{
                    format:'bgra8unorm'
                }]
            },
            primitive:{
                topology:"line-list"
            },
            layout:'auto',
        })

        this.attachment={
            clearValue:[0.0, 0.0, 0.0, 1.0],
            storeOp:"store",
            loadOp:"clear",
            view: main.context!.getCurrentTexture().createView()
        }

        this.renderPassDescriptor = {
            colorAttachments:[this.attachment],
        }
    }

    static createGPUBuffer = (device: GPUDevice, data: Float32Array, 
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
    
    static createGPUBufferUint=(device: GPUDevice, data: Uint32Array, 
        usageFlag:GPUBufferUsageFlags=GPUBufferUsage.INDEX| GPUBufferUsage.COPY_DST)=>{
            const buffer=device.createBuffer({
                size:data.byteLength,
                usage:usageFlag,
                mappedAtCreation:true
            });
            new Uint32Array(buffer.getMappedRange()).set(data);
            buffer.unmap();
            return buffer;
    }

}