"use strict";(self.webpackChunk_aragon_ods=self.webpackChunk_aragon_ods||[]).push([[8579],{"./src/components/alerts/alertChip.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/icons/index.tsx"),_alertChip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/alerts/alertChip.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Alerts/Chip",component:_alertChip__WEBPACK_IMPORTED_MODULE_2__.n},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_alertChip__WEBPACK_IMPORTED_MODULE_2__.n,{...args});Template.displayName="Template";const Default=Template.bind({});Default.args={label:"Pasted",icon:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_1__.DL,{}),showIcon:!0},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <AlertChip {...args} />",...Default.parameters?.docs?.source}}};const __namedExportsOrder=["Default"]},"./src/components/alerts/alertChip.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>AlertChip});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),styled_components__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/icons/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");const AlertChip=({label,icon=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_icons__WEBPACK_IMPORTED_MODULE_1__.DL,{}),showIcon=!1,isShown=!1})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrapper,{"data-testid":"alertChip",isShown,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(BadgeContainer,{children:[showIcon&&react__WEBPACK_IMPORTED_MODULE_0__.cloneElement(icon,{height:12,width:12,className:"text-ui-300"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Label,{children:label})]})});AlertChip.displayName="AlertChip";const WrapperAnimationCSS=styled_components__WEBPACK_IMPORTED_MODULE_3__.iv`
  animation: ${({isShown})=>isShown?"fadein 0.3s":"fadeout 0.3s"};

  @-webkit-keyframes fadein {
    from {
      top: 0;
      opacity: 0;
      z-index: 0;
    }
    to {
      top: 24px;
      opacity: 1;
      z-index: 50;
    }
  }

  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
      z-index: 0;
    }
    to {
      top: 24px;
      opacity: 1;
      z-index: 50;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      top: 24px;
      opacity: 1;
      z-index: 50;
    }
    to {
      top: 0;
      opacity: 0;
      z-index: 0;
    }
  }

  @keyframes fadeout {
    from {
      top: 24px;
      opacity: 1;
      z-index: 50;
    }
    to {
      top: 0;s
      opacity: 0;
      z-index: 0;
    }
  }
`,Wrapper=styled_components__WEBPACK_IMPORTED_MODULE_3__.ZP.div.attrs((({isShown})=>({className:"fixed w-full flex items-center justify-center top-3 "+(isShown?"opacity-100 fixed":"opacity-0 none")})))`
    z-index: ${props=>props.isShown?"50":"-50"};
    ${WrapperAnimationCSS}
`,BadgeContainer=styled_components__WEBPACK_IMPORTED_MODULE_3__.ZP.div.attrs((()=>({className:"flex items-center bg-ui-900 rounded-full px-3 py-2 space-x-1 cursor-default"})))``,Label=styled_components__WEBPACK_IMPORTED_MODULE_3__.ZP.span.attrs({className:"text-ui-100 ft-text-sm"})``;try{AlertChip.displayName="AlertChip",AlertChip.__docgenInfo={description:"",displayName:"AlertChip",props:{label:{defaultValue:null,description:"Chip Label",name:"label",required:!0,type:{name:"string"}},icon:{defaultValue:{value:"<IconCheckmark />"},description:"Icon component",name:"icon",required:!1,type:{name:"ReactComponentElement<IconType, Pick<{ [x: string]: any; height?: number; width?: number; }, string | number>> | undefined"}},showIcon:{defaultValue:{value:"false"},description:"control Icon visibility",name:"showIcon",required:!1,type:{name:"boolean"}},isShown:{defaultValue:{value:"false"},description:"Is chip visible",name:"isShown",required:!1,type:{name:"boolean"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/alerts/alertChip.tsx#AlertChip"]={docgenInfo:AlertChip.__docgenInfo,name:"AlertChip",path:"src/components/alerts/alertChip.tsx#AlertChip"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/icons/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{C2:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconChevronDown,C9:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconItalic,Ce:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconRadioDefault,DL:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconCheckmark,FC:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconWarning,Gy:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconFlag,H8:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconBlock,HF:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconRemove,Ht:()=>_module__WEBPACK_IMPORTED_MODULE_2__.IconFinance,Ir:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconRadioCancel,Kp:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconCheckboxMulti,ME:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconLinkExternal,N_:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconAdd,PL:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconPerson,R$:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconSuccess,Ti:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconDeposit,VG:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconChevronRight,Yf:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconWithdraw,a2:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconMenuVertical,a3:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconRadioSelected,aU:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconInfo,ac:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconLinkSet,bM:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconClose,d1:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconLinkUnset,dl:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconFavoriteDefault,ed:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconChevronLeft,iA:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconFavoriteSelected,jV:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconSearch,jo:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconClock,kM:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconCheckboxSelected,lM:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconBold,pT:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconListUnordered,qp:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconExpand,uC:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconCheckboxDefault,vM:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconSpinner,vU:()=>_interface__WEBPACK_IMPORTED_MODULE_0__.IconCopy,x7:()=>_module__WEBPACK_IMPORTED_MODULE_2__.IconCommunity,yK:()=>_markdown__WEBPACK_IMPORTED_MODULE_1__.IconListOrdered});var _interface__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/icons/interface/index.ts"),_markdown__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/icons/markdown/index.ts"),_module__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/components/icons/module/index.ts");try{IconBold.displayName="IconBold",IconBold.__docgenInfo={description:"",displayName:"IconBold",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconBold"]={docgenInfo:IconBold.__docgenInfo,name:"IconBold",path:"src/components/icons/index.tsx#IconBold"})}catch(__react_docgen_typescript_loader_error){}try{IconItalic.displayName="IconItalic",IconItalic.__docgenInfo={description:"",displayName:"IconItalic",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconItalic"]={docgenInfo:IconItalic.__docgenInfo,name:"IconItalic",path:"src/components/icons/index.tsx#IconItalic"})}catch(__react_docgen_typescript_loader_error){}try{IconLinkSet.displayName="IconLinkSet",IconLinkSet.__docgenInfo={description:"",displayName:"IconLinkSet",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconLinkSet"]={docgenInfo:IconLinkSet.__docgenInfo,name:"IconLinkSet",path:"src/components/icons/index.tsx#IconLinkSet"})}catch(__react_docgen_typescript_loader_error){}try{IconLinkUnset.displayName="IconLinkUnset",IconLinkUnset.__docgenInfo={description:"",displayName:"IconLinkUnset",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconLinkUnset"]={docgenInfo:IconLinkUnset.__docgenInfo,name:"IconLinkUnset",path:"src/components/icons/index.tsx#IconLinkUnset"})}catch(__react_docgen_typescript_loader_error){}try{IconListOrdered.displayName="IconListOrdered",IconListOrdered.__docgenInfo={description:"",displayName:"IconListOrdered",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconListOrdered"]={docgenInfo:IconListOrdered.__docgenInfo,name:"IconListOrdered",path:"src/components/icons/index.tsx#IconListOrdered"})}catch(__react_docgen_typescript_loader_error){}try{IconListUnordered.displayName="IconListUnordered",IconListUnordered.__docgenInfo={description:"",displayName:"IconListUnordered",props:{height:{defaultValue:{value:"16"},description:"",name:"height",required:!1,type:{name:"number"}},width:{defaultValue:{value:"16"},description:"",name:"width",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/icons/index.tsx#IconListUnordered"]={docgenInfo:IconListUnordered.__docgenInfo,name:"IconListUnordered",path:"src/components/icons/index.tsx#IconListUnordered"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=components-alerts-alertChip-stories.0fafdaea.iframe.bundle.js.map