import {vec3, mat4} from "gl-matrix";

export const createAnimation = (draw: any, rotation: vec3 = vec3.fromValues(0,0,0), isAnimation=true) => {
    function step(){
        if(isAnimation){
            rotation[0]+=0.01;
            rotation[1]+=0.01;
            rotation[2]+=0.01;
        }
        draw();
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

export const checkWebGPU=()=>{
    if(navigator.gpu)return "webGPU suportado"
    return "webGPU não suportado"
}

export const initGPU=async ()=>{
    const checkGpu=checkWebGPU();

    if(checkGpu==="webGPU não suportado"){
        console.log(checkGpu);
        throw("Seu navegador atual não suporta webGPU!");
    }

    const canvas = document.querySelector("#canvas-webgpu") as HTMLCanvasElement;

    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = 1024 * devicePixelRatio;
    canvas.height = 768 * devicePixelRatio;

    const adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
    const device = await adapter?.requestDevice() as GPUDevice;
    const context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;

    const swapChainFormat='bgra8unorm';
    context.configure({
        device,
        format:swapChainFormat,
        alphaMode:"premultiplied"
    })

    return {device, canvas, swapChainFormat, context}
}

export const createGPUBuffer = (device: GPUDevice, data: Float32Array, 
    usageFlag:GPUBufferUsageFlags=GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST)=>{
        const buffer=device.createBuffer({
            size:data.byteLength,
            usage:usageFlag,
            mappedAtCreation:true
        });
        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
}

export const createGPUBufferUint=(device: GPUDevice, data: Uint32Array, 
    usageFlag:GPUBufferUsageFlags=GPUBufferUsage.INDEX| GPUBufferUsage.COPY_DST)=>{
        const buffer=device.createBuffer({
            size:data.byteLength,
            usage:usageFlag,
            mappedAtCreation:true
        });
        new Uint32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
}

export const createTransforms = (modelMatrix: mat4, translation: vec3 = [0,0,0],
    rotation: vec3 = [0,0,0], scaling: vec3 = [1,1,1]) => {

        const rotateXMat = mat4.create();
        const rotateYMat = mat4.create();
        const rotateZMat = mat4.create();
        const translateMat = mat4.create();
        const scaleMat = mat4.create();

        mat4.fromTranslation(translateMat, translation);
        mat4.fromXRotation(rotateXMat, rotation[0]);
        mat4.fromYRotation(rotateYMat, rotation[1]);
        mat4.fromZRotation(rotateZMat, rotation[2]);
        mat4.fromScaling(scaleMat, scaling);

        mat4.multiply(modelMatrix, rotateXMat, scaleMat);
        mat4.multiply(modelMatrix, rotateYMat, modelMatrix);
        mat4.multiply(modelMatrix, rotateZMat, modelMatrix);
        mat4.multiply(modelMatrix, translateMat, modelMatrix);
}

export const createViewProjection=(respectRatio = 1.0, camPosition: vec3 = [2,2,4],
    lookDirection: vec3 = [0,0,0], upDirection: vec3 = [0,1,0])=>{

        const viewMatrix=mat4.create();
        const projectionMatrix=mat4.create();
        const viewProjMatrix=mat4.create();

        mat4.perspective(projectionMatrix, 2*Math.PI/5, respectRatio, 0.1, 100.0);
        mat4.lookAt(viewMatrix, camPosition, lookDirection, upDirection);
        mat4.multiply(viewProjMatrix, projectionMatrix, viewMatrix);

        const cameraOption={
            eye: camPosition,
            center: lookDirection,
            zoomMax: 100,
            zoomSpeed: 2
        }

        return {
            viewMatrix,
            projectionMatrix,
            viewProjMatrix,
            cameraOption
        }
}