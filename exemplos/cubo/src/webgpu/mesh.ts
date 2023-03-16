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

    static calculateTriangleNormals(vertices:Float32Array, vertLen: number = 3, offset: number = 0){
        const normals = [];

        for(let i = 0; i<vertices.length/vertLen; i+=3){
            const tI1 = i
            const tI2 = i+1;
            const tI3 = i+2;

            const p1 = vec3.fromValues(
                vertices[tI1*vertLen + offset ],
                vertices[tI1*vertLen + offset +1],
                vertices[tI1*vertLen + offset +2]
            );

            const p2 = vec3.fromValues(
                vertices[tI2*vertLen + offset ],
                vertices[tI2*vertLen + offset +1],
                vertices[tI2*vertLen + offset +2]
            );

            const p3 = vec3.fromValues(
                vertices[tI3*vertLen + offset ],
                vertices[tI3*vertLen + offset +1],
                vertices[tI3*vertLen + offset +2]
            );

            const normal = Mesh.crossProduct(
                vec3.fromValues(p2[0]-p1[0], p2[1] - p1[1], p2[2] - p1[2]),
                vec3.fromValues(p3[0]-p1[0], p3[1] - p1[1], p3[2] - p1[2])
            )
            normals.push(...normal, 0, ...normal, 0, ...normal, 0);
        }
        return new Float32Array(normals);
    }

    protected static crossProduct(v1: vec3, v2: vec3){
        return vec3.fromValues(
            v1[1]*v2[2] - v1[2]*v2[1],
            v1[2]*v2[0] - v1[0]*v2[2],
            v1[0]*v2[1] - v1[1]*v2[0]
        );
    }
}