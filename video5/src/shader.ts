export const Shaders=()=>{
    const vertex=`
        const pos: array<vec2<f32>, 9>=  array<vec2<f32>,9>(
            vec2<f32>(0.18, 0.12),
            vec2<f32>(-0.18, 0.12),
            vec2<f32>(0.0, 0.5),
            vec2<f32>(0.0, 0.0),
            vec2<f32>(-0.3, 0.0),
            vec2<f32>(-0.2, -0.2),
            vec2<f32>(0.2, -0.2),
            vec2<f32>(0.3, 0.0),
            vec2<f32>(0.0,0.0)
        );

        @vertex
        fn main(@builtin(vertex_index) VertexIndex: u32) -> @builtin(position) vec4<f32> 
        {
            return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
        }
    `
    const fragment=`  
        @fragment
        fn main() -> @location(0) vec4<f32> {
            return vec4<f32>(1.0, 1.0, 1.0, 1.0);
        }
    `

    return {vertex, fragment};
}