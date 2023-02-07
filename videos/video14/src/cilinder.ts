import { vec3 } from "gl-matrix";

export default class Cilinder{
    center: vec3;
    radiusIn: number;
    radiusOut: number;
    height: number;

    constructor(center: vec3, radiusIn: number, radiusOut: number, height:number){
        this.center = center;
        this.radiusIn = radiusIn;
        this.radiusOut = radiusOut;
        this.height = height;
    }

    private static getPoint(theta: number, h:number, radius:number, center:vec3){
        const sn = Math.sin(theta*Math.PI/180);
        const cn = Math.cos(theta*Math.PI/180);

        const x = cn * radius + center[0];
        const y = h + center[1];
        const z = sn * radius + center[2];

        return vec3.fromValues(x, y, z);
    }

    wireframeData(n: number){
        const pts = [];
        const h = this.height/2;

        for(let i=0; i<n; i++){
            pts.push([
                Cilinder.getPoint(i*360/(n-1), h, this.radiusOut, this.center),
                Cilinder.getPoint(i*360/(n-1), -h, this.radiusOut, this.center),
                Cilinder.getPoint(i*360/(n-1), -h, this.radiusIn, this.center),
                Cilinder.getPoint(i*360/(n-1), h, this.radiusIn, this.center),
            ])
        }

        const p = [];
        let p1, p2, p3, p4, p5, p6, p7, p8;

        for(let i=0; i<n-1; i++){
            p1 = pts[i][0];
            p2 = pts[i][1];
            p3 = pts[i][2];
            p4 = pts[i][3];
            p5 = pts[i+1][0];
            p6 = pts[i+1][1];
            p7 = pts[i+1][2];
            p8 = pts[i+1][3];

            p.push([
                //top
                ...p1, ...p4, ...p4, ...p8, ...p8, ...p5, ...p5, ...p1,

                //bottom
                ...p2, ...p3, ...p3, ...p7, ...p7, ...p6, ...p6, ...p2,

                //side

                ...p1, ...p2, ...p4, ...p3
            ]);
        }

        return new Float32Array(p.flat());
    }

}