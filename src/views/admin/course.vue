<template>
  <!-- 科目管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <!-- <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="科目" style="margin-right:10px;">
                <Input id="name" v-model="queryFrom.name" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <Button type="primary" @click="loadData">查询</Button>
          </Row>
        </Form>
        <div class="btnBox">
          <Button type="primary" @click="addData">新增</Button>
        </div> -->
      </div>
      <div slot="paddingContent">
        <Table stripe :columns="columns1" :data="tableDatas" size="small" ></Table>
      </div>
      <div slot="pager">
         <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage3"
        layout="prev, pager, next, jumper"
        :total="30">
      </el-pagination>
      </div>
    </MasterPage>

<!-- 新增弹窗 -->
    <!-- <Modal
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
              <FormItem label="科目" prop="name">
                <Input v-model="addForm.name" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="学年" prop="acadId">
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
          </Row>
        </div>
      </Form>
    </Modal> -->
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
      typeModel: false, // 公告类型
      pagecount: 10,
      total: 0,
      eidtOrAdd: "",
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 4,
      queryFrom: {
        name: '', // 年级
        gradeId: null,
        acadId: null,
      },
      addForm: {
         name: null, // 学年
         acadId: null,
         gradeId: null,
      },
      acadList: [],
      gradeList: [],
      tableDatas:[],
      columns1: [
        { title: "科目", key: "courseName",align:"center"},
        // { title: "学年", key: "acadName",align:"center"},
        { title: "年级", key: "gradName",align:"center"},
        // { title: "创建时间", key: "createTime",align:"center",
        // render: (h,params)=>{
        //         return h('div',
        //             this.formatDate(new Date(params.row.createTime),'yyyy-MM-dd')
        //             )
        //     } 
        // },
        // { title: "操作", key: "action", width: 250, align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h( "Button", {
        //           props: { type: "error", size: "small" },
        //           on: {
        //             click: () => {
        //               this.remover(params.row.id);
        //             },
        //           },
        //         },
        //         "删除"
        //       ),
        //     ]);
        //   },
        // },
      ],
      tableDate: [],
      studentInfo: [],
    };
  },
  created() {},
  mounted() {
    this.studentInfo = JSON.parse(localStorage.getItem("admin"));
    this.getAllCourse(1);
    this.loadData();
    // 获取年级集合
    this.getAcad();
  },
  methods: {
    getAllCourse(val){
      let self = this;
      let params = {
        gradeId:val+4,
      }
        if(val === 1){
          this.$get('/exam/getCourse',params).then(res => {
          if(res.code === 200){
            console.log(res)
            self.tableDatas = []
            res.result.map((item,index)=>{
              let tempValue = {
                courseName:item.course,
                gradName:'初一',
              }
              self.tableDatas = [...self.tableDatas,tempValue]
            })
          }
        })
        }else if(val === 2){
          this.$get('/exam/getCourse',params).then(res => {
          if(res.code === 200){
            self.tableDatas = []
            console.log(res)
            res.result.map((item,index)=>{
              let tempValue = {
                courseName:item.course,
                gradName:'初二',
              }
              self.tableDatas = [...self.tableDatas,tempValue]
            })
          }
        })
        }else if(val === 3){
          this.$get('/exam/getCourse',params).then(res => {
          if(res.code === 200){
            console.log(res)
            self.tableDatas = []
            res.result.map((item,index)=>{
              let tempValue = {
                courseName:item.course,
                gradName:'初三',
              }
              self.tableDatas = [...self.tableDatas,tempValue]
            })
          }
        })
        }
    },
    getGradeName(j){
      if(j === 6){
        return '初一'
      }else if(j === 7){
        return '初二'
      }else if(j === 8){
        return '初三'
      }
    },
    handleCurrentChange(val) {
        console.log(val);
        this.getAllCourse(val)
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
    getItemValue() {

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
      this.$post("course/query", params).then(function(msg) {
        if (msg.code === 200) {
          thiz.tableDate = msg.result.list;
          thiz.total = msg.result.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
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
          this.$get("course/delete", params)
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
            gradeId: this.addForm.gradeId,
            acadId: this.addForm.acadId
        }
        this.$post("course/add", params).then(res => {
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
            this.addForm.acadId = null;
            this.addForm.gradeId = null;
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
.pageStyle{
  position: absolute;
  bottom:16%;
  right: 0;
}
</style>

