import { Shaders } from "./shader";
import { CubeData } from "./vertex_data";
import Camera from "./camera";
import Mesh from "./webgpu/mesh";
import Pipeline from "./webgpu/pipeline";
import Program from "./webgpu/program";
import { mat4 } from "gl-matrix";
import GPUParams from "./webgpu/gpu_params";

GPUParams.build().then((gpu)=>{
    const cubeData = CubeData();

    const canvas = document.querySelector("#canvas-webgpu") as HTMLCanvasElement;
    const canvasParams = gpu.getCanvasParams(canvas);

    const cube = new Mesh(gpu.device!, 3);
    cube.appendBuffer(cubeData.positions);
    cube.appendBuffer(cubeData.colors);
    const shaders = Shaders();

    const pipeline = new Pipeline(gpu.device!, shaders.vertex, shaders.fragment, "triangle-list");
    pipeline.enableDepthTest();
    pipeline.addVertexBuffer({location: 0});
    pipeline.addVertexBuffer({location: 1});

    const camera = new Camera(canvas);
    camera.projectionType = "orthogonal";
    camera.camPosition = [2, 2, -6];

    const program = new Program(gpu.device!, pipeline, cube);

    const mvp = mat4.create();
    mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);
    
    program.appendUniformBuffer(0, 0, new Float32Array(mvp));

    program.draw(canvasParams.context, canvasParams.depthTexture);

    document.addEventListener("keypress", e=>{
        if (e.key == "p") {
            camera.projectionType = "perspective";
            mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);

            program.appendUniformBuffer(0, 0, new Float32Array(mvp));
            program.draw(canvasParams.context, canvasParams.depthTexture);
        } else if (e.key == "o") {
            camera.projectionType = "orthogonal";
            mat4.multiply(mvp, camera.getViewProjection(), cube.modelMatrix);

            program.appendUniformBuffer(0, 0, new Float32Array(mvp));
            program.draw(canvasParams.context, canvasParams.depthTexture);
        }
    })
})

