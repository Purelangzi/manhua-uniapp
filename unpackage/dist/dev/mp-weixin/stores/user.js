"use strict";
const common_vendor = require("../common/vendor.js");
const useUser = common_vendor.defineStore("USER", {
  state: () => ({
    userInfo: {},
    token: ""
  }),
  unistorage: true,
  actions: {
    logOut() {
      console.log("logOut");
      this.$reset();
      common_vendor.index.removeStorageSync("USER");
      common_vendor.index.switchTab({
        url: "/pages/user/user"
      });
    }
  },
  getters: {}
});
exports.useUser = useUser;
