import Camera from "./camera";
import Main from "./main";
import Mesh from "./webgpu/mesh";
import Program from "./webgpu/program";
import { CubeData } from "./vertex_data";

export default class Scene{
    private programs: Program[] = [];
    camera: Camera;

    constructor(camera: Camera){
        this.camera = camera;
    }

    addProgram(program: Program){
        this.programs.push(program);
    }

    draw(context: GPUCanvasContext){
        for(const program of this.programs){
            program.draw(this.camera, context, )
        }
    }
}