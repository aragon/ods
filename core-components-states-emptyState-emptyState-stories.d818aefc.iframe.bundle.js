"use strict";(self.webpackChunk_aragon_ods=self.webpackChunk_aragon_ods||[]).push([[2336],{"./src/core/components/states/emptyState/emptyState.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,NonStackedFullWithObject:()=>NonStackedFullWithObject,StackedFullWithHuman:()=>StackedFullWithHuman,StackedFullWithObject:()=>StackedFullWithObject,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _icon__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/core/components/icon/index.ts");const meta={title:"Core/Components/States/EmptyState",component:__webpack_require__("./src/core/components/states/emptyState/emptyState.tsx").p,parameters:{design:{type:"figma",url:"https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/jfKRr1V9evJUp1uBeyP3Zz/Aragon-ODS?type=design&node-id=10095%3A21633&mode=dev&t=FtMO7nBXAzYBFGaW-1"}}},Default={args:{heading:"Heading",description:"Description",objectIllustration:{object:"LIGHTBULB"}}},StackedFullWithObject={args:{heading:"Heading",description:"Description",objectIllustration:{object:"LIGHTBULB"},primaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Primary Button Clicked")},secondaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Secondary Button Clicked")}}},NonStackedFullWithObject={args:{heading:"Heading",description:"Description",isStacked:!1,objectIllustration:{object:"LIGHTBULB"},primaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Primary Button Clicked")},secondaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Secondary Button Clicked")}}},StackedFullWithHuman={args:{heading:"Heading",description:"Description",humanIllustration:{body:"VOTING",hairs:"MIDDLE",accessory:"EARRINGS_RHOMBUS",sunglasses:"BIG_ROUNDED",expression:"SMILE"},primaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Primary Button Clicked")},secondaryButton:{label:"Label",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_0__.A.PLUS,iconRight:_icon__WEBPACK_IMPORTED_MODULE_0__.A.CHEVRON_RIGHT,onClick:()=>alert("Secondary Button Clicked")}}},__WEBPACK_DEFAULT_EXPORT__=meta,__namedExportsOrder=["Default","StackedFullWithObject","NonStackedFullWithObject","StackedFullWithHuman"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{\n  args: {\n    heading: 'Heading',\n    description: 'Description',\n    objectIllustration: {\n      object: 'LIGHTBULB'\n    }\n  }\n}",...Default.parameters?.docs?.source},description:{story:"Default EmptyState component with minimum props.",...Default.parameters?.docs?.description}}},StackedFullWithObject.parameters={...StackedFullWithObject.parameters,docs:{...StackedFullWithObject.parameters?.docs,source:{originalSource:"{\n  args: {\n    heading: 'Heading',\n    description: 'Description',\n    objectIllustration: {\n      object: 'LIGHTBULB'\n    },\n    primaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Primary Button Clicked')\n    },\n    secondaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Secondary Button Clicked')\n    }\n  }\n}",...StackedFullWithObject.parameters?.docs?.source},description:{story:"Stacked EmptyState component with full props examples for Object Illustration.",...StackedFullWithObject.parameters?.docs?.description}}},NonStackedFullWithObject.parameters={...NonStackedFullWithObject.parameters,docs:{...NonStackedFullWithObject.parameters?.docs,source:{originalSource:"{\n  args: {\n    heading: 'Heading',\n    description: 'Description',\n    isStacked: false,\n    objectIllustration: {\n      object: 'LIGHTBULB'\n    },\n    primaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Primary Button Clicked')\n    },\n    secondaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Secondary Button Clicked')\n    }\n  }\n}",...NonStackedFullWithObject.parameters?.docs?.source},description:{story:"Non-Stacked EmptyState component with full props examples for Object Illustration. <br />\n**Warning:** Non-Stacked EmptyState with Human Illustration is not supported visually.\nAs displayed, use an object illustration instead for best layout.",...NonStackedFullWithObject.parameters?.docs?.description}}},StackedFullWithHuman.parameters={...StackedFullWithHuman.parameters,docs:{...StackedFullWithHuman.parameters?.docs,source:{originalSource:"{\n  args: {\n    heading: 'Heading',\n    description: 'Description',\n    humanIllustration: {\n      body: 'VOTING',\n      hairs: 'MIDDLE',\n      accessory: 'EARRINGS_RHOMBUS',\n      sunglasses: 'BIG_ROUNDED',\n      expression: 'SMILE'\n    },\n    primaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Primary Button Clicked')\n    },\n    secondaryButton: {\n      label: 'Label',\n      iconLeft: IconType.PLUS,\n      iconRight: IconType.CHEVRON_RIGHT,\n      onClick: () => alert('Secondary Button Clicked')\n    }\n  }\n}",...StackedFullWithHuman.parameters?.docs?.source},description:{story:"Stacked EmptyState component with full props examples for Human Illustation.",...StackedFullWithHuman.parameters?.docs?.description}}};try{Default.displayName="Default",Default.__docgenInfo={description:"Default EmptyState component with minimum props.",displayName:"Default",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/states/emptyState/emptyState.stories.tsx#Default"]={docgenInfo:Default.__docgenInfo,name:"Default",path:"src/core/components/states/emptyState/emptyState.stories.tsx#Default"})}catch(__react_docgen_typescript_loader_error){}try{StackedFullWithObject.displayName="StackedFullWithObject",StackedFullWithObject.__docgenInfo={description:"Stacked EmptyState component with full props examples for Object Illustration.",displayName:"StackedFullWithObject",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/states/emptyState/emptyState.stories.tsx#StackedFullWithObject"]={docgenInfo:StackedFullWithObject.__docgenInfo,name:"StackedFullWithObject",path:"src/core/components/states/emptyState/emptyState.stories.tsx#StackedFullWithObject"})}catch(__react_docgen_typescript_loader_error){}try{NonStackedFullWithObject.displayName="NonStackedFullWithObject",NonStackedFullWithObject.__docgenInfo={description:"Non-Stacked EmptyState component with full props examples for Object Illustration. <br />\n**Warning:** Non-Stacked EmptyState with Human Illustration is not supported visually.\nAs displayed, use an object illustration instead for best layout.",displayName:"NonStackedFullWithObject",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/states/emptyState/emptyState.stories.tsx#NonStackedFullWithObject"]={docgenInfo:NonStackedFullWithObject.__docgenInfo,name:"NonStackedFullWithObject",path:"src/core/components/states/emptyState/emptyState.stories.tsx#NonStackedFullWithObject"})}catch(__react_docgen_typescript_loader_error){}try{StackedFullWithHuman.displayName="StackedFullWithHuman",StackedFullWithHuman.__docgenInfo={description:"Stacked EmptyState component with full props examples for Human Illustation.",displayName:"StackedFullWithHuman",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/states/emptyState/emptyState.stories.tsx#StackedFullWithHuman"]={docgenInfo:StackedFullWithHuman.__docgenInfo,name:"StackedFullWithHuman",path:"src/core/components/states/emptyState/emptyState.stories.tsx#StackedFullWithHuman"})}catch(__react_docgen_typescript_loader_error){}}}]);