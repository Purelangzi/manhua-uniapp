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
        userInfo.value.username = userStore.userInfo.username;
        userInfo.value.avatar = userStore.userInfo.avatar;
        state.show = false;
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
      state.isRegist = true;
    };
    const handleLogOut = () => {
      userStore.logOut();
      common_vendor.index.reLaunch({
        url: "/pages/user/user"
      });
    };
    const handleWxLogin = async () => {
      common_vendor.index.getUserProfile({
        desc: "拿到个人信息用户注册昵称",
        success: async (res) => {
          const { avatarUrl, nickName } = res.userInfo;
          const res1 = await getCode();
          console.log(res1);
          const params = {
            avatar: avatarUrl,
            username: nickName,
            code: res1.code
          };
          const res2 = await api_index.userWxLogin(params);
          console.log(res2);
          if (res2.code === 200) {
            userStore.$patch((state2) => {
              console.log("微信一键登录存储token和用户信息");
              state2.userInfo = res2.userInfo;
              state2.token = res2.token;
            });
          }
        }
      });
    };
    const getCode = async () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success: (res) => {
            resolve(res);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: common_vendor.unref(userInfo).avatar ? common_vendor.unref(userInfo).avatar : "/static/image/default-avatar.png",
          shape: "circle",
          size: "large"
        }),
        b: common_vendor.t(common_vendor.unref(userInfo).username ? common_vendor.unref(userInfo).username : "登录后查看更多精彩"),
        c: common_vendor.p({
          title: "会员中心"
        }),
        d: common_vendor.p({
          title: "浏览记录"
        }),
        e: common_vendor.p({
          title: "关注/收藏"
        }),
        f: common_vendor.p({
          title: "设置"
        }),
        g: common_vendor.unref(userInfo).username
      }, common_vendor.unref(userInfo).username ? {
        h: common_vendor.o(handleLogOut),
        i: common_vendor.p({
          ["custom-style"]: customStyleExit,
          ripple: true
        })
      } : {}, {
        j: common_vendor.o(($event) => common_vendor.unref(userForm).account = $event),
        k: common_vendor.p({
          modelValue: common_vendor.unref(userForm).account
        }),
        l: common_vendor.p({
          label: "+86"
        }),
        m: common_vendor.o(($event) => common_vendor.unref(userForm).password = $event),
        n: common_vendor.p({
          type: "password",
          modelValue: common_vendor.unref(userForm).password
        }),
        o: common_vendor.p({
          label: "密码"
        }),
        p: state.isRegist
      }, state.isRegist ? {
        q: common_vendor.o(($event) => common_vendor.unref(userForm).username = $event),
        r: common_vendor.p({
          modelValue: common_vendor.unref(userForm).username
        }),
        s: common_vendor.p({
          label: "昵称"
        })
      } : {}, {
        t: common_vendor.sr("uForm", "0f7520f0-8,0f7520f0-7"),
        v: common_vendor.p({
          model: common_vendor.unref(userForm)
        }),
        w: !state.isRegist
      }, !state.isRegist ? {
        x: common_vendor.o(checkRegister)
      } : {}, {
        y: common_vendor.t(!state.isRegist ? "登录" : "注册"),
        z: common_vendor.o(handleLogin),
        A: common_vendor.p({
          ["custom-style"]: customStyleLogin,
          shape: "circle",
          ripple: true
        }),
        B: common_vendor.p({
          name: "weixin-fill",
          label: "微信登录",
          ["margin-left"]: "10rpx",
          ["label-color"]: "#fff"
        }),
        C: common_vendor.o(handleWxLogin),
        D: common_vendor.p({
          ["custom-style"]: customStyleWx,
          shape: "circle",
          ripple: true
        }),
        E: common_vendor.o(($event) => state.show = $event),
        F: common_vendor.p({
          mode: "bottom",
          height: "60%",
          ["mask-close-able"]: false,
          modelValue: state.show
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "F:/HBuilderProjects/manhua/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
