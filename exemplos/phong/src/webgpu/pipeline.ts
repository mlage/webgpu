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
        if(primitive==="line-strip" || primitive === "triangle-strip") indexFormat="uint32";

        this.pipelineDescriptor = {
            vertex:{
                module:device.createShaderModule({
                    code:vertShader
                }),
                entryPoint:"main",
                buffers: this.buffers
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
            
        this.device = device;
    }

    enableDepthTest(){
        const depthStencil = {
            format:"depth24plus",
            depthWriteEnabled:true,
            depthCompare:"less"
        } as GPUDepthStencilState;


        this.pipelineDescriptor.depthStencil = depthStencil
        this._depth = true;

        this.changed = true;
    }

    setLayout(layout: GPUPipelineLayout){
        this.changed = true;
        this.pipelineDescriptor.layout = layout;
    }

    public addVertexBuffer(...atributes: Atribute[]){
        this.changed = true;
        const buffer = {} as GPUVertexBufferLayout;
        const atribs: GPUVertexAttribute[] = [];

        let stride = 0;

        for(const atribute of atributes){
            atribs.push({
                shaderLocation: atribute.location,
                format: atribute.format || "float32x3",
                offset: stride
            })

            stride+=this.stride(atribute.format || "float32x3");
        }
        
        buffer.arrayStride = stride;
        buffer.attributes = atribs;

        this.buffers.push(buffer);
    }

    private stride(format: GPUVertexFormat){
        if(format.includes("x")) return Number(format.slice(-4, -2))*Number(format[format.length-1]) / 8;
        
        return Number(format.slice(-2)) / 8;
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
    location: number;
    format?: GPUVertexFormat;
    
    constructor(location: number){
        this.location = location;
    }
}
