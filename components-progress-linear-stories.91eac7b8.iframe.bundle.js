"use strict";(self.webpackChunk_aragon_ods=self.webpackChunk_aragon_ods||[]).push([[9628],{"./src/components/progress/linear.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _linear__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/progress/linear.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Progress/Linear",component:_linear__WEBPACK_IMPORTED_MODULE_1__.u},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_linear__WEBPACK_IMPORTED_MODULE_1__.u,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={max:3,value:2},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <LinearProgress {...args} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/progress/linear.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{u:()=>LinearProgress});__webpack_require__("./node_modules/react/index.js");var styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const LinearProgress=({max,value,...props})=>{const val=value/max;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Progress,{max:1,value:val,...props})};LinearProgress.displayName="LinearProgress";const Progress=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.progress.attrs({className:"h-1 w-full"})`
    ::-webkit-progress-bar {
        background-color: #e4e7eb;
    }
    ::-webkit-progress-value {
        border-radius: 12px 0 0 12px;
        background: linear-gradient(90deg, #0031ad 0%, #003bf5 100.32%);
    }

    &[value^='1']::-webkit-progress-value {
        border-radius: 12px;
    }

    border-radius: 12px;
    background-color: #e4e7eb;
    height: 20px;
    padding: 4px;

    ::-moz-progress-bar {
        border-radius: 12px 0 0 12px;
        background: -moz-linear-gradient(90deg, #0031ad 0%, #003bf5 100.32%);
    }

    &[value^='1']::-moz-progress-bar {
        border-radius: 12px;
    }
`;try{LinearProgress.displayName="LinearProgress",LinearProgress.__docgenInfo={description:"",displayName:"LinearProgress",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/progress/linear.tsx#LinearProgress"]={docgenInfo:LinearProgress.__docgenInfo,name:"LinearProgress",path:"src/components/progress/linear.tsx#LinearProgress"})}catch(__react_docgen_typescript_loader_error){}}}]);