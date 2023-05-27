"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const api_index = require("../../api/index.js");
const utils_wxLogin = require("../../utils/wxLogin.js");
const utils_showMsg = require("../../utils/showMsg.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_button2 + _easycom_u_icon2)();
}
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_button + _easycom_u_icon)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user-login",
  setup(__props) {
    const userStore = stores_user.useUser();
    const loginFrom = common_vendor.ref();
    const state = common_vendor.reactive({
      userForm: {
        account: "",
        password: "",
        username: ""
      },
      isRegist: false,
      customStyleLogin: { backgroundColor: "#ffc09f", color: "#fff", marginTop: "40rpx" }
    });
    const letIconStyle = { fontSize: "35rpx", color: "#bcbcbc" };
    const { userForm } = common_vendor.toRefs(state);
    common_vendor.onShow(() => {
      if (common_vendor.index.getStorageSync("USER")) {
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      }
    });
    const regStatus = common_vendor.computed(() => state.isRegist);
    common_vendor.watch(() => state.userForm, () => {
      changeLoginBtn();
    }, { deep: true });
    const handleLogin = async () => {
      const { account, password } = common_vendor.toRefs(state.userForm);
      const option = regStatus.value ? api_index.api.userRegister(state.userForm) : api_index.api.userLogin({ account: account.value, password: password.value });
      const { code, data, msg } = await option;
      if (code !== 200) {
        utils_showMsg.showMsg({ title: msg });
        return;
      }
      if (!regStatus.value) {
        userStore.$patch((state2) => {
          state2.userInfo = data.userInfo;
          state2.token = data.token;
        });
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      } else {
        state.isRegist = false;
        loginFrom.value.resetFields();
      }
      utils_showMsg.showMsg({ title: msg });
    };
    const switchRegister = () => {
      loginFrom.value.resetFields();
      state.isRegist = !state.isRegist;
      state.customStyleLogin.backgroundColor = "#ffc09f";
    };
    const handleWxLogin = () => {
      utils_wxLogin.wxLogin();
    };
    const changeLoginBtn = () => {
      const flag = state.userForm.account.length && state.userForm.password.length;
      if (regStatus.value ? flag && state.userForm.username.length : flag) {
        state.customStyleLogin.backgroundColor = "#ff7830";
      } else {
        state.customStyleLogin.backgroundColor = "#ffc09f";
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).account = $event, {
          trim: true
        }, true)),
        b: common_vendor.p({
          placeholder: "请输入手机号/邮箱",
          modelValue: common_vendor.unref(userForm).account
        }),
        c: common_vendor.p({
          prop: "account",
          ["left-icon"]: "account",
          ["left-icon-style"]: letIconStyle
        }),
        d: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).password = $event, {
          trim: true
        }, true)),
        e: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: common_vendor.unref(userForm).password
        }),
        f: common_vendor.p({
          prop: "password",
          ["left-icon"]: "lock",
          ["left-icon-style"]: letIconStyle
        }),
        g: common_vendor.unref(regStatus)
      }, common_vendor.unref(regStatus) ? {
        h: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).username = $event, {
          trim: true
        }, true)),
        i: common_vendor.p({
          placeholder: "请输入昵称",
          modelValue: common_vendor.unref(userForm).username
        }),
        j: common_vendor.p({
          prop: "username",
          ["left-icon"]: "bookmark",
          ["left-icon-style"]: letIconStyle
        })
      } : {}, {
        k: common_vendor.sr(loginFrom, "2bad5de3-0", {
          "k": "loginFrom"
        }),
        l: common_vendor.p({
          model: common_vendor.unref(userForm)
        }),
        m: state.customStyleLogin
      }, state.customStyleLogin ? {
        n: common_vendor.t(!common_vendor.unref(regStatus) ? "登录" : "注册"),
        o: common_vendor.o(handleLogin),
        p: common_vendor.p({
          ["custom-style"]: state.customStyleLogin,
          shape: "circle",
          ripple: true
        })
      } : {}, {
        q: common_vendor.t(common_vendor.unref(regStatus) ? "< 返回登录" : "手机号快速注册 >"),
        r: common_vendor.o(switchRegister),
        s: common_vendor.o(handleWxLogin),
        t: common_vendor.p({
          name: "weixin-circle-fill",
          ["label-pos"]: "bottom",
          label: "微信",
          ["label-size"]: "14",
          size: "64",
          color: "#01a95e"
        }),
        v: common_vendor.p({
          name: "qq-fill",
          ["label-pos"]: "bottom",
          label: "QQ",
          ["label-size"]: "14",
          size: "64",
          color: "#1a8ef1"
        }),
        w: common_vendor.p({
          name: "weibo",
          ["label-pos"]: "bottom",
          label: "微博",
          ["label-size"]: "14",
          size: "64",
          color: "#ff5427"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2bad5de3"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user-login.vue"]]);
wx.createPage(MiniProgramPage);
