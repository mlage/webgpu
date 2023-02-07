export const GLSLShaders=()=>{
    const vertex=`
        #version 450
        const vec2 pos[3] = vec2[3](
            vec2(0.0, 0.5),
            vec2(-0.5, -0.5),
            vec2(0.5, -0.5)
        );

        const vec3 color[3] = vec3[3](
            vec3(1.0, 0.0, 0.0),
            vec3(0.0, 1.0, 0.0),
            vec3(0.0, 0.0, 1.0)
        );
        
        layout(location=0) out vec4 vColor;
        void main(){
            vColor=vec4(color[gl_VertexIndex], 1.0f);
            gl_Position=vec4(pos[gl_VertexIndex], 0.0, 1.0);
        }
    `
    const fragment=`  
        #version 450
        layout(location=0) in vec4 vColor;
        layout(location=0) out vec4 fragColor;
        void main() {
            fragColor=vColor;
        }
    `

    return {vertex, fragment};
}

export const Shaders=()=>{
    const vertex=`
        const pos: array<vec2<f32>, 3>=  array<vec2<f32>, 3>(
            vec2<f32>(0.0, 0.5),
            vec2<f32>(-0.5, -0.5),
            vec2<f32>(0.5, -0.5),
        );

        const color: array<vec3<f32>, 3>=  array<vec3<f32>, 3>(
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
            out.vColor=vec4<f32>(color[VertexIndex], 0.75);
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