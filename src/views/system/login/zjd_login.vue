<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <div class="login-title">
            <img src="./image/title.png" />
          </div>
          <div class="login-btn" v-if="info.name" style="width: 180px;">
            <div class="login-text">
              <i>
                <img src="./image/login_icon.png" width="50px" height="50px" />
              </i>
              <el-dropdown size="small" class="d2-mr">
                <span class="btn-text">{{info.name}}</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logOff">
                    <d2-icon name="power-off" class="d2-mr-5" />
                    注销
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="login-btn" v-else style="width: 600px;">
            <el-form :inline="true" ref="loginForm" :rules="rules" :model="formLogin"
              class="demo-form-inline login-text" size="small">
              <el-form-item label="用户名:">
                <el-input v-model="formLogin.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码:">
                <el-input v-model="formLogin.password" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit" class="button-login" size="small">登录</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>
        <div class="page-login--content-main" flex="dir:top main:center cross:center">
          <div class="cardBody">
            <div class="cardDiv" @click="JumpPage('/index')">
              <img src="./image/oneMap.png" width="88px" height="63px" />
              <span>宅基地一张图</span>
            </div>
            <div class="cardDiv" @click="JumpPage('/land/examine/business/todo')">
              <img src="./image/jointApproval.png" width="71px" height="70px" />
              <span>联合审批</span>
            </div>
            <div class="cardDiv" @click="JumpPage('#')">
              <img src="./image/comprehensive.png" width="64px" height="72px" />
              <span>综合监管</span>
            </div>
          </div>
          <div class="cardBody">
            <div class="cardDiv" @click="JumpPage('#')">
              <img src="./image/shareRelease.png" width="75px" height="76px" />
              <span>共享发布</span>
            </div>
            <div class="cardDiv" @click="JumpPage('#')">
              <img src="./image/dataConcurrent.png" width="74px" height="74px" />
              <span>数据汇交</span>
            </div>
            <div class="cardDiv" @click="JumpPage('#')">
              <img src="./image/operations.png" width="70px" height="71px" />
              <span>运维管理</span>
            </div>
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p
            class="page-login--content-footer-locales"
          >Copyright © http://www.51jianku.com/51jianku/</p> -->
          <p class="page-login--content-footer-copyright">版权所有@2020上海飞未信息技术有限公司</p>
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from "dayjs";
  import { mapState, mapActions } from "vuex";
  import localeMixin from "@/locales/mixin.js";
  export default {
    computed: {
      ...mapState('d2admin/user', [
        'info'
      ])
    },
    mixins: [localeMixin],
    data() {
      return {
        timeInterval: null,
        time: dayjs().format('HH:mm:ss'),
        // 快速选择用户
        dialogVisible: false,
        users: [
          {
            name: 'Admin',
            username: 'admin',
            password: 'admin'
          },
          {
            name: 'Editor',
            username: 'editor',
            password: 'editor'
          },
          {
            name: 'User1',
            username: 'user1',
            password: 'user1'
          }
        ],
        // 表单
        formLogin: {
          username: '',
          password: '',
          code: 'v9am'
        },
        // 表单校验
        rules: {
          username: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ],
          code: [
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    mounted() { },
    methods: {
      ...mapActions("d2admin/account", ["login"]),
      //跳转页面
      JumpPage(url) {//需要进行登录验证
        if (typeof (this.info.name) != "undefined") {
          //this.$router.push({ path: url });
          this.$router.replace(url || "/");
        } else {
          this.$message({
            type: "error",
            message: "请进行登录!"
          });
        }
      },
      /**
       * @description 提交表单
       */
      // 提交登录信息
      submit() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            // 登录
            // 注意 这里的演示没有传验证码
            // 具体需要传递的数据请自行修改代码
            this.login({
              username: this.formLogin.username,
              password: this.formLogin.password
            })
              .then(() => {
                // 重定向对象不存在则返回顶层路径
                this.$router.replace(this.$route.query.redirect || '/')
              })
          } else {
            // 登录表单校验失败
            this.$message.error('表单校验失败，请检查')
          }
        })
      },
      ...mapActions('d2admin/account', [
        'logout'
      ]),
      /**
       * @description 登出
       */
      logOff() {
        this.logout({
          confirm: true
        })
      }
    }
  };
</script>
<style lang="scss">
  .page-login {
    height: 100%;
    position: relative;
    background-image: url(./image/background_img.png);
    background-position: right bottom;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;

    // 层
    .page-login--layer {
      @extend %full;
      overflow: auto;
    }

    // 登陆页面控件的容器
    .page-login--content {
      height: 100%;
      min-height: 500px;

      .page-login--content-main {
        margin-top: 80px;

        .cardBody {
          width: 1000px;
          margin: 0px auto;
          display: flex;

          .cardDiv {
            margin: 6px;
            width: 320px;
            height: 200px;
            background: rgba(0, 0, 0, 0.25);
            border-radius: 2px;
            border: 1px solid #7d7f82;
            cursor: pointer;

            img {
              margin: 50px auto 20px auto;
              display: block;
            }

            span {
              font-family: "PingFangSC-Regular", "PingFang SC";
              font-weight: 400;
              font-style: normal;
              font-size: 18px;
              color: #ffffff;
              text-align: center;
              display: block;
            }
          }

          .cardDiv:hover {
            background: rgba(0, 0, 0, 0.4);
          }
        }
      }
    }

    // header
    .page-login--content-header {
      padding: 1em 0;

      .login-title {
        position: absolute;
        top: 25px;
        left: 60px;
        width: 30%;

        img {
          width: 100%;
        }
      }

      .login-btn {
        width: 300px;
        height: 70px;
        position: absolute;
        top: 0px;
        right: 0px;
        background: rgba(0, 0, 0, 0.18);
        border-radius: 0px 0px 0px 100px;

        .login-text {
          position: relative;
          top: 50%;
          left: 75%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          // width: max-content;
          letter-spacing: 1px;

          img {
            width: 18px;
            height: 18px;
          }

          span {
            margin-left: 8px;
            font-size: 18px;
            color: #fff;
          }
        }
      }
    }
  }

  // footer
  .page-login--content-footer {
    padding: 1em 0;

    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 12px;
      text-align: center;
      color: white;

      a {
        color: $color-text-normal;
        margin: 0 0.5em;

        &:hover {
          color: $color-text-main;
        }
      }
    }

    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: white;

      a {
        color: $color-text-normal;
      }
    }

    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;

      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }

  .el-input {
    width: 150px;
    border-radius: 2px !important;
  }

  .el-input__inner{
    background-color: rgba(255,255,255,0);
    color: #fff;
    border-radius: 2px;
  }

  .el-form-item__label {
    color: #FFF;
    font-size: 16px;
  }

  .button-login {
    background: #FFF;
  }

  .button-login:hover {
    background: #FFF;
  }

  .button-login:focus {
    background: #FFF;
  }
  .button-login span{
    color: #303823 !important;
  }
  .el-form-item{
    margin-bottom: 0px !important;
  }
</style>