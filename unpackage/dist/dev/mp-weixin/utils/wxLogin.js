"use strict";
const common_vendor = require("../common/vendor.js");
const api_index = require("../api/index.js");
const stores_user = require("../stores/user.js");
const utils_showMsg = require("./showMsg.js");
const userStore = stores_user.useUser();
const wxLogin = () => {
  console.log(1);
  common_vendor.index.getUserProfile({
    desc: "获取用户个人信息",
    success: async (infoRes) => {
      console.log(2);
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
      console.log(e);
    }
  });
};
const getWxCode = () => {
  console.log(3);
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
exports.wxLogin = wxLogin;
