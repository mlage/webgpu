import Camera from "./camera";
import Main from "./main";
import Sphere from "./Sphere";
import Mesh from "./mesh";
import { vec3 } from "gl-matrix";

export default class Scene{
    mesh: Mesh;
    camera: Camera;

    constructor(main: Main, u:number, v:number, radius:number, center:vec3){
        const sphere = new Sphere(radius, center);
        const data: Float32Array = sphere.wireframeData(u, v);

        this.mesh = new Mesh(data, main);

        this.camera = new Camera(main.canvas!);
    }

    draw(main: Main, isAnimation: boolean){
        this.camera.updateViewMatrix(isAnimation);
        this.camera.updateProjMatrix(main.canvas!.width/main.canvas!.height);
        this.mesh.draw(main.device!, isAnimation, this.camera, main.context!);
        requestAnimationFrame(this.draw.bind(this, main, isAnimation));
    }
}