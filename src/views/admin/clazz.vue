<template>
  <!-- 班级管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="班级" style="margin-right:10px;">
                <Input id="name" v-model="queryFrom.name" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学年" >
                <el-select v-model="queryFrom.acadId" placeholder="请选择" @change="getGrade(queryFrom.acadId)" clearable>
                    <el-option
                    v-for="item in this.acadList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="年级" >
                <el-select v-model="queryFrom.gradeId" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in this.gradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              </FormItem>
            </Col>
            <Button type="primary" class="btn" @click="loadData">查询</Button>
          </Row>
        </Form>
        <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
        </div>
      </div>
      <div slot="paddingContent">
        <Table stripe :columns="columns1" :data="tableDate" size="small" ></Table>
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
      <Form :model="addForm" :label-width="120" ref="formValidate">
        <div class="border1">
          <Row>
            <Col span="24">
              <FormItem label="班级" prop="name">
                <Input v-model="addForm.name" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>

              <Col span="24">
              <FormItem label="学年" prop="gradeId">
                <el-select v-model="addForm.acadId" placeholder="请选择" @change="getGrade(addForm.acadId)" clearable style="width: 100%">
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
                <el-select v-model="addForm.gradeId" placeholder="请选择" clearable style="width: 100%">
                    <el-option v-for="item in this.gradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="人数" prop="num">
                <el-input v-model="addForm.num" placeholder="请输入" type="number"></el-input>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>

    <!--  科目选择弹框  -->
    <Modal
      v-model="openCourseModel"
      ref="openCourseModel"
      scrollable
      title="科目列表"
      @on-ok="saveCourse"
      @on-cancel="cancelCourse"
      class-name="vertical-center-modal"
    >
      <div class="scrollModel">
        <Tabs value="name1" @on-click="changeTab">
            <TabPane label="未选" name="name1">
                <Button @click="handleSelectAll(true)">全选</Button>
                <Button @click="handleSelectAll(false)">取消全选</Button>
                <Table border ref="selection" :columns="columns2" :data="courseTableDate" @on-selection-change="selectList"></Table>
            </TabPane>
            <TabPane label="已选" name="name2">
              <Table border ref="selection2" :columns="columns3" :data="courseTableDate2"></Table>
            </TabPane>
        </Tabs>
      </div>
    </Modal>

    <!-- 添加学生  -->
    <Modal
      v-model="addStudentModel"
      ref="addStudentModel"
      scrollable
      title="添加学生"
      @on-ok="saveStu"
      width="800px"
      @on-cancel="cancelStu"
      class-name="vertical-center-modal"
      style="height:100px"
    >
        <div class="scrollModel">
          <Table stripe :columns="stuColumns" :data="stuTableDate" size="small" @on-selection-change="selecStutList"></Table>
        </div>
            
    </Modal>

    <!-- 学生详情弹框 -->
    <Modal
      v-model="stuInfoModel"
      :mask-closable="false"
      ref="stuInfoModel"
      scrollable
      title="学生信息"
      width="800px"
      @on-cancel="cancelStu"
      class-name="vertical-center-modal"
    >
      <div class="scrollModel">
        <Table stripe :columns="stuInfoColumns" :data="studentInfo" size="small"></Table>
        <div slot="footer"><Button style="text-align: center" @click="cancelStuInfo">关闭</Button></div>
      </div>
    </Modal>

  </section>
</template>
<script>
import MasterPage from "@/components/Master";
import { callbackify } from 'util';
import { parse } from 'path';
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      titleText: "", // 新增弹框标题信息
      addModel: false, // 新增
      openCourseModel: false, // 选课弹框
      addStudentModel: false, // 添加学生
      stuInfoModel: false, // 学生详情
      page: 1,
      pagecount: 10,
      total: 0,
      eidtOrAdd: "",
      queryFrom: {
        name: null, // 班级
        acadId: null, // 学年
        gradeId: null, // 年级
      },
      addForm: {
        name: '', // 学年
        acadId: null,
        gradeId: null,
        num: null
      },
      acadList: [],
      gradeList: [],
      selectCourseIdList: [], // 选择科目编号
      selectClassId: null, // 选择班级
      selectStuIdList: [], // 选择学生编号
      stuInfoColumns: [
          { title: "姓名", key: "name",align:"center"},
          { title: "性别", key: "sex",align:"center", render: (h, r) => {return h('div', this.filterType(r.row.sex))}},
          { title: "年龄", key: "age",align:"center"},
          { title: "身份证号", key: "idCard",align:"center", width: "160px" },
          { title: "操作", key: "action", width: 250, align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "error", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.removerStu(params.row);
                    },
                  },
                },
                "移除"
              ),
            ]);
          },
        },
      ],
      stuColumns: [
          { type: 'selection',  width: 60, align: 'center' },
          { title: "姓名", key: "name",align:"center"},
          { title: "性别", key: "sex",align:"center", render: (h, r) => {return h('div', this.filterType(r.row.sex))}},
          { title: "年龄", key: "age",align:"center"},
          { title: "身份证号", key: "idCard",align:"center", width: "160px" },
          { title: "年级", key: "gradeName",align:"center", width: "100px" },
          { title: "学号", key: "code",align:"center", width: "100px"},
      ],
      columns3: [
        { title: "科目", key: "name",align:"center"},
        { title: "年级", key: "gradeName",align:"center"},
        { title: "任课老师", key: "teacherName",align:"center" },
        { title: "操作", key: "action", align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "error", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.removerCourse(params.row);
                    },
                  },
                },
                "移除"
              ),
            ]);
          },
        },
      ],
      columns2: [
        { type: 'selection',  width: 60, align: 'center' },
        { title: "科目", key: "name",align:"center"},
        { title: "年级", key: "gradeName",align:"center"},
        { title: "任课老师", key: "teacherName",align:"center" },
      ],
      columns1: [
        { title: "班级", key: "name",align:"center"},
        { title: "年级", key: "gradeName",align:"center"},
        { title: "学生上限", key: "num",align:"center"},
        { title: "学生人数", key: "stuNum",align:"center",
        render: (h,params)=>{
                return h('div',[
                h( "a", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px",color: '#f00' },
                  on: {
                    click: () => {
                      this.stuInfo(params.row.id);
                    },
                  },
                },
                params.row.stuNum
              ),
                ]);
            } 
        },
        { title: "操作", key: "action", width: 300, align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.seleCourse(params.row.gradeId, params.row.id);
                    },
                  },
                },
                "选课"
              ),
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.addStudent(params.row);
                    },
                  },
                },
                "添加学生"
              ),
              h( "Button", {
                  props: { type: "error", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    },
                  },
                },
                "编辑"
              ),
              h( "Button", {
                  props: { type: "error", size: "small" },
                  style: { marginRight: "10px" },
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
      stuTableDate: [],
      courseTableDate:[],
      courseTableDate2: [],
      studentInfo: [],
    };
  },
  created() {},
  mounted() {
    this.studentInfo = JSON.parse(localStorage.getItem("admin"));
    this.loadData();
    // 获取年级集合
    this.getAcad();
  },
  methods: {
      changeTab(e) {
        if(e === 'name1') {
        } else if(e === 'name2') {
          this.selectCourseIdList = [];
          this.$refs.selection.selectAll(false);
        }
      },
      removerStu(row) {
        this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要移除吗？</p>",
        onOk: () => {
          let params = {
            id: row.id
          };
          this.$post("student/deleteStuById", params)
            .then(res => {
              if (res.code === 200) {
                this.$Message.info("移除成功！");
                this.stuInfo(row.classId);
              } else {
                this.$Message.error("移除失败！");
              }
            });
        },
        onCancel: () => {}
      });
      },
      // 查看学生详情
      stuInfo(classId) {
        // 调用接口查询班级学生信息
        let param = {
          id: classId
        }
        this.$post('/student/queryStuInfo', param).then(res => {
          if(res.code === 200) {
            this.studentInfo = res.result;
          } else {
            this.studentInfo = [];
          }
        })
        this.stuInfoModel = true;
      },
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
    selecStutList(e) {
        this.selectStuIdList = [];
        if(e.length > 0) {
            for(let i=0;i<e.length; i++) {
                this.selectStuIdList.push(e[i].id);
            }
        }
    },
      selectList(e){
          this.selectCourseIdList = [];
          if(e.length > 0) {
              for(let i = 0; i< e.length; i++) {
                  this.selectCourseIdList.push(e[i].id)
              }
          }
      },
    handleSelectAll (status) {
        this.$refs.selection.selectAll(status);
    },
    getCourse() {
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        name: this.queryFrom.name
      };
      this.$post("course/query", params).then(msg => {
        if (msg.code === 200) {
          this.tableDate = msg.result.list;
          this.total = msg.result.total;
        } else {
          this.tableDate = [];
          this.total = 0;
        }
      });
    },
    getAcad() {
        this.$post('acad/getList').then(res => {
            if(res.code === 200) {
                this.acadList = res.result;
            } else {
                this.$Message.error("获取学年列表失败");
            }
        })
    },
    getGrade(acadId) {
        this.gradeList = [];
        this.queryFrom.gradeId = null;
        let param = {
            name: acadId
        }
        this.$post('grade/list', param).then(res => {
            if(res.code === 200) {
                this.gradeList = res.result;
                console.log(this.gradeList)
            } else {
                this.$Message.error("获取年级列表失败");
            }
        })
    },
    formatDate(date, fmt) {
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    },
    //加载数据
    loadData() {
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        name: this.queryFrom.name,
        acadId: this.queryFrom.acadId,
        gradeId: this.queryFrom.gradeId
      };
      this.$post("clazz/query", params).then(msg => {
        if (msg.code === 200) {
          this.tableDate = msg.result.list;
          this.total = msg.result.total;
        } else {
          this.tableDate = [];
          this.total = 0;
        }
      });
    },
    // 班级绑定科目
    seleCourse(gradeId, classId) {
        this.selectClassId = classId;
        var thiz = this;
        var params = {
        gradeId: gradeId,
        classId: classId
      };
      this.$post("course/queryCourseList", params).then(function(msg) {
        if (msg.code === 200) {
          thiz.courseTableDate = msg.result;
        } else {
          thiz.courseTableDate = [];
        }
      });
      this.getDate2(classId);
      this.openCourseModel = true
    },
    getDate2(classId) {
      let param = {
        classId: classId
      }
      this.$post('/course/queryCourseByClassId', param).then(res => {
            if(res.code === 200) {
              this.courseTableDate2 = res.result;
            } else {
              this.courseTableDate2 = [];
            }
        })
    },
    // 移除任课
    removerCourse(row) {
      let param = {
          id: row.id
      }
      this.$post('/course/removeById', param).then(res => {
        if(res.code === 200) {
          this.$Message.info("移除成功");
          this.getDate2(row.classId);
        }
      })
    },
    saveCourse() {
        let param = {
            classId: this.selectClassId,
            courseIdList: this.selectCourseIdList,
        }
        this.$post('/clazz/chooseCourse', param).then(res => {
            if (res.code === 200) {
                this.$Message.info("选课成功！");
                this.loadData();
              } else {
                this.$Message.error("选课失败！");
              }
              this.selectCourseIdList = [];
              this.selectClassId = null;
        })
    },
    // 取消学生详情
    cancelStuInfo() {
      this.stuInfoModel = false
      this.loadData();
    },
    // 取消添加学生
    cancelStu() {
        this.selectCourseIdList = [];
        this.selectClassId = null;
    },
    // 取消选课
    cancelCourse() {
        this.selectClassId = null;
        this.selectCourseIdList = []
    },
    saveStu() {
        let param = {
            classId: this.selectClassId,
            studentIdList: this.selectStuIdList
        }
        this.$post('/clazz/addStudent', param).then(res => {
            if(res.code === 200) {
                this.$Message.info("添加成功！");
                this.loadData();
            } else {
                this.$Message.info("添加失败！");
            }
            this.selectCourseIdList = [];
            this.selectClassId = null;
        })

    },
    // 添加学生
    addStudent(row) {
        this.selectClassId = row.id;
        var params = {
            acadId: row.acadId,
            gradeId: row.gradeId
        };
        this.$post("/student/queryStuList", params).then(res => {
            if (res.code === 200) {
            this.stuTableDate = res.result;
            } else {
            this.stuTableDate = [];
            }
        });
        this.addStudentModel = true;
    },
    // 编辑回显
    edit(row) {
      this.addForm = row
      this.addModel = true
    },
    // 删除
    remover(id) {
        this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          let params = {
            id: id
          };
          this.$get("clazz/delete", params)
            .then(res => {
              if (res.code === 200) {
                this.$Message.info("删除成功！");
                this.loadData();
              } else {
                this.$Message.error("删除失败！");
              }
            });
        },
        onCancel: () => {}
      });
    },
    // 新增
    addData() {
      this.titleText = "新增";
      this.addModel = true;
    },
    //保存
    saveData() {
        let params = {
            name: this.addForm.name,
            acadId: this.addForm.acadId,
            gradeId: this.addForm.gradeId,
            num: this.addForm.num
        }
        this.$post("clazz/add", params).then(res => {
            if(res.code === 200) {
                this.$Message.success("新增成功");
                this.cancel();
                this.loadData();
            } else {
                this.$Message.error(res.message);
            }
        })
    },
    // 取消
    cancel() {
            this.addForm.name = ''
            this.addForm.gradeId = null;
            this.addForm.acadId = null;
            this.addForm.num = null;
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
/* 表格头部 */
/* >>>  .ivu-table-header th{
    color:#FFD3B4;
    font-weight: bold;
    background-color: #212c31;
    border: none;
  } */
/* .ivu-table-header th{
  background: color #2d8cf0;
} */

.home-container {
}
.searchBtn {
  float: right;
}
.btnBox button {
  margin-right: 15px;
}
/* .ivu-icon-ios-game-controller-b {
  display: none;
} */
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
.btn{
    margin-right: 50px;
    float:right;
}
.scrollModel{
  height: 30rem;
  overflow: scroll;
}
</style>

