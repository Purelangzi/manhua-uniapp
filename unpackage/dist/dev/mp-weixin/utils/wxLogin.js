"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const stores_user = require("../stores/user.js");
const utils_showMsg = require("./showMsg.js");
const userStore = stores_user.useUser();
const wxLogin = () => {
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
        const { data, msg } = await api_index.api.userWxLogin(params);
        console.log("微信一键登录存储token和用户信息");
        userStore.$patch((state) => {
          state.userInfo = data.userInfo;
          state.token = data.token;
        });
        utils_showMsg.showMsg({ title: msg || "" });
        common_vendor.index.switchTab({
          url: "/pages/user/user"
        });
      } catch (e) {
      }
    },
    fail: (e) => {
      if (e.errMsg.indexOf("deny") !== -1) {
        utils_showMsg.showMsg({ title: "您拒绝了授权，不能正常使用小程序", duration: 3e3 });
      } else if (e.errMsg.indexOf("getUserAvatarInfo") !== -1) {
        utils_showMsg.showMsg({ title: "请检查网络", duration: 3e3 });
      }
    }
  });
};
const getWxCode = () => {
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
const refreshWxLogin = () => {
  console.log("refreshWxLogin");
  return new Promise((reslove) => {
    common_vendor.index.login({
      provider: "weixin",
      success: async (res) => {
        const params = {
          avatar: userStore.userInfo.avatar,
          username: userStore.userInfo.username,
          code: res.code
        };
        const { data } = await api_index.api.userWxLogin(params);
        userStore.token = data.token;
        console.log("微信登录过期,无感刷新token");
        reslove(true);
      }
    });
  });
};
const wxIsLogin = () => {
  console.log("isLogin........");
  if (!common_vendor.index.getStorageSync("USER")) {
    utils_showMsg.showMsg({ title: "请登录" });
    common_vendor.index.reLaunch({
      url: "/pages/user/user-login"
    });
    return true;
  }
  return false;
};
exports.refreshWxLogin = refreshWxLogin;
exports.wxIsLogin = wxIsLogin;
exports.wxLogin = wxLogin;
