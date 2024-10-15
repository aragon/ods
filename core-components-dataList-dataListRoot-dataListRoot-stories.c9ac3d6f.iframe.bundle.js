"use strict";(self.webpackChunk_aragon_ods=self.webpackChunk_aragon_ods||[]).push([[8638],{"./src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AsyncList:()=>AsyncList,CustomLayout:()=>CustomLayout,StaticList:()=>StaticList,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_avatars__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/core/components/avatars/index.ts"),_icon__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/core/components/icon/index.ts"),_dataListItem__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./src/core/components/dataList/dataListItem/index.ts"),_index__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./src/core/components/dataList/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/react/jsx-runtime.js");const meta={title:"Core/Components/DataList/DataList.Root",component:_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Root,parameters:{design:{type:"figma",url:"https://www.figma.com/file/P0GeJKqILL7UXvaqu5Jj7V/v1.1.0?type=design&node-id=13724-27671&mode=dev"}}},ListItemComponent=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_dataListItem__WEBPACK_IMPORTED_MODULE_3__.e,{className:"flex flex-row gap-2",href:"https://aragon.org",target:"_blank",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_avatars__WEBPACK_IMPORTED_MODULE_1__.eu,{}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p",{className:"grow text-base font-normal leading-normal text-neutral-800",children:["#",props.id]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p",{className:"text-sm font-normal leading-normal text-neutral-500",children:"Some info"})]}),ListItemComponentLoading=()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_dataListItem__WEBPACK_IMPORTED_MODULE_3__.e,{className:"flex animate-pulse flex-row items-center gap-2",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"size-6 rounded-full bg-neutral-50"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div",{className:"flex grow flex-col gap-2",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"h-2 grow rounded bg-neutral-50"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div",{className:"h-2 w-1/3 rounded bg-neutral-50"})]})]}),StaticListComponent=props=>{const{itemsCount,layoutClassName,...otherProps}=props,[searchValue,setSearchValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[activeSort,setActiveSort]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("id_asc"),sortItems=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>[{value:"id_asc",label:"ID increased",type:"ASC"},{value:"id_desc",label:"ID decreased",type:"DESC"}]),[]),shouldFilter=null!=searchValue&&searchValue.trim().length>0,userIds=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>[...Array(itemsCount)].map((()=>Math.floor(1e5*Math.random())))),[itemsCount]),filteredUsers=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>(shouldFilter?userIds.filter((id=>id.toString().includes(searchValue))):userIds).toSorted(((a,b)=>"id_asc"===activeSort?a-b:b-a))),[userIds,searchValue,activeSort,shouldFilter]),entityLabel=1===filteredUsers.length?"User":"Users",state=shouldFilter?"filtered":"idle",emptyFilteredState={heading:"No users found",description:"Your applied filters are not matching with any results. Reset and search with other filters!",secondaryButton:{label:"Reset all filters",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_2__.A.RELOAD,onClick:()=>setSearchValue(void 0)}};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Root,{itemsCount:filteredUsers?.length,state,...otherProps,entityLabel,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Filter,{onFilterClick:()=>alert("filter click"),searchValue,onSearchValueChange:setSearchValue,placeholder:"Filter by user id",activeSort,onSortChange:setActiveSort,sortItems,onResetFiltersClick:()=>setSearchValue(void 0)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Container,{emptyFilteredState,layoutClassName,children:filteredUsers?.map((id=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ListItemComponent,{id},id)))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Pagination,{})]})},StaticList={args:{pageSize:4,itemsCount:21},render:props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StaticListComponent,{...props})},CustomLayout={args:{pageSize:9,itemsCount:21},render:props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StaticListComponent,{layoutClassName:"grid grid-cols-1 lg:grid-cols-3",...props})},getUsers=(dbUsers=[],search="",page=0,sort="id_asc",pageSize=6)=>{const filteredUsers=((users=[],value)=>null!=value&&value.trim().length>0?users.filter((id=>id.toString().includes(value))):users)(dbUsers,search),sortedUsers=((users=[],sort)=>users?.toSorted(((a,b)=>"id_asc"===sort?a-b:b-a)))(filteredUsers,sort),paginatedUsers=((users=[],page=0,pageSize=6)=>users.slice(0,Math.min(dbUsers.length,(page+1)*pageSize)))(sortedUsers,page,pageSize);return{total:filteredUsers.length,items:paginatedUsers}},AsyncListComponent=props=>{const{itemsCount,pageSize,...otherProps}=props,[dataListState,setDataListState]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[currentPage,setCurrentPage]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),[searchValue,setSearchValue]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(),[activeSort,setActiveSort]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("id_asc"),[users,setUsers]=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({total:0,items:[]}),requestTimeout=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),dbUsers=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),sortItems=(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)((()=>[{value:"id_asc",label:"ID increased",type:"ASC"},{value:"id_desc",label:"ID decreased",type:"DESC"}]),[]),handleSearchValueChange=value=>{setSearchValue(value),setCurrentPage(0)};(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{setDataListState("initialLoading"),setTimeout((()=>{dbUsers.current=[...Array(itemsCount)].map((()=>Math.floor(1e5*Math.random()))),setUsers(getUsers(dbUsers.current)),setDataListState("idle")}),1e3)}),[itemsCount]),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{if(dbUsers.current)return setDataListState((state=>"fetchingNextPage"!==state?"loading":state)),requestTimeout.current=setTimeout((()=>{setUsers(getUsers(dbUsers.current,searchValue,currentPage,activeSort,pageSize));const isFiltered=null!=searchValue&&searchValue.trim().length>0;setDataListState(isFiltered?"filtered":"idle")}),1e3),()=>{clearTimeout(requestTimeout.current)}}),[searchValue,currentPage,activeSort,pageSize]);const emptyFilteredState={heading:"No users found",description:"Your applied filters are not matching with any results. Reset and search with other filters!",secondaryButton:{label:"Reset all filters",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_2__.A.RELOAD,onClick:()=>handleSearchValueChange()}},emptyState={heading:"No users found",description:"Set the itemCount property to be greater than 0 to generate and display the users list",primaryButton:{label:"Create user",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_2__.A.PLUS,onClick:()=>alert("create user")}},errorState={heading:"Error loading users",description:"There was an error loading the users. Try again!",secondaryButton:{label:"Reload users",iconLeft:_icon__WEBPACK_IMPORTED_MODULE_2__.A.RELOAD,onClick:()=>alert("reload!")}},entityLabel=1===users.total?"User":"Users";return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Root,{itemsCount:users.total,pageSize,state:dataListState,onLoadMore:()=>{setDataListState("fetchingNextPage"),setCurrentPage((current=>current+1))},...otherProps,entityLabel,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Filter,{onFilterClick:()=>alert("filter click"),searchValue,onSearchValueChange:handleSearchValueChange,placeholder:"Filter by user id",activeSort,onSortChange:setActiveSort,sortItems,onResetFiltersClick:()=>setSearchValue(void 0)}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Container,{SkeletonElement:ListItemComponentLoading,errorState,emptyState,emptyFilteredState,children:users.items.map((id=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(ListItemComponent,{id},id)))}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Tr.Pagination,{})]})},AsyncList={args:{pageSize:6,itemsCount:122},render:({onLoadMore,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(AsyncListComponent,{...props})},__WEBPACK_DEFAULT_EXPORT__=meta,__namedExportsOrder=["StaticList","CustomLayout","AsyncList"];StaticList.parameters={...StaticList.parameters,docs:{...StaticList.parameters?.docs,source:{originalSource:"{\n  args: {\n    pageSize: 4,\n    itemsCount: 21\n  },\n  render: props => <StaticListComponent {...props} />\n}",...StaticList.parameters?.docs?.source},description:{story:"Usage of the DataList.Root component with a static list of items.",...StaticList.parameters?.docs?.description}}},CustomLayout.parameters={...CustomLayout.parameters,docs:{...CustomLayout.parameters?.docs,source:{originalSource:'{\n  args: {\n    pageSize: 9,\n    itemsCount: 21\n  },\n  render: props => <StaticListComponent layoutClassName="grid grid-cols-1 lg:grid-cols-3" {...props} />\n}',...CustomLayout.parameters?.docs?.source},description:{story:"Usage of the DataList.Root component with a custom layout for the DataList.Item components",...CustomLayout.parameters?.docs?.description}}},AsyncList.parameters={...AsyncList.parameters,docs:{...AsyncList.parameters?.docs,source:{originalSource:"{\n  args: {\n    pageSize: 6,\n    itemsCount: 122\n  },\n  render: ({\n    onLoadMore,\n    ...props\n  }) => <AsyncListComponent {...props} />\n}",...AsyncList.parameters?.docs?.source},description:{story:"Usage of the DataList.Root component with an async loaded list.",...AsyncList.parameters?.docs?.description}}};try{StaticList.displayName="StaticList",StaticList.__docgenInfo={description:"Usage of the DataList.Root component with a static list of items.",displayName:"StaticList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#StaticList"]={docgenInfo:StaticList.__docgenInfo,name:"StaticList",path:"src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#StaticList"})}catch(__react_docgen_typescript_loader_error){}try{CustomLayout.displayName="CustomLayout",CustomLayout.__docgenInfo={description:"Usage of the DataList.Root component with a custom layout for the DataList.Item components",displayName:"CustomLayout",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#CustomLayout"]={docgenInfo:CustomLayout.__docgenInfo,name:"CustomLayout",path:"src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#CustomLayout"})}catch(__react_docgen_typescript_loader_error){}try{AsyncList.displayName="AsyncList",AsyncList.__docgenInfo={description:"Usage of the DataList.Root component with an async loaded list.",displayName:"AsyncList",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#AsyncList"]={docgenInfo:AsyncList.__docgenInfo,name:"AsyncList",path:"src/core/components/dataList/dataListRoot/dataListRoot.stories.tsx#AsyncList"})}catch(__react_docgen_typescript_loader_error){}}}]);