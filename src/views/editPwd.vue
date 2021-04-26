<template>
  <section class="login-container">
    <div class="bg-wrap">
      <div class="card-wrap">
        <Card style="width:23rem;" :dis-hover="true">
          <p slot="title" style="font-size:1rem">
            <Icon type="log-in"></Icon>修改密码
          </p>
          <Form ref="userForm" :model="userForm" :rules="ruleCustom">
            <FormItem prop="oldPassword">
              <Input type="password" v-model.trim="userForm.oldPassword" placeholder="请输入原密码" size="large">
                <Icon type="ios-lock-outline" slot="prepend" class="icon-cls"></Icon>
              </Input>
            </FormItem>
            <FormItem prop="newPassword">
              <Input
                type="password"
                v-model.trim="userForm.newPassword"
                placeholder="请输入新密码"
                size="large"
              >
                <Icon type="ios-lock-outline" slot="prepend" class="icon-cls"></Icon>
              </Input>
            </FormItem>

            <FormItem prop="againPassword">
              <Input
                type="password"
                v-model.trim="userForm.againPassword"
                placeholder="请再次输入新密码"
                size="large"
              >
                <Icon type="ios-lock-outline" slot="prepend" class="icon-cls"></Icon>
              </Input>
            </FormItem>
            <FormItem>
              <div class="btu-register">
                <Button type="primary" @click="btn_login()" @keyup.enter="enterSearch" long :loading="login_loading">修改密码</Button>
                <!-- <Button type="dashed" @click="back()" >返回</Button> -->
              </div>
            </FormItem>
          </Form>
        </Card>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    //这里是自定义的规则
				var newpwdmin=(rule, value, callback)=>{
					if(!value){
						return callback(new Error('请再次输入密码'));
					}else if(value !==this.userForm.newPassword){
						return callback(new Error('两次输入密码不一致!'));
					}else {
            callback()
          }
				}
    return {
      login_loading: false,
      type: null,
      userForm: {
        oldPassword: null,
        newPassword: null,
        againPassword: null
      },
      ruleCustom: {
        oldPassword: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        newPassword: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        againPassword:[{ required: true, validator: newpwdmin, trigger: 'blur'}],
      }
    };
  },
  created(){
    this.enterDown();
    this.type = this.$route.params.type;
  },
  methods: {
    // 修改密码
    btn_login() {
      let id = null;
      if(this.type === 'admin') {
        id = JSON.parse(localStorage.getItem("admin")).id;
      }
      if(this.type === 'teacher') {
        id = JSON.parse(localStorage.getItem("teacher")).id;
      }
      if(this.type === 'student') {
        id = JSON.parse(localStorage.getItem("student")).id;
      }
      let param = {
        id: id,
        oldPwd: this.userForm.oldPassword,
        newPwd: this.userForm.newPassword,
      }
      this.$post('admin/editPwd', param).then(res => {
        if(res.code === 200) {
          this.$Message.info("修改成功");
          this.$router.go(-1);
        } else {
          this.$Message.error(res.message);
        }
      })
    },
    // back() {
    //   this.$router.go(-1);
    // },
    //回车登录
    enterDown(){
      document.onkeydown = e =>{

        // alert(typeof e.key)	//输出string
        // alert(e.key);        //输出按下键的值
        // alert(e.target.baseURI);      // 登录页面的URL:http://localhost:8081/#/  或者  http://localhost:8081/login#/

          //13表示回车键，baseURI是当前页面的地址，为了更严谨，也可以加别的，可以打印e看一下
          if (e.key === 'Enter' && e.target.baseURI.match(/#\/$/)) {       // 使用正则匹配 #/ 结尾的页面，点击回车登录
          //回车后执行搜索方法
              this.btn_login()
          }
      }
  }

  }
};
</script>
<style lang="postcss" scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* height: calc(100%); */
  height: 100%;
  & .bg-wrap {
    display: flex;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    /* position: relative; */
  }
  & .card-wrap {
    /* position: absolute;
    left: 0px;
    bottom: 0px; */
    margin: auto;
    opacity:88%
  }
  & .icon-cls {
    font-weight: bold;
    width: 20px;
    font-size: 18px;
  }
}
</style>
