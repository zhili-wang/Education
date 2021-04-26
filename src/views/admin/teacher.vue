<template>
  <!-- 教师管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="姓名" style="margin-right:10px;">
                <Input id="name" v-model="queryFrom.name" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <Button type="primary" @click="loadData">查询</Button>
          </Row>
        </Form>
        <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
          <Button type="dashed" @click="exportModel">下载模板</Button>
          <a id="downloadTemplate" style="display: none" href="/template/老师模板.xlsx"></a>
          <Button for="id" type="primary" icon="ios-cloud-upload-outline" @click="$refs.file.click()">导入</Button>
         <form method="post" enctype="multipart/form-data" name="form1" >
            <input id="inputFile"  type="file" ref="file" style="display:none" accept=".xls,.xlsx" @change="getFile($event)">
         </form>
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
              <FormItem label="姓名" prop="name">
                <Input v-model="addForm.name" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="性别" prop="gradeId">
               <Select v-model="addForm.sex" :label-in-value="true">
                    <Option :value="item.code" v-for="item in this.sexList" v-bind:key="item.code">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="年龄" prop="num">
                <Input v-model="addForm.age" placeholder="请输入" type="number"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="类型" prop="gradeId">
               <Select v-model="addForm.type" :label-in-value="true">
                    <Option :value="item.code" v-for="item in this.typeList" v-bind:key="item.code">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>


  <!-- 设置老师任课  -->
  <Modal
      v-model="subjectModel"
      ref="subjectModel"
      scrollable
      title="设置任课"
      @on-ok="saveSubjectData"
      @on-cancel="cancelSubject"
      class-name="vertical-center-modal"
    >
      <Form :model="editForm" :label-width="120" ref="formValidate">
        <div class="border1">
          <Row>
            <Col span="24">
              <FormItem label="姓名" prop="name">
                <Input v-model="editForm.name" placeholder="请输入" :disabled="true" type="text"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="学年" prop="gradeId">
                <el-select v-model="editForm.acadId" placeholder="请选择" @change="getGrade(editForm.acadId)" clearable style="width: 100%">
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
               <el-select v-model="editForm.gradeId" placeholder="请选择" @change="getClass(editForm.gradeId)" clearable style="width: 100%">
                    <el-option v-for="item in this.gradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="班级" prop="classId">
               <el-select v-model="editForm.classId" placeholder="请选择" @change="getCourse(editForm.classId)" clearable style="width: 100%">
                    <el-option v-for="item in this.classList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="科目" prop="courseId">
               <el-select v-model="editForm.courseId" placeholder="请选择" clearable style="width: 100%">
                    <el-option v-for="item in this.courseList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
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
import axios from 'axios'
import { truncate } from 'fs';
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      titleText: "", // 新增弹框标题信息
      addModel: false, // 新增
      subjectModel: false, // 任课
      page: 1,
      pagecount: 10,
      total: 0,
      queryFrom: {
        name: '', // 年级
      },
      addForm: {
         name: null, // 姓名
         sex: null, // 性别
         age: null, // 年龄
         type: null, // 类型
      },
      editForm: {
        id: null,
        name: null,
        acadId: null,
        gradeId: null,
        classId: null,
        courseId: null,
      },
      sexList:[{code: 1, name: '男'}, {code: 2, name: '女'}],
      typeList: [{code: 10051001, name: '班主任'},{code: 10051002, name: '讲师'}],
      acadList: [],
      gradeList: [],
      classList: [],
      courseList: [],
      columns1: [
        { title: "姓名", key: "name",align:"center"},
        { title: "性别", key: "sex",align:"center", render: (h, r) => {return h('div', this.filterType(r.row.sex))}},
        { title: "年龄", key: "age",align:"center"},
        { title: "类型", key: "type",align:"center", render: (h, params) => {return h('div', this.filterType(params.row.type))} },
        { title: "老师工号", key: "code",align:"center", width: "200px"},
        { title: "授课", key: "courseName",align:"center" },
        // { title: "创建时间", key: "createTime",align:"center",
        // render: (h,params)=>{
        //         return h('div',
        //             this.formatDate(new Date(params.row.createTime),'yyyy-MM-dd')
        //             )
        //     } 
        // },
        { title: "操作", key: "action", width: 250, align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.subject(params.row);
                    },
                  },
                },
                "任课"
              ),
              h( "Button", {
                  props: { type: "error", size: "small" },
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
    // 取下任课
    cancelSubject() {
        // this.acadList = [];
        this.gradeList = [];
        this.classList = [];
        this.courseList = [];
        this.editForm.id = null;
        this.editForm.name = null;
        this.editForm.acadId = null;
        this.editForm.gradeId = null;
        this.editForm.classId = null;
        this.editForm.courseId = null;
    },
    // 添加任课
    saveSubjectData() {
      this.$post('/teacher/subjectTeacher', this.editForm).then(res => {
        if(res.code === 200) {
          this.$Message.info("任课成功");
          this.loadData();
        } else {
          this.$Message.error("任课失败");
        }
      })

      this.cancelSubject();
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
      var thiz = this;
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        name: this.queryFrom.name
      };
      this.$post("teacher/query", params).then(function(msg) {
        if (msg.code === 200) {
          thiz.tableDate = msg.result.list;
          thiz.total = msg.result.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
    },
    // 设置任课
    subject(row) {
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.subjectModel = true;
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
          this.$get("teacher/delete", params)
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
    exportModel() {
        document.getElementById('downloadTemplate').click();
    },
    getFile(event) {
            this.isprocess=true;
            this.file = event.target.files[0];
            event.preventDefault();
            let formData = new FormData();
            formData.append('file', this.file);
	        let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            //  let baseUrl = process.env.NODE_ENV == 'development' ? 'http://192.168.1.100:12002/' : '';
             let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
            axios.post(baseUrl + 'teacher/importExcel',formData, config).then(res => {
                if(res.data.code === 200) {
                    this.$Message.info('导入成功');
                    this.loadData();
                    this.isprocess=false;
                }
            })
        },
    //保存
    saveData() {
        let params = {
            name: this.addForm.name,
            sex: this.addForm.sex,
            age: this.addForm.age,
            type: this.addForm.type
        }
        this.$post("teacher/add", params).then(res => {
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
            this.addForm.name = null;
            this.addForm.sex = null;
            this.addForm.age = null;
            this.addForm.type = null;
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
</style>

