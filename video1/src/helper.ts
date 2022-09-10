export const checkWebGPU=()=>{
    if(navigator.gpu)return "webGPU suportado"
    return "webGPU não suportado"
}