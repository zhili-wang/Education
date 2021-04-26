<template>
  <!-- 作业管理 -->
  <section class="home-container">
    <MasterPage title>
      <!-- <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
      </div> -->
      <div slot="searchContent" class="search-content-slot">
        <Form
          :model="formItem"
          :label-width="50"
          label-position="left"
          ref="formValidate"
        >
          <Row>
            <Col span="8">
              <FormItem label="科目：" style="margin-right: 10px">
                <Input v-model="courseName" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Button type="primary" @click="loadData">查询</Button>
          </Row>
        </Form>
      </div>
      <div slot="paddingContent">
        <Table
          style="margin:0 50px 0"
          stripe
          :columns="columns1"
          :data="tableDate"
          size="small"
        ></Table>
      </div>
      <div slot="pager">
        <Page
          style="margin:0 50px 0"
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
      <div class="contentStyle">{{ hwkMessage }}</div>
    </Modal>
    <!-- 提交作业 -->
    <Modal
      v-model="homeModel"
      ref="homeModel"
      scrollable
      :title="titlTex"
      @on-ok="putHomework"
      class-name="vertical-center-modal"
    >
      <Button
        class="button_entry"
        for="id"
        type="primary"
        icon="ios-cloud-upload-outline"
        @click="$refs.file.click()"
        >上传作业</Button
      >
      <form method="post" enctype="multipart/form-data" name="form1">
        <input
          id="inputFile"
          type="file"
          ref="file"
          style="display: none"
          accept=".xls,.xlsx,.doc"
          @change="getFile($event)"
        />
      </form>
      <div class="content_style"></div>
    </Modal>
    <!-- //查看评价 -->
    <Modal
      v-model="evaluateModel"
      ref="evaluateModel"
      scrollable
      :title="titlehome"
      class-name="vertical-center-modal"
    >
      <div class="contentStyle">
        {{ score }}
      </div>
    </Modal>
  </section>
</template>
<script>
import MasterPage from "@/components/Master";
export default {
  components: {
    MasterPage,
  },
  data() {
    return {
      doWork: 0,
      titlText: "作业",
      titlehome: "查看评价",
      titlTex: "提交作业",
      page: 1,
      file: null,
      stuId: null,
      hwId: null,
      pagecount: 10,
      total: 0,
      score: "",
      homeModel: false,
      homeworkModel: false,
      evaluateModel: false,
      hwkMessage: null,
      formItem: {
        clazzId: "",
        courseId: "",
        courseName: "",
        clazzName: "",
        detail: "",
      },
      columns1: [
        { title: "班级", key: "clazzName" ,align: "center",},
        { title: "科目", key: "courseName" ,align: "center",},
        { title: "时间", align: "center", render: (h, params) => {return h('div', this.getTime(params.row.detail))}},
        {
          title: "操作",
          key: "action",
          align: "center",
          // width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      console.log(params.row.id);
                      this.checkHome(params.row.id);
                    },
                  },
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.homeModel = true;
                      this.putHomeworks(params.row.id);
                    },
                  },
                },
                "提交作业"
              ),
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  on: {
                    click: () => {
                      this.seeEvaluate(params.row.id);
                    },
                  },
                },
                "查看评价"
              ),
            ]);
          },
        },
      ],
      tableDate: [],
      studentInfo: [],
      courseName: "",
    };
  },
  created() {},
  mounted() {
    this.getDate();
    this.studentInfo = JSON.parse(localStorage.getItem("student"));
    console.log(this.studentInfo, 10000);
    this.loadData();
  },
  methods: {
    // isDowork(){
    // let self = this;
    // let params = {
    //     stuId:this.stuId
    //   }
    // this.$get('/student/hw_list', params).then(
    //   res.result.map((item,index)=>{

    //     })
    // )
    // },

        // 正则获取时间-----------------------------------------------------------------------
    getTime(value){
      // console.log(value)
      let re = /(：|:).*$/;
      let time = value.replace(re,"");
      // console.log("替换的time",time)
      return time;
    },

    seeEvaluate(id) {
      console.log(id);
      let self = this;
      this.evaluateModel = true;
      let params = {
        stuId: this.stuId,
      };
      this.$get("/student/hw_list", params).then((res) => {
        self.score = "";
        res.result.map((item, index) => {
          if (item.hwId === id && item.score !== "") {
            self.score = item.score;
          }
          // }else if(item.hwId === id && item.score == ''){
          //   self.score = '老师还没批改你的作业';
          // }
          // }else if(item.hwId === id && item.score ==''){
          //   self.score = '老师还没有批改你的作业'
          // }
          // else{
          //   self.score = '你还没有提交作业'
          // }
        });
      });
    },
    //加载数据
    getDate() {
      let self = this;
      let param = {
        name: JSON.parse(localStorage.getItem("student")).name,
      };
      this.$post("/student/queryByCode", param).then((res) => {
        if (res.code === 200) {
          self.stuId = res.result.id;
        } else {
          this.$Message.error("获取信息失败");
        }
      });
    },
    getFile(event) {
      //获取文件
      this.file = event.target.files[0];
      event.preventDefault();
    },
    loadData() {
      var thiz = this;
      var params = {
        page: this.page,
        limit: this.pagecount,
        clazzId: this.studentInfo.clazzId,
        courseName: this.courseName,
      };
      this.$get("homework/getListByPage", params).then(function (msg) {
        console.log(msg, 666);
        if (msg.rows.length > 0) {
          thiz.tableDate = msg.rows;
          thiz.total = msg.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
    },
    putHomework() {
      console.log("交作业");
      let formData = new FormData();
      formData.append("hwId", this.hwId);
      formData.append("file", this.file);
      formData.append("stuId", this.stuId);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
      this.axios
        .post(baseUrl + "/student/uploadHw", formData, config)
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            // res.result =
            this.$Message.success("提交成功");
          }
        });
    },
    putHomeworks(value) {
      var thiz = this;
      var params = {
        page: this.page,
        limit: this.pagecount,
        clazzId: this.studentInfo.clazzId,
        courseName: this.courseName,
      };
      this.$get("homework/getListByPage", params).then(function (msg) {
        msg.rows.map((item, index) => {
          if (item.id === value) {
            thiz.hwId = item.id;
          }
        });
      });
    },
    checkHome(value) {
      this.homeworkModel = true;
      var thiz = this;
      var params = {
        page: this.page,
        limit: this.pagecount,
        clazzId: this.studentInfo.clazzId,
        courseName: this.courseName,
      };
      this.$get("homework/getListByPage", params).then(function (msg) {
        msg.rows.map((item, index) => {
          if (item.id === value) {
            thiz.hwkMessage = item.detail;
            thiz.hwId = item.id;
          }
        });
      });
    },
    //下一页上一页
    changepage(val) {
      this.page = val;
      this.loadData();
    },
  },
};
</script>
<style lang="postcss" scoped>
.home-container {
}
/* .tablePage {
  width: 600px;
  margin: 0 auto;
} */
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
.contentStyle {
  width: 500px;
  height: 350px;
  overflow: scroll;
  border: 1px solid black;
  font-size: 16px;
}
</style>

