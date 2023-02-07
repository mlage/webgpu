export const CubeData=()=>{

    const vertexData = new Float32Array([
        //vertex        color
        1,  1,  1,       0, 0, 1,
        -1,  1,  1,      1, 0, 0,
        1, -1,  1,       1, 1, 0,   
        1,  1, -1,       0, 1, 1,
        -1, -1,  1,      0, 1, 0,  
        1, -1, -1,       1, 0, 1,
        -1,  1, -1,      1, 1, 1,
        -1, -1, -1,      0, 0, 0
    ])

    const indexData = new Uint32Array([
        //front
        4, 2, 0, 0, 1, 4,

        // right
        2, 5, 3, 3, 0, 2,

        //back
        7, 6, 3, 3, 5, 7,

        //left
        4, 1, 6, 6, 7, 4, 

        //top
        1, 0, 3, 3, 6, 1,

        //bottom
        4, 7, 5, 5, 2, 4
    ]);

    return {
        vertexData,
        indexData
    }
}