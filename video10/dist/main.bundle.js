(()=>{"use strict";var t=1e-6,e="undefined"!=typeof Float32Array?Float32Array:Array;function n(){var t=new e(16);return e!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function o(t,e,n){var o=e[0],a=e[1],r=e[2],i=e[3],u=e[4],c=e[5],s=e[6],f=e[7],l=e[8],p=e[9],d=e[10],v=e[11],h=e[12],g=e[13],m=e[14],y=e[15],w=n[0],M=n[1],x=n[2],P=n[3];return t[0]=w*o+M*u+x*l+P*h,t[1]=w*a+M*c+x*p+P*g,t[2]=w*r+M*s+x*d+P*m,t[3]=w*i+M*f+x*v+P*y,w=n[4],M=n[5],x=n[6],P=n[7],t[4]=w*o+M*u+x*l+P*h,t[5]=w*a+M*c+x*p+P*g,t[6]=w*r+M*s+x*d+P*m,t[7]=w*i+M*f+x*v+P*y,w=n[8],M=n[9],x=n[10],P=n[11],t[8]=w*o+M*u+x*l+P*h,t[9]=w*a+M*c+x*p+P*g,t[10]=w*r+M*s+x*d+P*m,t[11]=w*i+M*f+x*v+P*y,w=n[12],M=n[13],x=n[14],P=n[15],t[12]=w*o+M*u+x*l+P*h,t[13]=w*a+M*c+x*p+P*g,t[14]=w*r+M*s+x*d+P*m,t[15]=w*i+M*f+x*v+P*y,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,e=arguments.length;e--;)t+=arguments[e]*arguments[e];return Math.sqrt(t)});const a=()=>{return t=void 0,e=void 0,o=function*(){var t;const e=navigator.gpu?"webGPU suportado":"webGPU não suportado";if("webGPU não suportado"===e)throw console.log(e),"Seu navegador atual não suporta webGPU!";const n=document.querySelector("#canvas-webgpu"),o=window.devicePixelRatio||1;n.width=1024*o,n.height=768*o;const a=yield null===(t=navigator.gpu)||void 0===t?void 0:t.requestAdapter(),r=yield null==a?void 0:a.requestDevice(),i=n.getContext("webgpu"),u="bgra8unorm";return i.configure({device:r,format:u,alphaMode:"premultiplied"}),{device:r,canvas:n,swapChainFormat:u,context:i}},new((n=void 0)||(n=Promise))((function(a,r){function i(t){try{c(o.next(t))}catch(t){r(t)}}function u(t){try{c(o.throw(t))}catch(t){r(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,u)}c((o=o.apply(t,e||[])).next())}));var t,e,n,o},r=(t,e,n=GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST)=>{const o=t.createBuffer({size:e.byteLength,usage:n,mappedAtCreation:!0});return new Float32Array(o.getMappedRange()).set(e),o.unmap(),o},i=(e=1,a=[2,2,4],r=[0,0,0],i=[0,1,0])=>{const u=n(),c=n(),s=n();var f,l,p,d,v,h,g,m,y,w,M,x,P,b,C,U,A,B,G,S,O,F,T;return function(t,e,n,o,a){var r,i=1/Math.tan(e/2);t[0]=i/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=a&&a!==1/0?(r=1/(o-a),t[10]=(a+o)*r,t[14]=2*a*o*r):(t[10]=-1,t[14]=-2*o)}(c,2*Math.PI/5,e,.1,100),f=u,p=r,d=i,C=(l=a)[0],U=l[1],A=l[2],B=d[0],G=d[1],S=d[2],O=p[0],F=p[1],T=p[2],Math.abs(C-O)<t&&Math.abs(U-F)<t&&Math.abs(A-T)<t?function(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(f):(M=C-O,x=U-F,P=A-T,v=G*(P*=b=1/Math.hypot(M,x,P))-S*(x*=b),h=S*(M*=b)-B*P,g=B*x-G*M,(b=Math.hypot(v,h,g))?(v*=b=1/b,h*=b,g*=b):(v=0,h=0,g=0),m=x*g-P*h,y=P*v-M*g,w=M*h-x*v,(b=Math.hypot(m,y,w))?(m*=b=1/b,y*=b,w*=b):(m=0,y=0,w=0),f[0]=v,f[1]=m,f[2]=M,f[3]=0,f[4]=h,f[5]=y,f[6]=x,f[7]=0,f[8]=g,f[9]=w,f[10]=P,f[11]=0,f[12]=-(v*C+h*U+g*A),f[13]=-(m*C+y*U+w*A),f[14]=-(M*C+x*U+P*A),f[15]=1),o(s,c,u),{viewMatrix:u,projectionMatrix:c,viewProjMatrix:s,cameraOption:{eye:a,center:r,zoomMax:100,zoomSpeed:2}}};var u,c;c=function*(){const t=yield a(),e=t.device,u={positions:new Float32Array([-1,-1,1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,1,-1,1,1,1,1,1,1,1,-1,1,1,-1,-1,1,-1,-1,1,1,-1,-1,1,-1,-1,-1,1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1]),colors:new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1])},c=u.positions.length/3,s=r(e,u.positions),f=r(e,u.colors),l="\n        @group(0) @binding(0)\n            var<uniform> mvpMatrix: mat4x4<f32>;\n\n        struct Input{\n            @location(0) position: vec4<f32>,\n            @location(1) vColor: vec4<f32>,\n        }\n\n        struct Output{\n            @builtin(position) position: vec4<f32>,\n            @location(0) vColor: vec4<f32>,\n        }\n\n        @vertex\n        fn main(in: Input) -> Output {\n            var out: Output;\n            //var uniforms: Uniforms;\n\n            out.position = mvpMatrix * in.position;\n            out.vColor = in.vColor;\n\n            return out;\n        }\n    ",p="  \n        @fragment\n        fn main(@location(0) vColor: vec4<f32>) -> @location(0) vec4<f32> {\n            return vColor;\n        }\n    ",d=e.createRenderPipeline({vertex:{module:e.createShaderModule({code:l}),entryPoint:"main",buffers:[{arrayStride:12,attributes:[{shaderLocation:0,format:"float32x3",offset:0}]},{arrayStride:12,attributes:[{shaderLocation:1,format:"float32x3",offset:0}]}]},fragment:{module:e.createShaderModule({code:p}),entryPoint:"main",targets:[{format:t.swapChainFormat}]},primitive:{topology:"triangle-list"},layout:"auto",depthStencil:{format:"depth24plus",depthWriteEnabled:!0,depthCompare:"less"}}),v=i(t.canvas.width/t.canvas.height),h=n(),g=v.viewProjMatrix,m=n(),y=e.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});console.log(d.getBindGroupLayout(0));const w=e.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:y,offset:0,size:64}}]}),M=e.createTexture({format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT,size:[t.canvas.width,t.canvas.height,1]}),x={colorAttachments:[{clearValue:[0,0,0,1],storeOp:"store",loadOp:"clear",view:t.context.getCurrentTexture().createView()}],depthStencilAttachment:{view:M.createView(),depthStoreOp:"store",depthClearValue:1,depthLoadOp:"clear"}};((t,e=[0,0,0],a=[0,0,0],r=[1,1,1])=>{const i=n(),u=n(),c=n(),s=n(),f=n();var l,p;p=e,(l=s)[0]=1,l[1]=0,l[2]=0,l[3]=0,l[4]=0,l[5]=1,l[6]=0,l[7]=0,l[8]=0,l[9]=0,l[10]=1,l[11]=0,l[12]=p[0],l[13]=p[1],l[14]=p[2],l[15]=1,function(t,e){var n=Math.sin(e),o=Math.cos(e);t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(i,a[0]),function(t,e){var n=Math.sin(e),o=Math.cos(e);t[0]=o,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(u,a[1]),function(t,e){var n=Math.sin(e),o=Math.cos(e);t[0]=o,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(c,a[2]),function(t,e){t[0]=e[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=e[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=e[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1}(f,r),o(t,i,f),o(t,u,t),o(t,c,t),o(t,s,t)})(h),o(m,g,h),e.queue.writeBuffer(y,0,m);const P=e.createCommandEncoder(),b=P.beginRenderPass(x);b.setPipeline(d),b.setVertexBuffer(0,s),b.setVertexBuffer(1,f),b.setBindGroup(0,w),b.draw(c),b.end(),e.queue.submit([P.finish()])},new((u=void 0)||(u=Promise))((function(t,e){function n(t){try{a(c.next(t))}catch(t){e(t)}}function o(t){try{a(c.throw(t))}catch(t){e(t)}}function a(e){var a;e.done?t(e.value):(a=e.value,a instanceof u?a:new u((function(t){t(a)}))).then(n,o)}a((c=c.apply(void 0,[])).next())}))})();
//# sourceMappingURL=main.bundle.js.map