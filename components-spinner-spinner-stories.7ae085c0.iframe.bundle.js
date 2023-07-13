"use strict";(self.webpackChunk_aragon_ods=self.webpackChunk_aragon_ods||[]).push([[4273],{"./src/components/spinner/spinner.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _spinner__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/spinner/spinner.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Spinner",component:_spinner__WEBPACK_IMPORTED_MODULE_1__.$},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_spinner__WEBPACK_IMPORTED_MODULE_1__.$,{...args});Template.displayName="Template";const Default=Template.bind({});Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <Spinner {...args} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/spinner/spinner.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>Spinner});__webpack_require__("./node_modules/react/index.js");var styled_components__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const Spinner=({size="small",color})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(StyledSpinner,{"data-testid":"spinner",size,color});Spinner.displayName="Spinner";const StyledSpinner=styled_components__WEBPACK_IMPORTED_MODULE_2__.ZP.div.attrs((({size})=>({className:`rounded-full\n        ease-linear border-2\n        border-t-2 border-transparent\n        ${{xs:"w-2 h-2",small:"w-3 h-3",default:"w-5 h-5",big:"w-6 h-6"}[size]}\n    `})))`
    border-top-color: ${({color})=>color??"#003bf5"};
    -webkit-animation: spinner 1s linear infinite;
    animation: spinner 1s linear infinite;
    @-webkit-keyframes spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;try{Spinner.displayName="Spinner",Spinner.__docgenInfo={description:"Spinner UI component",displayName:"Spinner",props:{size:{defaultValue:{value:"small"},description:"The preferred Size of the spinner",name:"size",required:!1,type:{name:"enum",value:[{value:'"big"'},{value:'"small"'},{value:'"default"'},{value:'"xs"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/spinner/spinner.tsx#Spinner"]={docgenInfo:Spinner.__docgenInfo,name:"Spinner",path:"src/components/spinner/spinner.tsx#Spinner"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-spinner-spinner-stories.7ae085c0.iframe.bundle.js.map