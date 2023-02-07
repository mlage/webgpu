import Camera from "./camera";
import Main from "./main";
import Mesh from "./mesh";
import { CubeData } from "./vertex_data";

export default class Scene{
    mesh: Mesh;
    camera: Camera;

    constructor(main: Main){
        const data =  CubeData();

        this.mesh = new Mesh(data.vertexData, data.indexData,main);

        this.camera = new Camera(main.canvas!);
    }

    draw(main: Main, isAnimation: boolean){
        this.camera.updateViewMatrix(isAnimation);
        this.camera.updateProjMatrix(main.canvas!.width/main.canvas!.height);
        this.mesh.draw(main.device!, isAnimation, this.camera, main.context!);
    }
}