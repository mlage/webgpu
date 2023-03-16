import Mesh from "./mesh";
import Pipeline from "./pipeline";
import { vec3 } from "gl-matrix";

export default class IndexedMesh extends Mesh{
    private indexes: Uint32Array;
    private indexBuffer: GPUBuffer;

    get numberOfVertex(){
        return this.indexes.length;
    }

    constructor(device: GPUDevice, indexes:Uint32Array, stride: number = 3){
        super(device, stride);

        this.indexes = indexes;

        this.indexBuffer = Pipeline.createGPUBufferUint(device, indexes);
    }

    setBuffers(renderPass: GPURenderPassEncoder){
        super.setBuffers(renderPass);

        renderPass.setIndexBuffer(this.indexBuffer, "uint32");
    }

    static calculateNormals(indexes: Uint32Array, vertices:Float32Array, vertLen: number = 3, offset: number = 0){
        const normals = new Array(vertices.length / vertLen * 4).fill(0);

        for(let i = 0; i<indexes.length; i+=3){
            const tI1 = indexes[i];
            const tI2 = indexes[i+1];
            const tI3 = indexes[i+2];

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
        return new Float32Array(normals);
    }
}