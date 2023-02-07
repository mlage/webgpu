import Main from "../main";

export default class Pipeline{
    private pipelineDescriptor: GPURenderPipelineDescriptor;

    private buffers: Array<GPUVertexBufferLayout> = [];

    private device: GPUDevice;

    private render_pipeline?: GPURenderPipeline;
    private changed: boolean = true;

    private _depth: boolean = false;

    get depth(){
        return this._depth;
    }

    constructor(device: GPUDevice, vertShader: string, fragShader: string, primitive:string){
        let indexFormat=undefined;
        if(primitive==="line-strip") indexFormat="uint32";

        this.pipelineDescriptor = {
            vertex:{
                module:device.createShaderModule({
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
                        },]
                    },{
                        arrayStride:12,
                        attributes:[{
                            shaderLocation:1,
                            format:"float32x3",
                            offset:0
                        },] 
                    }
                ]
            },
            fragment:{
                module:device.createShaderModule({
                    code:fragShader
                }),
                entryPoint:"main",
                targets:[{
                    format:'bgra8unorm'
                }]
            },
            primitive:{
                topology:primitive as GPUPrimitiveTopology,
                stripIndexFormat: indexFormat as GPUIndexFormat
            },
            layout:'auto'
        };

        const depthStencil = {
            format:"depth24plus",
            depthWriteEnabled:true,
            depthCompare:"less"
        } as GPUDepthStencilState;

        if(primitive !== "point-list" && primitive !== "line-list"
        && primitive !== "line-strip"){

            this.pipelineDescriptor.depthStencil = depthStencil
            this._depth = true;

        }
            
        this.device = device;
    }

    public addVertexBuffer(...atributes: Atribute[]){
        this.changed = true;
        const buffer = {} as GPUVertexBufferLayout;

        for(const atribute of atributes){

            const size = atribute.format
        }
        
    }

    public get renderPipeline(){
        if(this.changed){
            this.render_pipeline = this.device.createRenderPipeline(this.pipelineDescriptor);
            this.changed = false;
        }

        return this.render_pipeline;
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

class Atribute{
    location?: number;
    format: string;
    
    constructor(format: string){
        this.format = format;
    }
}