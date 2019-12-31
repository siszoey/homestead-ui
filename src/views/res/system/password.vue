<template>
  <div class="body-box bg-white">
    <div class="body-header">
      <span class="body-header-title">密码修改</span>
    </div>
    <div style="body-center bg-white">
      <el-row>
        <el-col :span="14" :offset="5" style="margin-top:10px">
          <div class="chengePass">
            <p>
              <i class="el-icon-edit-outline"></i>
            </p>
            <p>
              <span class="title1">账户密码修改</span>
            </p>
            <p>
              <span class="title2">密码修改时请注意密码的安全性</span>
            </p>
          </div>

          <el-steps :active="active" finish-status="success" simple style="margin-top: 20px">
            <el-step title="验证身份"></el-step>
            <el-step title="重置登录密码"></el-step>
            <el-step title="重置成功"></el-step>
          </el-steps>
          <!-- 验证身份 -->
          <div class="info" v-if="active==0">
            <el-row>
              <el-col :span="12" :offset="5" style="margin-top:20px;margin-bottom:60px">
                <el-form
                  :model="checkPasswordForm"
                  ref="checkPasswordForm"
                  label-width="100px"
                  class="demo-ruleForm"
                  :rules="changeRules"
                  key="checkPasswordForm"
                >
                  <el-form-item label="登录密码" prop="oldPassword" :error="errorMsg">
                    <el-input
                      type="password"
                      v-model="checkPasswordForm.oldPassword"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top:30px;">
                    <el-button type="primary" @click="submitCheckPassForm('checkPasswordForm')">下一步</el-button>
                    <el-button @click="resetForm('checkPasswordForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <!-- 重置登录密码 -->
          <div class="info" v-else-if="active==1">
            <el-row>
              <el-col :span="14" :offset="4" style="margin-top:20px;margin-bottom:60px">
                <el-form
                  :model="newPasswordForm"
                  ref="newPasswordForm"
                  label-width="150px"
                  class="demo-ruleForm"
                  :rules="changeRules"
                  key="newPasswordForm"
                >
                  <el-form-item label="新的登录密码" prop="newPassword">
                    <el-input
                      type="password"
                      v-model="newPasswordForm.newPassword"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top:35px;" label="确认新的登录密码" prop="renewPassword">
                    <el-input
                      type="password"
                      v-model="newPasswordForm.renewPassword"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top:35px;">
                    <el-button type="primary" @click="submitChangePassForm('newPasswordForm')">下一步</el-button>
                    <el-button @click="resetForm('newPasswordForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <!-- 重置失败 -->
          <div class="info" v-else-if="active==2">
            <el-row>
              <el-col :span="20" :offset="2" style="margin-top:20px;margin-bottom:60px">
                <el-alert
                  title="修改失败"
                  type="error"
                  :closable="false"
                  description="密码修改失败，请重试或联系技术人员"
                  show-icon
                  style="padding:20px;"
                ></el-alert>
              </el-col>
            </el-row>
          </div>
          <!-- 重置成功 -->
          <div class="info" v-else-if="active==3">
            <el-row>
              <el-col :span="20" :offset="2" style="margin-top:20px;margin-bottom:60px">
                <el-alert
                  title="修改成功"
                  type="success"
                  :closable="false"
                  description="密码修改成功，请牢记新的登录密码"
                  show-icon
                  style="padding:20px;"
                ></el-alert>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { CheckPassword, ChangePassword } from "@api/sys.setting";
export default {
  data() {
    var checkPass1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.newPasswordForm.renewPassword !== "") {
          this.$refs.newPasswordForm.validateField("renewPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.newPasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      userName: "zjd",
      errorMsg: "",
      checkPasswordForm: {
        oldPassword: ""
      },
      newPasswordForm: {
        newPassword: "",
        renewPassword: ""
      },
      changeRules: {
        oldPassword: [{ validator: checkPass1, trigger: "blur" }],
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        renewPassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitCheckPassForm(formName) {
      this.$refs[formName].validate((valid, fields) => {
        this.errorMsg = "";
        if (valid) {
          var datas = {
            loginName: this.userName,
            password: this.checkPasswordForm.oldPassword
          };
          CheckPassword(datas)
            .then(res => {
              console.log(res);
              if (res.msg == "success") this.active++;
              else if (res.state == 0)
                this.errorMsg = "密码校验失败，请重新输入";
            })
            .catch(err => console.log(err));
        }
      });
    },
    submitChangePassForm(formName) {
      this.$refs[formName].validate((valid, fields) => {
        if (valid) {
          if (this.checkPasswordForm.oldPassword) {
            var datas = {
              loginName: this.userName,
              password: this.checkPasswordForm.oldPassword,
              newPassword: this.newPasswordForm.newPassword
            };
            ChangePassword(datas)
              .then(res => {
                console.log(res);
                if (res.msg == "success") this.active = this.active + 2;
                else return false;
              })
              .catch(err => console.log(err));
          } else {
            this.active++;
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.bg-white {
  background: #ffffff;
}
.body {
  height: 100%;
  overflow: auto;
}
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
/* body-header部分 */
.body-box {
  height: auto;
  border: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header {
  height: 50px!important;;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.body-box .body-header .body-header-title {
  font-family: "MicrosoftYaHei-Bold", "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  text-align: left;
  font-size: 13px;
  color: #333333;
  padding: 20px;
  line-height: 50px;
  vertical-align: middle;
}
.chengePass {
  width: 100%;
  height: 180px;
  text-align: center;
  margin-top: 20px;
}
.chengePass p i {
  width: 100px;
  height: 100px;
  font-size: 100px;
  color: #3580ff;
}
.title1 {
  font-family: "MicrosoftYaHei-Bold", "微软雅黑 Bold", "微软雅黑";
  font-weight: 700;
  font-style: normal;
  font-size: 24px;
  color: #666666;
  text-align: center;
  line-height: 24px;
}
.title2 {
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #cccccc;
  text-align: center;
  line-height: 22px;
}
</style>