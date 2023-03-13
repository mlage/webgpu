(()=>{"use strict";var t,e=1e-6,i="undefined"!=typeof Float32Array?Float32Array:Array;function r(t,e,r,n){var s=new i(4);return s[0]=t,s[1]=e,s[2]=r,s[3]=n,s}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)}),t=new i(4),i!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0);class n{constructor(t){this.ambColor=r(0,0,0,1),this.ambK=2,this.difColor=r(.3,.3,.3,1),this.difK=7,this.espColor=r(1,1,1,1),this.espK=1,this.espExp=20,this.pos=t}createUniformBuffer(t,e,i){t.appendUniformBuffer(i,e,new Float32Array(this.ambColor),new Float32Array(this.difColor),new Float32Array(this.espColor),new Float32Array(this.pos),new Float32Array([this.ambK]),new Float32Array([this.difK]),new Float32Array([this.espK]),new Float32Array([this.espExp]))}newPos(t){this.pos=r(4*Math.cos(t),0,4*Math.sin(t),1)}}function s(t,e,r){var n=new i(3);return n[0]=t,n[1]=e,n[2]=r,n}!function(){var t=new i(3);i!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0)}();class o{constructor(t=1,e=s(0,0,0)){this.radius=t,this.center=e,this.generateData(200,200)}get indexes(){return this._indexes}get vertices(){return this._vertices}generateData(t,e){t<2&&(t=2),e<2&&(e=2);let i,r=[];for(let n=0;n<t;n++)for(let s=0;s<e;s++)i=this.getPoint(180*n/(t-1),360*s/(e-1)),i=[...i,0,0,0],r.push(i);let n,s,o,a,h=[];for(let i=0;i<t-1;i++)for(let t=0;t<e-1;t++)n=i*e+t,s=(i+1)*e+t,o=i*e+t+1,a=(i+1)*e+t+1,h.push([n,s,o,s,a,o]);this._vertices=new Float32Array(r.flat()),this._indexes=new Uint32Array(h.flat())}getPoint(t,e){const i=Math.sin(t*Math.PI/180),r=Math.cos(t*Math.PI/180),n=Math.sin(e*Math.PI/180),s=Math.cos(e*Math.PI/180);return[this.radius*i*s+this.center[0],this.radius*r+this.center[1],-this.radius*n*i+this.center[2]]}}function a(){var t=new i(16);return i!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function h(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function u(t,e,i){var r=e[0],n=e[1],s=e[2],o=e[3],a=e[4],h=e[5],u=e[6],c=e[7],f=e[8],l=e[9],p=e[10],d=e[11],m=e[12],v=e[13],g=e[14],w=e[15],x=i[0],y=i[1],b=i[2],P=i[3];return t[0]=x*r+y*a+b*f+P*m,t[1]=x*n+y*h+b*l+P*v,t[2]=x*s+y*u+b*p+P*g,t[3]=x*o+y*c+b*d+P*w,x=i[4],y=i[5],b=i[6],P=i[7],t[4]=x*r+y*a+b*f+P*m,t[5]=x*n+y*h+b*l+P*v,t[6]=x*s+y*u+b*p+P*g,t[7]=x*o+y*c+b*d+P*w,x=i[8],y=i[9],b=i[10],P=i[11],t[8]=x*r+y*a+b*f+P*m,t[9]=x*n+y*h+b*l+P*v,t[10]=x*s+y*u+b*p+P*g,t[11]=x*o+y*c+b*d+P*w,x=i[12],y=i[13],b=i[14],P=i[15],t[12]=x*r+y*a+b*f+P*m,t[13]=x*n+y*h+b*l+P*v,t[14]=x*s+y*u+b*p+P*g,t[15]=x*o+y*c+b*d+P*w,t}class c{constructor(t){this.view_matrix=a(),this.proj_matrix=a(),this.viewProjMatrix=a(),this.camPosition=[0,0,1],this.lookDirection=[0,0,0],this.upDirection=[0,1,0],this.left=-4,this.right=4,this.bottom=-4,this.top=4,this.near=1,this.far=9,this.fovy=Math.PI/2,this.typeOfProjection="perspective",this.aspect=t.width/t.height}set projectionType(t){if("orthogonal"!==t&&"perspective"!==t)throw new Error("Invalid type of projection.");this.typeOfProjection=t}get viewMatrix(){return this.updateViewMatrix(),this.view_matrix}get projMatrix(){return this.updateProjMatrix(),this.proj_matrix}updateViewMatrix(){h(this.view_matrix),function(t,i,r,n){var s,o,a,u,c,f,l,p,d,m,v=i[0],g=i[1],w=i[2],x=n[0],y=n[1],b=n[2],P=r[0],M=r[1],_=r[2];Math.abs(v-P)<e&&Math.abs(g-M)<e&&Math.abs(w-_)<e?h(t):(l=v-P,p=g-M,d=w-_,s=y*(d*=m=1/Math.hypot(l,p,d))-b*(p*=m),o=b*(l*=m)-x*d,a=x*p-y*l,(m=Math.hypot(s,o,a))?(s*=m=1/m,o*=m,a*=m):(s=0,o=0,a=0),u=p*a-d*o,c=d*s-l*a,f=l*o-p*s,(m=Math.hypot(u,c,f))?(u*=m=1/m,c*=m,f*=m):(u=0,c=0,f=0),t[0]=s,t[1]=u,t[2]=l,t[3]=0,t[4]=o,t[5]=c,t[6]=p,t[7]=0,t[8]=a,t[9]=f,t[10]=d,t[11]=0,t[12]=-(s*v+o*g+a*w),t[13]=-(u*v+c*g+f*w),t[14]=-(l*v+p*g+d*w),t[15]=1)}(this.view_matrix,this.camPosition,this.lookDirection,this.upDirection)}updateProjMatrix(){h(this.proj_matrix),"perspective"==this.typeOfProjection?function(t,e,i,r,n){var s,o=1/Math.tan(e/2);t[0]=o/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=n&&n!==1/0?(s=1/(r-n),t[10]=(n+r)*s,t[14]=2*n*r*s):(t[10]=-1,t[14]=-2*r)}(this.proj_matrix,this.fovy,this.aspect,this.near,this.far):function(t,e,i,r,n,s,o){var a=1/(e-i),h=1/(r-n),u=1/(s-o);t[0]=-2*a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(e+i)*a,t[13]=(n+r)*h,t[14]=(o+s)*u,t[15]=1}(this.proj_matrix,1024*this.left/768,1024*this.right/768,this.bottom,this.top,this.left,this.right)}getViewProjection(){return this.updateViewMatrix(),this.updateProjMatrix(),h(this.viewProjMatrix),u(this.viewProjMatrix,this.proj_matrix,this.view_matrix),this.viewProjMatrix}}class f{constructor(t,e,i,r){let n;this.buffers=[],this.changed=!0,this._depth=!1,"line-strip"!==r&&"triangle-strip"!==r||(n="uint32"),this.pipelineDescriptor={vertex:{module:t.createShaderModule({code:e}),entryPoint:"main",buffers:this.buffers},fragment:{module:t.createShaderModule({code:i}),entryPoint:"main",targets:[{format:"bgra8unorm"}]},primitive:{topology:r,stripIndexFormat:n},layout:"auto"},this.device=t}get depth(){return this._depth}enableDepthTest(){this.pipelineDescriptor.depthStencil={format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},this._depth=!0,this.changed=!0}setLayout(t){this.changed=!0,this.pipelineDescriptor.layout=t}addVertexBuffer(...t){this.changed=!0;const e={},i=[];let r=0;for(const e of t)i.push({shaderLocation:e.location,format:e.format||"float32x3",offset:r}),r+=this.stride(e.format||"float32x3");e.arrayStride=r,e.attributes=i,this.buffers.push(e)}stride(t){return t.includes("x")?Number(t.slice(-4,-2))*Number(t[t.length-1])/8:Number(t.slice(-2))/8}get renderPipeline(){return this.changed&&(this.render_pipeline=this.device.createRenderPipeline(this.pipelineDescriptor),this.changed=!1),this.render_pipeline}}f.createGPUBuffer=(t,e,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const r=t.createBuffer({size:e.byteLength,usage:i,mappedAtCreation:!0});return new Float32Array(r.getMappedRange()).set(e),r.unmap(),r},f.createGPUBufferUint=(t,e,i=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=t.createBuffer({size:e.byteLength,usage:i,mappedAtCreation:!0});return new Uint32Array(r.getMappedRange()).set(e),r.unmap(),r};class l extends class{constructor(t,e=3){this.arrays=[],this.buffers=[],this.pos=s(0,0,0),this.scale=s(1,1,1),this.rotationAngles=s(0,0,0),this.model_matrix=a(),this.stride=e,this.device=t}get modelMatrix(){return this.createTransforms(),this.model_matrix}get numberOfVertex(){return this.arrays[0].length/this.stride}appendBuffer(t){this.arrays.push(t),this.buffers.push(f.createGPUBuffer(this.device,t))}createTransforms(){h(this.model_matrix);const t=a(),e=a(),i=a(),r=a(),n=a();!function(t,e){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1}(r,this.pos),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=i,t[7]=0,t[8]=0,t[9]=-i,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t,this.rotationAngles[0]),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=r,t[1]=0,t[2]=-i,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=i,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(e,this.rotationAngles[1]),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=r,t[1]=i,t[2]=0,t[3]=0,t[4]=-i,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(i,this.rotationAngles[2]),function(t,e){t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(n,this.scale),u(this.model_matrix,t,n),u(this.model_matrix,e,this.model_matrix),u(this.model_matrix,i,this.model_matrix),u(this.model_matrix,r,this.model_matrix)}setBuffers(t){for(let e=0;e<this.buffers.length;e++)t.setVertexBuffer(e,this.buffers[e])}}{constructor(t,e,i=3){super(t,i),this.indexes=e,this.indexBuffer=f.createGPUBufferUint(t,e)}get numberOfVertex(){return this.indexes.length}setBuffers(t){super.setBuffers(t),t.setIndexBuffer(this.indexBuffer,"uint32")}static calculateNormals(t,e,i=3,r=0){const n=new Array(e.length/i*4).fill(0);for(let h=0;h<t.length;h+=3){const u=t[h],c=t[h+1],f=t[h+2],l=s(e[u*i+r],e[u*i+r+1],e[u*i+r+2]),p=s(e[c*i+r],e[c*i+r+1],e[c*i+r+2]),d=s(e[f*i+r],e[f*i+r+1],e[f*i+r+2]),m=(o=s(p[0]-l[0],p[1]-l[1],p[2]-l[2]),a=s(d[0]-l[0],d[1]-l[1],d[2]-l[2]),s(o[1]*a[2]-o[2]*a[1],o[2]*a[0]-o[0]*a[2],o[0]*a[1]-o[1]*a[0]));n[4*u]+=m[0],n[4*u+1]+=m[1],n[4*u+2]+=m[2],n[4*c]+=m[0],n[4*c+1]+=m[1],n[4*c+2]+=m[2],n[4*f]+=m[0],n[4*f+1]+=m[1],n[4*f+2]+=m[2]}var o,a;return new Float32Array(n)}}class p{constructor(t,e,i){this.uniforms=[],this.bindGroups=new m,this.using_mvp=!1,this.pipeline=e,i&&(this.mesh=i),this.device=t}appendUniformBuffer(t,e,...i){if(0===i.length)throw new Error("The data can't be undefined.");let r=0;const n=function(t){let e=0;for(let i of t)i.length>e&&(e=i.length);return e}(i);let s=1,o=0;for(const t of i)o+t.length>n&&(s++,o=0),o+=t.length;r=s*n*4;const a=this.device.createBuffer({size:r,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});this.bindGroups.add(this.device,t,e,r,a),this.uniforms.push(new d(a,i,n)),this.pipeline.setLayout(this.device.createPipelineLayout({bindGroupLayouts:this.bindGroups.getLayouts()}))}setBindGroups(t){for(const e of this.bindGroups.groups.entries())t.setBindGroup(Number(e[0]),e[1].group)}writeUniforms(){for(const t of this.uniforms){let e=0,i=0,r=0;for(const n of t.information)i+n.length>t.max&&(r++,i=0,e=r*t.max*4),this.device.queue.writeBuffer(t.buffer,e,n),i+=n.length,e+=4*n.length}}getRenderPass(t,e,i){const r={colorAttachments:[{clearValue:[0,0,0,1],storeOp:"store",loadOp:"clear",view:e.getCurrentTexture().createView()}]};if(this.pipeline.depth){if(!i)throw new Error("Depth texture is needed.");const t={view:i.createView(),depthStoreOp:"store",depthClearValue:1,depthLoadOp:"clear"};r.depthStencilAttachment=t}return t.beginRenderPass(r)}draw(t,e,i){if(!this.mesh&&!i)throw new Error("unknown number of vertices.");this.writeUniforms();const r=this.device.createCommandEncoder(),n=this.getRenderPass(r,t,e);n.setPipeline(this.pipeline.renderPipeline),this.mesh&&this.mesh.setBuffers(n),this.setBindGroups(n),this.mesh&&this.mesh instanceof l?n.drawIndexed(this.mesh.numberOfVertex):n.draw(this.mesh.numberOfVertex||i),n.end(),this.device.queue.submit([r.finish()])}}class d{constructor(t,e,i){this.buffer=t,this.information=e,this.max=i}}class m{constructor(){this.groups=new Map}add(t,e,i,r,n){var s;this.groups.get(i)||this.groups.set(i,new v),null===(s=this.groups.get(i))||void 0===s||s.newEntry(t,e,r,n)}getLayouts(){const t=[];for(let e of this.groups.values())t.push(e.layout);return t}}class v{constructor(){this.layoutEntries=new Map,this.entries=new Map}newEntry(t,e,i,r){this.layoutEntries.set(e,{binding:e,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{}}),this.entries.set(e,{binding:e,resource:{buffer:r,offset:0,size:i}}),this.layout=t.createBindGroupLayout({entries:this.layoutEntries.values()}),this.group=t.createBindGroup({layout:this.layout,entries:this.entries.values()})}}var g=function(t,e,i,r){return new(i||(i=Promise))((function(n,s){function o(t){try{h(r.next(t))}catch(t){s(t)}}function a(t){try{h(r.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((r=r.apply(t,e||[])).next())}))};class w{init(){return g(this,void 0,void 0,(function*(){yield this.initGPU(),this.depthTexture=this.device.createTexture({format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,size:[this.canvas.width,this.canvas.height,1]})}))}checkWebGPU(){return navigator.gpu?"webGPU suportado":"webGPU não suportado"}initGPU(){var t;return g(this,void 0,void 0,(function*(){const e=this.checkWebGPU();if("webGPU não suportado"===e)throw console.log(e),"Seu navegador atual não suporta webGPU!";this.canvas=document.querySelector("#canvas-webgpu");const i=window.devicePixelRatio||1;this.canvas.width=1024*i,this.canvas.height=768*i;const r=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter({powerPreference:"high-performance"});this.device=yield null==r?void 0:r.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.context.configure({device:this.device,format:"bgra8unorm",alphaMode:"premultiplied"})}))}static build(){return g(this,void 0,void 0,(function*(){const t=new w;return yield t.init(),t}))}}w.build().then((t=>{const e=new o(1,[0,0,0]),i=new l(t.device,e.indexes);i.appendBuffer(e.vertices),i.appendBuffer(l.calculateNormals(e.indexes,e.vertices,6)),i.scale=[2,2,2];const r="\n        struct Light{\n            amb_c: vec4<f32>,\n            dif_c: vec4<f32>,\n            esp_c: vec4<f32>,\n            pos: vec4<f32>,\n            amb_k: f32,\n            dif_k: f32,\n            esp_k: f32,\n            esp_p: f32,\n        }\n\n        struct MVP{\n            model: mat4x4<f32>,\n            view: mat4x4<f32>,\n            proj: mat4x4<f32>,\n        }\n\n        @group(0) @binding(0)\n            var<uniform> matrices: MVP;\n\n            \n        @group(0) @binding(1) \n            var<uniform> light: Light;\n\n        struct Input{\n            @location(0) position: vec4<f32>,\n            @location(1) vColor: vec4<f32>,\n            @location(2) normal: vec4<f32>\n        }\n\n        struct Output{\n            @builtin(position) position: vec4<f32>,\n            @location(0) vColor: vec4<f32>,\n        }\n\n        @vertex\n        fn main(in: Input) -> Output {\n            var out: Output;\n\n            var lightPos = light.pos.xyz;\n            var pos = -(matrices.view * matrices.model * in.position).xyz;\n\n            var vNormal = normalize(matrices.view * matrices.model * in.normal).xyz;\n            var vDistance = normalize(pos - lightPos);\n\n            var normalPos = normalize(pos);\n\n            var halfVector= normalize(vDistance + normalPos);\n\n            var amb = light.amb_c * light.amb_k;\n\n            var diff = max(dot(vNormal, vDistance), 0.0) * light.dif_c * light.dif_k;\n\n            var spec = max(pow(dot(vNormal, halfVector), light.esp_p), 0.0)  * light.esp_c * light.esp_k;\n            \n            out.vColor = 0.7 * in.vColor + 0.3*(amb + diff + spec);\n            //out.vColor = in.vColor;\n            out.position = matrices.proj * matrices.view * matrices.model * in.position;\n\n            return out;\n        }\n    ",s="  \n        @fragment\n        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n            return vColor;\n        }\n    ",a=new f(t.device,r,s,"triangle-list");a.enableDepthTest(),a.addVertexBuffer({location:0},{location:1}),a.addVertexBuffer({location:2,format:"float32x4"});const h=new n([2,2,-1,1]),u=new c(t.canvas);u.camPosition=[0,0,4];const d=new p(t.device,a,i);d.appendUniformBuffer(0,0,new Float32Array(i.modelMatrix),new Float32Array(u.viewMatrix),new Float32Array(u.projMatrix)),h.createUniformBuffer(d,0,1),d.draw(t.context,t.depthTexture),document.addEventListener("keypress",(e=>{"p"!==e.key&&"o"!==e.key||("p"==e.key?u.projectionType="perspective":u.projectionType="orthogonal",d.appendUniformBuffer(0,0,new Float32Array(i.modelMatrix),new Float32Array(u.viewMatrix),new Float32Array(u.projMatrix)),d.draw(t.context,t.depthTexture))}));let m=0;const v=()=>{h.newPos(m),h.createUniformBuffer(d,0,1),d.draw(t.context,t.depthTexture),m+=.01,requestAnimationFrame(v)};requestAnimationFrame(v)}))})();
//# sourceMappingURL=main.bundle.js.map