"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-mask",
  emits: ["click"],
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: false
    },
    // 层级z-index
    zIndex: {
      type: [Number, String],
      default: ""
    },
    // 用户自定义样式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 遮罩的动画样式， 是否使用使用zoom进行scale进行缩放
    zoom: {
      type: Boolean,
      default: true
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [Number, String],
      default: 300
    },
    // 是否可以通过点击遮罩进行关闭
    maskClickAble: {
      type: Boolean,
      default: true
    },
    // 遮罩的模糊度
    blur: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      zoomStyle: {
        transform: ""
      },
      scale: "scale(1.2, 1.2)"
    };
  },
  watch: {
    show(n) {
      if (n && this.zoom) {
        this.zoomStyle.transform = "scale(1, 1)";
      } else if (!n && this.zoom) {
        this.zoomStyle.transform = this.scale;
      }
    }
  },
  computed: {
    maskStyle() {
      let style = {};
      style.backgroundColor = "rgba(0, 0, 0, 0.6)";
      if (this.show)
        style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.mask;
      else
        style.zIndex = -1;
      style.transition = `all ${this.duration / 1e3}s ease-in-out`;
      if (Object.keys(this.customStyle).length)
        style = {
          ...style,
          ...this.customStyle
        };
      return style;
    },
    filterStyle() {
      let { blur } = this;
      let style = {};
      if (blur) {
        style.backdropFilter = `blur(${blur}rpx)`;
      }
      return style;
    }
  },
  methods: {
    click() {
      if (!this.maskClickAble)
        return;
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($options.maskStyle),
    b: common_vendor.s($data.zoomStyle),
    c: common_vendor.s($options.filterStyle),
    d: common_vendor.o((...args) => $options.click && $options.click(...args)),
    e: common_vendor.o(() => {
    }),
    f: $props.zoom ? 1 : "",
    g: $props.show ? 1 : ""
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b3b508a8"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-mask/u-mask.vue"]]);
wx.createComponent(Component);
