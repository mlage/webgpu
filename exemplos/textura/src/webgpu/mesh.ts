import { mat4, vec3 } from "gl-matrix"
import Pipeline from "./pipeline";
 
export default class Mesh{
    protected device: GPUDevice;

    protected arrays: Float32Array[] = [];
    protected buffers: GPUBuffer[] = [];

    pos: vec3 = vec3.fromValues(0,0,0);
    scale: vec3 = vec3.fromValues(1,1,1);
    rotationAngles: vec3 = vec3.fromValues(0,0,0);
    private model_matrix: mat4;

    protected stride: number;

    public get modelMatrix(){
        this.createTransforms();
        return this.model_matrix;
    }

    public get numberOfVertex(){
        return this.arrays[0].length/this.stride;
    }

    constructor(device: GPUDevice, stride: number = 3){
        this.model_matrix = mat4.create();

        this.stride = stride;

        this.device = device;
    }

    appendBuffer(data: Float32Array){
        this.arrays.push(data);
        this.buffers.push(Pipeline.createGPUBuffer(this.device, data));
    }

    private createTransforms(){
        mat4.identity(this.model_matrix);

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
    
        mat4.multiply(this.model_matrix, rotateXMat, scaleMat);
        mat4.multiply(this.model_matrix, rotateYMat, this.model_matrix);
        mat4.multiply(this.model_matrix, rotateZMat, this.model_matrix);
        mat4.multiply(this.model_matrix, translateMat, this.model_matrix);
    }

    setBuffers(renderPass: GPURenderPassEncoder){
        for(let i=0; i<this.buffers.length; i++) renderPass.setVertexBuffer(i, this.buffers[i]);
    }

}