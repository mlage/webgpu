export const CubeData=()=>{
    const positions = new Float32Array([
        //front
        -1, -1,  1,  
         1, -1,  1,  
         1,  1,  1,
         1,  1,  1,
        -1,  1,  1,
        -1, -1,  1,

        // right
         1, -1,  1,
         1, -1, -1,
         1,  1, -1,
         1,  1, -1,
         1,  1,  1,
         1, -1,  1,

        // back
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1,  1, -1,
         1, -1, -1,
        -1, -1, -1,

        // left
        -1, -1,  1,
        -1,  1,  1,
        -1,  1, -1,
        -1,  1, -1,
        -1, -1, -1,
        -1, -1,  1,

        // top
        -1,  1,  1,
         1,  1,  1,
         1,  1, -1,
         1,  1, -1,
        -1,  1, -1,
        -1,  1,  1,

        // bottom
        -1, -1,  1,
        -1, -1, -1,
         1, -1, -1,
         1, -1, -1,
         1, -1,  1,
        -1, -1,  1
    ]);

    const tex = new Float32Array([
        //front
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    
        //right
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    
        //back
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,

        //left
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,

        //top
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,

        //bottom
        0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1,
    ])    

    return {
        positions,
        tex
    }
}