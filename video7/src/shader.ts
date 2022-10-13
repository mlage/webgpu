export const Shaders=()=>{
    const vertex=`
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
            out.position=in.position;
            out.vColor=in.vColor;
            return out;
        }
    `
    const fragment=`  
        @fragment
        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {
            return vColor;
        }
    `


    return {vertex, fragment};
}