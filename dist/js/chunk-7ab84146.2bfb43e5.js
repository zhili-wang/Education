(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ab84146"],{"207b":function(t,e,a){},"4f38":function(t,e,a){},"4fce":function(t,e,a){},"7f7f":function(t,e,a){var o=a("86cc").f,r=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in r||a("9e1e")&&o(r,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},c1d4:function(t,e,a){"use strict";var o=a("4fce"),r=a.n(o);r.a},d619:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"master-page-container",staticStyle:{height:"100%"}},[a("div",{staticClass:"master-page-wrap"},[t.title?a("div",{staticClass:"title-header"},[a("div",{staticClass:"title-content"},[a("div",{staticClass:"title-icon"},[t._t("title-icon")],2),a("p",{staticClass:"title"},[t._v(t._s(t.title))])]),a("div",{staticClass:"title-toolbar"},[t._t("title-toolbar")],2)]):t._e(),t.$slots.searchContent?a("div",{staticClass:"master-page-search-content"},[t._t("searchContent")],2):t._e(),t.$slots.search||t.$slots.btns?a("div",{staticClass:"master-page-content-toolbar"},[a("div",{staticClass:"bar-search"},[t._t("search")],2),a("div",{staticClass:"bar-group"},[t._t("btns")],2)]):t._e(),t.$slots.paddingContent?a("div",{staticClass:"master-page-padding-content"},[t._t("paddingContent")],2):t._e(),t.$slots.content?a("div",{staticClass:"master-page-nopadding-content"},[t._t("content")],2):t._e(),a("div",{staticClass:"page-wrapper"},[t._t("pager")],2)])])},r=[],s={data:function(){return{}},props:{title:{type:String}},mounted:function(){console.log("paddingContent=",this.$slots)},methods:{}},i=s,n=(a("fc7c"),a("2877")),l=Object(n["a"])(i,o,r,!1,null,"d331d1f8",null);e["a"]=l.exports},e250:function(t,e,a){"use strict";var o=a("4f38"),r=a.n(o);r.a},fc7c:function(t,e,a){"use strict";var o=a("207b"),r=a.n(o);r.a},ffd6:function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home-container control"},[a("MasterPage",{attrs:{title:""}},[a("div",{attrs:{slot:"title-icon"},slot:"title-icon"},[a("Icon",{attrs:{type:"ios-game-controller-b"}})],1),a("div",{staticClass:"search-content-slot",attrs:{slot:"searchContent"},slot:"searchContent"},[a("Form",{attrs:{model:t.formItem,"label-width":80}},[a("Row",[a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"商户名称："}},[a("Select",{model:{value:t.formItem.customerName,callback:function(e){t.$set(t.formItem,"customerName",e)},expression:"formItem.customerName"}},[a("Option",{attrs:{value:"-1"},nativeOn:{click:function(e){return t.changeProjectName("-1")}}},[t._v("请选择")]),t._l(t.CustomerObj,function(e,o){return a("Option",{key:o,attrs:{value:e.customerName},nativeOn:{click:function(a){return t.changeProjectName(e.customerName)}}},[t._v(t._s(e.customerName))])})],2)],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"项目名称："}},[a("Select",{model:{value:t.formItem.projectName,callback:function(e){t.$set(t.formItem,"projectName",e)},expression:"formItem.projectName"}},[a("Option",{attrs:{value:"-1"},nativeOn:{click:function(e){return t.changeGatewayName("-1")}}},[t._v("请选择")]),t._l(t.projectObj,function(e,o){return a("Option",{key:o,attrs:{value:e.name},nativeOn:{click:function(a){return t.changeGatewayName(e.name)}}},[t._v(t._s(e.name))])})],2)],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"网关名称："}},[a("Select",{model:{value:t.formItem.gatewayName,callback:function(e){t.$set(t.formItem,"gatewayName",e)},expression:"formItem.gatewayName"}},[a("Option",{attrs:{value:"-1"}},[t._v("请选择")]),t._l(t.gatewayObj,function(e,o){return a("Option",{key:o,attrs:{value:e.name}},[t._v(t._s(e.name))])})],2)],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"区域："}},[a("Input",{attrs:{placeholder:"请输入"},model:{value:t.formItem.area,callback:function(e){t.$set(t.formItem,"area",e)},expression:"formItem.area"}})],1)],1),a("Col",{attrs:{span:"6"}},[a("FormItem",{attrs:{label:"状态："}},[a("Select",{model:{value:t.formItem.state,callback:function(e){t.$set(t.formItem,"state",e)},expression:"formItem.state"}},[a("Option",{attrs:{value:"-1"}},[t._v("请选择")]),a("Option",{attrs:{value:"1"}},[t._v("正常")]),a("Option",{attrs:{value:"2"}},[t._v("故障")])],1)],1)],1),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"18"}},[a("Button",{attrs:{type:"info",icon:"ios-search"},on:{click:t.queryData}},[t._v("查询")])],1)],1)],1)],1),a("div",{attrs:{slot:"paddingContent"},slot:"paddingContent"},[a("Table",{attrs:{stripe:"",columns:t.columns1,data:t.tableDate,size:"small"}})],1),a("div",{attrs:{slot:"pager"},slot:"pager"},[a("Page",{staticClass:"paging",attrs:{total:t.total,"page-size":t.pagecount,current:t.page,"show-total":"","show-sizer":""},on:{"on-change":t.changepage,"on-page-size-change":t.pagesize}})],1)]),a("Modal",{staticClass:"queryModel",attrs:{"class-name":"vertical-center-modal",scrollable:"",title:"配置",width:"1000px"},model:{value:t.queryModel,callback:function(e){t.queryModel=e},expression:"queryModel"}},[a("deviceControlDetail",{ref:"deviceControlDetailRef"}),a("div",{staticStyle:{display:"none"},attrs:{slot:"footer"},slot:"footer"})],1)],1)},r=[],s=(a("7f7f"),a("d619")),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home-container config-detail"},[a("MasterPage",{attrs:{title:""}},[a("div",{attrs:{slot:"title-icon"},slot:"title-icon"},[a("Icon",{attrs:{type:"ios-game-controller-b"}})],1),a("div",{staticClass:"search-content-slot",attrs:{slot:"searchContent"},slot:"searchContent"},[a("Form",{attrs:{model:t.formItem,"label-width":80}},[a("Row",[a("Col",{attrs:{span:"4"}},[a("FormItem",{attrs:{label:"网关名称："}},[t._v(t._s(t.gatewayName))])],1),a("Col",{attrs:{span:"7"}},[a("FormItem",{attrs:{label:"状态："}},[a("Select",{model:{value:t.formItem.state,callback:function(e){t.$set(t.formItem,"state",e)},expression:"formItem.state"}},[a("Option",{attrs:{value:"-1"}},[t._v("请选择")]),a("Option",{attrs:{value:"1"}},[t._v("正常")]),a("Option",{attrs:{value:"2"}},[t._v("故障")])],1)],1)],1),a("Col",{attrs:{span:"7"}},[a("FormItem",{attrs:{label:"分组："}},[a("Select",{model:{value:t.formItem.group,callback:function(e){t.$set(t.formItem,"group",e)},expression:"formItem.group"}},[a("Option",{attrs:{value:"-1"}},[t._v("请选择")]),t._l(t.grounpObj,function(e,o){return a("Option",{key:o,attrs:{value:e.group}},[t._v(t._s(e.group))])})],2)],1)],1),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"6"}},[a("Button",{staticClass:"searchBtn",attrs:{type:"info",icon:"ios-search"},on:{click:t.queryData}},[t._v("查询")])],1)],1)],1),a("div",{staticClass:"btnBox"},[a("RadioGroup",{model:{value:t.isGroup,callback:function(e){t.isGroup=e},expression:"isGroup"}},[a("span",{on:{click:t.grounpRadio}},[a("Radio",{attrs:{label:"1"}},[a("span",[t._v("单个")])])],1),a("span",{on:{click:t.grounpRadio}},[a("Radio",{attrs:{label:"2"}},[a("span",[t._v("组")])])],1)]),a("Button",{attrs:{type:"error"},on:{click:function(e){return t.setLamp(1)}}},[t._v("亮")]),a("Button",{attrs:{type:"warning"},on:{click:function(e){return t.setLamp(3)}}},[t._v("闪一闪")]),a("Button",{staticStyle:{background:"#ddd"},attrs:{type:"default"},on:{click:function(e){return t.setLamp(2)}}},[t._v("灭")]),a("Button",{attrs:{type:"primary"},on:{click:t.lampConfig}},[t._v("配置")])],1)],1),a("div",{attrs:{slot:"paddingContent"},slot:"paddingContent"},[a("Table",{ref:"table01",attrs:{stripe:"",columns:t.columns1,data:t.tableDate,size:"small"},on:{"on-selection-change":t.selectList}})],1),a("div",{attrs:{slot:"pager"},slot:"pager"},[a("Page",{staticClass:"paging",attrs:{total:t.total,"page-size":t.pagecount,current:t.page,"show-sizer":"","show-total":""},on:{"on-change":t.changepage,"on-page-size-change":t.pagesize}})],1)]),a("Modal",{ref:"configModal",staticClass:"queryModel",attrs:{scrollable:"",title:"配置",width:"800px"},on:{"on-ok":t.saveConfig},model:{value:t.configModal,callback:function(e){t.configModal=e},expression:"configModal"}},[a("Form",{ref:"formValidate",attrs:{model:t.modelForm,"label-width":100,rules:t.ruleInline}},[a("Row",[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"描述：",prop:"name"}},[a("Input",{attrs:{placeholder:"请输入"},model:{value:t.modelForm.name,callback:function(e){t.$set(t.modelForm,"name",e)},expression:"modelForm.name"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"上报精度：",prop:"syncStep"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.syncStep,callback:function(e){t.$set(t.modelForm,"syncStep",e)},expression:"modelForm.syncStep"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"是否常亮："}},[a("Select",{model:{value:t.formItem.alwaysBright,callback:function(e){t.$set(t.formItem,"alwaysBright",e)},expression:"formItem.alwaysBright"}},[a("Option",{attrs:{value:"1"}},[t._v("是")]),a("Option",{attrs:{value:"0"}},[t._v("否")])],1)],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"RC密码：",prop:"rcPwd"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.rcPwd,callback:function(e){t.$set(t.modelForm,"rcPwd",e)},expression:"modelForm.rcPwd"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"工作门限：",prop:"workLimit"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.workLimit,callback:function(e){t.$set(t.modelForm,"workLimit",e)},expression:"modelForm.workLimit"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"休眠门限：",prop:"sleepLimit"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.sleepLimit,callback:function(e){t.$set(t.modelForm,"sleepLimit",e)},expression:"modelForm.sleepLimit"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"工作亮度：",prop:"workBrightness"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.workBrightness,callback:function(e){t.$set(t.modelForm,"workBrightness",e)},expression:"modelForm.workBrightness"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"休眠亮度：",prop:"sleepBrightness"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.sleepBrightness,callback:function(e){t.$set(t.modelForm,"sleepBrightness",e)},expression:"modelForm.sleepBrightness"}})],1)],1),a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"延迟时间：",prop:"sleepTime"}},[a("Input",{attrs:{type:"number",placeholder:"请输入"},model:{value:t.modelForm.sleepTime,callback:function(e){t.$set(t.modelForm,"sleepTime",e)},expression:"modelForm.sleepTime"}})],1)],1)],1)],1)],1)],1)},n=[],l=(a("ac6a"),{components:{MasterPage:s["a"]},data:function(){var t=this;return{getImei:"",isdisabledFn:!1,page:1,pagecount:10,total:0,configModal:!1,modalLoading:!0,projectName:"",gatewayName:"",macAdd:"",isGroup:"1",grounpObj:[],formItem:{state:"",group:""},row:{type:"",grounp:"",mac:"",imei:""},modelForm:{name:"",syncStep:"",alwaysBright:"1",rcPwd:"",workLimit:"",sleepLimit:"",sleepBrightness:"",workBrightness:"",sleepTime:"",group:""},ruleInline:{name:[{required:!0,message:"不能为空"}],syncStep:[{required:!0,message:"不能为空"}],rcPwd:[{required:!0,message:"不能为空"}],workLimit:[{required:!0,message:"不能为空"}],sleepLimit:[{required:!0,message:"不能为空"}],sleepBrightness:[{required:!0,message:"不能为空"}],workBrightness:[{required:!0,message:"不能为空"}],sleepTime:[{required:!0,message:"不能为空"}]},isDisabled:!1,columns1:[{title:"单选",width:70,align:"center",render:function(e,a){var o=a.row.mac,r=!0;r=t.row.mac==o;return e("radio",{props:{label:"",value:r},on:{"on-change":function(){console.log(a.row),t.row.mac=a.row.mac,t.row.type=a.row.type,t.row.group=a.row.group,t.row.imei=a.row.imei}}})}},{title:"灯地址",key:"mac",width:120},{title:"灯电量",key:"power"},{title:"版本号",key:"version"},{title:"状态",key:"state",width:"70px",render:function(t,e){return t("div","1"==e.row.state?"正常":"故障")}},{title:"上线时间",key:"createTime",width:160,render:function(e,a){return e("div",t.$unixTimeToDateTime(a.row.createTime))}},{title:"分组",key:"group",width:70},{title:"序号",key:"indexNo",width:70},{title:"操作",key:"action",width:90,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.offline(a.row)}}},"解绑")])}}],tableDate:[]}},mounted:function(){this.loadData()},methods:{grounpRadio:function(){"1"==this.isGroup?(this.isDisabled=!0,this.isdisabledFn=!0):(this.isDisabled=!1,this.isdisabledFn=!1)},loadData:function(){var t=this;t.$Spin.show();var e={projectName:this.projectName,gatewayName:this.gatewayName,page:this.page,pagecount:this.pagecount};""!=this.formItem.group&&"-1"!=this.formItem.group&&(e.group=this.formItem.group),""!=this.formItem.state&&"-1"!=this.formItem.state&&(e.state=this.formItem.state),this.$post("lamp/query",e).then(function(e){console.log(e),1==e.code?(t.tableDate=e.data,t.total=e.total):(t.tableDate=[],t.total=0),t.$Spin.hide()})},queryData:function(){this.loadData()},changepage:function(t){this.page=t,this.loadData()},pagesize:function(t){this.pagecount=t,this.loadData()},offline:function(t){var e=this,a=this;this.$Modal.confirm({title:"提示",content:"<p>是否确定解绑？</p>",onOk:function(){var o={projectName:t.projectName,gatewayName:t.gatewayName,mac:t.mac};e.$post("lamp/unbind",o).then(function(t){console.log(t),1==t.code?a.$Message.success("解绑成功！"):a.$Message.error(t.code+":"+t.msg+"---\x3e<br/>解绑失败！"),a.formItem.state="",a.formItem.group="",a.loadData()})},onCancel:function(){}})},getGrounp:function(){var t=this,e={imei:this.getImei};this.$post("gateway/queryGroup",e).then(function(e){console.log(e),1==e.code?t.grounpObj=e.data:t.grounpObj=[]})},selectList:function(t){var e="";t.forEach(function(t){e+=t.mac+","}),this.macAdd=e},lampConfig:function(){if(this.modelForm={name:"",syncStep:"",alwaysBright:"1",rcPwd:"",workLimit:"",sleepLimit:"",sleepBrightness:"",workBrightness:"",sleepTime:""},1==this.isGroup){if(""==this.row.mac)return this.$Notice.error({title:"提示",desc:"请先选择需要配置的行！"}),!1;if(""==this.formItem.group||"-1"==this.formItem.group)return this.$Notice.error({title:"提示",desc:"请先选择分组！"}),!1;""!=this.row.mac&&""!=this.formItem.group&&(this.configModal=!0)}else 2==this.isGroup&&(""==this.formItem.group||"-1"==this.formItem.group?this.$Notice.error({title:"提示",desc:"请先选择分组！"}):this.configModal=!0)},setLamp:function(t){console.log("ppp",this.isGroup),"1"==this.isGroup?""==this.row.mac?this.$Notice.error({title:"提示",desc:"请先选择需要操作的数据行！"}):this.handel(t):(console.log("pp2",this.formItem.group),""==this.formItem.group?this.$Notice.error({title:"提示",desc:"请先选择需要操作的分组！"}):this.handel(t))},handel:function(t){var e=this,a={type:t};"1"==this.isGroup?(a.group=this.row.group,a.mac=this.row.mac,a.imei=this.row.imei):a.group=this.formItem.group,this.$post("lamp/operate",a).then(function(t){console.log(t),1==t.code?e.$Message.success("操作成功！"):e.$Message.error(t.code+":"+t.msg+"---\x3e<br/>操作失败！")})},saveConfig:function(){var t=this;this.$refs["formValidate"].validate(function(e){if(!e)return t.$refs.configModal.visible=!0,t.modalLoading=!1,t.configModal=!0,!1;var a=t,o={imei:t.row.imei,group:t.formItem.group,name:t.modelForm.name,syncStep:t.modelForm.syncStep,alwaysBright:t.modelForm.alwaysBright,rcPassword:t.modelForm.rcPwd,workLimit:t.modelForm.workLimit,sleepLimit:t.modelForm.sleepLimit,sleepBrightness:t.modelForm.sleepBrightness,workBrightness:t.modelForm.workBrightness,sleepTime:t.modelForm.sleepTime};1==t.isGroup&&(o.mac=t.row.mac),t.$post("lamp/configLamp",o).then(function(t){console.log(t),1==t.code?a.$Message.success("保存成功！"):a.$Message.error(t.code+":"+t.msg+"---\x3e<br/>保存失败！"),a.formItem.state="",a.formItem.group="",console.log(a.formItem.group,999),a.loadData()})})}}}),m=l,c=(a("c1d4"),a("2877")),p=Object(c["a"])(m,i,n,!1,null,"204bc7a1",null),u=p.exports,d={components:{MasterPage:s["a"],deviceControlDetail:u},data:function(){var t=this;return{page:1,pagecount:10,total:0,queryModel:!1,CustomerObj:[],projectObj:[],gatewayObj:[],formItem:{customerName:"",projectName:"",area:"",gatewayName:"",state:""},columns1:[{type:"index2",title:"序号",width:60,align:"center",render:function(e,a){return e("span",a.index+(t.page-1)*t.pagecount+1)}},{title:"网关",key:"name",align:"center"},{title:"IMEI",key:"imei"},{title:"正常灯",key:"lampOkCount",align:"center"},{title:"异常灯",key:"lampNGCount",align:"center"},{title:"正常灯消耗电量",key:"sumPow",align:"center"},{title:"故障灯消耗电量",key:"sumNGPow",align:"center"},{title:"操作",key:"action",width:150,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.queryDetail(a.row)}}},"配置")])}}],tableDate:[]}},mounted:function(){this.initData(),this.getCustomer()},methods:{initData:function(){var t={page:this.page,pagecount:this.pagecount},e=JSON.parse(localStorage.getItem("userInfo"));""!=e.customerName&&(t.customerName=e.customerName),""!=e.projectName&&(t.projectName=e.projectName),this.loadData(t)},loadData:function(t){var e=this;this.$Spin.show(),this.$post("gateway/query",t).then(function(t){console.log(t),1==t.code?(e.tableDate=t.data,e.total=t.total):(e.tableDate=[],e.total=0),e.$Spin.hide()})},queryData:function(){this.queryConditions()},queryConditions:function(){var t={page:this.page,pagecount:this.pagecount};""!=this.formItem.customerName&&"-1"!=this.formItem.customerName&&(t.customerName=this.formItem.customerName),""!=this.formItem.projectName&&"-1"!=this.formItem.projectName&&(t.projectName=this.formItem.projectName),""!=this.formItem.gatewayName&&"-1"!=this.formItem.gatewayName&&(t.name=this.formItem.gatewayName),""!=this.formItem.area&&(t.area=this.formItem.area),""!=this.formItem.state&&"-1"!=this.formItem.state&&(t.state=this.formItem.state),this.loadData(t)},changepage:function(t){this.page=t,this.loadData()},pagesize:function(t){this.pagecount=t,this.loadData()},getCustomer:function(t){var e=this,a={name:t};this.$post("project/queryCustomer",a).then(function(t){1==t.code?e.CustomerObj=t.data:(e.CustomerObj=[],e.formItem.projectName="-1",e.formItem.gatewayName="-1")})},changeProjectName:function(t){var e=this,a={customerName:t};this.$post("project/query",a).then(function(t){1==t.code?(e.projectObj=t.data,e.gatewayObj=[]):(e.projectObj=[],e.gatewayObj=[],e.formItem.projectName="-1",e.formItem.gatewayName="-1")})},changeGatewayName:function(t){var e=this,a={projectName:t};this.$post("gateway/queryGateway ",a).then(function(t){1==t.code?e.gatewayObj=t.data:(e.gatewayObj=[],e.formItem.gatewayName="-1")})},queryDetail:function(t){var e=this;this.queryModel=!0,this.$nextTick(function(){e.$refs.deviceControlDetailRef.projectName=t.projectName,e.$refs.deviceControlDetailRef.gatewayName=t.name,e.$refs.deviceControlDetailRef.formItem.group="",e.$refs.deviceControlDetailRef.formItem.state="",e.$refs.deviceControlDetailRef.isGroup="1",e.$refs.deviceControlDetailRef.getImei=t.imei,e.$refs.deviceControlDetailRef.loadData(),e.$refs.deviceControlDetailRef.getGrounp()})}}},g=d,f=(a("e250"),Object(c["a"])(g,o,r,!1,null,"7abf336c",null));e["default"]=f.exports}}]);