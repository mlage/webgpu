import IndexedMesh from "./indexed_mesh";
import Mesh from "./mesh";
import Pipeline from "./pipeline";

export default class Program{
    private mesh?: Mesh;
    private pipeline: Pipeline;

    private uniforms: Uniform[] = [];
    private bindGroups: BindGroupsSet = new BindGroupsSet();

    device: GPUDevice;

    constructor(device: GPUDevice, pipeline: Pipeline, mesh?: Mesh){
        this.pipeline = pipeline;

        if(mesh) {
            this.mesh = mesh;

        }

        this.device = device;
    }

    appendUniformBuffer(binding: number, group: number, ...data: Float32Array[]){
        if(data.length === 0) throw new Error("The data can't be undefined.");

        let size = 0;

        const max = maxLength(data);
        let blocks = 1;
        let floats = 0;

        for(const fArray of data){
            if(floats + fArray.length > max){
                blocks++;
                floats = 0;
            }

            floats += fArray.length;
        }

        size = blocks * max * 4;

        const uniformBuffer = this.device.createBuffer({
            size,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })

        const resource = {
            buffer: uniformBuffer,
            offset: 0,
            size
        } as GPUBindingResource;

        this.bindGroups.add(this.device, binding, group, resource);

        this.uniforms.push(new Uniform(uniformBuffer, data, max));

        this.pipeline.setLayout(this.device.createPipelineLayout({
            bindGroupLayouts: this.bindGroups.getLayouts()
        }))
    }

    async setTexture(imgSrc: string, addressModeU:GPUAddressMode = "repeat", addressModeV:GPUAddressMode = "repeat"){
        const img = document.createElement("img");
        img.src = imgSrc;
        img.setAttribute('crossOrigin', '');
        await img.decode();
        const imageBitmap = await createImageBitmap(img);

        const sampler = this.device.createSampler({
            minFilter: 'linear',
            magFilter: 'linear',
            addressModeU,
            addressModeV
        });       
    
        // create texture
        const texture = this.device.createTexture({
            size: [imageBitmap.width, imageBitmap.height, 1],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.TEXTURE_BINDING | 
                   GPUTextureUsage.COPY_DST | 
                   GPUTextureUsage.RENDER_ATTACHMENT
        });
    
        this.device.queue.copyExternalImageToTexture(
            { source: imageBitmap },
            { texture: texture },
            [imageBitmap.width, imageBitmap.height]
        );
    
        this.bindGroups.add(this.device, 0, 1, texture.createView());
        this.bindGroups.add(this.device, 1, 1, sampler);

        this.pipeline.setLayout(this.device.createPipelineLayout({
            bindGroupLayouts: this.bindGroups.getLayouts()
        }))
    }

    private setBindGroups(renderPass: GPURenderPassEncoder){
        for(const entry of this.bindGroups.groups.entries()){
            renderPass.setBindGroup(Number(entry[0]), entry[1].group!);
        }
    }

    private writeUniforms(){
        for(const uniform of this.uniforms){
            let offset = 0;
            let blockLen = 0;
            let block = 0;

            for(const data of uniform.information){
                if(blockLen + data.length > uniform.max){
                    block++;
                    blockLen = 0;
                    offset = block * uniform.max * 4;
                }

                this.device.queue.writeBuffer(uniform.buffer, offset, data as ArrayBuffer);

                blockLen += data.length;
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

    draw(context: GPUCanvasContext, depthTexture?: GPUTexture, n_vertex?: number){
        if(!(this.mesh || n_vertex))
            throw new Error("unknown number of vertices.");

        this.writeUniforms();
        
        const commandEncoder = this.device.createCommandEncoder();
        const renderPass = this.getRenderPass(commandEncoder, context, depthTexture);

        renderPass.setPipeline(this.pipeline.renderPipeline!);

        if(this.mesh) this.mesh.setBuffers(renderPass);
        
        this.setBindGroups(renderPass);
        
        if(this.mesh && this.mesh instanceof IndexedMesh){
            renderPass.drawIndexed(this.mesh!.numberOfVertex);
        }else{
            renderPass.draw(this.mesh!.numberOfVertex || n_vertex!);
        }

        renderPass.end();

        this.device.queue.submit([commandEncoder.finish()]);
    }
}

class Uniform{
    buffer: GPUBuffer;
    information: Float32Array[];
    max: number;

    constructor(buffer: GPUBuffer, info: Float32Array[], max: number){
        this.buffer = buffer;
        this.information = info;
        this.max = max;
    }
}

function maxLength(data: Float32Array[]){
    let max = 0;

    for(let array of data){
        if(array.length>max) max = array.length;
    }

    return max;
}

class BindGroupsSet{
    groups: Map<number, BindGroup> = new Map();

    add(device: GPUDevice, binding: number, group: number, resource: GPUBindingResource){
        if(!this.groups.get(group)) this.groups.set(group, new BindGroup());

        this.groups.get(group)?.newEntry(device, binding, resource);
    }

    getLayouts(){
        const layouts: GPUBindGroupLayout[] = [];

        for(let group of this.groups.values()){
            layouts.push(group.layout!);
        }

        return layouts;
    }
}

class BindGroup{
    layoutEntries: Map<number, GPUBindGroupLayoutEntry> = new Map();
    entries: Map<number, GPUBindGroupEntry> = new Map();

    layout?: GPUBindGroupLayout;
    group?: GPUBindGroup;

    newEntry(device: GPUDevice, binding: number, resource: GPUBindingResource){
        const layEntry = BindGroup.getLayoutEntry(resource);
        layEntry.binding = binding;
        this.layoutEntries.set(binding, layEntry);
        
        this.entries.set(binding, {
            binding: binding,
            resource
        });

        this.layout = device.createBindGroupLayout({
            entries: this.layoutEntries.values()
        })

        this.group = device.createBindGroup({
            layout: this.layout,
            entries: this.entries.values()
        })
    }

    private static getLayoutEntry (resource:  GPUBindingResource): GPUBindGroupLayoutEntry{
        if(resource instanceof GPUTextureView){
            return {
                binding: -1,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                texture: {}
            }
        }
        if(resource instanceof GPUSampler){
            return {
                binding: -1,
                visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                sampler: {}
            }
        }
        
        return {
            binding: -1,
            visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
            buffer: {}
        }    
    }
}