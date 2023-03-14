export const Shaders=() =>{
    const vertex=`
        @group(0) @binding(0)
            var<uniform> mvpMatrix: mat4x4<f32>;

        struct Input{
            @location(0) position: vec4<f32>,
            @location(1) texCoord: vec2<f32>,

        }

        struct Output{
            @builtin(position) position: vec4<f32>,
            @location(0) texCoord: vec2<f32>,
        }

        @vertex
        fn main(in: Input) -> Output {
            var out: Output;
            //var uniforms: Uniforms;

            out.position = mvpMatrix * in.position;
            out.texCoord = in.texCoord;

            return out;
        }
    `
    const fragment=`
        
        @binding(0) @group(1) var texture: texture_2d<f32>;
        @binding(1) @group(1) var textureSampler: sampler;

        @fragment
        fn main(@location(0) texCoord: vec2<f32>) -> @location(0) vec4<f32> {
            return textureSample(texture, textureSampler, texCoord);
        }
    `

    return {
        vertex, fragment
    };
}

