"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-line",
  props: {
    color: {
      type: String,
      default: "#e4e7ed"
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等
    length: {
      type: String,
      default: "100%"
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: "row"
    },
    // 是否显示细边框
    hairLine: {
      type: Boolean,
      default: true
    },
    // 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx"
    margin: {
      type: String,
      default: "0"
    },
    // 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
    borderStyle: {
      type: String,
      default: "solid"
    }
  },
  computed: {
    lineStyle() {
      let style = {};
      style.margin = this.margin;
      if (this.direction == "row") {
        style.borderBottomWidth = "1px";
        style.borderBottomStyle = this.borderStyle;
        style.width = this.$u.addUnit(this.length);
        if (this.hairLine)
          style.transform = "scaleY(0.5)";
      } else {
        style.borderLeftWidth = "1px";
        style.borderLeftStyle = this.borderStyle;
        style.height = this.$u.addUnit(this.length);
        if (this.hairLine)
          style.transform = "scaleX(0.5)";
      }
      style.borderColor = this.color;
      return style;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.lineStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3e1cc47b"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-line/u-line.vue"]]);
wx.createComponent(Component);
