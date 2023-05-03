"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-back-top",
  props: {
    // 返回顶部的形状，circle-圆形，square-方形
    mode: {
      type: String,
      default: "circle"
    },
    // 自定义图标
    icon: {
      type: String,
      default: "arrow-upward"
    },
    // 提示文字
    tips: {
      type: String,
      default: ""
    },
    // 返回顶部滚动时间
    duration: {
      type: [Number, String],
      default: 100
    },
    // 滚动距离
    scrollTop: {
      type: [Number, String],
      default: 0
    },
    // 距离顶部多少距离显示，单位rpx
    top: {
      type: [Number, String],
      default: 400
    },
    // 返回顶部按钮到底部的距离，单位rpx
    bottom: {
      type: [Number, String],
      default: 200
    },
    // 返回顶部按钮到右边的距离，单位rpx
    right: {
      type: [Number, String],
      default: 40
    },
    // 层级
    zIndex: {
      type: [Number, String],
      default: "9"
    },
    // 图标的样式，对象形式
    iconStyle: {
      type: Object,
      default() {
        return {
          color: "#909399",
          fontSize: "38rpx"
        };
      }
    },
    // 整个组件的样式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    showBackTop(nVal, oVal) {
      if (nVal) {
        this.uZIndex = this.zIndex;
        this.opacity = 1;
      } else {
        this.uZIndex = -1;
        this.opacity = 0;
      }
    }
  },
  computed: {
    showBackTop() {
      return this.scrollTop > common_vendor.index.upx2px(this.top);
    }
  },
  data() {
    return {
      // 不透明度，为了让组件有一个显示和隐藏的过渡动画
      opacity: 0,
      // 组件的z-index值，隐藏时设置为-1，就会看不到
      uZIndex: -1
    };
  },
  methods: {
    backToTop() {
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: this.duration
      });
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.$slots.default && !_ctx.$slots.$default
  }, !_ctx.$slots.default && !_ctx.$slots.$default ? {
    b: common_vendor.o($options.backToTop),
    c: common_vendor.p({
      name: $props.icon,
      ["custom-style"]: $props.iconStyle
    }),
    d: common_vendor.t($props.tips)
  } : {}, {
    e: common_vendor.o((...args) => $options.backToTop && $options.backToTop(...args)),
    f: common_vendor.n("u-back-top--mode--" + $props.mode),
    g: common_vendor.s({
      bottom: $props.bottom + "rpx",
      right: $props.right + "rpx",
      borderRadius: $props.mode == "circle" ? "10000rpx" : "8rpx",
      zIndex: $data.uZIndex,
      opacity: $data.opacity
    }),
    h: common_vendor.s($props.customStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6976d1a0"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-back-top/u-back-top.vue"]]);
wx.createComponent(Component);
