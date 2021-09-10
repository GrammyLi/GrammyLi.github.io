_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[10],{0:function(n,e,t){t("GcxT"),n.exports=t("nOHt")},"1TCz":function(n,e,t){"use strict";t.r(e);var o=t("cpVT"),r=t("nKUr"),i=t("rv0Y"),l=(t("GxrM"),t("CfUg"),t("XGJC")),a=t("GqQr"),d={breakpoints:Object(a.a)({sm:"30em",md:"48em",lg:"62em",xl:"80em","2xl":"90em","3xl":"120em"}),styles:{global:function(n){return{body:{overflowX:"hidden",bg:"light"===n.colorMode?"default.light":"default.dark",color:"light"===n.colorMode?"default.dark":"default.light"},div:{borderRadius:"sm"}}}},colors:{default:{light:"#fcfcfc",dark:"#232323"},primary:{100:"#D1C1F4",200:"#B199E7",300:"#9C7DE4",400:"#8F67D7",500:"#805AD5",600:"#744EC8",700:"#311968"},secondary:{100:"#E6FFFA",200:"#B2F5EA",300:"#81E6D9",400:"#4FD1C5",500:"#38B2AC",600:"#319795",700:"#2C7A7B"},neutral:{100:"#F4F4F4",200:"#D9D9D9",300:"#A6A6A6",400:"#8C8C8C",500:"#737373",600:"#595959",700:"#404040"},accent:{successLight:"#68D391",successDark:"#276749",errorLight:"#FC8181",errorDark:"#AA0000"}},fonts:{heading:"Sora, Tahoma, sans-serif",body:"Montserrat, Verdana, sans-serif"},textStyles:{h1:{fontSize:{base:"32px",lg:"56px"},fontWeight:700,lineHeight:{base:"140%",lg:"125%"}},h2:{fontSize:{base:"24px",xl:"36px"},fontWeight:700,lineHeight:{base:"150%",lg:"130%"}},h3:{fontSize:{base:"20px",xl:"28px"},fontWeight:700,lineHeight:{base:"150%",lg:"140%"}},h4:{fontSize:{base:"18px",xl:"24px"},fontWeight:700,lineHeight:{base:"150%",lg:"140%"}},subtitle:{fontSize:{base:"18px",xl:"24px"},fontWeight:400,lineHeight:{base:"24px",lg:"140%"}},preTitle:{fontSize:"18px",fontWeight:"bold",casing:"uppercase",lineHeight:"150%"},body:{fontSize:"16px",fontWeight:500,lineHeight:"150%"},bodyLight:{fontSize:"16px",fontWeight:300,lineHeight:"150%"},small:{fontSize:"14px",fontWeight:400,lineHeight:"160%"}},components:{Button:{baseStyle:{fontFamily:"Sora",fontWeight:"bold",textTransform:"uppercase",borderRadius:"sm"},sizes:{sm:{fontSize:"xs",px:"0.75rem",py:"0.5rem"},md:{fontSize:"md",px:"1rem",py:"0.5rem"},lg:{fontSize:"lg",px:"1.5rem",py:"0.75rem"}},variants:{primary:function(n){return{border:"1px solid",borderColor:"light"===n.colorMode?"default.dark":"default.light",color:"light"===n.colorMode?"default.dark":"default.light",_hover:{bg:"light"===n.colorMode?"default.dark":"default.light",color:"light"===n.colorMode?"default.light":"default.dark"},_active:{border:"1px solid",borderColor:"light"===n.colorMode?"default.dark":"default.light",bg:"transparent",color:"light"===n.colorMode?"default.dark":"default.light"},_disabled:{borderColor:"neutral.200",color:"neutral.200"}}},secondary:function(n){return{bg:"light"===n.colorMode?"default.dark":"default.light",color:"light"===n.colorMode?"default.light":"default.dark",_hover:{bg:"light"===n.colorMode?"neutral.600":"neutral.200"},_active:function(n){return{bg:"light"===n.colorMode?"default.dark":"default.light",color:"light"===n.colorMode?"default.light":"default.dark"}},_disabled:{bg:"neutral.100",color:"neutral.200"}}},primaryThemed:function(n){return{border:"1px solid",borderColor:"light"===n.colorMode?"primary.500":"secondary.300",color:"light"===n.colorMode?"primary.500":"secondary.300",_hover:{bg:"light"===n.colorMode?"primary.600":"secondary.400",color:"light"===n.colorMode?"default.light":"default.dark"}}},secondaryThemed:function(n){return{bg:"light"===n.colorMode?"primary.500":"secondary.300",color:"light"===n.colorMode?"default.light":"default.dark",_hover:{bg:"light"===n.colorMode?"primary.600":"secondary.400"},_active:{bg:"light"===n.colorMode?"primary.500":"secondary.300"}}},icon:function(n){return{bg:"light"===n.colorMode?"neutral.100":"neutral.700",color:"light"===n.colorMode?"default.dark":"default.light",_hover:{bg:"light"===n.colorMode?"neutral.200":"neutral.600"},_active:{bg:"light"===n.colorMode?"neutral.100":"neutral.700"}}}},defaultProps:{size:"md",variant:"primary"}},Link:{baseStyle:{textDecoration:"underline"},variants:{default:function(n){return{color:"light"===n.colorMode?"primary.500":"secondary.300"}},noStyle:{textDecoration:"none",_hover:{textDecoration:"none"}},subtle:function(n){return{color:"light"===n.colorMode?"neutral.600":"default.light",textDecoration:"none",_hover:{color:"light"===n.colorMode?"default.dark":"neutral.200",textDecoration:"none"}}},large:function(n){return{fontSize:"1.25rem",color:"light"===n.colorMode?"neutral.600":"default.light",textDecoration:"none",_hover:{color:"light"===n.colorMode?"default.dark":"neutral.200",textDecoration:"none"}}}},defaultProps:{variant:"default"}},Heading:{sizes:null,variants:{h1:{textStyle:"h1"},h2:{textStyle:"h2"},h3:{textStyle:"h3"},h4:{textStyle:"h4"}}},Text:{sizes:null,variants:{preTitle:function(n){return{textStyle:"preTitle",color:"light"===n.colorMode?"neutral.600":"neutral.100"}},subtitle:function(n){return{textStyle:"subtitle",color:"light"===n.colorMode?"neutral.600":"neutral.100"}},body:function(n){return{textStyle:"body",color:"light"===n.colorMode?"neutral.600":"neutral.200"}},bodyLight:function(n){return{textStyle:"bodyLight",color:"light"===n.colorMode?"neutral.700":"neutral.200"}},small:{textStyle:"small"}},defaultProps:{variant:"body"}}}},c=Object(l.a)(d);function u(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,o)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?u(Object(t),!0).forEach((function(e){Object(o.a)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}e.default=function(n){var e=n.Component,t=n.pageProps;return Object(r.jsx)(i.a,{theme:c,children:Object(r.jsx)(e,s({},t))})}},CfUg:function(n,e,t){},GcxT:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return t("1TCz")}])},GxrM:function(n,e,t){},XGJC:function(n,e,t){"use strict";t.d(e,"a",(function(){return a}));var o=t("/2u0"),r=t("pr4h"),i=t("qd8s"),l=t.n(i);function a(n,e){return void 0===e&&(e=o.default),l()({},e,n,(function n(e,t,o,i){if((Object(r.f)(e)||Object(r.f)(t))&&Object.prototype.hasOwnProperty.call(i,o))return function(){var o=Object(r.f)(e)?e(...arguments):e,i=Object(r.f)(t)?t(...arguments):t;return l()({},o,i,n)}}))}},rv0Y:function(n,e,t){"use strict";t.d(e,"a",(function(){return g}));var o=t("AeFk"),r=t("q1tI"),i=()=>r.createElement(o.a,{styles:'\n      html {\n        line-height: 1.5;\n        -webkit-text-size-adjust: 100%;\n        font-family: system-ui, sans-serif;\n        -webkit-font-smoothing: antialiased;\n        text-rendering: optimizeLegibility;      \n        -moz-osx-font-smoothing: grayscale; \n        touch-action: manipulation; \n      }\n\n      body {\n        position: relative;\n        min-height: 100%;\n        font-feature-settings: \'kern\';\n      }\n\n      *,\n      *::before,\n      *::after {\n        border-width: 0;\n        border-style: solid;\n        box-sizing: border-box;\n      }\n\n      main {\n        display: block;\n      }\n\n      hr {\n        border-top-width: 1px;\n        box-sizing: content-box;\n        height: 0;\n        overflow: visible;\n      }\n\n      pre,\n      code,\n      kbd,\n      samp {\n        font-family: SFMono-Regular,  Menlo, Monaco, Consolas, monospace;\n        font-size: 1em;\n      }\n\n      a {\n        background-color: transparent;\n        color: inherit;\n        text-decoration: inherit;\n      }\n\n      abbr[title] {\n        border-bottom: none;\n        text-decoration: underline;\n        -webkit-text-decoration: underline dotted;\n        text-decoration: underline dotted;\n      }\n\n      b,\n      strong {\n        font-weight: bold;\n      }\n\n      small {\n        font-size: 80%;\n      }\n\n      sub,\n      sup {\n        font-size: 75%;\n        line-height: 0;\n        position: relative;\n        vertical-align: baseline;\n      }\n\n      sub {\n        bottom: -0.25em;\n      }\n\n      sup {\n        top: -0.5em;\n      }\n\n      img {\n        border-style: none;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        font-family: inherit;\n        font-size: 100%;\n        line-height: 1.15;\n        margin: 0;\n      }\n\n      button,\n      input {\n        overflow: visible;\n      }\n\n      button,\n      select {\n        text-transform: none;\n      }\n\n      button::-moz-focus-inner,\n      [type="button"]::-moz-focus-inner,\n      [type="reset"]::-moz-focus-inner,\n      [type="submit"]::-moz-focus-inner {\n        border-style: none;\n        padding: 0;\n      }\n\n      fieldset {\n        padding: 0.35em 0.75em 0.625em;\n      }\n\n      legend {\n        box-sizing: border-box;\n        color: inherit;\n        display: table;\n        max-width: 100%;\n        padding: 0;\n        white-space: normal;\n      }\n\n      progress {\n        vertical-align: baseline;\n      }\n\n      textarea {\n        overflow: auto;\n      }\n\n      [type="checkbox"],\n      [type="radio"] {\n        box-sizing: border-box;\n        padding: 0;\n      }\n\n      [type="number"]::-webkit-inner-spin-button,\n      [type="number"]::-webkit-outer-spin-button {\n        -webkit-appearance: none !important;\n      }\n\n      input[type="number"] {\n        -moz-appearance: textfield;\n      }\n\n      [type="search"] {\n        -webkit-appearance: textfield;\n        outline-offset: -2px;\n      }\n\n      [type="search"]::-webkit-search-decoration {\n        -webkit-appearance: none !important;\n      }\n\n      ::-webkit-file-upload-button {\n        -webkit-appearance: button;\n        font: inherit;\n      }\n\n      details {\n        display: block;\n      }\n\n      summary {\n        display: list-item;\n      }\n\n      template {\n        display: none;\n      }\n\n      [hidden] {\n        display: none !important;\n      }\n\n      body,\n      blockquote,\n      dl,\n      dd,\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6,\n      hr,\n      figure,\n      p,\n      pre {\n        margin: 0;\n      }\n\n      button {\n        background: transparent;\n        padding: 0;\n      }\n\n      fieldset {\n        margin: 0;\n        padding: 0;\n      }\n\n      ol,\n      ul {\n        margin: 0;\n        padding: 0;\n      }\n\n      textarea {\n        resize: vertical;\n      }\n\n      button,\n      [role="button"] {\n        cursor: pointer;\n      }\n\n      button::-moz-focus-inner {\n        border: 0 !important;\n      }\n\n      table {\n        border-collapse: collapse;\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-size: inherit;\n        font-weight: inherit;\n      }\n\n      button,\n      input,\n      optgroup,\n      select,\n      textarea {\n        padding: 0;\n        line-height: inherit;\n        color: inherit;\n      }\n\n      img,\n      svg,\n      video,\n      canvas,\n      audio,\n      iframe,\n      embed,\n      object {\n        display: block;\n        vertical-align: middle;\n      }\n\n      img,\n      video {\n        max-width: 100%;\n        height: auto;\n      }\n\n      [data-js-focus-visible] :focus:not([data-focus-visible-added]) {\n        outline: none;\n        box-shadow: none;\n      }\n\n      select::-ms-expand {\n        display: none;\n      }\n    '}),l=t("pr4h"),a=t("KTVP"),[d,c]=Object(a.a)({strict:!1,name:"PortalManagerContext"});function u(n){var{children:e,zIndex:t}=n;return r.createElement(d,{value:{zIndex:t}},e)}l.a&&(u.displayName="PortalManager");var s=t("5+Am"),h=t("+p43"),f=t("/2u0"),g=n=>{var{children:e,colorModeManager:t,portalZIndex:o,resetCSS:l=!0,theme:a=f.default}=n;return r.createElement(s.c,{theme:a},r.createElement(h.a,{colorModeManager:t,options:a.config},l&&r.createElement(i,null),r.createElement(s.a,null),o?r.createElement(u,{zIndex:o},e):e))}}},[[0,1,2,0,3]]]);