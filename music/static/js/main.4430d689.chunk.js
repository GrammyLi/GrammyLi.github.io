(this["webpackJsonpmusic-player"]=this["webpackJsonpmusic-player"]||[]).push([[0],{18:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n.n(r),a=n(12),i=n.n(a),s=n(3),o=n.n(s),u=n(6),l=n(8),j=(n(18),n(27));var d=function(){return[{name:"Mojito",cover:"https://yylichao.gitee.io/projects/music_player/img/Mojito.jpeg",audio:"https://yylichao.gitee.io/projects/music_player/music/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20Mojito.mp3",artist:"Jay  Chou",color:"#EF8EA9, #ab417f",id:Object(j.a)(),active:!0},{name:"\u7231\u7684\u98de\u884c\u65e5\u8bb0",cover:"https://yylichao.gitee.io/projects/music_player/img/\u7231\u7684\u98de\u884c\u65e5\u8bb0.jpg",audio:"https://yylichao.gitee.io/projects/music_player/music/\u5468\u6770\u4f26 - .\u7231\u7684\u98de\u884c\u65e5\u8bb0.mp3",artist:"Jay  Chou",color:"#CD607D, #c94043",id:Object(j.a)(),active:!1},{name:"\u542c\u5988\u5988\u7684\u8bdd",cover:"https://yylichao.gitee.io/projects/music_player/img/\u542c\u5988\u5988\u7684\u8bdd.jpg",audio:"https://yylichao.gitee.io/projects/music_player/music/\u5468\u6770\u4f26 - .\u542c\u5988\u5988\u7684\u8bdd.mp3",artist:"Jay  Chou",color:"#EF8EA9, #ab417f",id:Object(j.a)(),active:!1},{name:"\u9f99\u5377\u98ce (Live)",cover:"https://yylichao.gitee.io/projects/music_player/img/\u9f99\u5377\u98ce (Live).jpg",audio:"https://yylichao.gitee.io/projects/music_player/music/\u5468\u6770\u4f26 - .\u9f99\u5377\u98ce (Live).mp3",artist:"Jay  Chou",color:"#CD607D, #c94043",id:Object(j.a)(),active:!1}]},b=n(4),g=n(7),p=n(5),y=n(0),m=function(e){var t=e.audioRef,n=e.currentSong,r=e.isPlaying,c=e.setIsPlaying,a=e.setSongInfo,i=e.songInfo,s=e.songs,l=e.setCurrentSong,j=function(){var e=Object(u.a)(o.a.mark((function e(c){var a,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=s.findIndex((function(e){return e.id===n.id})),"skip-back"!==c){e.next=8;break}return a=0===a?s.length:a,i=(a-1)%s.length,e.next=6,l(s[i]);case 6:e.next=10;break;case 8:return e.next=10,l(s[(a+1)%s.length]);case 10:r&&t.current.play();case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0",r=e;r.length<t;)r=n+r;return r},m=function(e){var t=String(Math.floor(e%3600/60)),n=String(Math.floor(e%60));return"".concat(d(t,2),":").concat(d(n,2))};return Object(y.jsxs)("div",{className:"player-container",children:[Object(y.jsxs)("div",{className:"time-control",children:[Object(y.jsx)("p",{children:m(i.currentTime)}),Object(y.jsx)("input",{min:0,max:i.duration||0,value:i.currentTime,onChange:function(e){t.current.currentTime=e.target.value,a(Object(b.a)(Object(b.a)({},i),{},{currentTime:e.target.value}))},type:"range"}),Object(y.jsx)("p",{children:i.duration?m(i.duration):"0:00"})]}),Object(y.jsxs)("div",{className:"play-control",children:[Object(y.jsx)(g.a,{className:"previous",size:"2x",icon:p.d,onClick:function(){return j("skip-back")}}),Object(y.jsx)(g.a,{className:"play",onClick:function(){r?t.current.pause():t.current.play(),c(!r)},size:"3x",icon:r?p.b:p.c}),Object(y.jsx)(g.a,{className:"next",size:"2x",icon:p.e,onClick:function(){return j("skip-fwd")}})]})]})},h=function(e){var t=e.currentSong,n=e.isPlaying;return Object(y.jsxs)("div",{className:"song-container",children:[Object(y.jsx)("img",{className:n?"disc-play":"disc-paused",src:t.cover,alt:t.name}),Object(y.jsx)("h2",{children:t.name}),Object(y.jsx)("h3",{children:t.artist})]})},O=console.log.bind(console,"**** debug ***"),f=function(e){var t=e.song,n=e.songs,r=e.setCurrentSong,c=e.audioRef,a=e.isPlaying,i=e.setSongs,s=e.setIsPlaying,l=function(){var e=Object(u.a)(o.a.mark((function e(){var u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r(t);case 2:u=n.map((function(e){return e.id===t.id?Object(b.a)(Object(b.a)({},e),{},{active:!0}):Object(b.a)(Object(b.a)({},e),{},{active:!1})})),i(u),O("newSongs",u),a||s(!0),c.current.play();case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(y.jsxs)("div",{className:"library-song ".concat(t.active?"selected":""),onClick:l,children:[Object(y.jsx)("img",{src:t.cover,alt:t.name}),Object(y.jsxs)("div",{className:"song-description",children:[Object(y.jsx)("h3",{children:t.name}),Object(y.jsx)("h4",{children:t.artist})]})]})},v=function(e){var t=e.libraryStatus,n=e.songs,r=e.setCurrentSong,c=e.audioRef,a=e.isPlaying,i=e.setSongs,s=e.setIsPlaying;return Object(y.jsxs)("div",{className:"library ".concat(t?"active-library":""),children:[Object(y.jsx)("h2",{children:"Library"}),Object(y.jsx)("div",{className:"library-songs",children:n.map((function(e){return Object(y.jsx)(f,{song:e,songs:n,setCurrentSong:r,audioRef:c,isPlaying:a,setSongs:i,setIsPlaying:s},e.id)}))})]})},x=function(e){var t=e.libraryStatus,n=e.setLibraryStatus;return Object(y.jsxs)("nav",{children:[Object(y.jsx)("h1",{children:"Grammy Music"}),Object(y.jsxs)("button",{onClick:function(){return n(!t)},children:["Library",Object(y.jsx)(g.a,{icon:p.a})]})]})};var S=function(){var e=Object(r.useRef)(null),t=Object(r.useState)(d()),n=Object(l.a)(t,2),c=n[0],a=n[1],i=Object(r.useState)(c[0]),s=Object(l.a)(i,2),j=s[0],b=s[1],g=Object(r.useState)(!1),p=Object(l.a)(g,2),O=p[0],f=p[1],S=Object(r.useState)({currentTime:0,duration:0}),C=Object(l.a)(S,2),k=C[0],P=C[1],I=Object(r.useState)(!1),N=Object(l.a)(I,2),w=N[0],E=N[1],L=function(e){var t=e.target.currentTime,n=e.target.duration;P({currentTime:t,duration:n})},M=function(){var t=Object(u.a)(o.a.mark((function t(){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=c.findIndex((function(e){return e.id===j.id})),t.next=3,b(c[(n+1)%c.length]);case 3:O&&e.current.play();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(y.jsxs)("div",{className:"App ".concat(w?"library-active":""),children:[Object(y.jsx)(x,{libraryStatus:w,setLibraryStatus:E}),Object(y.jsx)(h,{currentSong:j,isPlaying:O}),Object(y.jsx)(m,{audioRef:e,songs:c,setIsPlaying:f,isPlaying:O,currentSong:j,setSongInfo:P,songInfo:k,setCurrentSong:b}),Object(y.jsx)(v,{libraryStatus:w,songs:c,setCurrentSong:b,audioRef:e,isPlaying:O,setSongs:a,setIsPlaying:f}),Object(y.jsx)("audio",{onLoadedMetadata:L,onTimeUpdate:L,ref:e,src:j.audio,onEnded:M})]})};i.a.render(Object(y.jsx)(c.a.StrictMode,{children:Object(y.jsx)(S,{})}),document.getElementById("root"))}},[[25,1,2]]]);
//# sourceMappingURL=main.4430d689.chunk.js.map