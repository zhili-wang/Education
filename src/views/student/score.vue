<template>
  <!-- 成绩管理 -->
  <section class="home-container">
    <MasterPage title>
      <!-- <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
      </div> -->
      <div slot="searchContent" class="search-content-slot">
        <div>
          <span class="fotSize">请选择你要查看成绩的考试场次：</span>
          <el-select v-model="value" placeholder="请选择" @change="getExam(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
         <el-button class="successButton" type="success" @click="getExamGrade()">查看成绩</el-button>
         <el-button class="successButton" type="success" @click="changeShow()" >查看综合评价表</el-button>
        </div>
        <!-- <Form :model="formItem" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="科目：" style="margin-right:10px;">
                <Input id="course" v-model="courseName" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <Button type="primary" @click="loadData">查询</Button>
          </Row>
        </Form> -->
      </div>
      <div slot="paddingContent">
        <Table v-show="sShow === 0" stripe :columns="columns1" :data="tableDate" size="small" ></Table>
      </div>
    </MasterPage>
    <div v-show="isShow === 0" class="container">
      <table  style="margin:0 auto;width: 800px;" border="1" cellpadding="0" cellspacing="0">
           <thead>
             <tr>
               <td class="first-row center" colspan="8">本学期综合评价表</td>
             </tr>
           </thead>
        <tbody>
        <tr>
          <td  class="second-row center">姓名</td>
          <td  class="second-row center">&nbsp;{{stuName}}</td>
          <td  class="second-row center">性别</td>
          <td  class="second-row center">&nbsp;{{stuSex}}</td>
          <td  class="second-row center">学号</td>
          <td  class="second-row center">&nbsp;{{stucode}}</td>
          <td  class="second-row center">班级</td>
          <td  class="second-row center">&nbsp;{{stuClass}}</td>
        </tr>
        <tr>
          <td colspan="2"  class="third-row center">评价内容</td>
          <td colspan="3"  class="third-row center">评价结果</td>
          <td colspan="3"  class="third-row center">总评</td>
        </tr>
        <tr>
          <td rowspan="5" class="center">思想品德</td>
          <td class="center">热爱祖国</td>
          <td rowspan="5"  >该生热爱集体，积极参加集体活动，维护集体利益</td>
          <td colspan="5" rowspan="14">该生遵守学校的规章制度，有较强的集体荣誉感，服从安排，认真完成任务，善于与同学交往。在劳动中积极肯干，不怕苦、不怕累。</td>
        </tr>
        <tr>
          <td class="center">勤奋自强</td>
        </tr>
        <tr>
          <td class="center">诚信守法</td>
        </tr>
        <tr>
          <td class="center">文明礼貌</td>
        </tr>
        <tr>
          <td class="center">团结合作</td>
        </tr>
        <tr>
          <td rowspan="4" class="center">学业表现</td>
          <td class="center">学习表现</td>
          <td rowspan="4">该生具备良好的学习习惯，自觉完成学习任务</td>
        </tr>
        <tr>
          <td class="center">学习能力</td>
        </tr>
        <tr>
          <td class="center">学习态度</td>
        </tr>
        <tr>
          <td class="center">学习习惯</td>
        </tr>
        <tr>
          <td rowspan="2" class="center">身心健康</td>
          <td class="center">身体素质</td>
          <td rowspan="2">该生积极参加体育活动，有健康的心理水平</td>
        </tr>
        <tr>
          <td class="center">心理健康</td>
        </tr>
        <tr>
          <td rowspan="3" class="center">劳动实践</td>
          <td class="center">学农学军</td>
          <td rowspan="3">该生积极参加实践活动，劳动认真</td>
        </tr>
        <tr>
          <td class="center">实践活动</td>
        </tr>
        <tr>
          <td class="center">劳动表现</td>
        </tr>
        <tr>
          <td class="last-row center" colspan="2">学期寄语</td>
          <td class="last-row center" colspan="6">
            你基本上能够遵守学校的规章制度，纪律有所改善。希望今后能保持已经取得的成绩，多关心班集体，注意克服缺点，养成谦逊踏实的品格，争取早日加入团组织，成为一个全面发展的优秀中学生。
          </td>
        </tr>
        </tbody>
      </table>
  </div>
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
      stuName:'',
      stuSex:'',
      stuCode:'',
      stuClass:'',
      page: 1,
      isShow:1,
      sShow:1,
      pagecount: 10,
      total: 0,
      options: [],
      value: '',
      stuGrade:'',
      chinese:null,
      math:null,
      english:null,
      politics:null,
      historys:null,
      geography:null,
      sprots:null,
      physics:null,
      chemistry:null,
      people:null,
      buttonStyle:0,
      examId:null,
      totalScore:null,
      studentObj: [],
      courseObj: [],
      eidtOrAdd: "",
      // formItem: {
      //   stuId: "",
      //   courseId: "",
      //   score: "",
      //   score2: "",
      //   total_score:""
      // },
      columns1: [
        { title: "学号", key: "stucode",align:"center"},
        { title: "姓名", key: "stuName",align:"center" },
        { title: "语文", key: "chinese",align:"center" },
        { title: "数学", key: "math",align:"center" },
        { title: "英语", key: "english",align:"center" },
        { title: "思想品德", key: "politics",align:"center" },
        { title: "历史", key: "historys",align:"center" },
        { title: "地理", key: "geography",align:"center" },
        { title: "体育", key: "sprots",align:"center" },
        { title: "生物", key: "people",align:"center" },
        { title: "总分", key: "totalScore",align:"center" },
      ],
      tableDate: [
        {
          stuName:null,
          stucode:null,
          chinese:null,
          math:null,
          english:null,
          politics:null,
          historys:null,
          geography:null,
          sprots:null,
          physics:null,
          chemistry:null,
          totalScore:null
        }
      ],
      stuName: '',
      stucode:null,
      stuId:null,
      courseName: ""
    };
  },
  created() {},
  mounted() {
    this.getDate()
    this.studentInfo = JSON.parse(localStorage.getItem("student"));
    this.entryData();
    // this.loadData();
  },
  methods: {
    getTableops(value){
      if(value === '7年级'){
        this.columns1 =  [
        { title: "学号", key: "stucode",align:"center"},
        { title: "姓名", key: "stuName",align:"center" },
        { title: "语文", key: "chinese",align:"center" },
        { title: "数学", key: "math",align:"center" },
        { title: "英语", key: "english",align:"center" },
        { title: "思想品德", key: "politics",align:"center" },
        { title: "历史", key: "historys",align:"center" },
        { title: "地理", key: "geography",align:"center" },
        { title: "体育", key: "sprots",align:"center" },
        { title: "生物", key: "people",align:"center" },
        { title: "总分", key: "totalScore",align:"center" },
      ]
      }else if(value === '8年级'){
        this.columns1 =  [
        { title: "学号", key: "stucode",align:"center"},
        { title: "姓名", key: "stuName",align:"center" },
        { title: "语文", key: "chinese",align:"center" },
        { title: "数学", key: "math",align:"center" },
        { title: "英语", key: "english",align:"center" },
        { title: "思想品德", key: "politics",align:"center" },
        { title: "历史", key: "historys",align:"center" },
        { title: "地理", key: "geography",align:"center" },
        { title: "体育", key: "sprots",align:"center" },
        { title: "生物", key: "people",align:"center" },
        { title: "物理", key: "physics",align:"center" },
        { title: "总分", key: "totalScore",align:"center" },
      ]
      }else if(value === '9年级'){
        this.columns1 =  [
        { title: "学号", key: "stucode",align:"center"},
        { title: "姓名", key: "stuName",align:"center" },
        { title: "语文", key: "chinese",align:"center" },
        { title: "数学", key: "math",align:"center" },
        { title: "英语", key: "english",align:"center" },
        { title: "思想品德", key: "politics",align:"center" },
        { title: "历史", key: "historys",align:"center" },
        { title: "体育", key: "sprots",align:"center" },
        { title: "物理", key: "physics",align:"center" },
        { title: "总分", key: "totalScore",align:"center" },
      ]
      }
    },
    getDate() {
      let self = this;
      let param = {
        name: JSON.parse(localStorage.getItem("student")).name
      }
      this.$post('/student/queryByCode', param).then(res => {
        if(res.code === 200) {
            if(res.result.sex === 1) {
              self.stuSex = '男';
            } else {
              self.stuSex = '女';
            }
            self.stuName = res.result.name;
            self.stucode  = res.result.code;
            self.stuId  = res.result.id;
            self.stuClass = res.result.className;
        } else {
          this.$Message.error('获取信息失败');
        }
      })
    },
    getDataLists(value){
      switch(value.course){
        case "语文":
          this.chinese = value.score;
          break;
        case "数学":
          this.math = value.score;
          break;
        case "英语":
          this.english = value.score;
          break;
        case "思想品德":
          this.politics = value.score;
          break;
        case "历史":
          this.historys = value.score;
          break;
        case "地理":
          this.geography = value.score;
          break;
        case "体育":
          this.sprots = value.score;
          break;
        case "物理":
          this.physics = value.score;
          break;
        case "化学":
          this.chemistry = value.score;
          break;
        case "生物":
          this.people = value.score;
          break;
      }
      return ''
    },
    getTerm(){
      console.log('导出成绩表')
    },
    // getDate() {
    //   let self = this;
    //   let param = {
    //     name: JSON.parse(localStorage.getItem("student")).name
    //   }
    //   this.$post('/student/queryByCode', param).then(res => {
    //     if(res.code === 200) {
    //         self.stuId = res.result.id;
    //         self.stucode = res.result.code,
    //         self.stuName = res.result.name
    //         console.log(self.stuId)
    //     } else {
    //       this.$Message.error('获取信息失败');
    //     }
    //   })
    // },
    //加载数据
    // loadData() {
    //   var thiz = this;
    //   var params = {
    //     page: this.page,
    //     limit: this.pagecount,
    //     clazzId: this.studentInfo.clazzId,
    //     courseName: this.courseName,
    //     username: this.studentInfo.username
    //   };
    //   this.$get("score/getListByPage", params).then(function(msg) {
    //     console.log(msg, 666);
    //     if (msg.rows.length > 0) {
    //       thiz.tableDate = msg.rows;
    //       thiz.total = msg.total;
    //     } else {
    //       thiz.tableDate = [];
    //       thiz.total = 0;
    //     }
    //   });
    // },
    getExam(value){
      this.examId = value;
    },
    getExamGrade(){
      let self = this;
      console.log(this.stuId)
      if(this.examId !== null){
        console.log(this.examId)//放后端接口
        let params = {
          stuId:this.stuId,//77
          // examId:this.examId//20
          examId:20
        }
        this.$get('/student/score', params).then(res => {
            if(res.code === 200) {
              //对响应数据做些
                self.getTableops(res.result.grade)
                self.sShow = 0;
                self.totalScore = 0;
                res.result.list.map((item,index)=>{
                  self.totalScore += item.score 
                  self.getDataLists(item)
                  if(index+1 === res.result.list.length){
                    let temDatas = {
                      stuName:self.stuName,
                      stucode:self.stucode,
                      chinese:self.chinese,
                      math:self.math,
                      english:self.english,
                      politics:self.politics,
                      historys:self.historys,
                      geography:self.geography,
                      sprots:self.sprots,
                      physics:self.physics,
                      chemistry:self.chemistry,
                      totalScore:self.totalScore
                    }
                    // self.tableDate = [self.tableDate,temDatas]
                    self.$set(self.tableDate,0,temDatas)
                    console.log(self.tableDate)
                    console.log(self.totalScore)
                  }
                })
            }
        })
      }else{
        this.$Message.error('请选择要查看的场次');
      }
    },
    entryData(){
      this.entryModel = true;
      var self = this;
      let params  = {
        type:0
      };
      this.$get('/score/exams',params).then(res=>{
        // self.options = 
        res.result.map((item,index)=>{
          let temValue = {
            value:item.id,
            label:item.name
          }
          self.options = [...self.options,temValue]
        })
      })
    },
    changeShow(){
      this.isShow = 0;
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
.fotSize{
  margin-right:20px;
  font-size: 18px;
  font-weight: 500;
}
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
.successButton{
  margin-left: 25px;
}
.titleName {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 15px;
  color: #01a7e8;
  font-size: 16px;
}
.container{
  width:100%;
  position: absolute;
  top:26%;
}
.center{
  text-align: center;
}
.first-row{
  width:400px;
}
.second-row{
  width:50px
}
.third-row{
  width:50px;
}
.last-row{
  height: 100px;
}
</style>

