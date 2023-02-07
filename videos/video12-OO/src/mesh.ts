import { mat4, vec3 } from "gl-matrix"
import Camera from "./camera";
import Main from "./main";
import Pipeline from "./Pipeline"
import { Shaders } from "./shader";

export default class Mesh{
    vertexes: Float32Array;
    indexes: Uint32Array;
    vertexBuffer: GPUBuffer;
    indexBuffer: GPUBuffer;

    shaders = Shaders();

    pos: vec3 = vec3.fromValues(0,0,0);
    scale: vec3 = vec3.fromValues(1,1,1);
    rotationAngles: vec3 = vec3.fromValues(0,0,0);
    pipeline: Pipeline;
    modelMatrix: mat4;

    uniformBuffer: GPUBuffer;
    uniformBindingGroup: GPUBindGroup;


    constructor(vertexes: Float32Array,indexes: Uint32Array, main: Main){
        this.pipeline = new Pipeline(main, this.shaders.vertex, this.shaders.fragment);
        this.vertexes = vertexes;
        this.indexes = indexes;
        this.modelMatrix = mat4.create();

        this.vertexBuffer = Pipeline.createGPUBuffer(main.device!,vertexes);
        this.indexBuffer = Pipeline.createGPUBufferUint(main.device!, indexes);

        this.uniformBuffer = main.device!.createBuffer({
            size:64,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
    
        this.uniformBindingGroup = main.device!.createBindGroup({
            layout: this.pipeline.renderPipeline.getBindGroupLayout(0),
            entries: [
                {
                    binding:0,
                    resource:{
                        buffer: this.uniformBuffer,
                        offset:0,
                        size:64
                    }
                }
            ]
        })
    }

    createTransforms(){
            const rotateXMat = mat4.create();
            const rotateYMat = mat4.create();
            const rotateZMat = mat4.create();
            const translateMat = mat4.create();
            const scaleMat = mat4.create();
    
            mat4.fromTranslation(translateMat, this.pos);
            mat4.fromXRotation(rotateXMat, this.rotationAngles[0]);
            mat4.fromYRotation(rotateYMat, this.rotationAngles[1]);
            mat4.fromZRotation(rotateZMat, this.rotationAngles[2]);
            mat4.fromScaling(scaleMat, this.scale);
    
            mat4.multiply(this.modelMatrix, rotateXMat, scaleMat);
            mat4.multiply(this.modelMatrix, rotateYMat, this.modelMatrix);
            mat4.multiply(this.modelMatrix, rotateZMat, this.modelMatrix);
            mat4.multiply(this.modelMatrix, translateMat, this.modelMatrix);
    }

    draw(device: GPUDevice, isAnimation:boolean, camera: Camera, context: GPUCanvasContext){
        if(isAnimation){
            this.rotationAngles[0]+=0.01;
            this.rotationAngles[1]+=0.01;
            this.rotationAngles[2]+=0.01;
        }

        const vpMatrix =  camera.getViewProjection();
        this.createTransforms();
        const mvpMatrix = mat4.create();
        mat4.multiply(mvpMatrix, vpMatrix, this.modelMatrix);
        device.queue.writeBuffer(this.uniformBuffer, 0, mvpMatrix as ArrayBuffer);
        
        this.pipeline.attachment.view=context.getCurrentTexture().createView();
        
        const commandEncoder=device.createCommandEncoder();
        const renderPass=commandEncoder.beginRenderPass(this.pipeline.renderPassDescriptor);
        renderPass.setPipeline(this.pipeline.renderPipeline);
        renderPass.setVertexBuffer(0, this.vertexBuffer);
        renderPass.setIndexBuffer(this.indexBuffer, "uint32");
        renderPass.setBindGroup(0,this.uniformBindingGroup);
        renderPass.drawIndexed(this.indexes.length);
        renderPass.end();
    
        device.queue.submit([commandEncoder.finish()]);
    }
}