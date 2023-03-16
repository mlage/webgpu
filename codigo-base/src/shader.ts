export const Shaders=() =>{
    const vertex=`
        @group(0) @binding(0)
            var<uniform> mvpMatrix: mat4x4<f32>;

        struct Input{
            @location(0) position: vec4<f32>,
            @location(1) vColor: vec4<f32>,
        }

        struct Output{
            @builtin(position) position: vec4<f32>,
            @location(0) vColor: vec4<f32>,
        }

        @vertex
        fn main(in: Input) -> Output {
            var out: Output;
            //var uniforms: Uniforms;

            out.position = mvpMatrix * in.position;
            out.vColor = in.vColor;

            return out;
        }
    `
    const fragment=`  
        @fragment
        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
            return vColor;
        }
    `

    return {
        vertex, fragment
    };
}

