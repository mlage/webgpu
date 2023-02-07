import { vec3 } from "gl-matrix";

export default class Sphere{
    radius: number;
    center: vec3;

    constructor(radius:number = 1, center:vec3 = vec3.fromValues(0,0,0)) {
        this.radius = radius;
        this.center = center;
    }

    wireframeData(u: number, v: number){
        if(u<2) u = 2;
        if(v<2) v = 2;

        let pts = [];
        let pt : vec3;

        for(let i=0; i<u; i++){
            let pt1 = [];
            for(let j=0; j<v; j++){
                pt = this.getPoint(i*180/(u-1), j*360/(v-1));
                pt1.push(pt);
            }
            pts.push(pt1);
        }

        let pp = [];

        let p0, p1, p2, p3;

        for(let i=0; i<u-1; i++){
            for(let j=0; j<v-1; j++){
                p0 = pts[i][j];
                p1 = pts[i+1][j];
                p2 = pts[i][j+1];

                pp.push([
                    ...p0, ...p1, ...p0, ...p2
                ]);
            }
        }

        return new Float32Array(pp.flat());
    }

    private getPoint(theta: number, phi: number){
        const snt = Math.sin(theta*Math.PI/180);
        const cnt = Math.cos(theta*Math.PI/180);
        const snp = Math.sin(phi*Math.PI/180);
        const cnp = Math.cos(phi*Math.PI/180);

        return vec3.fromValues(
            this.radius*snt*cnp + this.center[0], 
            this.radius*cnt + this.center[1],
            -this.radius*snp*snt + this.center[2]
        );
    }
}