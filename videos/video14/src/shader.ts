export const Shaders=() =>{
    const vertex=`
        @group(0) @binding(0)
            var<uniform> mvpMatrix: mat4x4<f32>;

        @vertex
        fn main(@location(0) position: vec4<f32>) -> @builtin(position) vec4<f32> {
            return mvpMatrix * position;
        }
    `
    const fragment=`  
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(1.0, 1.0, 0.0, 1.0);
        }
    `

    return {
        vertex, fragment
    };
}

