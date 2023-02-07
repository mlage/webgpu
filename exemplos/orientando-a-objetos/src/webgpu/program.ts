import { mat4 } from "gl-matrix";
import Camera from "./camera";
import Mesh from "./mesh";
import Pipeline from "./Pipeline";

export default class Program{
    private mesh?: Mesh;
    private pipeline: Pipeline;

    private bindGroups: Map<number, GPUBindGroup> = new Map();
    private entries: Map<number, Map<number, GPUBindGroupEntry> > = new Map();
    private uniforms: Uniform[] = [];

    private mvp_binding?: number;
    private mvp_group?: number;
    private using_mvp: boolean = false;
    private mvpUniformBuffer?: GPUBuffer;

    device: GPUDevice;

    constructor(device: GPUDevice, pipeline: Pipeline, mesh?: Mesh){
        this.pipeline = pipeline;

        if(mesh) {
            this.mesh = mesh;

        }

        this.device = device;
    }

    useMVPMatrix(binding: number, group: number){
        this.using_mvp = true;
        this.mvp_binding = binding;
        this.mvp_group = group;

        this.mvpUniformBuffer = this.device.createBuffer({
            size:64,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })

        const entry = {
            binding: binding,
            resource:{
                buffer: this.mvpUniformBuffer,
                offset:0,
                size:64
            }
        }

        if(!this.entries.get(group)) this.entries.set(group, new Map());

        this.entries.get(group)!.set(binding, entry);

        const uniformBindingGroup = this.device.createBindGroup({
            layout: this.pipeline.renderPipeline!.getBindGroupLayout(group),
            entries: this.entries.get(group)?.values() as Iterable<GPUBindGroupEntry>
        })

        this.bindGroups.set(group, uniformBindingGroup);
        console.log(this.bindGroups);
    }

    appendUniformBuffer(binding: number, group: number, ...data: Float32Array[]){
        if(data.length = 0) throw new Error("The data can't be undefined.");

        let size = 0;

        for(const fArray of data){
            size += fArray.length;
        }

        size*=4;

        const uniformBuffer = this.device.createBuffer({
            size,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })

        const entry = {
            binding: binding,
            resource:{
                buffer: uniformBuffer,
                offset:0,
                size
            }
        }

        if(!this.entries.get(group)) this.entries.set(group, new Map());

        this.entries.get(group)!.set(binding, entry);

        const uniformBindingGroup = this.device.createBindGroup({
            layout: this.pipeline.renderPipeline!.getBindGroupLayout(group),
            entries: this.entries.get(group)?.values() as Iterable<GPUBindGroupEntry>
        })

        this.bindGroups.set(group, uniformBindingGroup);
    }

    private setBindGroups(renderPass: GPURenderPassEncoder){
        for(const index of this.bindGroups.keys()){
            renderPass.setBindGroup(Number(index), this.bindGroups.get(index)!);
        }
    }

    private writeUniforms(){
        for(const uniform of this.uniforms){
            let offset = 0;
            for(const data of uniform.information){
                this.device.queue.writeBuffer(uniform.buffer, offset, data as ArrayBuffer);

                offset += data.length*4;
            }
        }
    }

    private getRenderPass(encoder: GPUCommandEncoder, context:GPUCanvasContext, depthTexture?: GPUTexture){
        const descriptor = {
            colorAttachments:[
                {
                    clearValue:[0.0, 0.0, 0.0, 1.0],
                    storeOp:"store",
                    loadOp:"clear",
                    view: context!.getCurrentTexture().createView()
                }
            ],
        } as GPURenderPassDescriptor;


        if(this.pipeline.depth){
            if(!depthTexture)
                throw new Error("Depth texture is needed.");

            const depthStencilAttachment={
                view: depthTexture!.createView(),
                depthStoreOp: "store",
                depthClearValue: 1.0,
                depthLoadOp: "clear"
            } as GPURenderPassDepthStencilAttachment;

            descriptor.depthStencilAttachment = depthStencilAttachment;
        }

        const renderPass=encoder.beginRenderPass(descriptor);

        return renderPass;
    }

    draw(camera: Camera, context: GPUCanvasContext, depthTexture?: GPUTexture, n_vertex?: number){
        if(!(this.mesh || n_vertex))
            throw new Error("unknown number of vertices.");

        if(this.using_mvp){
            const vpMatrix =  camera.getViewProjection();
            const modelMatrix = (this.mesh)? this.mesh.modelMatrix : mat4.create();
            const mvpMatrix = mat4.create();
    
            mat4.multiply(mvpMatrix, vpMatrix, modelMatrix);
            this.device.queue.writeBuffer(this.mvpUniformBuffer!, 0, mvpMatrix as ArrayBuffer);
        }

        this.writeUniforms();
        
        const commandEncoder = this.device.createCommandEncoder();
        const renderPass = this.getRenderPass(commandEncoder, context, depthTexture);

        renderPass.setPipeline(this.pipeline.renderPipeline!);

        if(this.mesh) this.mesh.setBuffers(renderPass);
        
        this.setBindGroups(renderPass);
        renderPass.draw(this.mesh!.numberOfVertex || n_vertex!);
        renderPass.end();

        this.device.queue.submit([commandEncoder.finish()]);
    }
}

class Uniform{
    buffer: GPUBuffer;
    information: Float32Array[];

    constructor(buffer: GPUBuffer, info: Float32Array[]){
        this.buffer = buffer;
        this.information = info;
    }
}
