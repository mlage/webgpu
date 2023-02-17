import Mesh from "./mesh";
import Pipeline from "./pipeline";
import { vec3 } from "gl-matrix";

export default class IndexedMesh extends Mesh{
    private indexes: Uint32Array;
    private indexBuffer: GPUBuffer;

    private normals?: Float32Array;
    private normalsBuffer?: GPUBuffer;

    get numberOfVertex(){
        return this.indexes.length;
    }

    constructor(device: GPUDevice, indexes:Uint32Array, stride: number = 3, vertex: Float32Array, vertexPos: number, colors?:Float32Array, colorsPos?: number){
        super(device, stride, vertex, vertexPos, colors, colorsPos);

        this.indexes = indexes;

        this.indexBuffer = Pipeline.createGPUBufferUint(device, indexes);

        this.calculateNormals();

        this.normalsBuffer = Pipeline.createGPUBuffer(device, this.normals!);
    }

    private calculateNormals(){
        const normals = new Array(this.vertex.length / this.stride * 4).fill(0);

        for(let i = 0; i<this.indexes.length; i+=3){
            const tI1 = this.indexes[i];
            const tI2 = this.indexes[i+1];
            const tI3 = this.indexes[i+2];

            const p1 = vec3.fromValues(
                this.vertex[tI1*this.stride],
                this.vertex[tI1*this.stride+1],
                this.vertex[tI1*this.stride+2]
            );

            const p2 = vec3.fromValues(
                this.vertex[tI2*this.stride],
                this.vertex[tI2*this.stride+1],
                this.vertex[tI2*this.stride+2]
            );

            const p3 = vec3.fromValues(
                this.vertex[tI3*this.stride],
                this.vertex[tI3*this.stride+1],
                this.vertex[tI3*this.stride+2]
            );

            const normal = crossProduct(
                vec3.fromValues(p2[0]-p1[0], p2[1] - p1[1], p2[2] - p1[2]),
                vec3.fromValues(p3[0]-p1[0], p3[1] - p1[1], p3[2] - p1[2])
            )

            normals[tI1*4] += normal[0];
            normals[tI1*4 + 1] += normal[1];
            normals[tI1*4 + 2] += normal[2];

            normals[tI2*4] += normal[0];
            normals[tI2*4 + 1] += normal[1];
            normals[tI2*4 + 2] += normal[2];

            normals[tI3*4] += normal[0];
            normals[tI3*4 + 1] += normal[1];
            normals[tI3*4 + 2] += normal[2];
        }
        this.normals = new Float32Array(normals);
    }

    setBuffers(renderPass: GPURenderPassEncoder){
        super.setBuffers(renderPass);

        renderPass.setIndexBuffer(this.indexBuffer, "uint32");

        renderPass.setVertexBuffer(1, this.normalsBuffer!);
    }
}

function crossProduct(v1: vec3, v2: vec3){
    return vec3.fromValues(
        v1[1]*v2[2] - v1[2]*v2[1],
        v1[2]*v2[0] - v1[0]*v2[2],
        v1[0]*v2[1] - v1[1]*v2[0]
    );
}