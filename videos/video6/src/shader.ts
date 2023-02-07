export const Shaders=()=>{
    const vertex=`
        const pos: array<vec2<f32>, 9>=  array<vec2<f32>, 9>(
            vec2<f32>(0.0, 0.7),
            vec2<f32>(-0.3, 0.2),
            vec2<f32>(0.3, 0.2),
            vec2<f32>(-0.3, 0.0),
            vec2<f32>(0.3, 0.0),
            vec2<f32>(-0.3, -0.4),
            vec2<f32>(0.4, -0.2),
            vec2<f32>(0.0, -0.7),
            vec2<f32>(0.4, -0.7),
        );

        const color: array<vec3<f32>, 9>=  array<vec3<f32>, 9>(
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0),
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0),
            vec3<f32>(1.0, 0.0, 0.0),
            vec3<f32>(0.0, 1.0, 0.0),
            vec3<f32>(0.0, 0.0, 1.0)
        );
        
        struct Output{
            @builtin(position) Position: vec4<f32>,
            @location(0) vColor: vec4<f32>,
        }

        @vertex
        fn main(@builtin(vertex_index) VertexIndex: u32) -> Output {
            var out: Output;
            out.Position=vec4<f32>(pos[VertexIndex], 0.0, 1.0);
            out.vColor=vec4<f32>(color[VertexIndex], 1.0);
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