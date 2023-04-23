"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
const utils_showMsg = require("../../utils/showMsg.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_cell_item2 = common_vendor.resolveComponent("u-cell-item");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_cell_group2 = common_vendor.resolveComponent("u-cell-group");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_avatar2 + _easycom_u_cell_item2 + _easycom_u_button2 + _easycom_u_cell_group2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_form2 + _easycom_u_icon2 + _easycom_u_popup2)();
}
const _easycom_u_avatar = () => "../../uni_modules/vk-uview-ui/components/u-avatar/u-avatar.js";
const _easycom_u_cell_item = () => "../../uni_modules/vk-uview-ui/components/u-cell-item/u-cell-item.js";
const _easycom_u_button = () => "../../uni_modules/vk-uview-ui/components/u-button/u-button.js";
const _easycom_u_cell_group = () => "../../uni_modules/vk-uview-ui/components/u-cell-group/u-cell-group.js";
const _easycom_u_input = () => "../../uni_modules/vk-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/vk-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_form = () => "../../uni_modules/vk-uview-ui/components/u-form/u-form.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_cell_item + _easycom_u_button + _easycom_u_cell_group + _easycom_u_input + _easycom_u_form_item + _easycom_u_form + _easycom_u_icon + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const userStore = stores_user.useUser();
    const loginFrom = common_vendor.ref();
    const state = common_vendor.reactive({
      userInfo: {
        avatar: "",
        username: ""
      },
      userForm: {
        account: "13539660702",
        password: "13539660702",
        username: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: ["change", "blur"]
          },
          {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: ["change"]
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: ["change", "blur"]
          }
        ],
        username: [{ required: true, message: "昵称不能为空", trigger: ["change", "blur"] }]
      },
      show: true,
      isRegist: false,
      customStyleLogin: { backgroundColor: "#ff6b07", color: "#fff", marginTop: "85rpx" }
    });
    const customStyleExit = { backgroundColor: "#ffa73c", color: "#fff" };
    const customStyleWx = { backgroundColor: "#01a95e", color: "#fff" };
    const { userInfo, userForm } = common_vendor.toRefs(state);
    common_vendor.onLoad(() => {
      if (userStore.token) {
        state.show = false;
        userInfo.value.username = userStore.userInfo.username;
        userInfo.value.avatar = userStore.userInfo.avatar;
      } else {
        state.show = true;
      }
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onReady(() => {
      if (!userStore.token) {
        loginFrom.value.setRules(state.rules);
      }
    });
    common_vendor.watch(() => state.isRegist, (newVal) => {
      common_vendor.nextTick$1(() => {
        loginFrom.value.resetFields();
        loginFrom.value.setRules(state.rules);
      });
      if (newVal === true) {
        state.customStyleLogin.marginTop = "50rpx";
      }
    });
    common_vendor.watch(() => state.show, (newVal) => {
      if (newVal === true)
        common_vendor.nextTick$1(() => {
          loginFrom.value.resetFields();
          loginFrom.value.setRules(state.rules);
        });
    });
    const handleLogin = async () => {
      const { account, password } = common_vendor.toRefs(state.userForm);
      const option = state.isRegist ? api_index.userRegister(state.userForm) : api_index.userLogin({ account: account.value, password: password.value });
      try {
        const { data, msg } = await option;
        if (!state.isRegist) {
          const { avatar, username } = data.userInfo;
          state.userInfo.avatar = avatar;
          state.userInfo.username = username;
          state.show = false;
          userStore.$patch((state2) => {
            console.log("存储token和用户信息");
            state2.userInfo = data.userInfo;
            state2.token = data.token;
          });
        } else {
          state.isRegist = false;
        }
        utils_showMsg.showMsg({ title: msg, icon: "success" });
      } catch (e) {
      }
    };
    const checkRegister = () => {
      common_vendor.nextTick$1(() => {
        loginFrom.value.resetFields();
        loginFrom.value.setRules(state.rules);
      });
      state.isRegist = !state.isRegist;
    };
    const handleLogOut = () => {
      userStore.logOut();
    };
    const handleWxLogin = async () => {
      common_vendor.index.getUserProfile({
        desc: "获取用户个人信息",
        success: async (infoRes) => {
          const { avatarUrl, nickName } = infoRes.userInfo;
          const codeWx = await getWxCode();
          const params = {
            avatar: avatarUrl,
            username: nickName,
            code: codeWx
          };
          try {
            const { data, msg } = await api_index.userWxLogin(params);
            console.log("微信一键登录存储token和用户信息");
            userStore.$patch((state2) => {
              state2.userInfo = data.userInfo;
              state2.token = data.token;
            });
            userInfo.value.avatar = data.userInfo.avatar;
            userInfo.value.username = data.userInfo.username;
            state.show = false;
            utils_showMsg.showMsg({ title: msg || "" });
          } catch (e) {
          }
        }
      });
    };
    const getWxCode = async () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success: (res) => {
            resolve(res.code);
          },
          fail: (err) => {
            utils_showMsg.showMsg({ title: "登录失败,错误码：" + err.code });
            reject(err);
          }
        });
      });
    };
    const handleUserOption = (url) => {
      if (!userInfo.value.username) {
        state.isRegist = false;
        state.show = true;
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : "/static/image/default-avatar.png",
          shape: "circle",
          size: "large"
        }),
        b: common_vendor.t(common_vendor.unref(userInfo).username ? common_vendor.unref(userInfo).username : "登录后查看更多精彩"),
        c: common_vendor.o(($event) => handleUserOption("/pages/user/user-Info")),
        d: common_vendor.o(($event) => handleUserOption("/pages/user/user-Info")),
        e: common_vendor.p({
          title: "个人中心",
          icon: "integral"
        }),
        f: common_vendor.p({
          title: "浏览记录",
          icon: "clock"
        }),
        g: common_vendor.p({
          title: "关注/收藏",
          icon: "heart"
        }),
        h: common_vendor.p({
          title: "设置",
          icon: "setting"
        }),
        i: common_vendor.unref(userInfo).username
      }, common_vendor.unref(userInfo).username ? {
        j: common_vendor.o(handleLogOut),
        k: common_vendor.p({
          ["custom-style"]: customStyleExit,
          ripple: true
        })
      } : {}, {
        l: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).account = $event, {
          trim: true
        }, true)),
        m: common_vendor.p({
          modelValue: common_vendor.unref(userForm).account
        }),
        n: common_vendor.p({
          prop: "account",
          label: "+86"
        }),
        o: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).password = $event, {
          trim: true
        }, true)),
        p: common_vendor.p({
          type: "password",
          modelValue: common_vendor.unref(userForm).password
        }),
        q: common_vendor.p({
          prop: "password",
          label: "密码"
        }),
        r: state.isRegist
      }, state.isRegist ? {
        s: common_vendor.o(common_vendor.m(($event) => common_vendor.unref(userForm).username = $event, {
          trim: true
        }, true)),
        t: common_vendor.p({
          modelValue: common_vendor.unref(userForm).username
        }),
        v: common_vendor.p({
          prop: "username",
          label: "昵称"
        })
      } : {}, {
        w: common_vendor.sr(loginFrom, "0f7520f0-8,0f7520f0-7", {
          "k": "loginFrom"
        }),
        x: common_vendor.p({
          model: common_vendor.unref(userForm)
        }),
        y: !state.isRegist
      }, !state.isRegist ? {
        z: common_vendor.o(checkRegister)
      } : {}, {
        A: state.customStyleLogin
      }, state.customStyleLogin ? {
        B: common_vendor.t(!state.isRegist ? "登录" : "注册"),
        C: common_vendor.o(handleLogin),
        D: common_vendor.p({
          ["custom-style"]: state.customStyleLogin,
          shape: "circle",
          ripple: true
        })
      } : {}, {
        E: common_vendor.p({
          name: "weixin-fill",
          label: "微信登录",
          ["margin-left"]: "10rpx",
          ["label-color"]: "#fff"
        }),
        F: common_vendor.o(handleWxLogin),
        G: common_vendor.p({
          ["custom-style"]: customStyleWx,
          shape: "circle",
          ripple: true
        }),
        H: common_vendor.o(($event) => state.show = $event),
        I: common_vendor.p({
          mode: "bottom",
          modelValue: state.show
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
