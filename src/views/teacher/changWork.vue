<template>
  <!-- 作业管理 -->
  <section class="home-container">
    <MasterPage title>
      <!-- <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
        
      </div> -->
      
      <div slot="searchContent" class="search-content-slot">
        <span class="fotSize">作业：</span>
              <el-select v-model="value" placeholder="选择查看哪一次作业" @change="getstuhk(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <Button class="button_styles" type="primary" @click="getAllneedDatas" style="margin-left:10%px">查询</Button>
      </div>
      <div slot="paddingContent">
        <Table class="tablePage" stripe :columns="columns1" :data="tableDate" size="small"></Table>
      </div>
      <div slot="pager">
        <Page
          :total="total"
          :page-size="pagecount"
          :current="page"
          show-sizer
          show-total
          class="paging"
          @on-change="changepage"
        />
      </div>
    </MasterPage>
    <!-- 批改作业 -->
    <Modal
      v-model="changhomeModel"
      ref="changhomeModel"
      scrollable
      :title="titlTex"
      @on-ok="changeHomeworks"
      class-name="vertical-center-modal"
    >
            <el-input
        placeholder="请输入评改内容"
        v-model="input"
        clearable>
      </el-input>
      <div class="content_style">

      </div>
    </Modal>
  </section>
</template>
<script>
import MasterPage from "@/components/Master";
import { saveAs } from 'file-saver';
import axios from 'axios'
import qs from 'qs'
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      id:null,
      titlText:'作业',
      changhomeModel:false,
      titlTex:'提交作业',
      page: 1,
      input: '',
      teaCode:null,
      hwId:null,
      pagecount: 10,
      total: 0,
      homeModel:false,
      homeworkModel:false,
      hwkMessage:null,
      formItem: {
        clazzId: "",
        courseId: "",
        courseName: "",
        clazzName: "",
        detail: ""
      },
      columns1: [
        { title: "账号", key: "stuCode" ,width:150},
        { title: "班级", key: "className" },
        { title: "学生", key: "stuName" },
        { title: "作业", key: "id", align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  on: {
                    click: () => {
                      this.downLoadWorks(params.row.id)
                    },
                  },
                },
                "查看作业"
              ),
            ]);
          },
        },
        // { title: "作业描述", key: "detail" },
        { title: "操作", key: "id", align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  on: {
                    click: () => {
                      this.changhomeModel = true;
                      this.changeHomework(params.row.id)
                    },
                  },
                },
                "批改作业"
              ),
            ]);
          },
        },
        
      ],
      herf:'',
      tableDate: [],
      studentInfo: [],
      options:[],
      value:'',
      courseName: ""
    };
  },
  created() {},
  mounted() {
    this.getDate();
    setTimeout(()=>{
      this.getalreadyWork();
    },500)
  },
  methods: {
      changeHomeworks(){//提交评语
      console.log(this.input)
      let params = {
        id:this.id,//1
        score:this.input,
      }
      // this.$post('/teacher/check_hw',params)
      let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
         axios({
           method:'post',
           baseURL: baseUrl,
           url:'/teacher/check_hw',
           params:params,
         }).then(res => {
        if(res.data.code === 200) {
            this.$Message.success('提交成功');
        } else {
          this.$Message.error('提交失败');
        }
      })
      },
      downLoadWorks(id){//下载作业
        // console.log(id)
        let params={
            id:id,//1
            // id:1,
        }
        let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
         axios({
           method:'get',
           baseURL: baseUrl,
           url:'/teacher/download',
           params:params,
           responseType: 'blob'
         }).then(res => {
           saveAs(res.data,'作业.doc')
                console.log(res)
            })
      },
      getDate() {
      let self = this;
      let param = {
        name: JSON.parse(localStorage.getItem("teacher")).name
      }
      this.$post('/tea/teacher/queryById', param).then(res => {
        if(res.code === 200) {
            self.teaCode = res.result.code
            console.log(self.teaCode)
        } else {
          this.$Message.error('获取信息失败');
        }
      })
    },
    getalreadyWork(){
        let self = this;
        console.log(123465)
        let params= {
            code:this.teaCode,//TJ394831793404
            // code:'TJ394831793404',
        }
        this.$get('/teacher/get_hw',params).then(res=>{
        console.log(res)
        if(res.code === 200){
          res.result.map((item,index)=>{
            let temClass ={
              value:item.id,
              label:item.name
            }
            self.options = [...self.options,temClass]
          })
        }
    })
    },
    getstuhk(value){
        this.hwId = value
        console.log(this.hwId)
    },
    getAllneedDatas(){
        //查作业
        let self = this;
        let params= {
            hwId:this.hwId//1
            // hwId:1,
        }
        this.$get('/teacher/hw_list',params).then(res=>{
        console.log(res)
        if(res.code === 200){
          self.tableDate = [];
         res.result.map((item,index)=>{
            let temValue = {
                stuName:item.name,
                id:item.id,
                stuCode:item.stuCode,
                className:item.className
            }
            self.tableDate = [...self.tableDate,temValue]
         })
        }
    })
    },
    changeHomework(id){
        //提交评语
        console.log(id)
        this.id = id;
    },
    //下一页上一页
    changepage(val) {
      this.page = val;
      this.loadData();
    }
  }
};
</script>
<style lang="postcss" scoped>
.home-container {
}
.tablePage{
  width: 600px;
  margin: 0 auto;
}
.searchBtn {
  float: right;
}
.btnBox button {
  margin-right: 15px;
}
.ivu-icon-ios-game-controller-b {
  display: none;
}
/* .ivu-modal {
  width: 50% !important;
} */
.border1 {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}
.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #2d8cf0;
  font-size: 16px;
}
.titleName {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
  color: #01a7e8;
  font-size: 16px;
}
.contentStyle{
  width: 500px;
  height: 350px;
  overflow: scroll;
  border: 1px solid black;
  font-size:16px;
}
.button_styles{
    margin-left: 50px;
}
</style>

