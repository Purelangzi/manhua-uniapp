"use strict";
const common_vendor = require("../../../../common/vendor.js");
const mixin = {
  data() {
    return {};
  },
  onLoad() {
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect(selector, all) {
      return new Promise((resolve) => {
        common_vendor.index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData(parentName = "") {
      if (!this.parent)
        this.parent = false;
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        this.parentData.value = this.parent.modelValue;
      }
    },
    // 阻止事件冒泡
    preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    }
  },
  onReachBottom() {
    common_vendor.index.$emit("uOnReachBottom");
  },
  beforeUnmount() {
    if (this.parent && common_vendor.index.$u.test.array(this.parent.children)) {
      const childrenList = this.parent.children;
      childrenList.map((child, index) => {
        if (child === this) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
exports.mixin = mixin;
