"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loadmore",
  emits: ["loadmore"],
  props: {
    // 组件背景色
    bgColor: {
      type: String,
      default: "transparent"
    },
    // 是否显示加载中的图标
    icon: {
      type: Boolean,
      default: true
    },
    // 字体大小
    fontSize: {
      type: String,
      default: "28"
    },
    // 字体颜色
    color: {
      type: String,
      default: "#606266"
    },
    // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
    status: {
      type: String,
      default: "loadmore"
    },
    // 加载中状态的图标，flower-花朵状图标，circle-圆圈状图标
    iconType: {
      type: String,
      default: "circle"
    },
    // 显示的文字
    loadText: {
      type: Object,
      default() {
        return {
          loadmore: "加载更多",
          loading: "正在加载...",
          nomore: "没有更多了"
        };
      }
    },
    // 在“没有更多”状态下，是否显示粗点
    isDot: {
      type: Boolean,
      default: false
    },
    // 加载中显示圆圈动画时，动画的颜色
    iconColor: {
      type: String,
      default: "#b7b7b7"
    },
    // 上边距
    marginTop: {
      type: [String, Number],
      default: 0
    },
    // 下边距
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    // 高度，单位rpx
    height: {
      type: [String, Number],
      default: "auto"
    }
  },
  data() {
    return {
      // 粗点
      dotText: "●"
    };
  },
  computed: {
    // 加载的文字显示的样式
    loadTextStyle() {
      return {
        color: this.color,
        fontSize: this.fontSize + "rpx",
        position: "relative",
        zIndex: 1,
        backgroundColor: this.bgColor
        // 如果是加载中状态，动画和文字需要距离近一点
      };
    },
    // 加载中圆圈动画的样式
    cricleStyle() {
      return {
        borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
      };
    },
    // 加载中花朵动画形式
    // 动画由base64图片生成，暂不支持修改
    flowerStyle() {
      return {};
    },
    // 显示的提示文字
    showText() {
      let text = "";
      if (this.status == "loadmore")
        text = this.loadText.loadmore;
      else if (this.status == "loading")
        text = this.loadText.loading;
      else if (this.status == "nomore" && this.isDot)
        text = this.dotText;
      else
        text = this.loadText.nomore;
      return text;
    }
  },
  methods: {
    loadMore() {
      if (this.status == "loadmore")
        this.$emit("loadmore");
    }
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  const _easycom_u_loading2 = common_vendor.resolveComponent("u-loading");
  (_easycom_u_line2 + _easycom_u_loading2)();
}
const _easycom_u_line = () => "../u-line/u-line.js";
const _easycom_u_loading = () => "../u-loading/u-loading.js";
if (!Math) {
  (_easycom_u_line + _easycom_u_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      color: "#d4d4d4",
      length: "50"
    }),
    b: common_vendor.p({
      color: $props.iconColor,
      mode: $props.iconType == "circle" ? "circle" : "flower",
      show: $props.status == "loading" && $props.icon
    }),
    c: common_vendor.t($options.showText),
    d: common_vendor.s($options.loadTextStyle),
    e: common_vendor.n($props.status == "nomore" && $props.isDot == true ? "u-dot-text" : "u-more-text"),
    f: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args)),
    g: common_vendor.n($props.status == "loadmore" || $props.status == "nomore" ? "u-more" : ""),
    h: common_vendor.p({
      color: "#d4d4d4",
      length: "50"
    }),
    i: $props.bgColor,
    j: $props.marginBottom + "rpx",
    k: $props.marginTop + "rpx",
    l: _ctx.$u.addUnit($props.height)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e9906cfb"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.vue"]]);
wx.createComponent(Component);
