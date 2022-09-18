export const Shaders=(color:String)=>{
    const vertex=`
        const pos: array<vec2<f32>, 3>=  array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.05),
            vec2<f32>(-0.05, -0.05),
            vec2<f32>(0.05, -0.05),
        );
        
        struct Output{
            @builtin(position) Position: vec4<f32>,
        }

        @vertex
        fn main(@builtin(vertex_index) VertexIndex: u32) -> Output {
            var out: Output;
            out.Position=vec4<f32>(pos[VertexIndex], 0.0, 0.1);
            return out;
        }
    `
    const fragment=`  
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>${color};
        }
    `

    return {vertex, fragment};
}