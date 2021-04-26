<template>
  <!-- 学期管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="学年" style="margin-right:10px;">
                <Input id="name" v-model="queryFrom.name" placeholder="请输入" ></Input>
              </FormItem>
            </Col>
            <!-- <Col span="8">
              <FormItem label="状态" style="margin-right:10px;">
                <Select v-model="queryFrom.status" placeholder="请选择">
                    <Option value="10031001">待发布</Option>
                    <Option value="10031002">发布</Option>
                    <Option value="10031003">撤销</Option>
                </Select>
              </FormItem>
            </Col> -->
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
              <FormItem label="学年" prop="name">
                <Input v-model="addForm.name" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="学期">
                <RadioGroup v-model="addForm.type">
                  <span>
                    <Radio label="10011001">第一学期</Radio>
                  </span>
                  <span>
                    <Radio label="10011002">第二学期</Radio>
                  </span>
                </RadioGroup>
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
        name: '', // 学年
        type: '', // 学期
      },
      addForm: {
        name: '', // 学年
        type: Number, // 学期
      },
      columns1: [
        { title: "学年", key: "name",align:"center"},
        { title: "学期", key: "type",align:"center", render: (h, params) => {return h('div', this.filterStatus(params.row.type))} },
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
            //   h( "Button", {
            //       props: { type: "primary", size: "small", disabled: params.row.status === (10031001 ||  10031003)},
            //       style: { marginRight: "10px" },
            //       on: {
            //         click: () => {
            //           this.release(params.row.id);
            //         },
            //       },
            //     },
            //     "发布"
            //   ),
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
  },
  methods: {
      filterStatus(code) {
        switch(code) {
            case 10011001:
                code = '第一学期';
                break;
            case 10011002:
                code = '第二学期';
                break;
        }
        return code;
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
        type: this.queryFrom.type
      };
      this.$post("acad/query", params).then(function(msg) {
        if (msg.code === 200) {
          thiz.tableDate = msg.result.list;
          thiz.total = msg.result.total;
        } else {
          thiz.tableDate = [];
          thiz.total = 0;
        }
      });
    },
    // 发布
    release(id) {
        let params = {
            id: id
        }
        this.$get('notice/release', params).then(res => {
            if(res.code === 200) {
                this.$Message.info("发布成功！");
                this.loadData();
            }
        })
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
          this.$get("acad/delete", params)
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
            type: this.addForm.type
        }
        this.$post("acad/add", params).then(res => {
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
            this.addForm.type = Number
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

