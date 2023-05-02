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
      this.$reset();
      common_vendor.index.removeStorageSync("USER");
      common_vendor.index.reLaunch({
        url: "/pages/user/user-login"
      });
    }
  },
  getters: {}
});
const useSearch = common_vendor.defineStore("HISTORY", {
  state: () => ({
    searchHistory: []
  }),
  unistorage: true,
  actions: {
    clearHistory() {
      this.$reset();
      common_vendor.index.removeStorageSync("HISTORY");
    }
  }
});
exports.useSearch = useSearch;
exports.useUser = useUser;
