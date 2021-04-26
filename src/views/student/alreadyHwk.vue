<template>
  <!-- 作业管理 -->
  <section class="home-container">
    <MasterPage title>
      <!-- <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
      </div> -->
      <div slot="searchContent" class="search-content-slot">
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
    <!-- 作业弹窗 -->
    <Modal
      v-model="homeworkModel"
      ref="homeworkModel"
      scrollable
      :title="titlText"
      class-name="vertical-center-modal"
    >
    <div class="contentStyle">{{score}}</div>
    </Modal>
    <!-- 提交作业 -->
  </section>
</template>
<script>
import MasterPage from "@/components/Master";
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      titlText:'作业',
      titlTex:'提交作业',
      page: 1,
      file:null,
      stuId:null,
      hwId:null,
      score:'',
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
        { title: "作业描述", key: "homework" },
        // { title: "作业描述", key: "detail" },
        { title: "操作", key: "action", align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                    //   this.checkHome(params.row.id)
                    this.checkHome()
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
        
      ],
      tableDate: [],
      studentInfo: [],
      courseName: ""
    };
  },
  created() {},
  mounted() {
    this.getDate();
    this.studentInfo = JSON.parse(localStorage.getItem("student"));
    console.log(this.studentInfo, 10000);
  },
  methods: {
    //加载数据
    getDate() {
      let self = this
      let param = {
        name: JSON.parse(localStorage.getItem("student")).name
      }
      this.$post('/student/queryByCode', param).then(res => {
        if(res.code === 200) {
          self.stuId = res.result.id
        } else {
          this.$Message.error('获取信息失败');
        }
      })
    },
    putHomeworks(value){
      var thiz = this;
      var params = {
        page: this.page,
        limit: this.pagecount,
        clazzId: this.studentInfo.clazzId,
        courseName: this.courseName
      };
      this.$get("homework/getListByPage", params).then(function(msg) {
          msg.rows.map((item,index)=>{
            if(item.id === value){
              thiz.hwId = item.id
            }
          })
      });
    },
    checkHome(){
        this.homeworkModel = true; 
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
  width: 900px;
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
</style>

