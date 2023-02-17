import Mesh from "./mesh";
import Pipeline from "./pipeline";

export default class IndexedMesh extends Mesh{
    private indexes: Uint32Array;
    private indexBuffer: GPUBuffer;

    constructor(device: GPUDevice, stride: number = 3, vertex: Float32Array, vertexPos: number, indexes:Uint32Array, colors?:Float32Array, colorsPos?: number){
        super(device, stride, vertex, vertexPos, colors, colorsPos);

        this.indexes = indexes;

        this.indexBuffer = Pipeline.createGPUBufferUint(device, indexes);
    }

    setBuffers(renderPass: GPURenderPassEncoder){
        super.setBuffers(renderPass);

        renderPass.setIndexBuffer(this.indexBuffer, "uint32");
    }
}