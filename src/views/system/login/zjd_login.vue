<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div class="page-login--content" flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <div class="login-title">
            <img src="./image/title.png" />
          </div>
          <div class="login-btn">
            <div class="login-text" @click="JumpPage('/loginPage',true)">
              <i>
                <img src="./image/login_icon.png" width="50px" height="50px" />
              </i>
              <span>立即登录</span>
            </div>
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
              <img src="./image/shareRelease.png" width="75px" height="76px" />
              <span>共享发布</span>
            </div>
          </div>
          <div class="cardBody">
            <div class="cardDiv" @click="JumpPage('#')">
              <img src="./image/comprehensive.png" width="64px" height="72px" />
              <span>综合监管</span>
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
          <p
            class="page-login--content-footer-locales"
          >Copyright © http://www.51jianku.com/51jianku/</p>
          <p class="page-login--content-footer-copyright">上海飞未信息技术有限公司</p>
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
import { mapActions } from "vuex";
import localeMixin from "@/locales/mixin.js";
export default {
  mixins: [localeMixin],
  data() {
    return {
      formLogin: {
        username: "admin",
        password: "admin",
        code: "v9am"
      }
    };
  },
  mounted() {},
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    //跳转页面
    JumpPage(url,type) {
        if(type){
            this.$router.push({ path: url });
        }else{
            this.submit(url);
        }
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit(url) {
      // 登录
      // 注意 这里的演示没有传验证码
      // 具体需要传递的数据请自行修改代码
      this.login({
        username: this.formLogin.username,
        password: this.formLogin.password
      }).then(() => {
        // 重定向对象不存在则返回顶层路径
        this.$router.replace(url || "/");
      });
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
      width: 180px;
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
</style>
