import { mat4, vec3 } from "gl-matrix";

export default class Camera{
    private viewMatrix: mat4 = mat4.create();
    private projMatrix: mat4 = mat4.create();
    private viewProjMatrix: mat4 = mat4.create();

    camPosition: vec3 = [0,0,1];
    lookDirection: vec3 = [0,0,0];
    upDirection: vec3 = [0,1,0];

    left:number = -4.0;
    right:number = 4.0;
    bottom:number = -4.0;
    top:number = 4.0;
    near:number = 0.1;
    far:number = 8.0;

    fovy:number = Math.PI/2;
    aspect:number;

    constructor(canvas: HTMLCanvasElement){
        this.aspect = canvas!.width / canvas!.height
    }

    private typeOfProjection:string = "perspective";

    public set projectionType(type:string){
        if(type !== "orthogonal" && type !== "perspective") 
            throw new Error("Invalid type of projection.");

        this.typeOfProjection = type;
    }

    private updateViewMatrix(){
        mat4.identity(this.viewMatrix);
        mat4.lookAt(this.viewMatrix, this.camPosition, this.lookDirection, this.upDirection);
    }

    private updateProjMatrix(){
        mat4.identity(this.projMatrix);
        if(this.typeOfProjection == "perspective")
            mat4.perspective(this.projMatrix, this.fovy, this.aspect, this.near, this.far);
        else
            mat4.ortho(this.projMatrix, this.left * 1024/768, this.right * 1024/768, this.bottom, this.top, this.near, this.far);
    }

    getViewProjection(){
        this.updateViewMatrix();
        this.updateProjMatrix();
        mat4.identity(this.viewProjMatrix);
        mat4.multiply(this.viewProjMatrix, this.projMatrix, this.viewMatrix);

        return this.viewProjMatrix;
    }
}