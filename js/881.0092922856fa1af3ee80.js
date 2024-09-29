"use strict";(self.webpackChunkperson_web=self.webpackChunkperson_web||[]).push([[881],{6544:(t,n,r)=>{r.d(n,{A:()=>a});var o=r(1601),e=r.n(o),i=r(6314),s=r.n(i)()(e());s.push([t.id,".canvas-renderer {\n  width: 500px;\n  height: 500px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #f0f0f0;\n  border: 1px solid #ddd;\n}\n.canvas-renderer canvas {\n  border: 1px solid #000;\n}\n",""]);const a=s},2234:(t,n,r)=>{r.d(n,{A:()=>a});var o=r(1601),e=r.n(o),i=r(6314),s=r.n(i)()(e());s.push([t.id,".three-render__title {\n  text-align: center;\n  font-size: 2rem;\n  margin-bottom: 20px;\n}\n",""]);const a=s},5881:(t,n,r)=>{r.r(n),r.d(n,{default:()=>F});var o,e=r(4848),i=r(6540),s=function(t,n,r){if(r||2===arguments.length)for(var o,e=0,i=n.length;e<i;e++)!o&&e in n||(o||(o=Array.prototype.slice.call(n,0,e)),o[e]=n[e]);return t.concat(o||Array.prototype.slice.call(n))},a=function(){function t(){}return t.new=function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];return new(this.bind.apply(this,s([void 0],t,!1)))},t}(),c=(o=function(t,n){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])},o(t,n)},function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}),u=function(t){function n(n,r){var o=t.call(this)||this;return o.x=n,o.y=r,o}return c(n,t),n.prototype.add=function(t){return new n(this.x+t.x,this.y+t.y)},n.prototype.sub=function(t){return new n(this.x-t.x,this.y-t.y)},n.prototype.mul=function(t){return new n(this.x*t,this.y*t)},n}(a),l=function(){function t(t,n,r,o){this.r=t,this.g=n,this.b=r,this.a=o}return t.black=function(){return new t(0,0,0,255)},t.white=function(){return new t(255,255,255,255)},t.red=function(){return new t(255,0,0,255)},t.green=function(){return new t(0,255,0,255)},t.blue=function(){return new t(0,0,255,255)},t.cyan=function(){return new t(0,255,255,255)},t.fromHEX=function(n){return new t(parseInt(n.slice(1,3),16),parseInt(n.slice(3,5),16),parseInt(n.slice(5,7),16),255)},t.prototype.add=function(n){return new t(this.r+n.r,this.g+n.g,this.b+n.b,this.a+n.a)},t.prototype.sub=function(n){return new t(this.r-n.r,this.g-n.g,this.b-n.b,this.a-n.a)},t.prototype.mul=function(n){return new t(this.r*n,this.g*n,this.b*n,this.a*n)},t}(),p=function(){var t=function(n,r){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])},t(n,r)};return function(n,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function o(){this.constructor=n}t(n,r),n.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}(),h=function(t){function n(n,r){var o=t.call(this)||this;return o.position=n,o.color=r,o}return p(n,t),n.prototype.add=function(t){return new n(this.position.add(t.position),this.color.add(t.color))},n.prototype.sub=function(t){return new n(this.position.sub(t.position),this.color.sub(t.color))},n.prototype.mul=function(t){return new n(this.position.mul(t),this.color.mul(t))},n}(a),f=function(t,n,r){var o=t.position.add(n.position.sub(t.position).mul(r)),e=t.color.add(n.color.sub(t.color).mul(r));return new h(o,e)},y=function(){function t(t){this.canvas=t,this.context=t.getContext("2d"),this.w=t.width,this.h=t.height,this.pixels=this.context.getImageData(0,0,this.w,this.h),this.bytesPerPixel=4,this.penColor=l.black()}return t.prototype.initialize=function(){this.context.clearRect(0,0,this.w,this.h),this.context.fillStyle="#FFFFFF",this.context.fillRect(0,0,this.w,this.h);var t=new h(new u(50,100),l.red()),n=new h(new u(200,100),l.blue()),r=new h(new u(125,200),l.green());this.drawTriangle(t,n,r)},t.prototype.render=function(){var t=this.pixels;this.context.putImageData(t,0,0)},t.prototype._setPixel=function(t,n,r){var o=Math.floor;t=o(t);var e=((n=o(n))*this.w+t)*this.bytesPerPixel,i=this.pixels.data,s=r.r,a=r.g,c=r.b,u=r.a;i[e]=s,i[e+1]=a,i[e+2]=c,i[e+3]=u},t.prototype.drawPoint=function(t,n){void 0===n&&(n=l.black());var r=this.w,o=this.h;t.x>=0&&t.x<=r&&t.y>=0&&t.y<=o&&this._setPixel(t.x,t.y,n)},t.prototype.drawScanline=function(t,n){for(var r=[t,n].sort((function(t,n){return t.position.x-n.position.x})),o=r[0],e=r[1],i=Math.floor(o.position.x),s=Math.floor(e.position.x),a=Math.floor(o.position.y),c=s>i?1:-1,l=0,p=i;p<=s+1*c;p+=c){i!==s&&(l=(p-i)/(s-i));var h=f(o.color,e.color,l),y=new u(p,a);this.drawPoint(y,h)}this.render()},t.prototype.drawTriangle=function(t,n,r){var o=[t,n,r].sort((function(t,n){return t.position.y-n.position.y})),e=o[0],i=o[1],s=o[2],a=0;s.position.y-e.position.y!=0&&(a=(i.position.y-e.position.y)/(s.position.y-e.position.y));for(var c=f(e,s,a),u=Math.floor(e.position.y),l=Math.floor(i.position.y),p=u;p<=l;p++){var h=f(e,i,w=l!==u?(p-u)/(l-u):0),y=f(e,c,w);this.drawScanline(h,y)}u=Math.floor(i.position.y),l=Math.floor(s.position.y);for(var d=u;d<=l;d++){var w;h=f(i,s,w=l!==u?(d-u)/(l-u):0),y=f(c,s,w);this.drawScanline(h,y)}this.render()},t}(),d=r(5072),w=r.n(d),b=r(7825),v=r.n(b),x=r(7659),g=r.n(x),_=r(5056),m=r.n(_),A=r(540),j=r.n(A),O=r(1113),P=r.n(O),T=r(6544),k={};k.styleTagTransform=P(),k.setAttributes=m(),k.insert=g().bind(null,"head"),k.domAPI=v(),k.insertStyleElement=j();w()(T.A,k);T.A&&T.A.locals&&T.A.locals;var M=function(){return M=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t},M.apply(this,arguments)};const S=function(){var t=(0,i.useRef)(null);return(0,i.useEffect)((function(){t.current&&new y(t.current).initialize()}),[]),(0,e.jsx)("div",M({className:"canvas-renderer"},{children:(0,e.jsx)("canvas",{id:"id-canvas",ref:t,width:500,height:500})}))};var I=r(2234),C={};C.styleTagTransform=P(),C.setAttributes=m(),C.insert=g().bind(null,"head"),C.domAPI=v(),C.insertStyleElement=j();w()(I.A,C);I.A&&I.A.locals&&I.A.locals;var E=function(){return E=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++)for(var e in n=arguments[r])Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e]);return t},E.apply(this,arguments)};const F=function(){return(0,e.jsxs)("div",E({className:"three-render"},{children:[(0,e.jsx)("h1",E({className:"three-render__title"},{children:"3D Triangle Rendering"})),(0,e.jsx)(S,{})]}))}}}]);