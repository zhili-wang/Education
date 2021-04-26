(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-396aae76"],{"136d":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"home-container"},[a("MasterPage",{attrs:{title:""}},[a("div",{attrs:{slot:"title-icon"},slot:"title-icon"},[a("Icon",{attrs:{type:"ios-game-controller-b"}})],1),a("div",{staticClass:"search-content-slot",attrs:{slot:"searchContent"},slot:"searchContent"},[a("div",{staticClass:"btnBox"},[a("Button",{attrs:{type:"primary"},on:{click:t.addData}},[t._v("新增")])],1)]),a("div",{attrs:{slot:"paddingContent"},slot:"paddingContent"},[a("Table",{attrs:{stripe:"",columns:t.columns1,data:t.tableDate,size:"small"}})],1),a("div",{attrs:{slot:"pager"},slot:"pager"},[a("Page",{staticClass:"paging",attrs:{total:t.total,"page-size":t.pagecount,current:t.page,"show-sizer":"","show-total":""},on:{"on-change":t.changepage,"on-page-size-change":t.pagesize}})],1)]),a("Modal",{ref:"addModel",attrs:{"class-name":"vertical-center-modal",scrollable:"",title:"添加",width:"500px"},on:{"on-ok":t.saveData},model:{value:t.addModel,callback:function(e){t.addModel=e},expression:"addModel"}},[a("Form",{ref:"formValidate",attrs:{model:t.formItem,"label-width":110,rules:t.ruleInline}},[a("Row",[a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"升级目标：",prop:"targetId"}},[a("Select",{model:{value:t.formItem.targetId,callback:function(e){t.$set(t.formItem,"targetId",e)},expression:"formItem.targetId"}},[a("Option",{attrs:{value:"1"}},[t._v("灯")]),a("Option",{attrs:{value:"0"}},[t._v("网关")])],1)],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"版本：",prop:"version"}},[a("Input",{attrs:{type:"text",placeholder:"请输入"},model:{value:t.formItem.version,callback:function(e){t.$set(t.formItem,"version",e)},expression:"formItem.version"}})],1)],1),a("Col",{attrs:{span:"24"}},[a("FormItem",{attrs:{label:"升级文件："}},[a("Upload",{ref:"upload",attrs:{"before-upload":t.handleBeforeUpload,"on-success":t.handleSuccess,multiple:"",action:t.uploadUrl,name:"upFile"}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("上传文件")])],1)],1)],1)],1)],1)],1)],1)},s=[],n=a("d619"),i={components:{MasterPage:n["a"]},data:function(){var t=this;return{uploadUrl:this.baseUrl+"/upgrade/upload",page:1,pagecount:10,total:0,file:null,loadingStatus:!1,addModel:!1,formItem:{targetId:"",version:"",fileName:""},ruleInline:{targetId:[{required:!0,message:"不能为空"}],version:[{required:!0,message:"不能为空"}]},columns1:[{type:"index2",title:"序号",width:60,align:"center",render:function(e,a){return e("span",a.index+(t.page-1)*t.pagecount+1)}},{title:"升级目标",key:"targetId",render:function(t,e){return t("div","1"==e.row.targetId?"灯":"网关")}},{title:"版本",key:"version"},{title:"文件名",key:"filePath"},{title:"创建时间",key:"updateTime",render:function(e,a){return e("div",t.$unixTimeToDateTime(a.row.createTime))}},{title:"操作",key:"action",width:150,align:"center",render:function(e,a){return e("div",[e("Button",{props:{type:"error",size:"small"},on:{click:function(){t.remove(a.row)}}},"删除")])}}],tableDate:[],modalLoading:!0,uploadList:[]}},mounted:function(){this.loadData()},methods:{loadData:function(){var t=this;t.$Spin.show();var e={page:this.page,pagecount:this.pagecount};this.$post("upgrade/query",e).then(function(e){console.log(e),1==e.code?(t.tableDate=e.data,t.total=e.total):(t.tableDate=[],t.total=0),t.$Spin.hide()})},changepage:function(t){this.page=t,this.loadData()},pagesize:function(t){this.pagecount=t,this.loadData()},addData:function(){this.addModel=!0,this.uploadList=[],this.$refs.upload.fileList=[],this.formItem={version:"",targetId:"",fileName:""}},saveData:function(){var t=this;this.$refs["formValidate"].validate(function(e){if(!e)return t.$refs.addModel.visible=!0,t.modalLoading=!1,t.addModel=!0,!1;if(""==t.formItem.fileName)return t.$Message.error("请上传升级文件！"),t.$refs.addModel.visible=!0,t.modalLoading=!1,t.addModel=!0,!1;var a=t,o={version:t.formItem.version,targetId:t.formItem.targetId,fileName:t.formItem.fileName};t.$post("upgrade/addUpgradeFile",o).then(function(t){console.log(t),1==t.code?a.$Message.info("保存成功！"):a.$Message.error(t.code+":"+t.msg+"---\x3e<br/>保存失败！"),a.loadData()})})},remove:function(t){var e=this,a=this;this.$Modal.confirm({title:"提示",content:"<p>确定要删除绑定吗？</p>",onOk:function(){var o={version:t.version,targetId:t.targetId};e.$post("upgrade/delete",o).then(function(t){console.log(t),1==t.code?a.$Message.info("删除成功！"):a.$Message.error(t.code+":"+t.msg+"---\x3e<br/>操作失败！"),a.loadData()})},onCancel:function(){}})},handleSuccess:function(t,e){1==t.code?(this.$Message.info("上传成功！"),this.formItem.fileName=t.path):(this.$Message.error("上传失败！"),this.formItem.fileName="")},handleBeforeUpload:function(){var t=this.$refs.upload.fileList.length;if(1==t)return this.$Notice.warning({title:"提示",desc:"只能上传一个文件！"}),!1}}},r=i,l=(a("3d88"),a("2877")),d=Object(l["a"])(r,o,s,!1,null,"6daef7bc",null);e["default"]=d.exports},"207b":function(t,e,a){},"3d88":function(t,e,a){"use strict";var o=a("913b"),s=a.n(o);s.a},"913b":function(t,e,a){},d619:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"master-page-container",staticStyle:{height:"100%"}},[a("div",{staticClass:"master-page-wrap"},[t.title?a("div",{staticClass:"title-header"},[a("div",{staticClass:"title-content"},[a("div",{staticClass:"title-icon"},[t._t("title-icon")],2),a("p",{staticClass:"title"},[t._v(t._s(t.title))])]),a("div",{staticClass:"title-toolbar"},[t._t("title-toolbar")],2)]):t._e(),t.$slots.searchContent?a("div",{staticClass:"master-page-search-content"},[t._t("searchContent")],2):t._e(),t.$slots.search||t.$slots.btns?a("div",{staticClass:"master-page-content-toolbar"},[a("div",{staticClass:"bar-search"},[t._t("search")],2),a("div",{staticClass:"bar-group"},[t._t("btns")],2)]):t._e(),t.$slots.paddingContent?a("div",{staticClass:"master-page-padding-content"},[t._t("paddingContent")],2):t._e(),t.$slots.content?a("div",{staticClass:"master-page-nopadding-content"},[t._t("content")],2):t._e(),a("div",{staticClass:"page-wrapper"},[t._t("pager")],2)])])},s=[],n={data:function(){return{}},props:{title:{type:String}},mounted:function(){console.log("paddingContent=",this.$slots)},methods:{}},i=n,r=(a("fc7c"),a("2877")),l=Object(r["a"])(i,o,s,!1,null,"d331d1f8",null);e["a"]=l.exports},fc7c:function(t,e,a){"use strict";var o=a("207b"),s=a.n(o);s.a}}]);