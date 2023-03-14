import { vec4 } from "gl-matrix";
import Program from "./webgpu/program";

export default class Light{
    ambColor: vec4 = vec4.fromValues(0.0, 0.0, 0.0, 1);
    ambK: number = 7.0;

    difColor: vec4 = vec4.fromValues(0.1, 0.1, 0.1, 1);
    difK: number = 3.0;

    espColor: vec4 = vec4.fromValues(1.0, 1.0, 1.0, 1);
    espK: number = 0.0;
    espExp: number = 100.0;

    pos: vec4;

    constructor(pos:vec4){
        this.pos = pos;
    }

    createUniformBuffer(program: Program, group: number, binding: number){
        program.appendUniformBuffer(binding, group,
            new Float32Array(this.ambColor),
            new Float32Array(this.difColor),
            new Float32Array(this.espColor),
            new Float32Array(this.pos),            
            new Float32Array([this.ambK]),
            new Float32Array([this.difK]),
            new Float32Array([this.espK]),
            new Float32Array([this.espExp]),       
        )
    }

    newPos(param:number){
        this.pos = vec4.fromValues(
            4*Math.cos(param),
            0,//Math.cos(param/0.6)*Math.sin(param),
            4*Math.sin(param),//*Math.sin(param/0.6),
            1
        );
    }
}