<template>
  <!-- 学生管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
      </div>
      <div slot="searchContent" class="search-content-slot">
        <!-- <Form :model="formItem" label-position="left" ref="formValidate">
            <Row>
              <Col span="7">
                <FormItem label="学号" :label-width="50" prop="code">
                  <Input v-model="formItem.code" placeholder="请输入" clearable style="width:220px"></Input>
                </FormItem>
              </Col>
              <Col span="7" style="margin-left:30px">
                <FormItem label="姓名" :label-width="50" prop="name">
                  <Input v-model="formItem.name" placeholder="请输入" clearable style="width:220px"></Input>
                </FormItem>
              </Col>
              <Button type="primary" @click="loadData" style="margin-left:10%px">查询</Button>
            </Row>
        </Form> -->
        <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
        </div>
      </div>
      <div slot="paddingContent">
        <Table stripe :columns="columns1" :data="tableDate" size="small"></Table>
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
    <!-- 新增弹窗 -->
    <Modal
      v-model="addModel"
      ref="addModel"
      scrollable
      :title="titleText"
      @on-ok="saveData"
      class-name="vertical-center-modal"
    >
      <Form :model="formItem" :label-width="120" ref="formValidate">
        <div class="border1">
          <Row>
            <div v-for="(item, index) in courseDate" :key="index">
              <Col span="24">
                <FormItem :label="item.name">
                  <Input v-model="data[index]" placeholder="请输入" type="number"></Input>
                </FormItem>
              </Col>
            </div>
          </Row>
        </div>
      </Form>
    </Modal>

  <!-- 查看成绩 -->
      <Modal
        v-model="checkInfo"
        ref="checkInfo"
        scrollable
        title="查看成绩"
        @on-ok="saveData"
        class-name="vertical-center-modal"
      >
        <div class="scrollModel">
          <Form :model="formItem" :label-width="120" ref="formValidate">
            <div class="border1">
              <Row>
                <div v-for="(item, index) in courseScore" :key="index">
                  <Col span="24">
                    <FormItem :label="item.name">
                      <Input v-model="item.score" :disabled="true" placeholder="请输入" type="number"></Input>
                    </FormItem>
                  </Col>
                </div>
              </Row>
            </div>
          </Form>
        </div>
      </Modal>
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
      base: {
        acadId: null,
        gradeId: null,
        classId: null,
        studentId: null
      },
      data:[],
      teacherCode:JSON.parse(localStorage.getItem("teacher")).name,
      classId: null,
      techerInfo:'',
      titleText: "",
      page: 1,
      pagecount: 10,
      total: 0,
      addModel: false, // 成绩录入
      checkInfo: false, // 查看成绩
      modalLoading: true,
      clazzObj: [],
      clazzItme:[],
      eidtOrAdd: "",
      username:'',
      name:'',
      formItem: {
        name: null,
        code: null,
        id: null,
      },
      columns1: [
        { title: "学号", key: "code",align:"center",width:160 },
        { title: "姓名", key: "name",align:"center",
        render: (h,params)=>{
                return h('div',[
                h( "a", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px",color: '#0000FF' },
                  on: {
                    click: () => {
                      this.infoScore(params.row);
                    },
                  },
                },
                params.row.name
              ),
                ]);
            }
        },
        { title: "性别", key: "sex",align:"center", render: (h, r) => {return h('div', this.filterType(r.row.sex))} },
        { title: "年龄", key: "age",align:"center" },
        { title: "班级", key: "className",align:"center" },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: { type: "primary", size: "small" },
              //     style: {
              //       marginRight: "10px"
              //     },
              //     on: {
              //       click: () => {
              //         this.enter(params.row);
              //       }
              //     }
              //   },
              //   "成绩录入"
              // ),
              h(
                "Button",
                {
                  props: { type: "error", size: "small" },
                  on: {
                    click: () => {
                      this.remover(params.row.csId);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableDate: [],
      courseDate: [], // 科目列表
      courseScore: [], // 科目成绩列表
      id:'',
    };
  },
  created() {
  },
  mounted() {
    this.techerInfo = JSON.parse(localStorage.getItem("teacher"));
    this.loadData();
    this.getClazz();
  },
  methods: {
    filterType(type) {
        switch(type) {
            case 10051001:
                type = "班主任";
                break;
            case 10051002:
                type = "讲师";
                break;
            case 1:
                type = "男";
                break;
            case 2:
                type = "女";
                break;
        }
        return type;
    },
    //加载数据
    loadData() {
      var thiz = this;
      let classId = null;
      var params = {
          pageNum:this.page,
          pageSize:this.pagecount,
          id: this.$route.params.id,
          name: this.formItem.name,
          code: this.formItem.code
      };
      // console.log("undefined"+this.$route.params.id)
      this.$post("/tea/student/query", params).then(res => {
          if (res.code === 200) {
            this.tableDate = res.result.list;
            this.total = res.result.total;
          } else {
            this.tableDate = [];
            this.total = 0;
          }

        });
    },
    //下一页上一页
    changepage(val) {
      this.page = val;
      this.loadData();
    },
    // 查看成绩
    infoScore(row) {
          this.base.acadId = row.acadId;
          this.base.gradeId = row.gradeId;
          this.base.classId = row.classId;
          this.base.studentId = row.id;
          let param = {
            acadId: row.acadId,
            gradeId: row.gradeId,
            classId: row.classId,
            studentId: row.id
          }
          this.$post('/tea/course/queryCourseScore', param).then(res => {
            if(res.code === 200) {
              console.log(res.result);
              this.courseScore = res.result
            } else {
              this.$Message.error("获取科目信息失败")
            }
          })
          this.checkInfo = true;
    },
    // 成绩录入
    enter(row) {
      this.getCourseList(row);      
      this.addModel = true;
    },
    // 根据 学期，年级，班级查询 科目信息
    getCourseList(row) {
          this.base.acadId = row.acadId;
          this.base.gradeId = row.gradeId;
          this.base.classId = row.classId;
          this.base.studentId = row.id;
          let param = {
            acadId: row.acadId,
            gradeId: row.gradeId,
            classId: row.classId,
            teacherCode:this.teacherCode
            // teacherID:37  //传id
          }
          // console.log(this.teacherCode)
          this.$post('/tea/course/queryCourseList', param).then(res => {
            if(res.code === 200) {
              this.courseDate = res.result
            } else {
              this.$Message.error("获取科目信息失败")
            }
          })
    },
    //删除
    remover(id) {
      var thiz = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          var params = {
            id: id
          };
          thiz.$post("/tea/student/delete", params).then(res => {
              if (res.code === 200) {
                thiz.$Message.info("删除成功！");
              } else {
                thiz.$Message.error("删除失败！");
              }
              thiz.loadData();
            });
        },
        onCancel: () => {}
      });
    },
    //保存
    saveData() {
      let courseList = [];
      let courseIdList = [];
      let scoreList =[];
      if(this.data.length > 0) {
        for(let i=0;i<this.courseDate.length;i++) {
          let course = {
            courseId: null,
            score: null,
          }
          course.courseId = this.courseDate[i].code
          course.score = this.data[i]
          courseList.push(course)
          courseIdList.push(this.courseDate[i].code);
          scoreList.push(this.data[i])
        }
      }
      let param = {
        acadId: this.base.acadId,
        gradeId: this.base.gradeId,
        classId: this.base.classId,
        studentId: this.base.studentId,
        courseIdList:courseIdList,
        scoreList:scoreList
      }
      this.$post('/tea/student/enter', param).then(res => {
        if(res.code === 200) {
          this.$Message.info('录入成功');
        } else {
          this.$Message.error(res.message);
        }
      })
      this.data = [];
      this.base.acadId = null;
      this.base.gradeId = null;
      this.base.classId = null;
      this.base.studentId = null;
    },
    //添加清空表单数据
    addData() {
      this.titleText = "添加";
      this.addModel = true;
      this.eidtOrAdd = 1;
      this.formItem = {
        username: '',
        password: '',
        name: '',
        sex: '',
        clazzId: ''
      };
    },
    //修改获取表单数据
    editData(row) {
      console.log(row)
      this.titleText = "修改";
      this.addModel = true;
      this.eidtOrAdd = 2;
      this.clazzObj = this.clazzItme;
      this.formItem = {
        username: row.username,
        password: row.password,
        name: row.name,
        sex: row.sex,
        clazzId: row.clazzName,
      };
      this.id = row.id;
      this.$set(this.formItem,"clazzId",row.clazzId);
      this.clazzObj.push({id:row.clazzId, name: row.clazzName });
    },
    //获取班级
    getClazz() {
      var thiz = this;
      var params = {
          page:this.page,
          limit:100
      };
      this.$get("clazz/getListByPage",params)
        .then(function(msg) {
          console.log(msg,7777);
          if (msg.rows.length > 0) {
              thiz.clazzObj = msg.rows;
              thiz.clazzItme = msg.rows;
              console.log(thiz.clazzObj ,444)
          } else {
              thiz.clazzObj = [];
          }
      });
    },
    getParams() {
        var params = {
            username: this.formItem.username,
            password: this.formItem.password,
            name: this.formItem.name,
            sex: this.formItem.sex,
            clazzId: this.techerInfo.clazzId
        };
        console.log(params,1111)
        return params;
    }
  }
};
</script>
<style lang="postcss" scoped>
.home-container {
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
.scrollModel{
  height: 30rem;
  overflow: scroll;
}
</style>

