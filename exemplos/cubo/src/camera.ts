import { mat4, vec3 } from "gl-matrix";

export default class Camera{
    private view_matrix: mat4 = mat4.create();
    private proj_matrix: mat4 = mat4.create();
    private viewProjMatrix: mat4 = mat4.create();

    camPosition: vec3 = [0,0,1];
    lookDirection: vec3 = [0,0,0];
    upDirection: vec3 = [0,1,0];

    left:number = -4.0;
    right:number = 4.0;
    bottom:number = -4.0;
    top:number = 4.0;
    near:number = 1.0;
    far:number = 9.0;

    fovy:number = Math.PI/1.7;
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

    public get viewMatrix(){
        this.updateViewMatrix();
        return this.view_matrix;
    }

    public get projMatrix(){
        this.updateProjMatrix();
        return this.proj_matrix;
    }

    private updateViewMatrix(){
        mat4.identity(this.view_matrix);
        mat4.lookAt(this.view_matrix, this.camPosition, this.lookDirection, this.upDirection);
    }

    private updateProjMatrix(){
        mat4.identity(this.proj_matrix);
        if(this.typeOfProjection == "perspective")
            mat4.perspective(this.proj_matrix, this.fovy, this.aspect, this.near, this.far);
        else
            mat4.ortho(this.proj_matrix, this.left * 1024/768, this.right * 1024/768, this.bottom, this.top, this.left, this.right);
    }

    getViewProjection(){
        this.updateViewMatrix();
        this.updateProjMatrix();
        mat4.identity(this.viewProjMatrix);
        mat4.multiply(this.viewProjMatrix, this.proj_matrix, this.view_matrix);

        return this.viewProjMatrix;
    }
}