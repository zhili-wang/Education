<template>
  <!-- 年级管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="年级" style="margin-right:10px;">
                <Input id="name" v-model="queryFrom.name" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学年" >
                <el-select v-model="queryFrom.acadId" placeholder="请选择" clearable>
                    <el-option
                    v-for="item in this.acadList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                    </el-option>
                </el-select>
              </FormItem>
            </Col>
            <Button type="primary" @click="loadData">查询</Button>
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
              <FormItem label="年级" prop="name">
                <Input v-model="addForm.name" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>

            <Col span="24">
              <FormItem label="学期" prop="gradeId">
               <Select v-model="addForm.acadId" :label-in-value="true">
                    <Option :value="item.code" v-for="item in this.acadList" v-bind:key="item.code">{{item.name}}</Option>
                </Select>
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
      typeModel: false, // 公告类型
      page: 1,
      pagecount: 10,
      total: 0,
      eidtOrAdd: "",
      queryFrom: {
        name: '', // 年级
      },
      addForm: {
        name: null, // 学年
        acadId: null
      },
      acadList: [],
      columns1: [
        { title: "年级", key: "name",align:"center"},
        { title: "学年", key: "acadName",align:"center" },
        { title: "创建时间", key: "createTime",align:"center",
        render: (h,params)=>{
                return h('div',
                    this.formatDate(new Date(params.row.createTime),'yyyy-MM-dd')
                    )
            } 
        },
        { title: "操作", key: "action", width: 250, align: "center",
          render: (h, params) => {
            return h("div", [
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
    this.getAcadDate();
  },
  methods: {
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
        acadId: this.queryFrom.acadId
      };
      this.$post("grade/query", params).then(function(msg) {
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
          this.$get("grade/delete", params)
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
      this.getAcadDate();
      // 获取学年集合
    },
    getAcadDate() {
        this.$post('acad/getList').then(res => {
            if(res.code === 200) {
                this.acadList = res.result;
            } else {
                this.$Message.error("获取学年列表失败");
            }
        })
    },
    //保存
    saveData() {
        let params = {
            name: this.addForm.name,
            acadId: this.addForm.acadId,
        }
        this.$post("grade/add", params).then(res => {
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

