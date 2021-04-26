<template>
  <!-- 公告管理 -->
  <section class="home-container">
    <MasterPage title>
      <div slot="searchContent" class="search-content-slot">
        <Form :model="queryFrom" :label-width="50" label-position="left" ref="formValidate">
          <Row>
            <Col span="8">
              <FormItem label="标题" style="margin-right:10px;">
                <Input id="course" v-model="queryFrom.title" placeholder="请输入" ></Input>
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
      class-name="vertical-center-modal"
    >
      <Form :model="addForm" :label-width="120" ref="formValidate">
        <div class="border1">
          <Row>
            <Col span="24">
              <FormItem label="标题" prop="title">
                <Input v-model="addForm.title" placeholder="请输入" type="text"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="内容" prop="desc">
                <Input v-model="addForm.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入内容"></Input>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem label="类型">
                <!-- <RadioGroup v-model="addForm.type"> -->
                <RadioGroup v-model="addForm.type">
                  <span>
                    <Radio disabled='true' label="10041001">全校</Radio>
                  </span>
                  <!-- <span>
                    <Radio label="10041002">年级</Radio>
                  </span>
                  <span>
                    <Radio label="10041003">班级</Radio>
                  </span> -->
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>

    <!-- 查看弹窗 -->
    <Modal
      v-model="checkModel"
      ref="checkModel"
      scrollable
      :title="titleText"
      class-name="vertical-center-modal"
      class="modalClass"
    >
    <el-table
    :data="thatData"
    style="width:300px"
    class="tableStyles">
      <el-table-column
        prop="title"
        width="120">
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        width="120">
      </el-table-column>
    </el-table>
    <div class="contentStyle">{{desc}}</div>
    </Modal>

  </section>
</template>
<script>
import MasterPage from "@/components/Master";
import axios from 'axios'
export default {
  components: {
    MasterPage
  },
  data() {
    return {
      titleText: "", // 新增弹框标题信息
      addModel: false, // 新增
      checkModel:false,//查看
      typeModel: '全校', // 公告类型
      radio:'10041001',
      page: 1,
      desc:'',
      pagecount: 10,
      total: 0,
      studentObj: [],
      courseObj: [],
      eidtOrAdd: "",
      queryFrom: {
        title: "",
        status: '',
        type: '',
      },
    //   statusList: [
    //       {
    //           id: 10031001,
    //           name: '待发布'
    //       },
    //       {
    //           id: 10031002,
    //           name: '发布'
    //       },
    //       {
    //           id: 10031003,
    //           name: '撤销'
    //       }
    //   ],
      addForm: {
        title: '', // 标题
        desc: '', // 内容
        type: Number, // 类型
        typeCode: Number, //类型编号
      },
      columns1: [
        { title: "标题", key: "title",align:"center"},
        // { title: "公告内容", key: "desc",align:"center" },
        { title: "状态", key: "status",align:"center", render: (h, params) => {return h('div', this.filterStatus(params.row.status))} },
        // { title: "发布人", key: "releaseName",align:"center" },
        { title: "发布时间", key: "releaseTime",align:"center",
        render: (h,params)=>{
                return h('div',
                    this.formatDate(new Date(params.row.releaseTime),'yyyy-MM-dd')
                    )
            } 
        },
        { title: "公告类型", key: "type",align:"center",
            render: (h, params) => {
                return h('div', this.filterType('全校'))//默认展示全校
                // return h('div', this.filterType(params.row.type))
            }
        },
        // { title: "创建时间", key: "createTime",align:"center",
        //   render: (h,params)=>{
        //         return h('div',
        //             this.formatDate(new Date(params.row.createTime),'yyyy-MM-dd')
        //             )
        //     }
        // },
        { title: "操作", key: "action", width: 250, align: "center",
          render: (h, params) => {
            return h("div", [
              h( "Button", {
                  props: { type: "primary", size: "small", disabled: params.row.status === (10031002)},
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.release(params.row.id);
                    },
                  },
                },
                "发布"
              ),
              h( "Button", {
                  props: { type: "primary", size: "small", disabled: params.row.status !== 10031002 },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.recall(params.row.id);
                    },
                  },
                },
                "撤销"
              ),
              h( "Button", {
                  props: { type: "error", size: "small", disabled: params.row.status === 10031002 },
                  style: { marginRight: "10px" },
                  on: {
                    click: () => {
                      this.remover(params.row.id);
                    },
                  },
                },
                "删除"
              ),
              h( "Button", {
                  props: { type: "primary", size: "small", disabled: false },
                  on: {
                    click: () => {
                      console.log('xxxx');
                      this.checkData(params.row.id)
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      tableDate: [],
      thatData: [{
        desc: "测试数据",
        releaseTime: "2021-04-03T15:18:34.000+00:00",
        title: "测试",
        type: "全校",
      }],
      studentInfo: [],
      courseName: ""
    };
  },
    watch: {
        'addForm.type': {
            handler: function() {
            if(this.addForm.type === 10041001) {
                this.addForm.typeCode = 0;
            }
            console.log(this.addForm.type)
            },
        }
    },
  created() {},
  mounted() {
    this.studentInfo = JSON.parse(localStorage.getItem("admin"));
    this.loadData();
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
      filterType(code) {
        switch(code) {
            case 10041001:
                code = '全校';
                break;
            case 10041002:
                code = '年级';
                break;
            case 10041003:
                code = '班级';
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
     // 删除
    remover(id) {
        this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          let params = {
            id: id
          };
          this.$get("notice/delete", params)
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
    //查看数据
    checkData(iD) {
      var self = this;// this 
      this.titleText = "查看公告";
      this.checkModel = true;
      this.$post("notice/query").then(function(msg) {
        if (msg.code === 200) {
          // thiz.tableDate = msg.result.list;
          // thiz.total = msg.result.total;
          console.log(msg.result.list.length)
          msg.result.list.map((item,index)=>{
            if(item.id === iD){
              console.log(item.id)
               self.desc = item.desc
              var temData = {
                  title:item.title,
                  desc:item.desc,
                  releaseTime:self.formatDate(new Date(item.releaseTime),'yyyy-MM-dd'),
                  type:'全校'
              }
              // self.thatData.push(temData);
              for(var i=0;i<self.thatData.length;i++){
                  if(i === 0){
                    self.$set(self.thatData,i,temData)
                  }
                }
              console.log(temData)
            }
          })
        } else {
          self.thatDate = {};
        }
      })
    },
    //加载数据
    loadData() {
      var thiz = this;
      var params = {
        pageNum: this.page,
        pageSize: this.pagecount,
        type: this.queryFrom.type,
        status: this.queryFrom.status,
        title: this.queryFrom.title
      };
      this.$post("notice/query", params).then(function(msg) {
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
    // 撤销
    recall(id) {
        let params = {
            id: id
        }
        // let baseUrl = process.env.NODE_ENV == "development" ? "/api/" : "";
        // let url = 'notice/recall';
        // axios.get(baseUrl + url, {
        //     params:params
        // }).then(res => {
        //     resolve(res.data);//测试1
        // }).catch(err => {
        //     //reject(err.data)  
        //     // Spin.hide();
        //     Message.error('接口异常！');
        // })
        this.$get('notice/recall',params).then(res => {
            if(res.code === 200) {
                this.$Message.info("撤销成功");
                this.loadData();
            }
        })
    },
   
    // 新增
    addData() {
      this.titleText = "新增";
      this.addModel = true;
    },
    //保存
    saveData() {
        let params = {
            title: this.addForm.title,
            text: this.addForm.desc,
            type: this.addForm.type,
            typeCode: this.addForm.typeCode
        }
        this.$post("notice/add", params).then(res => {
            if(res.code === 200) {
                this.$Message.success("新增成功");
            } else {
                this.$Message.error(res.message);
            }
        })

        // var thiz = this;
        // var params = this.getParams();
        // var url = "";
        // //---1为添加，2为保存
        // if (this.eidtOrAdd == 1) {
        //   url = "student/insert";
        // } else if (this.eidtOrAdd == 2) {
        //   url = "student/editById";
        //   params.id = this.id;
        // }
        // this.$post(url, params)
        //   .then(function(msg) {
        //     if (msg == "1") {
        //         thiz.$Message.info("保存成功！");
        //     }else {
        //         thiz.$Message.error("保存失败！");
        //     }
        //     thiz.addModel = false;
        //     thiz.loadData();
        //   });
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
.tableStyles{
  margin-top:-62px ;
  margin-left: 200px;
  overflow: hidden;
}
.modalClass{
  position: relative;
}
.contentStyle{
  width: 500px;
  height: 350px;
  overflow: scroll;
  border: 1px solid black;
  font-size:16px;
}
</style>

