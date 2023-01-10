import { mat4, vec3 } from "gl-matrix";
const createCamera = require('3d-view-controls');

export default class Camera{
    viewMatrix: mat4 = mat4.create();
    projMatrix: mat4 = mat4.create();
    viewProjMatrix: mat4 = mat4.create();

    camPosition: vec3 = [2,2,4];
    lookDirection: vec3 = [0,0,0];
    upDirection: vec3 = [0,1,0];

    control;
    
    constructor(canvas: HTMLCanvasElement ){
        this.control = createCamera(canvas, {
            eye: this.camPosition,
            center: this.lookDirection,
            zoomMax: 100,
            zoomSpeed: 2
        });
    }

    updateViewMatrix(isAnimation: boolean){
        if(!isAnimation) {
            this.control.tick();
            this.control.matrix.
            this.viewMatrix = this.control.matrix;
        }else{
            mat4.identity(this.viewMatrix);
            mat4.lookAt(this.viewMatrix, this.camPosition, this.lookDirection, this.upDirection);
        }
    }

    updateProjMatrix(respectRatio = 1.0){
        mat4.identity(this.projMatrix);
        mat4.perspective(this.projMatrix, 2*Math.PI/5, respectRatio, 0.1, 100.0);
    }

    getViewProjection(){
        mat4.identity(this.viewProjMatrix);
        mat4.multiply(this.viewProjMatrix, this.projMatrix, this.viewMatrix);

        return this.viewProjMatrix;
    }
}