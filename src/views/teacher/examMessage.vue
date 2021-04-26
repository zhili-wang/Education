<template>
  <!-- 考试管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <!-- <Col span="8">
              <FormItem label="名称" style="margin-right:10px;">
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
            </Col> -->
            <!-- <Button type="primary" class="btn" @click="loadData">查询</Button> -->
          </Row>
        </Form>
        <!-- <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
        </div> -->
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
              <FormItem label="名称" prop="name">
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
                <el-select v-model="addForm.gradeId" placeholder="请选择" @change="getCourse(addForm.acadId)" clearable style="width: 100%">
                    <el-option v-for="item in this.gradeList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="科目" prop="courseId">
                <el-select v-model="addForm.courseId" placeholder="请选择" clearable style="width: 100%">
                    <el-option v-for="item in this.courseList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">{{item.name}}</el-option>
                </el-select>
              </FormItem>
            </Col>

            <Col span="24">
                <FormItem label="开始时间" prop="dateList">
                    <DatePicker 
                    type="datetimerange" 
                    v-model="dateList" 
                    placeholder="请选择时间段"
                    format="yyyy-MM-dd HH:mm"
                    style="width: 300px"></DatePicker>
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
    MasterPage
  },
  data() {
    return {
      titleText: "", // 新增弹框标题信息
      addModel: false, // 新增
      page: 1,
      pagecount: 10,
      total: 0,
      queryFrom: {
        name: null, // 班级
        acadId: null, // 学年
        gradeId: null, // 年级
      },
      addForm: {
        name: null, // 学年
        acadId: null,
        gradeId: null,
        courseId: null,
        dateList: []
      },
      dateList: [],
      acadList: [],
      gradeList: [],
      courseList: [],
      columns1: [
        { title: "名称", key: "name",align:"center"},  //, width: 170
        { title: "学期", key: "acadName",align:"center"},  //, width: 170
        { title: "年级", key: "gradeName",align:"center", width: 150},  //, width: 135
        { title: "科目", key: "courseName",align:"center", width: 100}, //, width: 75
        { title: "发布状态", key: "status",align:"center", width: 100, render: (h, params) => {return h('div', this.filterStatus(params.row.status))} },
        { title: "考试状态", key: "type",align:"center", width: 100, render: (h, params) => {return h('div', this.examType(params.row.type))}},
        { title: "开始时间", key: "beginTime",align:"center", width: 135,
        render: (h,params)=>{
                return h('div',
                    this.formatDate(new Date(params.row.beginTime),'yyyy-MM-dd hh:mm')
                    )
            }
        },
        { title: "结束时间", key: "endTime",align:"center",width: 135,
        render: (h,params)=>{
                return h('div',
                    this.formatDate(new Date(params.row.endTime),'yyyy-MM-dd hh:mm')
                    )
            }
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
    filterStatus(code) {
        switch(code) {
            case 10031001:
                code = '未发布';
                break;
            case 10031002:
                code = '发布';
                break;
            case 10031003:
                code = '撤销';
                break;
        }
        return code;
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
            case 10061001:
                type = "未开始"
                break;
            case 10061002:
                type = "开始";
                break;
            case 10061003:
                type = "已结束";
                break;
        }
        return type;
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
    // 获取年级下科目
    getCourse(gradeId) {
      this.addForm.courseId = null;
      this.courseList = [];
      let param = {
        name: gradeId
      }
      this.$post('/course/getCourseByGradeId', param).then(res => {
        if(res.code === 200) {
          this.courseList = res.result
        } else {
          this.$Message.error("获取课程列表失败")
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
      var thiz = this;
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        name: this.queryFrom.name,
        acadId: this.queryFrom.acadId,
        gradeId: this.queryFrom.gradeId
      };
      this.$post("exam/query", params).then(function(msg) {
        if (msg.code === 200) {
          msg.result.list.map((item,index)=>{
            if(item.status === 10031002){
              thiz.tableDate = [...thiz.tableDate,item]
            }
          })
          // thiz.tableDate = msg.result.list;
          thiz.total = msg.result.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
    },
    // 考试发布
    renderTime(date) {
        var dates = new Date(date).toJSON();
        return new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
    },
    //保存
    examType(type) {
        switch(type) {
            case 0:
                type = "未开始";
                break;
            case 1:
                type = "进行中";
                break;
            case 2:
                type = "已完成";
                break;
        }
        return type;
    },
    saveData() {
        debugger
        if(this.dateList.length > 0) {
            this.addForm.dateList.push(this.renderTime(this.dateList[0]))
            this.addForm.dateList.push(this.renderTime(this.dateList[1]))
        }
        // let params = {
        //     name: this.addForm.name,
        //     acadId: this.addForm.acadId,
        //     gradeId: this.addForm.gradeId,
        //     num: this.addForm.num
        // }
        this.$post("exam/add", this.addForm).then(res => {
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
            this.addForm.gradeId = null;
            this.addForm.acadId = null;
            this.addForm.courseId = null;
            this.addForm.dateList = [];
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
</style>

