import { Shaders } from "./shader";
import { CubeData } from "./vertex_data";
import Camera from "./camera";
import Mesh from "./webgpu/mesh";
import Pipeline from "./webgpu/pipeline";
import Program from "./webgpu/program";
import GPUParams from "./webgpu/gpu_params";
import Light from "./light";
import { mat4 } from "gl-matrix";

GPUParams.build().then(async (gpu)=>{
    const cubeData = CubeData();

    const canvas = document.querySelector("#canvas-webgpu") as HTMLCanvasElement;
    const canvasParams = gpu.getCanvasParams(canvas);

    const cube = new Mesh(gpu.device!, 3);
    cube.appendBuffer(cubeData.positions);
    cube.appendBuffer(cubeData.tex);
    cube.appendBuffer(Mesh.calculateTriangleNormals(cubeData.positions));
    const shaders = Shaders();

    const pipeline = new Pipeline(gpu.device!, shaders.vertex, shaders.fragment, "triangle-list");
    pipeline.enableDepthTest();
    pipeline.addVertexBuffer({location: 0});
    pipeline.addVertexBuffer({location: 1, format: "float32x2"});
    pipeline.addVertexBuffer({location: 2, format: "float32x4"})

    const camera = new Camera(canvas);
    camera.camPosition = [0, 0, 4];

    const light = new Light([4, 0, 4, 1]);

    const program = new Program(gpu.device!, pipeline, cube);

    const view = camera.viewMatrix;
    const invertMV = mat4.create();
    mat4.multiply(invertMV, view, cube.modelMatrix);
    mat4.invert(invertMV, invertMV);
    mat4.transpose(invertMV, invertMV);

    program.appendUniformBuffer(0, 0, 
        new Float32Array(cube.modelMatrix), 
        new Float32Array(view),
        new Float32Array(invertMV),
        new Float32Array(camera.projMatrix)
    );

    light.createUniformBuffer(program, 0, 1);

    await program.setTexture("./assets/stone.jfif");

    program.draw(canvasParams.context, canvasParams.depthTexture);

    let param = 0;

    const draw = ()=>{
        cube.rotationAngles = [param, param, param];
        
        mat4.multiply(invertMV, view, cube.modelMatrix);
        mat4.invert(invertMV, invertMV);
        mat4.transpose(invertMV, invertMV);

        program.appendUniformBuffer(0, 0, 
            new Float32Array(cube.modelMatrix), 
            new Float32Array(camera.viewMatrix),
            new Float32Array(invertMV),
            new Float32Array(camera.projMatrix)
        );
        program.draw(canvasParams.context, canvasParams.depthTexture);
        param+=0.01;
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})

