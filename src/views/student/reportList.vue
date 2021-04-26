<template>
  <div class="container">
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
          <td  class="second-row center">&nbsp;{{stuCode}}</td>
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
</template>

<script>
export default {
   data(){
     return {
       stuName:'',
       stuSex:'',
       stuCode:'',
       stuClass:'',
     }
   },
   mounted(){
     this.getDate()
   },
   methods:{
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
            self.stuCode  = res.result.code;
            self.stuClass = res.result.className;
        } else {
          this.$Message.error('获取信息失败');
        }
      })
    }
   }
}
</script>

<style  scoped>
.container{
  width:100%;
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

