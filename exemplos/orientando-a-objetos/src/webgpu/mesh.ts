import { mat4, vec3 } from "gl-matrix"
import Pipeline from "./Pipeline";
 
export default class Mesh{
    private vertex: Float32Array;
    private vertexBuffer: GPUBuffer;

    private colors?: Float32Array;
    private colorBuffer?: GPUBuffer;

    private vertexPos: number;
    private colorPos?: number;

    pos: vec3 = vec3.fromValues(0,0,0);
    scale: vec3 = vec3.fromValues(1,1,1);
    rotationAngles: vec3 = vec3.fromValues(0,0,0);
    private model_matrix: mat4;

    private n_vertex: number;

    public get modelMatrix(){
        this.createTransforms();
        return this.model_matrix;
    }

    public get numberOfVertex(){
        return this.n_vertex;
    }

    constructor(device: GPUDevice, stride: number = 3, vertex: Float32Array, vertexPos: number, colors?:Float32Array, colorsPos?: number){
        this.vertex = vertex;
        this.vertexBuffer = Pipeline.createGPUBuffer(device, this.vertex);
        this.vertexPos = vertexPos;

        if(colors){
            if(!colorsPos)
                throw new Error("Color buffer position not provided.");

            this.colors = colors;
            this.colorBuffer = Pipeline.createGPUBuffer(device, this.colors);
            this.colorPos = colorsPos;
        }
        
        this.model_matrix = mat4.create();

        this.n_vertex = vertex.length/stride;
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
        renderPass.setVertexBuffer(this.vertexPos, this.vertexBuffer);

        if(this.colorBuffer) renderPass.setVertexBuffer(this.colorPos!, this.colorBuffer);
    }

}