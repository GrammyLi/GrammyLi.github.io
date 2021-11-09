module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__("LZ34");

// EXTERNAL MODULE: ./node_modules/@fontsource/montserrat/500.css
var _500 = __webpack_require__("GxrM");

// EXTERNAL MODULE: ./node_modules/@fontsource/sora/700.css
var _700 = __webpack_require__("CfUg");

// EXTERNAL MODULE: external "@chakra-ui/theme-tools"
var theme_tools_ = __webpack_require__("EU3T");

// CONCATENATED MODULE: ./styles/theme/styles.js
const styles = {
  global: props => ({
    body: {
      overflowX: 'hidden',
      bg: props.colorMode === 'light' ? 'default.light' : 'default.dark',
      color: props.colorMode === 'light' ? 'default.dark' : 'default.light'
    },
    div: {
      borderRadius: 'sm'
    }
  })
};
// CONCATENATED MODULE: ./styles/theme/colors.js
const colors = {
  default: {
    light: '#fcfcfc',
    dark: '#232323'
  },
  primary: {
    100: '#D1C1F4',
    200: '#B199E7',
    300: '#9C7DE4',
    400: '#8F67D7',
    500: '#805AD5',
    600: '#744EC8',
    700: '#311968'
  },
  secondary: {
    100: '#E6FFFA',
    200: '#B2F5EA',
    300: '#81E6D9',
    400: '#4FD1C5',
    500: '#38B2AC',
    600: '#319795',
    700: '#2C7A7B'
  },
  neutral: {
    100: '#F4F4F4',
    200: '#D9D9D9',
    300: '#A6A6A6',
    400: '#8C8C8C',
    500: '#737373',
    600: '#595959',
    700: '#404040'
  },
  accent: {
    successLight: '#68D391',
    successDark: '#276749',
    errorLight: '#FC8181',
    errorDark: '#AA0000'
  }
};
// CONCATENATED MODULE: ./styles/theme/typography.js
const fonts = {
  heading: 'Sora, Tahoma, sans-serif',
  body: 'Montserrat, Verdana, sans-serif'
};
const Heading = {
  sizes: null,
  variants: {
    h1: {
      textStyle: 'h1'
    },
    h2: {
      textStyle: 'h2'
    },
    h3: {
      textStyle: 'h3'
    },
    h4: {
      textStyle: 'h4'
    }
  }
};
const Text = {
  sizes: null,
  variants: {
    preTitle: props => ({
      textStyle: 'preTitle',
      color: props.colorMode === 'light' ? 'neutral.600' : 'neutral.100'
    }),
    subtitle: props => ({
      textStyle: 'subtitle',
      color: props.colorMode === 'light' ? 'neutral.600' : 'neutral.100'
    }),
    body: props => ({
      textStyle: 'body',
      color: props.colorMode === 'light' ? 'neutral.600' : 'neutral.200'
    }),
    bodyLight: props => ({
      textStyle: 'bodyLight',
      color: props.colorMode === 'light' ? 'neutral.700' : 'neutral.200'
    }),
    small: {
      textStyle: 'small'
    }
  },
  defaultProps: {
    variant: 'body'
  }
};
const textStyles = {
  h1: {
    fontSize: {
      base: '32px',
      lg: '56px'
    },
    fontWeight: 700,
    lineHeight: {
      base: '140%',
      lg: '125%'
    }
  },
  h2: {
    fontSize: {
      base: '24px',
      xl: '36px'
    },
    fontWeight: 700,
    lineHeight: {
      base: '150%',
      lg: '130%'
    }
  },
  h3: {
    fontSize: {
      base: '20px',
      xl: '28px'
    },
    fontWeight: 700,
    lineHeight: {
      base: '150%',
      lg: '140%'
    }
  },
  h4: {
    fontSize: {
      base: '18px',
      xl: '24px'
    },
    fontWeight: 700,
    lineHeight: {
      base: '150%',
      lg: '140%'
    }
  },
  subtitle: {
    fontSize: {
      base: '18px',
      xl: '24px'
    },
    fontWeight: 400,
    lineHeight: {
      base: '24px',
      lg: '140%'
    }
  },
  preTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    casing: 'uppercase',
    lineHeight: '150%'
  },
  body: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '150%'
  },
  bodyLight: {
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '150%'
  },
  small: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '160%'
  }
};
// CONCATENATED MODULE: ./styles/theme/components/button.js
const Button = {
  // Styles for the base style
  baseStyle: {
    fontFamily: 'Sora',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'sm'
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: 'xs',
      px: '0.75rem',
      py: '0.5rem'
    },
    md: {
      fontSize: 'md',
      px: '1rem',
      py: '0.5rem'
    },
    lg: {
      fontSize: 'lg',
      px: '1.5rem',
      py: '0.75rem'
    }
  },
  // Styles for the visual style variations
  variants: {
    primary: props => ({
      border: '1px solid',
      borderColor: props.colorMode === 'light' ? 'default.dark' : 'default.light',
      color: props.colorMode === 'light' ? 'default.dark' : 'default.light',
      _hover: {
        bg: props.colorMode === 'light' ? 'default.dark' : 'default.light',
        color: props.colorMode === 'light' ? 'default.light' : 'default.dark'
      },
      _active: {
        border: '1px solid',
        borderColor: props.colorMode === 'light' ? 'default.dark' : 'default.light',
        bg: 'transparent',
        color: props.colorMode === 'light' ? 'default.dark' : 'default.light'
      },
      _disabled: {
        borderColor: 'neutral.200',
        color: 'neutral.200'
      }
    }),
    secondary: props => ({
      bg: props.colorMode === 'light' ? 'default.dark' : 'default.light',
      color: props.colorMode === 'light' ? 'default.light' : 'default.dark',
      _hover: {
        bg: props.colorMode === 'light' ? 'neutral.600' : 'neutral.200'
      },
      _active: props => ({
        bg: props.colorMode === 'light' ? 'default.dark' : 'default.light',
        color: props.colorMode === 'light' ? 'default.light' : 'default.dark'
      }),
      _disabled: {
        bg: 'neutral.100',
        color: 'neutral.200'
      }
    }),
    primaryThemed: props => ({
      border: '1px solid',
      borderColor: props.colorMode === 'light' ? 'primary.500' : 'secondary.300',
      color: props.colorMode === 'light' ? 'primary.500' : 'secondary.300',
      _hover: {
        bg: props.colorMode === 'light' ? 'primary.600' : 'secondary.400',
        color: props.colorMode === 'light' ? 'default.light' : 'default.dark'
      }
    }),
    secondaryThemed: props => ({
      bg: props.colorMode === 'light' ? 'primary.500' : 'secondary.300',
      color: props.colorMode === 'light' ? 'default.light' : 'default.dark',
      _hover: {
        bg: props.colorMode === 'light' ? 'primary.600' : 'secondary.400'
      },
      _active: {
        bg: props.colorMode === 'light' ? 'primary.500' : 'secondary.300'
      }
    }),
    icon: props => ({
      bg: props.colorMode === 'light' ? 'neutral.100' : 'neutral.700',
      color: props.colorMode === 'light' ? 'default.dark' : 'default.light',
      _hover: {
        bg: props.colorMode === 'light' ? 'neutral.200' : 'neutral.600'
      },
      _active: {
        bg: props.colorMode === 'light' ? 'neutral.100' : 'neutral.700'
      }
    })
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'primary'
  }
};
// CONCATENATED MODULE: ./styles/theme/components/link.js
const Link = {
  // style object for base or default style
  baseStyle: {
    textDecoration: 'underline'
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    default: props => ({
      color: props.colorMode === 'light' ? 'primary.500' : 'secondary.300'
    }),
    noStyle: {
      textDecoration: 'none',
      _hover: {
        textDecoration: 'none'
      }
    },
    subtle: props => ({
      color: props.colorMode === 'light' ? 'neutral.600' : 'default.light',
      textDecoration: 'none',
      _hover: {
        color: props.colorMode === 'light' ? 'default.dark' : 'neutral.200',
        textDecoration: 'none'
      }
    }),
    large: props => ({
      fontSize: '1.25rem',
      color: props.colorMode === 'light' ? 'neutral.600' : 'default.light',
      textDecoration: 'none',
      _hover: {
        color: props.colorMode === 'light' ? 'default.dark' : 'neutral.200',
        textDecoration: 'none'
      }
    })
  },
  // default values for `size` and `variant`
  defaultProps: {
    variant: 'default'
  }
};
// CONCATENATED MODULE: ./styles/theme/index.js







const breakpoints = Object(theme_tools_["createBreakpoints"])({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '90em',
  '3xl': '120em'
});
const overrides = {
  breakpoints,
  styles: styles,
  colors: colors,
  fonts: fonts,
  textStyles: textStyles,
  components: {
    Button: Button,
    Link: Link,
    Heading: Heading,
    Text: Text
  }
};
/* harmony default export */ var theme = (Object(react_["extendTheme"])(overrides));
// CONCATENATED MODULE: ./pages/_app.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const MyApp = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(react_["ChakraProvider"], {
    theme: theme,
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _objectSpread({}, pageProps))
  });
};

/* harmony default export */ var _app = __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ "CfUg":
/***/ (function(module, exports) {



/***/ }),

/***/ "EU3T":
/***/ (function(module, exports) {

module.exports = require("@chakra-ui/theme-tools");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "GxrM":
/***/ (function(module, exports) {



/***/ }),

/***/ "LZ34":
/***/ (function(module, exports) {

module.exports = require("@chakra-ui/react");

/***/ })

/******/ });