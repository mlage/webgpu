(()=>{"use strict";var t=1e-6,e="undefined"!=typeof Float32Array?Float32Array:Array;function i(){var t=new e(16);return e!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function r(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function n(t,e,i){var r=e[0],n=e[1],s=e[2],o=e[3],a=e[4],h=e[5],u=e[6],c=e[7],f=e[8],p=e[9],d=e[10],l=e[11],v=e[12],m=e[13],g=e[14],w=e[15],x=i[0],P=i[1],M=i[2],y=i[3];return t[0]=x*r+P*a+M*f+y*v,t[1]=x*n+P*h+M*p+y*m,t[2]=x*s+P*u+M*d+y*g,t[3]=x*o+P*c+M*l+y*w,x=i[4],P=i[5],M=i[6],y=i[7],t[4]=x*r+P*a+M*f+y*v,t[5]=x*n+P*h+M*p+y*m,t[6]=x*s+P*u+M*d+y*g,t[7]=x*o+P*c+M*l+y*w,x=i[8],P=i[9],M=i[10],y=i[11],t[8]=x*r+P*a+M*f+y*v,t[9]=x*n+P*h+M*p+y*m,t[10]=x*s+P*u+M*d+y*g,t[11]=x*o+P*c+M*l+y*w,x=i[12],P=i[13],M=i[14],y=i[15],t[12]=x*r+P*a+M*f+y*v,t[13]=x*n+P*h+M*p+y*m,t[14]=x*s+P*u+M*d+y*g,t[15]=x*o+P*c+M*l+y*w,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var s;class o{constructor(t){this.viewMatrix=i(),this.projMatrix=i(),this.viewProjMatrix=i(),this.camPosition=[0,0,1],this.lookDirection=[0,0,0],this.upDirection=[0,1,0],this.left=-4,this.right=4,this.bottom=-4,this.top=4,this.near=.1,this.far=8,this.fovy=Math.PI/2,this.typeOfProjection="perspective",this.aspect=t.width/t.height}set projectionType(t){if("orthogonal"!==t&&"perspective"!==t)throw new Error("Invalid type of projection.");this.typeOfProjection=t}updateViewMatrix(){r(this.viewMatrix),function(e,i,n,s){var o,a,h,u,c,f,p,d,l,v,m=i[0],g=i[1],w=i[2],x=s[0],P=s[1],M=s[2],y=n[0],b=n[1],U=n[2];Math.abs(m-y)<t&&Math.abs(g-b)<t&&Math.abs(w-U)<t?r(e):(p=m-y,d=g-b,l=w-U,o=P*(l*=v=1/Math.hypot(p,d,l))-M*(d*=v),a=M*(p*=v)-x*l,h=x*d-P*p,(v=Math.hypot(o,a,h))?(o*=v=1/v,a*=v,h*=v):(o=0,a=0,h=0),u=d*h-l*a,c=l*o-p*h,f=p*a-d*o,(v=Math.hypot(u,c,f))?(u*=v=1/v,c*=v,f*=v):(u=0,c=0,f=0),e[0]=o,e[1]=u,e[2]=p,e[3]=0,e[4]=a,e[5]=c,e[6]=d,e[7]=0,e[8]=h,e[9]=f,e[10]=l,e[11]=0,e[12]=-(o*m+a*g+h*w),e[13]=-(u*m+c*g+f*w),e[14]=-(p*m+d*g+l*w),e[15]=1)}(this.viewMatrix,this.camPosition,this.lookDirection,this.upDirection)}updateProjMatrix(){r(this.projMatrix),"perspective"==this.typeOfProjection?function(t,e,i,r,n){var s,o=1/Math.tan(e/2);t[0]=o/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=n&&n!==1/0?(s=1/(r-n),t[10]=(n+r)*s,t[14]=2*n*r*s):(t[10]=-1,t[14]=-2*r)}(this.projMatrix,this.fovy,this.aspect,this.near,this.far):function(t,e,i,r,n,s,o){var a=1/(e-i),h=1/(r-n),u=1/(s-o);t[0]=-2*a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*u,t[11]=0,t[12]=(e+i)*a,t[13]=(n+r)*h,t[14]=(o+s)*u,t[15]=1}(this.projMatrix,1024*this.left/768,1024*this.right/768,this.bottom,this.top,this.near,this.far)}getViewProjection(){return this.updateViewMatrix(),this.updateProjMatrix(),r(this.viewProjMatrix),n(this.viewProjMatrix,this.projMatrix,this.viewMatrix),this.viewProjMatrix}}function a(t,i,r){var n=new e(3);return n[0]=t,n[1]=i,n[2]=r,n}s=new e(3),e!=Float32Array&&(s[0]=0,s[1]=0,s[2]=0);class h{constructor(t,e,i,r){let n;this.buffers=[],this.changed=!0,this._depth=!1,"line-strip"===r&&(n="uint32"),this.pipelineDescriptor={vertex:{module:t.createShaderModule({code:e}),entryPoint:"main",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:t.createShaderModule({code:i}),entryPoint:"main",targets:[{format:"bgra8unorm"}]},primitive:{topology:r,stripIndexFormat:n},layout:"auto"};"point-list"!==r&&"line-list"!==r&&"line-strip"!==r&&(this.pipelineDescriptor.depthStencil={format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},this._depth=!0),this.device=t}get depth(){return this._depth}addVertexBuffer(...t){this.changed=!0;for(const e of t)e.format}get renderPipeline(){return this.changed&&(this.render_pipeline=this.device.createRenderPipeline(this.pipelineDescriptor),this.changed=!1),this.render_pipeline}}h.createGPUBuffer=(t,e,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const r=t.createBuffer({size:e.byteLength,usage:i,mappedAtCreation:!0});return new Float32Array(r.getMappedRange()).set(e),r.unmap(),r},h.createGPUBufferUint=(t,e,i=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=t.createBuffer({size:e.byteLength,usage:i,mappedAtCreation:!0});return new Uint32Array(r.getMappedRange()).set(e),r.unmap(),r};class u{constructor(t,e=3,r,n,s,o){if(this.pos=a(0,0,0),this.scale=a(1,1,1),this.rotationAngles=a(0,0,0),this.vertex=r,this.vertexBuffer=h.createGPUBuffer(t,this.vertex),this.vertexPos=n,s){if(!o)throw new Error("Color buffer position not provided.");this.colors=s,this.colorBuffer=h.createGPUBuffer(t,this.colors),this.colorPos=o}this.model_matrix=i(),this.n_vertex=r.length/e}get modelMatrix(){return this.createTransforms(),this.model_matrix}get numberOfVertex(){return this.n_vertex}createTransforms(){r(this.model_matrix);const t=i(),e=i(),s=i(),o=i(),a=i();!function(t,e){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1}(o,this.pos),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=i,t[7]=0,t[8]=0,t[9]=-i,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t,this.rotationAngles[0]),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=r,t[1]=0,t[2]=-i,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=i,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(e,this.rotationAngles[1]),function(t,e){var i=Math.sin(e),r=Math.cos(e);t[0]=r,t[1]=i,t[2]=0,t[3]=0,t[4]=-i,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(s,this.rotationAngles[2]),function(t,e){t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(a,this.scale),n(this.model_matrix,t,a),n(this.model_matrix,e,this.model_matrix),n(this.model_matrix,s,this.model_matrix),n(this.model_matrix,o,this.model_matrix)}setBuffers(t){t.setVertexBuffer(this.vertexPos,this.vertexBuffer),this.colorBuffer&&t.setVertexBuffer(this.colorPos,this.colorBuffer)}}class c{constructor(t,e,i){this.bindGroups=new Map,this.entries=new Map,this.uniforms=[],this.using_mvp=!1,this.pipeline=e,i&&(this.mesh=i),this.device=t}useMVPMatrix(t,e){var i;this.using_mvp=!0,this.mvpUniformBuffer=this.device.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});const r={binding:t,resource:{buffer:this.mvpUniformBuffer,offset:0,size:64}};this.entries.get(e)||this.entries.set(e,new Map),this.entries.get(e).set(t,r);const n=this.device.createBindGroup({layout:this.pipeline.renderPipeline.getBindGroupLayout(e),entries:null===(i=this.entries.get(e))||void 0===i?void 0:i.values()});this.bindGroups.set(e,n),console.log(this.bindGroups)}appendUniformBuffer(t,e,...i){var r;if(i.length=0)throw new Error("The data can't be undefined.");let n=0;for(const t of i)n+=t.length;n*=4;const s={binding:t,resource:{buffer:this.device.createBuffer({size:n,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),offset:0,size:n}};this.entries.get(e)||this.entries.set(e,new Map),this.entries.get(e).set(t,s);const o=this.device.createBindGroup({layout:this.pipeline.renderPipeline.getBindGroupLayout(e),entries:null===(r=this.entries.get(e))||void 0===r?void 0:r.values()});this.bindGroups.set(e,o)}setBindGroups(t){for(const e of this.bindGroups.keys())t.setBindGroup(Number(e),this.bindGroups.get(e))}writeUniforms(){for(const t of this.uniforms){let e=0;for(const i of t.information)this.device.queue.writeBuffer(t.buffer,e,i),e+=4*i.length}}getRenderPass(t,e,i){const r={colorAttachments:[{clearValue:[0,0,0,1],storeOp:"store",loadOp:"clear",view:e.getCurrentTexture().createView()}]};if(this.pipeline.depth){if(!i)throw new Error("Depth texture is needed.");const t={view:i.createView(),depthStoreOp:"store",depthClearValue:1,depthLoadOp:"clear"};r.depthStencilAttachment=t}return t.beginRenderPass(r)}draw(t,e,r,s){if(!this.mesh&&!s)throw new Error("unknown number of vertices.");if(this.using_mvp){const e=t.getViewProjection(),r=this.mesh?this.mesh.modelMatrix:i(),s=i();n(s,e,r),this.device.queue.writeBuffer(this.mvpUniformBuffer,0,s)}this.writeUniforms();const o=this.device.createCommandEncoder(),a=this.getRenderPass(o,e,r);a.setPipeline(this.pipeline.renderPipeline),this.mesh&&this.mesh.setBuffers(a),this.setBindGroups(a),a.draw(this.mesh.numberOfVertex||s),a.end(),this.device.queue.submit([o.finish()])}}var f=function(t,e,i,r){return new(i||(i=Promise))((function(n,s){function o(t){try{h(r.next(t))}catch(t){s(t)}}function a(t){try{h(r.throw(t))}catch(t){s(t)}}function h(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}h((r=r.apply(t,e||[])).next())}))};class p{constructor(){this.isAnimation=!0}init(){return f(this,void 0,void 0,(function*(){yield this.initGPU(),this.depthTexture=this.device.createTexture({format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,size:[this.canvas.width,this.canvas.height,1]})}))}checkWebGPU(){return navigator.gpu?"webGPU suportado":"webGPU não suportado"}initGPU(){var t;return f(this,void 0,void 0,(function*(){const e=this.checkWebGPU();if("webGPU não suportado"===e)throw console.log(e),"Seu navegador atual não suporta webGPU!";this.canvas=document.querySelector("#canvas-webgpu");const i=window.devicePixelRatio||1;this.canvas.width=1024*i,this.canvas.height=768*i;const r=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter();this.device=yield null==r?void 0:r.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.context.configure({device:this.device,format:"bgra8unorm",alphaMode:"premultiplied"})}))}static build(){return f(this,void 0,void 0,(function*(){const t=new p;return yield t.init(),t}))}}p.build().then((t=>{const e={positions:new Float32Array([-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1]),colors:new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1])},i=new u(t.device,3,new Float32Array(e.positions),0,new Float32Array(e.colors),1),r="\n        @group(0) @binding(0)\n            var<uniform> mvpMatrix: mat4x4<f32>;\n\n        struct Input{\n            @location(0) position: vec4<f32>,\n            @location(1) vColor: vec4<f32>,\n        }\n\n        struct Output{\n            @builtin(position) position: vec4<f32>,\n            @location(0) vColor: vec4<f32>,\n        }\n\n        @vertex\n        fn main(in: Input) -> Output {\n            var out: Output;\n            //var uniforms: Uniforms;\n\n            out.position = mvpMatrix * in.position;\n            out.vColor = in.vColor;\n\n            return out;\n        }\n    ",n="  \n        @fragment\n        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n            return vColor;\n        }\n    ",s=new h(t.device,r,n,"triangle-list"),a=new o(t.canvas);a.projectionType="orthogonal",a.camPosition=[2,2,-6];const f=new c(t.device,s,i);f.useMVPMatrix(0,0),f.draw(a,t.context,t.depthTexture),document.addEventListener("keypress",(e=>{"p"==e.key?(a.projectionType="perspective",f.draw(a,t.context,t.depthTexture)):"o"==e.key&&(a.projectionType="orthogonal",f.draw(a,t.context,t.depthTexture))}))}))})();
//# sourceMappingURL=main.bundle.js.map