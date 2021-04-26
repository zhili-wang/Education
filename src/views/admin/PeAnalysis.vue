<template>
  <!-- 学生管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="title-icon">
        <Icon type="ios-game-controller-b" />
      </div>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="formItem" label-position="left" ref="formValidate">
            <Row>
               <!-- <span class="fotSize">年级：</span>
              <el-select v-model="gvalue" placeholder="选择年级" @change="getGradeName(gvalue)">
            <el-option
              v-for="item in grades"
              :key="item.gvalue"
              :label="item.glabel"
              :value="item.gvalue">
            </el-option>
          </el-select> -->
              <span class="fotSize">班级：</span>
              <el-select v-model="cvalue" placeholder="选择班级" @change="getClassName(cvalue)">
            <el-option
              v-for="item in classes"
              :key="item.cvalue"
              :label="item.clabel"
              :value="item.cvalue">
            </el-option>
          </el-select>
          <span class="fotSize">考试：</span>
          <el-select v-model="evalue" placeholder="选择考试" @change="getOtherExam(evalue)">
            <el-option
              v-for="item in optiones"
              :key="item.evalue"
              :label="item.elabel"
              :value="item.evalue">
            </el-option>
          </el-select>
            <Button class="button_styles" type="primary" @click="getAllneedDatas" style="margin-left:10%px">查询</Button>
            </Row>
        </Form>
        
        <div class="btnBox">
          <Button class="button_exam" type="primary" @click="entryData">成绩录入</Button>
        </div>
      </div>
      <div slot="paddingContent">
        <!-- <Table stripe :columns="columns1" :data="tableDate" size="small"></Table> -->
      </div>
      <!-- <div slot="pager">
        <Page
          :total="total"
          :page-size="pagecount"
          :current="page"
          show-sizer
          show-total
          class="paging"
          @on-change="changepage"
        />
      </div> -->
      <div slot="chart">
        <div id="barchart2" class="chart-style"></div>
        <div id="piechart" class="chart-style"></div>
      </div>
    </MasterPage>

    <!-- 成绩录入 -->
    <Modal
      v-model="entryModel"
      ref="enrtyModel"
      scrollable
      :title="titlText"
      @on-ok="getExamGrade"
      class-name="vertical-center-modal"
    >
    请选择考试场次
    <el-select v-model="value" placeholder="请选择" @change="getExam(value)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      <Button class="button_entry" for="id" type="primary" icon="ios-cloud-upload-outline" @click="$refs.file.click()">导入</Button>
          <form method="post" enctype="multipart/form-data" name="form1" >
            <input id="inputFile"  type="file" ref="file" style="display:none" accept=".xls,.xlsx" @change="getFile($event)">
         </form>
      <div class="content_style"></div>
    </Modal>
    <!-- 新增&修改弹窗 -->
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
            <Col span="24">
              <FormItem label="姓名：" >
                <Select v-model="formItem.stuId">
                  <option disabled value="">请选择</option>
                  <Option
                    v-for="(item, index) in studentObj"
                    :value="item.id"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="科目：">
                <Select v-model="formItem.courseId">
                  <option disabled value="">请选择</option>
                  <Option
                    v-for="(item, index) in courseObj"
                    :value="item.id"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="成绩">
                <Input v-model="formItem.score" placeholder="请输入"></Input>
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
import * as echarts from 'echarts'
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      barChartX:[],
      barChartData:[],
      piechartData:[
        {
          label:'不及格',
          key:'underSix',
        },
        {
          label:'及格',
          key:'six',
        },
        {
          label:'中等',
          key:'sev',
        },
        {
          label:'良好',
          key:'eig',
        },
        {
          label:'优秀',
          key:'nin',
        }
      ],
      titleText: "",
      titlText:"成绩录入",
      page: 1,
      pagecount: 10,
      courseid:null,
      total: 0,
      newGrade:null,
      classid:null,
      newExam:null,
      addModel: false,
      entryModel:false,
      modalLoading: true,
      newClassName:'',
      stuCode:null,
      otherExam:null,
      studentObj: [],
      courseObj:[],
      eidtOrAdd: "",
      options: [],
      value: '',
      optiones:[],
      evalue:'',
      grades:[],
      gvalue:'',
      classes:[],
      cvalue:'',
      // totalScore:"",  //总分
      examName:'',
      formItem: {
        stuId: "",
        courseId: "",
        score: "",
        score2: "",
        totalScore:""
      },
      columns1: [
        { title: "学号", key: "stuCode",align:"center" },
        { title: "姓名", key: "name",align:"center" },
        { title: "考试名称", key: "examName",align:"center" },
        { title: "班级", key: "clazzName",align:"center" },
        { title: "总分", key: "score",align:"center" },
        { title: "年级排名", key: "rank",align:"center" },
      ],
      columns2: [
        { title: "平均分", key: "avg",align:"center" },
        { title: "不及格", key: "undSix",align:"center" },
        { title: "六十分以上", key: "exSix",align:"center" },
        { title: "七十分以上", key: "exSev",align:"center" },
        { title: "八十分以上", key: "exEig",align:"center" },
        { title: "九十分以上", key: "exNin",align:"center" },
      ],
      tableDate: [],
      tableDatd:[],
      needDatas:[],
      binDatas:[],//饼状图数据
      id:'',
      teacherInfo:[],
      stuName:'',
      username:'',
      itemObj1:'',
      itemObj2:''
    };
  },
  created() {

  },
  mounted() {
    this.getAllClass()
    // this.initPieChart()
    this.entryDatas();
    this.getStudent();
    this.getCourse();
    this.getDate();
  },
  methods: {
      initBarChart(){
      this.barChartX=this.needDatas.map(item=>item.courseName)
      this.barChartData=this.needDatas.map(item=>item.avg)
      let chartDom =document.querySelector('#barchart2');
      let myChart = echarts.init(chartDom);
      let
          option = {
            title:{
              text:'各科平均分统计图',
              left: 'center'
            },
            xAxis: {
              type: 'category',
              data:this.barChartX
            },
            yAxis: {
              type: 'value'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            series: [{

              data: this.barChartData,
              type: 'bar',
              barWidth:'30%',
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    textStyle: { //数值样式
                      color: 'black',
                      fontSize: 16
                    }
                  }
                }
              }

            }]
          };

      option && myChart.setOption(option);
    },
    getAllClass(){
      let self = this;
      //对后端数据做些什么
      this.$get('/score/class').then(res=>{
        console.log(res)
        if(res.code === 200){
          res.result.map((item,index)=>{
            let temClass ={
              cvalue:item.id,
              clabel:item.className
            }
            self.classes = [...self.classes,temClass]
          })
        }
    })
    },
    getAllneedDatas(){
      let self = this;
      let params = {
        // examId:this.otherExam,//20
        examId:20,
        classId:6,
        // classId:this.newClassName//6
      }
      let param ={
        // examId:this.otherExam,//20
        examId:20,
      }
      this.$get('/score/class_avg',params).then(res=>{
        console.log(res)
      if(res.code === 200){
        self.needDatas = [];
        res.result.map((item,index)=>{
          let temValue = {
            courseId:item.courseId,
            courseName:item.courseName,
            avg:item.avg
          }
          self.needDatas = [...self.needDatas,temValue]
          console.log(self.needDatas)
        })
      }
      })
      this.$get('/score/drawing',param).then(res=>{
        self.binDatas = [];
        if(res.code === 200){
          // self.binDatas = [];
          let teValue = {
                nin:res.result.nin/res.result.sum,
                eig:res.result.eig/res.result.sum,
                sev:res.result.sev/res.result.sum,
                six:res.result.six/res.result.sum,
                underSix:res.result.underSix/res.result.sum
              }
              self.binDatas = [...self.binDatas,teValue]
              console.log(123)
              console.log(self.binDatas)
              console.log(123)
        }
      })
      setTimeout(()=>{
        self.initBarChart();
        self.initPieChart()
      },500)
    },
     initPieChart(){
      // let res=await this.axios.get('/api/teacher/drawing',{
      //   courseId:'',
      //   classId:''
      // })
    
      this.piechartData=this.piechartData.map(item=>
           ({
             value:Reflect.get(this.binDatas[0],item.key),
             name:item.label
           })
      )
      let chartDom = document.querySelector('#piechart');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: '分层人数饼图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: this.piechartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle:{
              normal:{
                label:{
                  show: true,
                  width:600,
                  formatter: '{b} : {c} ({d}%)'
                },
                labelLine :{show:true}
              }
            }
          }
        ]
      };

      option && myChart.setOption(option);
    },
     getDate() {
       let self = this;
      let param = {
        name: JSON.parse(localStorage.getItem("teacher")).name
      }
      this.$post('/tea/teacher/queryById', param).then(res => {
        console.log(res)
        if(res.code === 200){
          self.courseid = res.result.courseId;
        }
      })
    },
    getTables(){
      let self = this;
      let params = {
        classId:this.classid,
        examId:this.newExam,
        courseId:this.courseid,
      }
      this.$get("/teacher/score", params)
        .then(function(msg) {
          console.log(msg,666);
          let tableDatas = {
            avg:msg.result.avg,
            undSix:msg.result.undSix,
            exSix:msg.result.exSix,
            exSev:msg.result.exSev,
            exEig:msg.result.exEig,
            exNin:msg.result.exNin
          }
          msg.result.list.map((item,index)=>{
              let tableDates = {
              name:item.name,
              // clazzName:
              // courseName:
              score:item.score,
              rank:index+1,
            }
            tableDate = [...tableDate,tableDates]
          })
          tableDatd = [...tableDatd,tableDatas]//第二个table的数据就是：分层。
        });
    },
    // 加载数据
    loadData() {
      var thiz = this;
      var params = {
          page:this.page,
          limit:this.pagecount,
          clazzId:this.teacherInfo.clazzId,
          stuName:this.stuName,
          username:this.username
      };
      
    },
    getExamMessage(){
      console.log("打印成绩")
    },
    //下一页上一页
    changepage(val) {
      this.page = val;
      this.loadData();
    },
    getExamGrade(){//配置 数据和接口
      console.log(this.file)
      let formData = new FormData();
      let self = this;
      formData.append('file', this.file);
      formData.append('examId',this.newExam);
      // let data = {
      //   file:formData,
      //   examId:this.newExam
      // };
      let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
      //  let baseUrl = process.env.NODE_ENV == 'development' ? 'http://192.168.1.100:12002/' : '';
      let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
      this.axios.post(baseUrl +'/score/import',formData,config).then(res => {
          if(res.data.code === 200) {
              // res.result =
              console.log(123132)
              self.classid = res.data.result;
              console.log(self.classid)
              console.log(123132)
              this.$Message.info('导入成功');
              this.isprocess=false;
          }
      })
    },
    getFile(event){//获取文件
      this.isprocess=true;
      this.file = event.target.files[0];
      event.preventDefault();
    },
    getExam(value){  //导入成绩
    this.newExam = value;
    console.log(this.newExam)
    },
    getOtherExam(value){//查图
      this.otherExam = value;
      console.log(this.otherExam)
    },
    getClassName(value){//查图
      this.newClassName = value
      console.log(this.newClassName)
    },
    entryData(){
      this.entryModel = true;
      var self = this;
       let params  = {
        type:0
      };
      this.$get('/score/exams',params).then(res=>{
        console.log(1232)
        console.log(res.result)
        console.log(1232)
        // self.options =
        res.result.map((item,index)=>{
          let temValue = {
            value:item.id,
            label:item.name
          }
          self.options = [...self.options,temValue]
        })
        console.log(self.options)
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
          thiz.$post("score/deleteById", params)
            .then(function(msg) {
              console.log(msg);
              if (msg == "1") {
                thiz.page=1;
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
    putThisExam(){

    },
    entryDatas(){
      var self = this;
       let params  = {
        type:0
      };
      this.$get('/score/exams',params).then(res=>{
        // self.options = 
        res.result.map((item,index)=>{
          let temValue = {
            evalue:item.id,
            elabel:item.name
          }
          self.optiones = [...self.optiones,temValue]
        })
      })
    },
    //保存
    saveData() {
        var thiz = this;
        var params = this.getParams();
        var url = "";
        //---1为添加，2为保存
        if (this.eidtOrAdd == 1) {
          url = "score/insert";
        } else if (this.eidtOrAdd == 2) {
          url = "score/editById";
          params.id = this.id;
        }
        this.$post(url, params)
          .then(function(msg) {
            if (msg == "1") {
                thiz.$Message.info("保存成功！");
            }else {
                thiz.$Message.error("保存失败！");
            }
            thiz.addModel = false;
            thiz.loadData();
          });
    },
    //添加清空表单数据
    addData() {
      this.titleText = "添加";
      this.addModel = true;
      this.eidtOrAdd = 1;
      this.formItem = {
        stuId: '',
        courseId: '',
        score: '',
        score2: ''
      };
    },
    //修改获取表单数据
    editData(row) {
      console.log(row)
      this.titleText = "修改";
      this.addModel = true;
      this.eidtOrAdd = 2;
      this.studentObj = this.itemObj1;
      this.courseObj = this.itemObj2;
      this.formItem = {
        stuId: row.username,
        courseId: row.password,
        score: row.score,
        score2: row.score2
        // totalScore:row.score+row.score2
      };
      console.log(135);
      // this.totalScore = row.score + row.score2;
      this.id = row.id;
      this.$set(this.formItem,"stuId",row.stuId);
      this.$set(this.formItem,"courseId",row.courseId);
      //this.studentObj.push({id:row.stuId, name: row.stuName });
      //this.courseObj.push({id:row.courseId, name: row.courseName });
    },
    //获取学生
    getStudent() {
      var thiz = this;
      var params = {
          page:this.page,
          limit:100,
          clazzId:this.teacherInfo.clazzId
      };
      this.$get("student/getListByPage",params)
        .then(function(msg) {
          console.log(msg,7777);
          if (msg.rows.length > 0) {
              thiz.studentObj = msg.rows;
              thiz.itemObj1 = msg.rows;
          } else {
              thiz.studentObj = [];
          }
      });
    },
    getGradeName(value){
      this.newGrade = value;
      console.log(this.newGrade)
    },
    //获取课程
    getCourse() {
      var thiz = this;
      var params = {
          page:this.page,
          limit:100,
      };
      this.$get("course/getListByPage",params)
        .then(function(msg) {
          console.log(msg,7777);
          if (msg.rows.length > 0) {
              thiz.courseObj = msg.rows;
              thiz.itemObj2 = msg.rows;
          } else {
              thiz.courseObj = [];
          }
      });
    },
    getParams() {
        var params = {
            stuId: this.formItem.stuId,
            courseId: this.formItem.courseId,
            score: this.formItem.score,
            score2: this.formItem.score2,
            totalScore:this.formItem.totalScore
        };
        return params;
    }
  },
  computed:{
    totalScoreSum:function(){
      return this.formItem.score+this.formItem.score2;
    }
  }
};
</script>
<style lang="postcss" scoped>
.home-container {
  transform: translateY(30px);
}
.searchBtn {
  float: right;
}
.btnBox button {
  margin-right: 15px;
}
.button_exam{
  position: absolute;
  top:15px;
  right: 1.5%;
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
.button_echarts{
  position: absolute;
  top:15px;
  right: 50%;
}
.button_entry {
  display: inline-block;
  margin-left: 40px;
}
.content_style{
  width: 400px;
  height: 300px;
}
.chart-style{
  width:80%;
  height: 500px;
}
.button_styles{
  margin-left: 50px;
}

</style>

