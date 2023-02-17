import { vec3 } from "gl-matrix";

export default class Sphere{
    private radius: number;
    private center: vec3;
    private _indexes?: Uint32Array;
    private _vertices?: Float32Array;

    public get indexes(){
        return this._indexes;
    }

    public get vertices(){
        return this._vertices;
    }

    constructor(radius:number = 1, center:vec3 = vec3.fromValues(0,0,0)) {
        this.radius = radius;
        this.center = center;

        this.generateData(30, 30);
    }

    private generateData(u: number, v: number){
        if(u<2) u = 2;
        if(v<2) v = 2;

        let pts = [];
        let pt;

        for(let i=0; i<u; i++){
            for(let j=0; j<v; j++){
                pt = this.getPoint(i*180/(u-1), j*360/(v-1));
                pt = [...pt, 0, 0, 1];
                pts.push(pt);
            }
        }

        let pp = [];

        let p0, p1, p2, p3;

        for(let i=0; i<u-1; i++){
            for(let j=0; j<v-1; j++){
                p0 = i*v+j;
                p1 = (i+1)*v + j;
                p2 = i*v + j+1;
                p3 = (i+1)*v + j+1;

                pp.push([
                    p0, p1, p2, p1, p3, p2
                ]);
            }
        }

        this._vertices = new Float32Array(pts.flat());
        this._indexes = new Uint32Array(pp.flat());
    }

    private getPoint(theta: number, phi: number){
        const snt = Math.sin(theta*Math.PI/180);
        const cnt = Math.cos(theta*Math.PI/180);
        const snp = Math.sin(phi*Math.PI/180);
        const cnp = Math.cos(phi*Math.PI/180);

        return [
            this.radius*snt*cnp + this.center[0], 
            this.radius*cnt + this.center[1],
            -this.radius*snp*snt + this.center[2]
        ];
    }
}