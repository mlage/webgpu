import Camera from "./camera";
import Main from "./main";
import Sphere from "./Sphere";
import Mesh from "./mesh";
import { vec3 } from "gl-matrix";
import Cilinder from "./cilinder";

export default class Scene{
    mesh: Mesh;
    camera: Camera;

    constructor(main: Main, n:number, rin:number, rout:number, center:vec3, height:number){
        const cilinder = new Cilinder(center, rin, rout, height);
        const data: Float32Array = cilinder.wireframeData(n);

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