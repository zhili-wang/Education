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
      columns1: [
        { title: "学期", key: "acadName",align:"center",width: 180},
        { title: "年级", key: "gradeName",align:"center"},
        { title: "班级", key: "className",align:"center",
            render: (h,params)=>{
                return h('div',[
                h( "a", {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "10px",color: '#f00' },
                  on: {
                    click: () => {
                      this.classInfo(params.row);
                    },
                  },
                },
                params.row.className
              ),
                ]);
            } 
        },
        { title: "班主任", key: "name",align:"center" },
        { title: "科目", key: "courseName",align:"center" },
      ],
      tableDate: [],
      studentInfo: '',
    };
  },
  created() {},
  mounted() {
    this.studentInfo = JSON.parse(localStorage.getItem("teacher"));
    this.loadData();
    // 获取年级集合
    this.getAcad();
  },
  methods: {
      // 查看班级信息
      classInfo(row) {
          this.$router.push({name: 'student', params: {id: row.classId}});
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
      var thiz = this;
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        code: JSON.parse(localStorage.getItem("teacher")).name,
      };
      this.$post("tea/teacher/query", params).then(function(msg) {
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

