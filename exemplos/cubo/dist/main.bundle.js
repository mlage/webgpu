(()=>{"use strict";var t=1e-6,e="undefined"!=typeof Float32Array?Float32Array:Array;function r(){var t=new e(16);return e!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function i(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function n(t,e){if(t===e){var r=e[1],i=e[2],n=e[3],o=e[6],s=e[7],a=e[11];t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=r,t[6]=e[9],t[7]=e[13],t[8]=i,t[9]=o,t[11]=e[14],t[12]=n,t[13]=s,t[14]=a}else t[0]=e[0],t[1]=e[4],t[2]=e[8],t[3]=e[12],t[4]=e[1],t[5]=e[5],t[6]=e[9],t[7]=e[13],t[8]=e[2],t[9]=e[6],t[10]=e[10],t[11]=e[14],t[12]=e[3],t[13]=e[7],t[14]=e[11],t[15]=e[15];return t}function o(t,e){var r=e[0],i=e[1],n=e[2],o=e[3],s=e[4],a=e[5],u=e[6],h=e[7],c=e[8],l=e[9],f=e[10],d=e[11],p=e[12],m=e[13],v=e[14],g=e[15],x=r*a-i*s,w=r*u-n*s,y=r*h-o*s,b=i*u-n*a,P=i*h-o*a,M=n*h-o*u,A=c*m-l*p,_=c*v-f*p,U=c*g-d*p,B=l*v-f*m,T=l*g-d*m,G=f*g-d*v,E=x*G-w*T+y*B+b*U-P*_+M*A;return E?(E=1/E,t[0]=(a*G-u*T+h*B)*E,t[1]=(n*T-i*G-o*B)*E,t[2]=(m*M-v*P+g*b)*E,t[3]=(f*P-l*M-d*b)*E,t[4]=(u*U-s*G-h*_)*E,t[5]=(r*G-n*U+o*_)*E,t[6]=(v*y-p*M-g*w)*E,t[7]=(c*M-f*y+d*w)*E,t[8]=(s*T-a*U+h*A)*E,t[9]=(i*U-r*T-o*A)*E,t[10]=(p*P-m*y+g*x)*E,t[11]=(l*y-c*P-d*x)*E,t[12]=(a*_-s*B-u*A)*E,t[13]=(r*B-i*_+n*A)*E,t[14]=(m*w-p*b-v*x)*E,t[15]=(c*b-l*w+f*x)*E,t):null}function s(t,e,r){var i=e[0],n=e[1],o=e[2],s=e[3],a=e[4],u=e[5],h=e[6],c=e[7],l=e[8],f=e[9],d=e[10],p=e[11],m=e[12],v=e[13],g=e[14],x=e[15],w=r[0],y=r[1],b=r[2],P=r[3];return t[0]=w*i+y*a+b*l+P*m,t[1]=w*n+y*u+b*f+P*v,t[2]=w*o+y*h+b*d+P*g,t[3]=w*s+y*c+b*p+P*x,w=r[4],y=r[5],b=r[6],P=r[7],t[4]=w*i+y*a+b*l+P*m,t[5]=w*n+y*u+b*f+P*v,t[6]=w*o+y*h+b*d+P*g,t[7]=w*s+y*c+b*p+P*x,w=r[8],y=r[9],b=r[10],P=r[11],t[8]=w*i+y*a+b*l+P*m,t[9]=w*n+y*u+b*f+P*v,t[10]=w*o+y*h+b*d+P*g,t[11]=w*s+y*c+b*p+P*x,w=r[12],y=r[13],b=r[14],P=r[15],t[12]=w*i+y*a+b*l+P*m,t[13]=w*n+y*u+b*f+P*v,t[14]=w*o+y*h+b*d+P*g,t[15]=w*s+y*c+b*p+P*x,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});var a;class u{constructor(t){this.view_matrix=r(),this.proj_matrix=r(),this.viewProjMatrix=r(),this.camPosition=[0,0,1],this.lookDirection=[0,0,0],this.upDirection=[0,1,0],this.left=-4,this.right=4,this.bottom=-4,this.top=4,this.near=1,this.far=9,this.fovy=Math.PI/1.7,this.typeOfProjection="perspective",this.aspect=t.width/t.height}set projectionType(t){if("orthogonal"!==t&&"perspective"!==t)throw new Error("Invalid type of projection.");this.typeOfProjection=t}get viewMatrix(){return this.updateViewMatrix(),this.view_matrix}get projMatrix(){return this.updateProjMatrix(),this.proj_matrix}updateViewMatrix(){i(this.view_matrix),function(e,r,n,o){var s,a,u,h,c,l,f,d,p,m,v=r[0],g=r[1],x=r[2],w=o[0],y=o[1],b=o[2],P=n[0],M=n[1],A=n[2];Math.abs(v-P)<t&&Math.abs(g-M)<t&&Math.abs(x-A)<t?i(e):(f=v-P,d=g-M,p=x-A,s=y*(p*=m=1/Math.hypot(f,d,p))-b*(d*=m),a=b*(f*=m)-w*p,u=w*d-y*f,(m=Math.hypot(s,a,u))?(s*=m=1/m,a*=m,u*=m):(s=0,a=0,u=0),h=d*u-p*a,c=p*s-f*u,l=f*a-d*s,(m=Math.hypot(h,c,l))?(h*=m=1/m,c*=m,l*=m):(h=0,c=0,l=0),e[0]=s,e[1]=h,e[2]=f,e[3]=0,e[4]=a,e[5]=c,e[6]=d,e[7]=0,e[8]=u,e[9]=l,e[10]=p,e[11]=0,e[12]=-(s*v+a*g+u*x),e[13]=-(h*v+c*g+l*x),e[14]=-(f*v+d*g+p*x),e[15]=1)}(this.view_matrix,this.camPosition,this.lookDirection,this.upDirection)}updateProjMatrix(){i(this.proj_matrix),"perspective"==this.typeOfProjection?function(t,e,r,i,n){var o,s=1/Math.tan(e/2);t[0]=s/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=n&&n!==1/0?(o=1/(i-n),t[10]=(n+i)*o,t[14]=2*n*i*o):(t[10]=-1,t[14]=-2*i)}(this.proj_matrix,this.fovy,this.aspect,this.near,this.far):function(t,e,r,i,n,o,s){var a=1/(e-r),u=1/(i-n),h=1/(o-s);t[0]=-2*a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+r)*a,t[13]=(n+i)*u,t[14]=(s+o)*h,t[15]=1}(this.proj_matrix,1024*this.left/768,1024*this.right/768,this.bottom,this.top,this.left,this.right)}getViewProjection(){return this.updateViewMatrix(),this.updateProjMatrix(),i(this.viewProjMatrix),s(this.viewProjMatrix,this.proj_matrix,this.view_matrix),this.viewProjMatrix}}function h(t,r,i){var n=new e(3);return n[0]=t,n[1]=r,n[2]=i,n}a=new e(3),e!=Float32Array&&(a[0]=0,a[1]=0,a[2]=0);class c{constructor(t,e,r,i){let n;this.buffers=[],this.changed=!0,this._depth=!1,"line-strip"!==i&&"triangle-strip"!==i||(n="uint32"),this.pipelineDescriptor={vertex:{module:t.createShaderModule({code:e}),entryPoint:"main",buffers:this.buffers},fragment:{module:t.createShaderModule({code:r}),entryPoint:"main",targets:[{format:"bgra8unorm"}]},primitive:{topology:i,stripIndexFormat:n},layout:"auto"},this.device=t}get depth(){return this._depth}enableDepthTest(){this.pipelineDescriptor.depthStencil={format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"},this._depth=!0,this.changed=!0}setLayout(t){this.changed=!0,this.pipelineDescriptor.layout=t}addVertexBuffer(...t){this.changed=!0;const e={},r=[];let i=0;for(const e of t)r.push({shaderLocation:e.location,format:e.format||"float32x3",offset:i}),i+=this.stride(e.format||"float32x3");e.arrayStride=i,e.attributes=r,this.buffers.push(e)}stride(t){return t.includes("x")?Number(t.slice(-4,-2))*Number(t[t.length-1])/8:Number(t.slice(-2))/8}get renderPipeline(){return this.changed&&(this.render_pipeline=this.device.createRenderPipeline(this.pipelineDescriptor),this.changed=!1),this.render_pipeline}}c.createGPUBuffer=(t,e,r=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const i=t.createBuffer({size:e.byteLength,usage:r,mappedAtCreation:!0});return new Float32Array(i.getMappedRange()).set(e),i.unmap(),i},c.createGPUBufferUint=(t,e,r=GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST)=>{const i=t.createBuffer({size:e.byteLength,usage:r,mappedAtCreation:!0});return new Uint32Array(i.getMappedRange()).set(e),i.unmap(),i};class l{constructor(t,e=3){this.arrays=[],this.buffers=[],this.pos=h(0,0,0),this.scale=h(1,1,1),this.rotationAngles=h(0,0,0),this.model_matrix=r(),this.stride=e,this.device=t}get modelMatrix(){return this.createTransforms(),this.model_matrix}get numberOfVertex(){return this.arrays[0].length/this.stride}appendBuffer(t){this.arrays.push(t),this.buffers.push(c.createGPUBuffer(this.device,t))}createTransforms(){i(this.model_matrix);const t=r(),e=r(),n=r(),o=r(),a=r();!function(t,e){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=e[0],t[13]=e[1],t[14]=e[2],t[15]=1}(o,this.pos),function(t,e){var r=Math.sin(e),i=Math.cos(e);t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=i,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(t,this.rotationAngles[0]),function(t,e){var r=Math.sin(e),i=Math.cos(e);t[0]=i,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=i,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(e,this.rotationAngles[1]),function(t,e){var r=Math.sin(e),i=Math.cos(e);t[0]=i,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(n,this.rotationAngles[2]),function(t,e){t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(a,this.scale),s(this.model_matrix,t,a),s(this.model_matrix,e,this.model_matrix),s(this.model_matrix,n,this.model_matrix),s(this.model_matrix,o,this.model_matrix)}setBuffers(t){for(let e=0;e<this.buffers.length;e++)t.setVertexBuffer(e,this.buffers[e])}static calculateTriangleNormals(t,e=3,r=0){const i=[];for(let n=0;n<t.length/e;n+=3){const o=n,s=n+1,a=n+2,u=h(t[o*e+r],t[o*e+r+1],t[o*e+r+2]),c=h(t[s*e+r],t[s*e+r+1],t[s*e+r+2]),f=h(t[a*e+r],t[a*e+r+1],t[a*e+r+2]),d=l.crossProduct(h(c[0]-u[0],c[1]-u[1],c[2]-u[2]),h(f[0]-u[0],f[1]-u[1],f[2]-u[2]));i.push(...d,0,...d,0,...d,0)}return new Float32Array(i)}static crossProduct(t,e){return h(t[1]*e[2]-t[2]*e[1],t[2]*e[0]-t[0]*e[2],t[0]*e[1]-t[1]*e[0])}}class f extends l{constructor(t,e,r=3){super(t,r),this.indexes=e,this.indexBuffer=c.createGPUBufferUint(t,e)}get numberOfVertex(){return this.indexes.length}setBuffers(t){super.setBuffers(t),t.setIndexBuffer(this.indexBuffer,"uint32")}static calculateNormals(t,e,r=3,i=0){const n=new Array(e.length/r*4).fill(0);for(let o=0;o<t.length;o+=3){const s=t[o],a=t[o+1],u=t[o+2],c=h(e[s*r+i],e[s*r+i+1],e[s*r+i+2]),f=h(e[a*r+i],e[a*r+i+1],e[a*r+i+2]),d=h(e[u*r+i],e[u*r+i+1],e[u*r+i+2]),p=l.crossProduct(h(f[0]-c[0],f[1]-c[1],f[2]-c[2]),h(d[0]-c[0],d[1]-c[1],d[2]-c[2]));n[4*s]+=p[0],n[4*s+1]+=p[1],n[4*s+2]+=p[2],n[4*a]+=p[0],n[4*a+1]+=p[1],n[4*a+2]+=p[2],n[4*u]+=p[0],n[4*u+1]+=p[1],n[4*u+2]+=p[2]}return new Float32Array(n)}}class d{constructor(t,e,r){this.uniforms=[],this.bindGroups=new m,this.pipeline=e,r&&(this.mesh=r),this.device=t}appendUniformBuffer(t,e,...r){if(0===r.length)throw new Error("The data can't be undefined.");let i=0;const n=function(t){let e=0;for(let r of t)r.length>e&&(e=r.length);return e}(r);let o=1,s=0;for(const t of r)s+t.length>n&&(o++,s=0),s+=t.length;i=o*n*4;const a=this.device.createBuffer({size:i,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),u={buffer:a,offset:0,size:i};this.bindGroups.add(this.device,t,e,u),this.uniforms.push(new p(a,r,n)),this.pipeline.setLayout(this.device.createPipelineLayout({bindGroupLayouts:this.bindGroups.getLayouts()}))}setTexture(t,e="repeat",r="repeat"){return i=this,n=void 0,s=function*(){const i=document.createElement("img");i.src=t,i.setAttribute("crossOrigin",""),yield i.decode();const n=yield createImageBitmap(i),o=this.device.createSampler({minFilter:"linear",magFilter:"linear",addressModeU:e,addressModeV:r}),s=this.device.createTexture({size:[n.width,n.height,1],format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});this.device.queue.copyExternalImageToTexture({source:n},{texture:s},[n.width,n.height]),this.bindGroups.add(this.device,0,1,s.createView()),this.bindGroups.add(this.device,1,1,o),this.pipeline.setLayout(this.device.createPipelineLayout({bindGroupLayouts:this.bindGroups.getLayouts()}))},new((o=void 0)||(o=Promise))((function(t,e){function r(t){try{u(s.next(t))}catch(t){e(t)}}function a(t){try{u(s.throw(t))}catch(t){e(t)}}function u(e){var i;e.done?t(e.value):(i=e.value,i instanceof o?i:new o((function(t){t(i)}))).then(r,a)}u((s=s.apply(i,n||[])).next())}));var i,n,o,s}setBindGroups(t){for(const e of this.bindGroups.groups.entries())t.setBindGroup(Number(e[0]),e[1].group)}writeUniforms(){for(const t of this.uniforms){let e=0,r=0,i=0;for(const n of t.information)r+n.length>t.max&&(i++,r=0,e=i*t.max*4),this.device.queue.writeBuffer(t.buffer,e,n),r+=n.length,e+=4*n.length}}getRenderPass(t,e,r){const i={colorAttachments:[{clearValue:[0,0,0,1],storeOp:"store",loadOp:"clear",view:e.getCurrentTexture().createView()}]};if(this.pipeline.depth){if(!r)throw new Error("Depth texture is needed.");const t={view:r.createView(),depthStoreOp:"store",depthClearValue:1,depthLoadOp:"clear"};i.depthStencilAttachment=t}return t.beginRenderPass(i)}draw(t,e,r){if(!this.mesh&&!r)throw new Error("unknown number of vertices.");this.writeUniforms();const i=this.device.createCommandEncoder(),n=this.getRenderPass(i,t,e);n.setPipeline(this.pipeline.renderPipeline),this.mesh&&this.mesh.setBuffers(n),this.setBindGroups(n),this.mesh&&this.mesh instanceof f?n.drawIndexed(this.mesh.numberOfVertex):n.draw(this.mesh.numberOfVertex||r),n.end(),this.device.queue.submit([i.finish()])}}class p{constructor(t,e,r){this.buffer=t,this.information=e,this.max=r}}class m{constructor(){this.groups=new Map}add(t,e,r,i){var n;this.groups.get(r)||this.groups.set(r,new v),null===(n=this.groups.get(r))||void 0===n||n.newEntry(t,e,i)}getLayouts(){const t=[];for(let e of this.groups.values())t.push(e.layout);return t}}class v{constructor(){this.layoutEntries=new Map,this.entries=new Map}newEntry(t,e,r){const i=v.getLayoutEntry(r);i.binding=e,this.layoutEntries.set(e,i),this.entries.set(e,{binding:e,resource:r}),this.layout=t.createBindGroupLayout({entries:this.layoutEntries.values()}),this.group=t.createBindGroup({layout:this.layout,entries:this.entries.values()})}static getLayoutEntry(t){return t instanceof GPUTextureView?{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,texture:{}}:t instanceof GPUSampler?{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,sampler:{}}:{binding:-1,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{}}}}var g=function(t,e,r,i){return new(r||(r=Promise))((function(n,o){function s(t){try{u(i.next(t))}catch(t){o(t)}}function a(t){try{u(i.throw(t))}catch(t){o(t)}}function u(t){var e;t.done?n(t.value):(e=t.value,e instanceof r?e:new r((function(t){t(e)}))).then(s,a)}u((i=i.apply(t,e||[])).next())}))};class x{constructor(){this.on=!1}init(){var t;return g(this,void 0,void 0,(function*(){if(!navigator.gpu)throw"Seu navegador atual não suporta webGPU!";const e=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter();this.device=yield null==e?void 0:e.requestDevice()}))}getCanvasParams(t){const e=window.devicePixelRatio||1;t.width=1024*e,t.height=768*e;const r=t.getContext("webgpu");return r.configure({device:this.device,format:"bgra8unorm",alphaMode:"premultiplied"}),{context:r,depthTexture:this.device.createTexture({format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,size:[t.width,t.height,1]})}}static build(){return g(this,void 0,void 0,(function*(){const t=new x;return yield t.init(),t}))}}function w(t,r,i,n){var o=new e(4);return o[0]=t,o[1]=r,o[2]=i,o[3]=n,o}!function(){var t=new e(4);e!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0)}();class y{constructor(t){this.ambColor=w(0,0,0,1),this.ambK=.2,this.difColor=w(0,.5,1,1),this.difK=.5,this.espColor=w(1,1,1,1),this.espK=.3,this.espExp=100,this.pos=t}createUniformBuffer(t,e,r){t.appendUniformBuffer(r,e,new Float32Array(this.ambColor),new Float32Array(this.difColor),new Float32Array(this.espColor),new Float32Array(this.pos),new Float32Array([this.ambK]),new Float32Array([this.difK]),new Float32Array([this.espK]),new Float32Array([this.espExp]))}newPos(t){this.pos=w(4*Math.cos(t),0,4*Math.sin(t),1)}}x.build().then((t=>{return e=void 0,i=void 0,h=function*(){const e={positions:new Float32Array([-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1]),tex:new Float32Array([0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,0,1,0,0,0,0,1])},i=document.querySelector("#canvas-webgpu"),a=t.getCanvasParams(i),h=new l(t.device,3);h.appendBuffer(e.positions),h.appendBuffer(e.tex),h.appendBuffer(l.calculateTriangleNormals(e.positions));const f="\n        struct MVP{\n            model: mat4x4<f32>,\n            view: mat4x4<f32>,\n            inverseMV: mat4x4<f32>,\n            proj: mat4x4<f32>,\n        }\n\n        @group(0) @binding(0)\n            var<uniform> matrices: MVP;\n\n        struct Input{\n            @location(0) position: vec4<f32>,\n            @location(1) texCoord: vec2<f32>,\n            @location(2) normal: vec4<f32>\n        }\n\n        struct Output{\n            @builtin(position) position: vec4<f32>,\n            @location(0) pos: vec4<f32>,\n            @location(1) texCoord: vec2<f32>,\n            @location(2) normal: vec4<f32>\n        }\n\n        @vertex\n        fn main(in: Input) -> Output {\n            var out: Output;\n\n            out.pos = in.position;\n            out.texCoord = in.texCoord;\n            out.normal = in.normal;\n            out.position = matrices.proj * matrices.view * matrices.model * in.position;\n\n            return out;\n        }\n    ",p="\n        struct Input{            \n            @location(0) pos: vec4<f32>,\n            @location(1) texCoord: vec2<f32>,\n            @location(2) normal: vec4<f32>\n        }\n\n        struct Light{\n            amb_c: vec4<f32>,\n            dif_c: vec4<f32>,\n            esp_c: vec4<f32>,\n            pos: vec4<f32>,\n            amb_k: f32,\n            dif_k: f32,\n            esp_k: f32,\n            esp_p: f32,\n        }        \n        \n        struct MVP{\n            model: mat4x4<f32>,\n            view: mat4x4<f32>,\n            inverseMV: mat4x4<f32>,\n            proj: mat4x4<f32>,\n        }\n\n        @group(0) @binding(0)\n            var<uniform> matrices: MVP;\n\n        @group(0) @binding(1) \n            var<uniform> light: Light;\n\n        @binding(0) @group(1) var texture: texture_2d<f32>;\n        @binding(1) @group(1) var textureSampler: sampler;\n\n        @fragment\n        fn main(in: Input) -> @location(0) vec4<f32> {\n            var texColor = textureSample(texture, textureSampler, in.texCoord);\n\n            var lightPos = (matrices.view * light.pos).xyz;\n            var pos = -(matrices.view * matrices.model * in.pos).xyz;\n\n            //var vNormal = normalize(matrices.view * matrices.model * in.normal).xyz;\n            var vNormal = normalize(matrices.inverseMV * in.normal).xyz;\n            var vDistance = normalize(pos - lightPos);\n\n            var normalPos = normalize(pos);\n\n            var halfVector= normalize(vDistance + normalPos);\n\n            var amb = light.amb_k * light.amb_c;\n\n            var diff = max(dot(vNormal, vDistance), 0.0) * light.dif_k * light.dif_c;\n\n            var spec = max(pow(dot(vNormal, halfVector), light.esp_p), 0.0) * light.esp_c * light.esp_k;\n            \n            var color = 0.6*texColor + 0.4*(diff + amb + spec);\n            color.a = 1.0;\n\n            return color;\n        }\n    ",m=new c(t.device,f,p,"triangle-list");m.enableDepthTest(),m.addVertexBuffer({location:0}),m.addVertexBuffer({location:1,format:"float32x2"}),m.addVertexBuffer({location:2,format:"float32x4"});const v=new u(i);v.camPosition=[0,0,4];const g=new y([4,0,4,1]),x=new d(t.device,m,h),w=v.viewMatrix,b=r();s(b,w,h.modelMatrix),o(b,b),n(b,b),x.appendUniformBuffer(0,0,new Float32Array(h.modelMatrix),new Float32Array(w),new Float32Array(b),new Float32Array(v.projMatrix)),g.createUniformBuffer(x,0,1),yield x.setTexture("./assets/stone.jfif"),x.draw(a.context,a.depthTexture);let P=0;const M=()=>{h.rotationAngles=[P,P,P],s(b,w,h.modelMatrix),o(b,b),n(b,b),x.appendUniformBuffer(0,0,new Float32Array(h.modelMatrix),new Float32Array(v.viewMatrix),new Float32Array(b),new Float32Array(v.projMatrix)),x.draw(a.context,a.depthTexture),P+=.01,requestAnimationFrame(M)};requestAnimationFrame(M)},new((a=void 0)||(a=Promise))((function(t,r){function n(t){try{s(h.next(t))}catch(t){r(t)}}function o(t){try{s(h.throw(t))}catch(t){r(t)}}function s(e){var r;e.done?t(e.value):(r=e.value,r instanceof a?r:new a((function(t){t(r)}))).then(n,o)}s((h=h.apply(e,i||[])).next())}));var e,i,a,h}))})();
//# sourceMappingURL=main.bundle.js.map