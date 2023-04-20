"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
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
      show: true,
      isRegist: false
    });
    const customStyleExit = { backgroundColor: "#ffa73c", color: "#fff" };
    const customStyleLogin = { backgroundColor: "#ff6b07", color: "#fff" };
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
    const handleLogin = async () => {
      const { account, password } = common_vendor.toRefs(state.userForm);
      const option = state.isRegist ? api_index.userRegister(state.userForm) : api_index.userLogin({ account: account.value, password: password.value });
      const { code, data, msg } = await option;
      if (code === 200) {
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
        common_vendor.index.showToast({
          title: msg,
          icon: "success",
          duration: 1500
        });
      }
    };
    const checkRegister = () => {
      state.userForm.account = "";
      state.userForm.password = "";
      state.userForm.username = "";
      state.isRegist = !state.isRegist;
    };
    const handleLogOut = () => {
      userStore.logOut();
      common_vendor.index.reLaunch({
        url: "/pages/user/user"
      });
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
          const { code, data, msg } = await api_index.userWxLogin(params);
          if (code === 200) {
            console.log("微信一键登录存储token和用户信息");
            userStore.$patch((state2) => {
              state2.userInfo = data.userInfo;
              state2.token = data.token;
            });
            userInfo.value.avatar = data.userInfo.avatar;
            userInfo.value.username = data.userInfo.username;
            state.show = false;
          }
          common_vendor.index.showToast({
            title: msg || "",
            icon: "none"
          });
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
            common_vendor.index.showToast({
              title: "登录失败,错误码：" + err.code,
              icon: "none"
            });
            reject(err);
          }
        });
      });
    };
    const handleUser = () => {
      if (userInfo.value.username.length) {
        common_vendor.index.navigateTo({
          url: "/pages/user/user-info"
        });
      } else {
        state.show = true;
        console.log(state.show);
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
        c: common_vendor.o(handleUser),
        d: common_vendor.p({
          title: "个人中心",
          icon: "integral"
        }),
        e: common_vendor.p({
          title: "浏览记录",
          icon: "clock"
        }),
        f: common_vendor.p({
          title: "关注/收藏",
          icon: "heart"
        }),
        g: common_vendor.p({
          title: "设置",
          icon: "setting"
        }),
        h: common_vendor.unref(userInfo).username
      }, common_vendor.unref(userInfo).username ? {
        i: common_vendor.o(handleLogOut),
        j: common_vendor.p({
          ["custom-style"]: customStyleExit,
          ripple: true
        })
      } : {}, {
        k: common_vendor.o(($event) => common_vendor.unref(userForm).account = $event),
        l: common_vendor.p({
          modelValue: common_vendor.unref(userForm).account
        }),
        m: common_vendor.p({
          label: "+86"
        }),
        n: common_vendor.o(($event) => common_vendor.unref(userForm).password = $event),
        o: common_vendor.p({
          type: "password",
          modelValue: common_vendor.unref(userForm).password
        }),
        p: common_vendor.p({
          label: "密码"
        }),
        q: state.isRegist
      }, state.isRegist ? {
        r: common_vendor.o(($event) => common_vendor.unref(userForm).username = $event),
        s: common_vendor.p({
          modelValue: common_vendor.unref(userForm).username
        }),
        t: common_vendor.p({
          label: "昵称"
        })
      } : {}, {
        v: common_vendor.sr("uForm", "0f7520f0-8,0f7520f0-7"),
        w: common_vendor.p({
          model: common_vendor.unref(userForm)
        }),
        x: common_vendor.t(state.isRegist ? "登录" : "注册"),
        y: common_vendor.o(checkRegister),
        z: common_vendor.t(!state.isRegist ? "登录" : "注册"),
        A: common_vendor.o(handleLogin),
        B: common_vendor.p({
          ["custom-style"]: customStyleLogin,
          shape: "circle",
          ripple: true
        }),
        C: common_vendor.p({
          name: "weixin-fill",
          label: "微信登录",
          ["margin-left"]: "10rpx",
          ["label-color"]: "#fff"
        }),
        D: common_vendor.o(handleWxLogin),
        E: common_vendor.p({
          ["custom-style"]: customStyleWx,
          shape: "circle",
          ripple: true
        }),
        F: common_vendor.o(($event) => state.show = $event),
        G: common_vendor.p({
          mode: "bottom",
          modelValue: state.show
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
