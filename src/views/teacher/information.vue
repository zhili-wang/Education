<template>
  <!-- 个人信息 -->
  <section class="container" style="height: 100%">
    <div class="information">
        <Card dis-hover style="height:100%">
          <div slot="title" class="in-title">个人信息</div>
          <div class="row">
            <Row type="flex" justify="center">
              <Col span="8">
                <span class="input-title">姓名：</span>
                <Input
                  v-model="this.from.name"
                  placeholder="请输入姓名"
                  readonly
                  size="large"
                  style="width: 18rem;"
                />
              </Col>
              <Col span="8">
                <span class="input-title">工号：</span>
                <Input
                  v-model="this.from.code"
                  placeholder="请输入职工号"
                  readonly
                  size="large"
                  style="width: 18rem;"
                />
              </Col>
            </Row>
          </div>

          <div class="row">
            <Row type="flex" justify="center">
              <Col span="8">
                <span class="input-title">性别：</span>
                <Input
                  v-model="this.from.sex"
                  placeholder="请输入电话"
                  clearable
                  size="large"
                  style="width: 18rem;"
                />
              </Col>
              <Col span="8">
                <span class="input-title">年龄：</span>
                <Input
                  v-model="this.from.age"
                  placeholder="请输入地址"
                  clearable
                  size="large"
                  style="width: 18rem;"
                />
              </Col>
            </Row>
          </div>

          <div class="row">
            <Row type="flex" justify="center">
              <Col span="8">
                <span class="input-title">老师等级：</span>
                <Input
                  v-model="this.from.type"
                  placeholder="请输入微信"
                  clearable
                  size="large"
                  style="width: 18rem;"
                />
              </Col>
              <Col span="8">
                <!-- <span class="input-title">邮箱：</span>
                <Input
                  v-model="email"
                  placeholder="请输入邮箱"
                  clearable
                  size="large"
                  style="width: 18rem;"
                /> -->
              </Col>
            </Row>
          </div>

          <div class="row2">
            <Row type="flex" justify="center" style="margin-top:2rem;">
            <Col span="5">
              <Button type="primary" style="width:16rem;margin-left:-5rem;">编辑</Button>
            </Col>
            <Col span="5">
              <Button type="success" style="width:16rem;margin-left:4rem;">保存</Button>
            </Col>
          </Row>
          </div>
        </Card>
    </div>
    <!-- <Form :model="formItem" :label-width="50" label-position="left">
      <Row >
        <Col span="10" align="right">
          <FormItem label="姓名：" style="color:#fff;">
            </FormItem>
            <Input
              id="course"
              v-model="courseName"
              placeholder="请输入"
              clearable
              style="width=250px"
            ></Input>
          
        </Col>
      </Row>
    </Form> -->
  </section>
</template>

<script>
// import Master from '../../components/Master.vue'
export default {
  components: {},
  data() {
    return {
      from: {
        name: null,
        sex: null,
        age: null,
        code: null,
      },
      name: "刘老师",
      number:"201710098265",
      phone:"18488888888",
      address:"华南理工大学广州学院 B1-304",
      wechat:"18488888888",
      email:"liulaoshi@163.com",
    };
  },
  created() {},
  mounted() {
    this.getDate();
  },
  methods: {
    getDate() {
      let param = {
        name: JSON.parse(localStorage.getItem("teacher")).name
      }
      this.$post('/tea/teacher/queryById', param).then(res => {
        if(res.code === 200) {
            this.from = res.result;
            if(this.from.type === 10051002) {
              this.from.type = '讲师';
            } else {
              this.from.type = '班主任';
            }
            if(this.from.sex === 1) {
              this.from.sex = '男';
            } else {
              this.from.sex = '女';
            }
        } else {
          this.$Message.error('获取信息失败');
        }
      })
    }
  },
};
</script>

<style>
.container {
  background-color: #f8f8f9;
  padding: 1rem;
}
.information {
  width: 100%;
  height: 100%;
  display: block;
  padding: 2rem 3rem;
  /* background-color: #fff; */
}
.in-title {
  font-size: 2rem;
  font-weight: 550;
  /* 颜色值 紫色：#673ab7  蓝色：#0062c6 #2d8cf0   墨蓝：#17233d  黑色：#303133 */
  color: #673ab7;
}
.row {
  /* margin: 4rem 0 3rem 0; */
  margin: 5% 0 5% 0;
}
.row2 {
  /* margin: 4rem 0 3rem 0; */
  margin: 8% 0 5% 0;
}
.input-title {
  float: left;
  height: 2.22rem;
  line-height: 2.22rem;
  font-size: 1.1rem;  
  font-weight: 520;
  /* 颜色值 紫色：#673ab7  蓝色：#0062c6 #2d8cf0   墨蓝：#17233d  黑色：#303133 */
  color: #2b85e4;
}
</style>