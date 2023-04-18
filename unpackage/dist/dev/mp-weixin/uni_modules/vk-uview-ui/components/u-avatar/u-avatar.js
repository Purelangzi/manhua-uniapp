"use strict";
const common_vendor = require("../../../../common/vendor.js");
let base64Avatar = "data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDg8QDw4MExMUFBMTHBsbGxwfHx8fHx8fHx8fAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCADIAMgDAREAAhEBAxEB/8QAcQABAQEAAwEBAAAAAAAAAAAAAAUEAQMGAgcBAQAAAAAAAAAAAAAAAAAAAAAQAAIBAwICBgkDBQAAAAAAAAABAhEDBCEFMVFBYXGREiKBscHRMkJSEyOh4XLxYjNDFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHbHFyZ/Dam+yLA+Z2L0Pjtyj2poD4AAAAAAAAAAAAAAAAAAAAAAAAKWFs9y6lcvvwQeqj8z9wFaziY1n/HbUX9XF97A7QAGXI23EvJ1goyfzR0YEfN269jeZ+a03pNe0DIAAAAAAAAAAAAAAAAAAAACvtO3RcVkXlWutuL9YFYAAAAAOJRjKLjJVi9GmB5/csH/mu1h/in8PU+QGMAAAAAAAAAAAAAAAAAAaMDG/6MmMH8C80+xAelSSVFolwQAAAAAAAHVlWI37ErUulaPk+hgeYnCUJuElSUXRrrQHAAAAAAAAAAAAAAAAABa2Oz4bM7r4zdF2ICmAAAAAAAAAg7zZ8GX41wuJP0rRgYAAAAAAAAAAAAAAAAAD0m2R8ODaXU33tsDSAAAAAAAAAlb9HyWZcnJd9PcBHAAAAAAAAAAAAAAAAAPS7e64Vn+KA0AAAAAAAAAJm+v8Ftf3ewCKAAAAAAAAAAAAAAAAAX9muqeGo9NttP06+0DcAAAAAAAAAjb7dTu2ra+VOT9P8AQCWAAAAAAAAAAAAAAAAAUNmyPt5Ltv4bui/kuAF0AAAAAAADiUlGLlJ0SVW+oDzOXfd/Ind6JPRdS0QHSAAAAAAAAAAAAAAAAAE2nVaNcGB6Lbs6OTao9LsF51z60BrAAAAAABJ3jOVHjW3r/sa9QEgAAAAAAAAAAAAAAAAAAAPu1duWriuW34ZR4MC9hbnZyEoy8l36XwfYBsAAADaSq9EuLAlZ+7xSdrGdW9Hc5dgEdtt1erfFgAAAAAAAAAAAAAAAAADVjbblX6NR8MH80tEBRs7HYivyzlN8lovaBPzduvY0m6eK10TXtAyAarO55lpJK54orolr+4GqO/Xaea1FvqbXvA+Z77kNeW3GPbV+4DJfzcm/pcm3H6Vou5AdAFLC2ed2Pjv1txa8sV8T6wOL+yZEKu1JXFy4MDBOE4ScZxcZLinoB8gAAAAAAAAAAAB242LeyJ+C3GvN9C7QLmJtePYpKS+5c+p8F2IDYAANJqj1T4oCfk7Nj3G5Wn9qXJax7gJ93Z82D8sVNc4v30A6Xg5i42Z+iLfqARwcyT0sz9MWvWBps7LlTf5Grce9/oBTxdtxseklHxT+uWr9AGoAB138ezfj4bsFJdD6V2MCPm7RdtJzs1uW1xXzL3gTgAAAAAAAAADRhYc8q74I6RWs5ckB6GxYtWLat21SK731sDsAAAAAAAAAAAAAAAASt021NO/YjrxuQXT1oCOAAAAAAABzGLlJRSq26JAelwsWONYjbXxcZvmwO8AAAAAAAAAAAAAAAAAAef3TEWPkVivx3NY9T6UBiAAAAAABo2+VmGXblddIJ8eivRUD0oAAAAAAAAAAAAAAAAAAAYt4tKeFKVNYNSXfRgefAAAAAAAAr7VuSSWPedKaW5v1MCsAAAAAAAAAAAAAAAAAAIe6bj96Ts2n+JPzSXzP3ATgAAAAAAAAFbbt1UUrOQ9FpC4/UwK6aaqtU+DAAAAAAAAAAAAAAA4lKMIuUmoxWrb4ARNx3R3q2rLpa4Sl0y/YCcAAAAAAAAAAANmFud7G8r89r6X0dgFvGzLGRGtuWvTF6NAdwAAAAAAAAAAAy5W442PVN+K59EePp5ARMvOv5MvO6QXCC4AZwAAAAAAAAAAAAAcxlKLUotprg1owN+PvORborq+7Hnwl3gUbO74VzRydt8pKn68ANcJwmqwkpLmnUDkAAAAfNy9atqtyagut0AxXt5xIV8Fbj6lRd7Am5G65V6qUvtwfyx94GMAAAAAAAAAAAAAAAAAAAOU2nVOj5gdsc3LiqRvTpyqwOxbnnrhdfpSfrQB7pnv/AGvuS9gHXPMy5/Fem1yq0v0A6W29XqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z";
const _sfc_main = {
  name: "u-avatar",
  emits: ["click"],
  props: {
    // 背景颜色
    bgColor: {
      type: String,
      default: "transparent"
    },
    // 头像路径
    src: {
      type: String,
      default: ""
    },
    // 尺寸，large-大，default-中等，mini-小，如果为数值，则单位为rpx
    // 宽度等于高度
    size: {
      type: [String, Number],
      default: "default"
    },
    // 头像模型，square-带圆角方形，circle-圆形
    mode: {
      type: String,
      default: "circle"
    },
    // 文字内容
    text: {
      type: String,
      default: ""
    },
    // 图片的裁剪模型
    imgMode: {
      type: String,
      default: "aspectFill"
    },
    // 标识符
    index: {
      type: [String, Number],
      default: ""
    },
    // 右上角性别角标，man-男，woman-女
    sexIcon: {
      type: String,
      default: "man"
    },
    // 右下角的等级图标
    levelIcon: {
      type: String,
      default: "level"
    },
    // 右下角等级图标背景颜色
    levelBgColor: {
      type: String,
      default: ""
    },
    // 右上角性别图标的背景颜色
    sexBgColor: {
      type: String,
      default: ""
    },
    // 是否显示性别图标
    showSex: {
      type: Boolean,
      default: false
    },
    // 是否显示等级图标
    showLevel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      error: false,
      // 头像的地址，因为如果加载错误，需要赋值为默认图片，props值无法修改，所以需要一个中间值
      avatar: this.src ? this.src : base64Avatar
    };
  },
  watch: {
    src(n) {
      if (!n) {
        this.avatar = base64Avatar;
        this.error = true;
      } else {
        this.avatar = n;
        this.error = false;
      }
    }
  },
  computed: {
    wrapStyle() {
      let style = {};
      style.height = this.size == "large" ? "120rpx" : this.size == "default" ? "90rpx" : this.size == "mini" ? "70rpx" : this.size + "rpx";
      style.width = style.height;
      style.flex = `0 0 ${style.height}`;
      style.backgroundColor = this.bgColor;
      style.borderRadius = this.mode == "circle" ? "500px" : "5px";
      if (this.text)
        style.padding = `0 6rpx`;
      return style;
    },
    imgStyle() {
      let style = {};
      style.borderRadius = this.mode == "circle" ? "500px" : "5px";
      return style;
    },
    // 取字符串的第一个字符
    uText() {
      return String(this.text)[0];
    },
    // 性别图标的自定义样式
    uSexStyle() {
      let style = {};
      if (this.sexBgColor)
        style.backgroundColor = this.sexBgColor;
      return style;
    },
    // 等级图标的自定义样式
    uLevelStyle() {
      let style = {};
      if (this.levelBgColor)
        style.backgroundColor = this.levelBgColor;
      return style;
    }
  },
  methods: {
    // 图片加载错误时，显示默认头像
    loadError() {
      this.error = true;
      this.avatar = base64Avatar;
    },
    click() {
      this.$emit("click", this.index);
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
    a: !$options.uText && $data.avatar
  }, !$options.uText && $data.avatar ? {
    b: common_vendor.o((...args) => $options.loadError && $options.loadError(...args)),
    c: common_vendor.s($options.imgStyle),
    d: $data.avatar,
    e: $props.imgMode
  } : $options.uText ? {
    g: common_vendor.t($options.uText)
  } : {}, {
    f: $options.uText,
    h: $props.showSex
  }, $props.showSex ? {
    i: common_vendor.p({
      name: $props.sexIcon,
      size: "20"
    }),
    j: common_vendor.n("u-avatar__sex--" + $props.sexIcon),
    k: common_vendor.s($options.uSexStyle)
  } : {}, {
    l: $props.showLevel
  }, $props.showLevel ? {
    m: common_vendor.p({
      name: $props.levelIcon,
      size: "20"
    }),
    n: common_vendor.s($options.uLevelStyle)
  } : {}, {
    o: common_vendor.s($options.wrapStyle),
    p: common_vendor.o((...args) => $options.click && $options.click(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-49012a02"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-avatar/u-avatar.vue"]]);
wx.createComponent(Component);
