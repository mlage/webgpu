(()=>{"use strict";var e=1e-6,t="undefined"!=typeof Float32Array?Float32Array:Array;function i(){var e=new t(16);return t!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function r(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function n(e,t,i){var r=t[0],n=t[1],s=t[2],o=t[3],a=t[4],h=t[5],u=t[6],c=t[7],d=t[8],p=t[9],f=t[10],l=t[11],g=t[12],m=t[13],v=t[14],x=t[15],y=i[0],w=i[1],b=i[2],P=i[3];return e[0]=y*r+w*a+b*d+P*g,e[1]=y*n+w*h+b*p+P*m,e[2]=y*s+w*u+b*f+P*v,e[3]=y*o+w*c+b*l+P*x,y=i[4],w=i[5],b=i[6],P=i[7],e[4]=y*r+w*a+b*d+P*g,e[5]=y*n+w*h+b*p+P*m,e[6]=y*s+w*u+b*f+P*v,e[7]=y*o+w*c+b*l+P*x,y=i[8],w=i[9],b=i[10],P=i[11],e[8]=y*r+w*a+b*d+P*g,e[9]=y*n+w*h+b*p+P*m,e[10]=y*s+w*u+b*f+P*v,e[11]=y*o+w*c+b*l+P*x,y=i[12],w=i[13],b=i[14],P=i[15],e[12]=y*r+w*a+b*d+P*g,e[13]=y*n+w*h+b*p+P*m,e[14]=y*s+w*u+b*f+P*v,e[15]=y*o+w*c+b*l+P*x,e}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var e=0,t=arguments.length;t--;)e+=arguments[t]*arguments[t];return Math.sqrt(e)});var s;class o{constructor(e){this.viewMatrix=i(),this.projMatrix=i(),this.viewProjMatrix=i(),this.camPosition=[0,0,1],this.lookDirection=[0,0,0],this.upDirection=[0,1,0],this.left=-4,this.right=4,this.bottom=-4,this.top=4,this.near=.1,this.far=8,this.fovy=Math.PI/2,this.typeOfProjection="perspective",this.aspect=e.width/e.height}set projectionType(e){if("orthogonal"!==e&&"perspective"!==e)throw new Error("Invalid type of projection.");this.typeOfProjection=e}updateViewMatrix(){r(this.viewMatrix),function(t,i,n,s){var o,a,h,u,c,d,p,f,l,g,m=i[0],v=i[1],x=i[2],y=s[0],w=s[1],b=s[2],P=n[0],M=n[1],U=n[2];Math.abs(m-P)<e&&Math.abs(v-M)<e&&Math.abs(x-U)<e?r(t):(p=m-P,f=v-M,l=x-U,o=w*(l*=g=1/Math.hypot(p,f,l))-b*(f*=g),a=b*(p*=g)-y*l,h=y*f-w*p,(g=Math.hypot(o,a,h))?(o*=g=1/g,a*=g,h*=g):(o=0,a=0,h=0),u=f*h-l*a,c=l*o-p*h,d=p*a-f*o,(g=Math.hypot(u,c,d))?(u*=g=1/g,c*=g,d*=g):(u=0,c=0,d=0),t[0]=o,t[1]=u,t[2]=p,t[3]=0,t[4]=a,t[5]=c,t[6]=f,t[7]=0,t[8]=h,t[9]=d,t[10]=l,t[11]=0,t[12]=-(o*m+a*v+h*x),t[13]=-(u*m+c*v+d*x),t[14]=-(p*m+f*v+l*x),t[15]=1)}(this.viewMatrix,this.camPosition,this.lookDirection,this.upDirection)}updateProjMatrix(){r(this.projMatrix),"perspective"==this.typeOfProjection?function(e,t,i,r,n){var s,o=1/Math.tan(t/2);e[0]=o/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=o,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,null!=n&&n!==1/0?(s=1/(r-n),e[10]=(n+r)*s,e[14]=2*n*r*s):(e[10]=-1,e[14]=-2*r)}(this.projMatrix,this.fovy,this.aspect,this.near,this.far):function(e,t,i,r,n,s,o){var a=1/(t-i),h=1/(r-n),u=1/(s-o);e[0]=-2*a,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=-2*h,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=2*u,e[11]=0,e[12]=(t+i)*a,e[13]=(n+r)*h,e[14]=(o+s)*u,e[15]=1}(this.projMatrix,1024*this.left/768,1024*this.right/768,this.bottom,this.top,this.near,this.far)}getViewProjection(){return this.updateViewMatrix(),this.updateProjMatrix(),r(this.viewProjMatrix),n(this.viewProjMatrix,this.projMatrix,this.viewMatrix),this.viewProjMatrix}}function a(e,i,r){var n=new t(3);return n[0]=e,n[1]=i,n[2]=r,n}s=new t(3),t!=Float32Array&&(s[0]=0,s[1]=0,s[2]=0);class h{constructor(e,t,i,r){let n;this.buffers=[],this.changed=!0,this._depth=!1,"line-strip"!==r&&"triangle-strip"!==r||(n="uint32"),this.pipelineDescriptor={vertex:{module:e.createShaderModule({code:t}),entryPoint:"main",buffers:this.buffers},fragment:{module:e.createShaderModule({code:i}),entryPoint:"main",targets:[{format:"bgra8unorm"}]},primitive:{topology:r,stripIndexFormat:n},layout:"auto"},this.device=e}get depth(){return this._depth}enableDepthTest(){this.pipelineDescriptor.depthStencil={format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},this._depth=!0,this.changed=!0}setLayout(e){this.changed=!0,this.pipelineDescriptor.layout=e}addVertexBuffer(...e){this.changed=!0;const t={},i=[];let r=0;for(const t of e)i.push({shaderLocation:t.location,format:t.format||"float32x3",offset:r}),r+=this.stride(t.format||"float32x3");t.arrayStride=r,t.attributes=i,this.buffers.push(t)}stride(e){return e.includes("x")?Number(e.slice(-4,-2))*Number(e[e.length-1])/8:Number(e.slice(-2))/8}get renderPipeline(){return this.changed&&(this.render_pipeline=this.device.createRenderPipeline(this.pipelineDescriptor),this.changed=!1),this.render_pipeline}}h.createGPUBuffer=(e,t,i=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const r=e.createBuffer({size:t.byteLength,usage:i,mappedAtCreation:!0});return new Float32Array(r.getMappedRange()).set(t),r.unmap(),r},h.createGPUBufferUint=(e,t,i=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const r=e.createBuffer({size:t.byteLength,usage:i,mappedAtCreation:!0});return new Uint32Array(r.getMappedRange()).set(t),r.unmap(),r};class u{constructor(e,t=3){this.arrays=[],this.buffers=[],this.pos=a(0,0,0),this.scale=a(1,1,1),this.rotationAngles=a(0,0,0),this.model_matrix=i(),this.stride=t,this.device=e}get modelMatrix(){return this.createTransforms(),this.model_matrix}get numberOfVertex(){return this.arrays[0].length/this.stride}appendBuffer(e){this.arrays.push(e),this.buffers.push(h.createGPUBuffer(this.device,e))}createTransforms(){r(this.model_matrix);const e=i(),t=i(),s=i(),o=i(),a=i();!function(e,t){e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=t[0],e[13]=t[1],e[14]=t[2],e[15]=1}(o,this.pos),function(e,t){var i=Math.sin(t),r=Math.cos(t);e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=r,e[6]=i,e[7]=0,e[8]=0,e[9]=-i,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(e,this.rotationAngles[0]),function(e,t){var i=Math.sin(t),r=Math.cos(t);e[0]=r,e[1]=0,e[2]=-i,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=i,e[9]=0,e[10]=r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(t,this.rotationAngles[1]),function(e,t){var i=Math.sin(t),r=Math.cos(t);e[0]=r,e[1]=i,e[2]=0,e[3]=0,e[4]=-i,e[5]=r,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(s,this.rotationAngles[2]),function(e,t){e[0]=t[0],e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t[1],e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t[2],e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1}(a,this.scale),n(this.model_matrix,e,a),n(this.model_matrix,t,this.model_matrix),n(this.model_matrix,s,this.model_matrix),n(this.model_matrix,o,this.model_matrix)}setBuffers(e){for(let t=0;t<this.buffers.length;t++)e.setVertexBuffer(t,this.buffers[t])}}class c extends u{constructor(e,t,i=3){super(e,i),this.indexes=t,this.indexBuffer=h.createGPUBufferUint(e,t)}get numberOfVertex(){return this.indexes.length}setBuffers(e){super.setBuffers(e),e.setIndexBuffer(this.indexBuffer,"uint32")}static calculateNormals(e,t,i=3,r=0){const n=new Array(t.length/i*4).fill(0);for(let h=0;h<e.length;h+=3){const u=e[h],c=e[h+1],d=e[h+2],p=a(t[u*i+r],t[u*i+r+1],t[u*i+r+2]),f=a(t[c*i+r],t[c*i+r+1],t[c*i+r+2]),l=a(t[d*i+r],t[d*i+r+1],t[d*i+r+2]),g=(s=a(f[0]-p[0],f[1]-p[1],f[2]-p[2]),o=a(l[0]-p[0],l[1]-p[1],l[2]-p[2]),a(s[1]*o[2]-s[2]*o[1],s[2]*o[0]-s[0]*o[2],s[0]*o[1]-s[1]*o[0]));n[4*u]+=g[0],n[4*u+1]+=g[1],n[4*u+2]+=g[2],n[4*c]+=g[0],n[4*c+1]+=g[1],n[4*c+2]+=g[2],n[4*d]+=g[0],n[4*d+1]+=g[1],n[4*d+2]+=g[2]}var s,o;return new Float32Array(n)}}class d{constructor(e,t,i){this.uniforms=[],this.bindGroups=new f,this.pipeline=t,i&&(this.mesh=i),this.device=e}appendUniformBuffer(e,t,...i){if(0===i.length)throw new Error("The data can't be undefined.");let r=0;const n=function(e){let t=0;for(let i of e)i.length>t&&(t=i.length);return t}(i);let s=1,o=0;for(const e of i)o+e.length>n&&(s++,o=0),o+=e.length;r=s*n*4;const a=this.device.createBuffer({size:r,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),h={buffer:a,offset:0,size:r};this.bindGroups.add(this.device,e,t,h),this.uniforms.push(new p(a,i,n)),this.pipeline.setLayout(this.device.createPipelineLayout({bindGroupLayouts:this.bindGroups.getLayouts()}))}setTexture(e,t="repeat",i="repeat"){return r=this,n=void 0,o=function*(){const r=document.createElement("img");r.src=e,r.setAttribute("crossOrigin",""),yield r.decode();const n=yield createImageBitmap(r),s=this.device.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:t,addressModeV:i}),o=this.device.createTexture({size:[n.width,n.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:n},{texture:o},[n.width,n.height]),this.bindGroups.add(this.device,0,1,o.createView()),this.bindGroups.add(this.device,1,1,s),this.pipeline.setLayout(this.device.createPipelineLayout({bindGroupLayouts:this.bindGroups.getLayouts()}))},new((s=void 0)||(s=Promise))((function(e,t){function i(e){try{h(o.next(e))}catch(e){t(e)}}function a(e){try{h(o.throw(e))}catch(e){t(e)}}function h(t){var r;t.done?e(t.value):(r=t.value,r instanceof s?r:new s((function(e){e(r)}))).then(i,a)}h((o=o.apply(r,n||[])).next())}));var r,n,s,o}setBindGroups(e){for(const t of this.bindGroups.groups.entries())e.setBindGroup(Number(t[0]),t[1].group)}writeUniforms(){for(const e of this.uniforms){let t=0,i=0,r=0;for(const n of e.information)i+n.length>e.max&&(r++,i=0,t=r*e.max*4),this.device.queue.writeBuffer(e.buffer,t,n),i+=n.length,t+=4*n.length}}getRenderPass(e,t,i){const r={colorAttachments:[{clearValue:[0,0,0,1],storeOp:"store",loadOp:"clear",view:t.getCurrentTexture().createView()}]};if(this.pipeline.depth){if(!i)throw new Error("Depth texture is needed.");const e={view:i.createView(),depthStoreOp:"store",depthClearValue:1,depthLoadOp:"clear"};r.depthStencilAttachment=e}return e.beginRenderPass(r)}draw(e,t,i){if(!this.mesh&&!i)throw new Error("unknown number of vertices.");this.writeUniforms();const r=this.device.createCommandEncoder(),n=this.getRenderPass(r,e,t);n.setPipeline(this.pipeline.renderPipeline),this.mesh&&this.mesh.setBuffers(n),this.setBindGroups(n),this.mesh&&this.mesh instanceof c?n.drawIndexed(this.mesh.numberOfVertex):n.draw(this.mesh.numberOfVertex||i),n.end(),this.device.queue.submit([r.finish()])}}class p{constructor(e,t,i){this.buffer=e,this.information=t,this.max=i}}class f{constructor(){this.groups=new Map}add(e,t,i,r){var n;this.groups.get(i)||this.groups.set(i,new l),null===(n=this.groups.get(i))||void 0===n||n.newEntry(e,t,r)}getLayouts(){const e=[];for(let t of this.groups.values())e.push(t.layout);return e}}class l{constructor(){this.layoutEntries=new Map,this.entries=new Map}newEntry(e,t,i){const r=l.getLayoutEntry(i);r.binding=t,this.layoutEntries.set(t,r),this.entries.set(t,{binding:t,resource:i}),this.layout=e.createBindGroupLayout({entries:this.layoutEntries.values()}),this.group=e.createBindGroup({layout:this.layout,entries:this.entries.values()})}static getLayoutEntry(e){return e instanceof GPUTextureView?{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{}}:e instanceof GPUSampler?{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,sampler:{}}:{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{}}}}var g=function(e,t,i,r){return new(i||(i=Promise))((function(n,s){function o(e){try{h(r.next(e))}catch(e){s(e)}}function a(e){try{h(r.throw(e))}catch(e){s(e)}}function h(e){var t;e.done?n(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,a)}h((r=r.apply(e,t||[])).next())}))};class m{init(){return g(this,void 0,void 0,(function*(){yield this.initGPU(),this.depthTexture=this.device.createTexture({format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,size:[this.canvas.width,this.canvas.height,1]})}))}checkWebGPU(){return navigator.gpu?"webGPU suportado":"webGPU não suportado"}initGPU(){var e;return g(this,void 0,void 0,(function*(){const t=this.checkWebGPU();if("webGPU não suportado"===t)throw console.log(t),"Seu navegador atual não suporta webGPU!";this.canvas=document.querySelector("#canvas-webgpu");const i=window.devicePixelRatio||1;this.canvas.width=1024*i,this.canvas.height=768*i;const r=yield null===(e=navigator.gpu)||void 0===e?void 0:e.requestAdapter({powerPreference:"high-performance"});this.device=yield null==r?void 0:r.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.context.configure({device:this.device,format:"bgra8unorm",alphaMode:"premultiplied"})}))}static build(){return g(this,void 0,void 0,(function*(){const e=new m;return yield e.init(),e}))}}m.build().then((e=>g(void 0,void 0,void 0,(function*(){const t={positions:new Float32Array([-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1]),tex:new Float32Array([0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0])},r=new u(e.device,3);r.appendBuffer(t.positions),r.appendBuffer(t.tex);const s="\n        @group(0) @binding(0)\n            var<uniform> mvpMatrix: mat4x4<f32>;\n\n        struct Input{\n            @location(0) position: vec4<f32>,\n            @location(1) texCoord: vec2<f32>,\n\n        }\n\n        struct Output{\n            @builtin(position) position: vec4<f32>,\n            @location(0) texCoord: vec2<f32>,\n        }\n\n        @vertex\n        fn main(in: Input) -> Output {\n            var out: Output;\n            //var uniforms: Uniforms;\n\n            out.position = mvpMatrix * in.position;\n            out.texCoord = in.texCoord;\n\n            return out;\n        }\n    ",a="\n        \n        @binding(0) @group(1) var texture: texture_2d<f32>;\n        @binding(1) @group(1) var textureSampler: sampler;\n\n        @fragment\n        fn main(@location(0) texCoord: vec2<f32>) -> @location(0) vec4<f32> {\n            return textureSample(texture, textureSampler, texCoord);\n        }\n    ",c=new h(e.device,s,a,"triangle-list");c.enableDepthTest(),c.addVertexBuffer({location:0}),c.addVertexBuffer({location:1,format:"float32x2"});const p=new o(e.canvas);p.projectionType="orthogonal",p.camPosition=[2,2,-6];const f=new d(e.device,c,r),l=i();n(l,p.getViewProjection(),r.modelMatrix),f.appendUniformBuffer(0,0,new Float32Array(l)),yield f.setTexture("./assets/brick_1.png"),f.draw(e.context,e.depthTexture),document.addEventListener("keypress",(t=>{"p"==t.key?(p.projectionType="perspective",n(l,p.getViewProjection(),r.modelMatrix),f.appendUniformBuffer(0,0,new Float32Array(l)),f.draw(e.context,e.depthTexture)):"o"==t.key&&(p.projectionType="orthogonal",n(l,p.getViewProjection(),r.modelMatrix),f.appendUniformBuffer(0,0,new Float32Array(l)),f.draw(e.context,e.depthTexture))}))}))))})();
//# sourceMappingURL=main.bundle.js.map