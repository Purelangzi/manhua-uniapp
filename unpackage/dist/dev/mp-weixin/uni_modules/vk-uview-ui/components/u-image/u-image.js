"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-image",
  emits: ["click", "error", "load"],
  props: {
    // 图片地址
    src: {
      type: String,
      default: ""
    },
    // 裁剪模式
    mode: {
      type: String,
      default: "aspectFill"
    },
    // 宽度，单位任意
    width: {
      type: [String, Number],
      default: "100%"
    },
    // 高度，单位任意
    height: {
      type: [String, Number],
      default: "auto"
    },
    // 图片形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: "square"
    },
    // 圆角，单位任意
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
    lazyLoad: {
      type: Boolean,
      default: true
    },
    // 开启长按图片显示识别微信小程序码菜单
    showMenuByLongpress: {
      type: Boolean,
      default: true
    },
    // 加载中的图标，或者小图片
    loadingIcon: {
      type: String,
      default: "photo"
    },
    // 加载失败的图标，或者小图片
    errorIcon: {
      type: String,
      default: "error-circle"
    },
    // 是否显示加载中的图标或者自定义的slot
    showLoading: {
      type: Boolean,
      default: true
    },
    // 是否显示加载错误的图标或者自定义的slot
    showError: {
      type: Boolean,
      default: true
    },
    // 是否需要淡入效果
    fade: {
      type: Boolean,
      default: true
    },
    // 只支持网络资源，只对微信小程序有效
    webp: {
      type: Boolean,
      default: false
    },
    // 过渡时间，单位ms
    duration: {
      type: [String, Number],
      default: 500
    },
    // 背景颜色，用于深色页面加载图片时，为了和背景色融合
    bgColor: {
      type: String,
      default: "#f3f4f6"
    }
  },
  data() {
    return {
      // 图片是否加载错误，如果是，则显示错误占位图
      isError: false,
      // 初始化组件时，默认为加载中状态
      loading: true,
      // 不透明度，为了实现淡入淡出的效果
      opacity: 1,
      // 过渡时间，因为props的值无法修改，故需要一个中间值
      durationTime: this.duration,
      // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
      backgroundStyle: {}
    };
  },
  watch: {
    src: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.isError = true;
          this.loading = false;
        } else {
          this.isError = false;
          this.loading = true;
        }
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {};
      style.width = this.$u.addUnit(this.width);
      style.height = this.$u.addUnit(this.height);
      style.borderRadius = this.shape == "circle" ? "50%" : this.$u.addUnit(this.borderRadius);
      style.overflow = this.borderRadius > 0 ? "hidden" : "visible";
      if (this.fade) {
        style.opacity = this.opacity;
        style.transition = `opacity ${Number(this.durationTime) / 1e3}s ease-in-out`;
      }
      return style;
    }
  },
  methods: {
    // 点击图片
    onClick() {
      this.$emit("click");
    },
    // 图片加载失败
    onErrorHandler(err) {
      this.loading = false;
      this.isError = true;
      this.$emit("error", err);
    },
    // 图片加载完成，标记loading结束
    onLoadHandler() {
      this.loading = false;
      this.isError = false;
      this.$emit("load");
      if (!this.fade)
        return this.removeBgColor();
      this.opacity = 0;
      this.durationTime = 0;
      setTimeout(() => {
        this.durationTime = this.duration;
        this.opacity = 1;
        setTimeout(() => {
          this.removeBgColor();
        }, this.durationTime);
      }, 50);
    },
    // 移除图片的背景色
    removeBgColor() {
      this.backgroundStyle = {
        backgroundColor: "transparent"
      };
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
    a: !$data.isError
  }, !$data.isError ? {
    b: $props.src,
    c: $props.mode,
    d: common_vendor.o((...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
    e: common_vendor.o((...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
    f: $props.lazyLoad,
    g: $props.showMenuByLongpress,
    h: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
  } : {}, {
    i: $props.showLoading && $data.loading
  }, $props.showLoading && $data.loading ? common_vendor.e({
    j: _ctx.$slots.loading
  }, _ctx.$slots.loading ? {} : {
    k: common_vendor.p({
      name: $props.loadingIcon,
      width: $props.width,
      height: $props.height
    })
  }, {
    l: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius),
    m: $props.bgColor
  }) : {}, {
    n: $props.showError && $data.isError && !$data.loading
  }, $props.showError && $data.isError && !$data.loading ? common_vendor.e({
    o: _ctx.$slots.error
  }, _ctx.$slots.error ? {} : {
    p: common_vendor.p({
      name: $props.errorIcon,
      width: $props.width,
      height: $props.height
    })
  }, {
    q: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
  }) : {}, {
    r: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    s: common_vendor.s($options.wrapStyle),
    t: common_vendor.s($data.backgroundStyle)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6ff2fb1e"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-image/u-image.vue"]]);
wx.createComponent(Component);
