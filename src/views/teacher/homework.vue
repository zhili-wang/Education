<template>
  <!-- 作业管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
        </div>
      </div>
      <div slot="paddingContent">
        <Table
          stripe
          :columns="columns1"
          :data="tableDate"
          size="small"
        ></Table>
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
      @on-cancel="cancel"
      class-name="vertical-center-modal"
    >
      <Form :model="formItem" :label-width="120" ref="formValidate">
        <div class="border1">
          <Row>

            <Col span="24">
              <FormItem label="学年" prop="gradeId">
                <el-select v-model="editForm.acadId" :disabled="this.eidtOrAdd === 2" placeholder="请选择" @change="getGrade(editForm.acadId)" clearable style="width: 100%">
                    <el-option
                    v-for="item in this.acadList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="年级" prop="gradeId">
               <el-select v-model="editForm.gradeId" :disabled="this.eidtOrAdd === 2" placeholder="请选择" @change="getClass(editForm.gradeId)" clearable style="width: 100%">
                    <el-option v-for="item in this.gradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="班级" prop="classId">
               <el-select v-model="editForm.classId" :disabled="this.eidtOrAdd === 2" placeholder="请选择" @change="getCourse(editForm.classId)" clearable style="width: 100%">
                    <el-option v-for="item in this.classList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="科目" prop="courseId">
               <el-select v-model="editForm.courseId" :disabled="this.eidtOrAdd === 2" placeholder="请选择" clearable style="width: 100%">
                    <el-option v-for="item in this.courseList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="作业描述：">
                <textarea
                  v-model="editForm.detail"
                  placeholder="请输入"
                  style="width: 100%"
                ></textarea>
              </FormItem>
            </Col>
            
          </Row>
        </div>
      </Form>
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
      titleText: "",
      page: 1,
      pagecount: 10,
      total: 0,
      addModel: false,
      modalLoading: true,
      studentObj: [],
      courseObj: [],
      eidtOrAdd: "",
      acadList: [],
      gradeList: [],
      classList: [],
      courseList: [],
      editForm: {
        id: null,
        acadId: null,
        gradeId: null,
        classId: null,
        courseId: null,
        detail: null,
      },
      formItem: {
        clazzId: "",
        courseId: "",
        courseName: "",
        clazzName: "",
        detail: "",
      },
      columns1: [
        { title: "学年", key: "acadName", align: "center", width: 180 },
        { title: "年级", key: "gradeName", align: "center", width: 80 },
        { title: "班级", key: "clazzName", align: "center", width: 80 },
        { title: "科目", key: "courseName", align: "center", width: 80 },
        { title: "作业描述", key: "detail", align: "center" },
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.editData(params.row);
                    },
                  },
                },
                "修改作业"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.remover(params.row.id);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      tableDate: [],
      id: "",
      teacherInfo: [],
      stuName: "",
      itemObj1: "",
      itemObj2: "",
    };
  },
  created() {},
  mounted() {
    this.teacherInfo = JSON.parse(localStorage.getItem("teacher"));
    console.log(this.teacherInfo, 123456);
    this.formItem.courseId = this.teacherInfo.courseId;
    this.formItem.courseName = this.teacherInfo.courseName;
    this.formItem.clazzId = this.teacherInfo.clazzId;
    this.formItem.clazzName = this.teacherInfo.clazzName;
    console.log(this.formItem.clazzName, 456789);
    this.loadData();
    this.getStudent();
    this.getAcad();
  },
  methods: {
    getAcad() {
        this.$post('acad/getList').then(res => {
            if(res.code === 200) {
                this.acadList = res.result;
            } else {
                this.$Message.error("获取学年列表失败");
            }
        })
    },
    // 获取学期下的年级
    getGrade(acadId) {
        this.gradeList = [];
        this.classList = [];
        this.courseList = [];
        this.editForm.gradeId = null;
        this.editForm.classId = null;
        this.editForm.courseId = null;
        let param = {
            name: acadId
        }
        this.$post('grade/list', param).then(res => {
            if(res.code === 200) {
                this.gradeList = res.result;
            } else {
                this.$Message.error("获取年级列表失败");
            }
        })
    },
    // 获取年级下班级
    getClass(gradeId) {
      this.classList = [];
      this.courseList = [];
      this.editForm.classId = null
      this.editForm.courseId = null
      let param = {
        name: gradeId
      }
      this.$post('/clazz/list', param).then(res => {
        if(res.code === 200) {
          this.classList = res.result;
        } else {
          this.$Message.error("获取班级列表失败");
        }
      })
    },
    // 获取班级下的科目
    getCourse(classId) {
      this.editForm.courseId = null;
      this.courseList = [];
      let param = {
        name: classId
      }
      this.$post('/course/getCourseByClassId', param).then(res => {
        if(res.code === 200) {
          this.courseList = res.result
        } else {
          this.$Message.error("获取课程列表失败")
        }
      })
    },
    //加载数据
    loadData() {
      var thiz = this;
      var params = {
        page: this.page,
        limit: this.pagecount,
        clazzId: this.teacherInfo.clazzId,
      };
      this.$post("/tea/homework/query", params).then(res => {
        if (res.code === 200) {
          thiz.tableDate = res.result.list
          thiz.total = res.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
    },
    //下一页上一页
    changepage(val) {
      this.page = val;
      this.loadData();
    },
    //删除
    remover(id) {
      var thiz = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          var params = {
            id: id,
          };
          thiz.$post("/tea/homework/delete", params).then(res => {
            if (res.code === 200) {
              thiz.$Message.info("删除成功！");
            } else {
              thiz.$Message.error("删除失败！");
            }
            thiz.loadData();
          });
        },
        onCancel: () => {},
      });
    },
    //保存
    saveData() {
      var thiz = this;
      var params = this.getParams();
      var url = "";
      //---1为添加，2为保存
      if (this.eidtOrAdd == 1) {
        url = "/tea/homework/add";
      } else if (this.eidtOrAdd == 2) {
        url = "/tea/homework/update";
        params.acadId = null;
        params.gradeId = null;
        params.classId = null;
        params.courseId = null;
      }
      this.$post(url, params).then(res => {
        if (res.code === 200) {
          thiz.$Message.info("保存成功！");
          this.cancel();
        } else {
          thiz.$Message.error("保存失败！");
        }
        thiz.addModel = false;
        thiz.loadData();
      });
    },
    // 关闭弹框
    cancel() {
        this.gradeList = [];
        this.classList = [];
        this.courseList = [];
        this.editForm.id = null;
        this.editForm.name = null;
        this.editForm.acadId = null;
        this.editForm.gradeId = null;
        this.editForm.classId = null;
        this.editForm.courseId = null;
        this.editForm.detail = null
    },
    //添加清空表单数据
    addData() {
      this.titleText = "添加";
      this.addModel = true;
      this.eidtOrAdd = 1;
      this.formItem = {
        detail: "",
      };
      this.formItem.courseId = this.teacherInfo.courseId;
      this.formItem.courseName = this.teacherInfo.courseName;
      this.formItem.clazzId = this.teacherInfo.clazzId;
      this.formItem.clazzName = this.teacherInfo.clazzName;
    },
    //修改获取表单数据
    editData(row) {
      this.titleText = "修改";
      this.addModel = true;
      this.eidtOrAdd = 2;
      this.editForm = {
        id: row.id,
        acadId: row.acadName,
        gradeId: row.gradeName,
        classId: row.clazzName,
        courseId: row.courseName,
        detail: row.detail,
      };
      this.id = row.id;
    },
    //获取学生
    getStudent() {
      var thiz = this;
      var params = {
        page: this.page,
        limit: 100,
        clazzId: this.teacherInfo.clazzId,
      };
      this.$get("student/getListByPage", params).then(function (msg) {
        console.log(msg, 7777);
        if (msg.rows.length > 0) {
          thiz.studentObj = msg.rows;
          thiz.itemObj1 = msg.rows;
        } else {
          thiz.studentObj = [];
        }
      });
    },
    getParams() {
      var params = {
        acadId: this.editForm.acadId,
        gradeId: this.editForm.gradeId,
        classId: this.editForm.classId,
        courseId: this.editForm.courseId,
        detail: this.editForm.detail,
        teacherId: JSON.parse(localStorage.getItem("teacher")).name,
        id: this.editForm.id
      };
      return params;
    },
  },
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
</style>

