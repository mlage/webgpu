export const Shaders=() =>{
    const vertex=`
        struct Light{
            amb_c: vec4<f32>,
            dif_c: vec4<f32>,
            esp_c: vec4<f32>,
            pos: vec4<f32>,
            amb_k: f32,
            dif_k: f32,
            esp_k: f32,
            esp_p: f32,
        }

        struct MVP{
            model: mat4x4<f32>,
            view: mat4x4<f32>,
            proj: mat4x4<f32>,
        }

        @group(0) @binding(0)
            var<uniform> matrices: MVP;

            
        @group(0) @binding(1) 
            var<uniform> light: Light;

        struct Input{
            @location(0) position: vec4<f32>,
            @location(1) vColor: vec4<f32>,
            @location(2) normal: vec4<f32>
        }

        struct Output{
            @builtin(position) position: vec4<f32>,
            @location(0) vColor: vec4<f32>,
        }

        @vertex
        fn main(in: Input) -> Output {
            var out: Output;

            var lightPos = light.pos.xyz;
            var pos = -(matrices.view * matrices.model * in.position).xyz;

            var vNormal = normalize(matrices.view * matrices.model * in.normal).xyz;
            var vDistance = normalize(pos - lightPos);

            var normalPos = normalize(pos);

            var halfVector= normalize(vDistance + normalPos);

            var amb = light.amb_c * light.amb_k;

            var diff = max(dot(vNormal, vDistance), 0.0) * light.dif_c * light.dif_k;

            var spec = max(pow(dot(vNormal, halfVector), light.esp_p), 0.0)  * light.esp_c * light.esp_k;
            
            out.vColor = 0.7 * in.vColor + 0.3*(amb + diff + spec);
            //out.vColor = in.vColor;
            out.position = matrices.proj * matrices.view * matrices.model * in.position;

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

