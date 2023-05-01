"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-swiper",
  emits: ["click", "change"],
  props: {
    // 轮播图的数据,格式如：[{image: 'xxxx', title: 'xxxx'}，{image: 'yyyy', title: 'yyyy'}]，其中title字段可选
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示title标题
    title: {
      type: Boolean,
      default: false
    },
    // 用户自定义的指示器的样式
    indicator: {
      type: Object,
      default() {
        return {};
      }
    },
    // 圆角值
    borderRadius: {
      type: [Number, String],
      default: 8
    },
    // 隔多久自动切换
    interval: {
      type: [String, Number],
      default: 3e3
    },
    // 指示器的模式，rect|dot|number|round
    mode: {
      type: String,
      default: "round"
    },
    // list的高度，单位rpx
    height: {
      type: [Number, String],
      default: 250
    },
    // 指示器的位置，topLeft|topCenter|topRight|bottomLeft|bottomCenter|bottomRight
    indicatorPos: {
      type: String,
      default: "bottomCenter"
    },
    // 是否开启缩放效果
    effect3d: {
      type: Boolean,
      default: false
    },
    // 3D模式的情况下，激活item与前后item之间的距离，单位rpx
    effect3dPreviousMargin: {
      type: [Number, String],
      default: 50
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    // 自动轮播时间间隔，单位ms
    duration: {
      type: [Number, String],
      default: 500
    },
    // 是否衔接滑动，即到最后一张时接着滑动，是否自动切换到第一张
    circular: {
      type: Boolean,
      default: true
    },
    // 图片的裁剪模式 
    imgMode: {
      type: String,
      default: "aspectFill"
    },
    // 从list数组中读取的图片的属性名
    name: {
      type: String,
      default: "image"
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#f3f4f6"
    },
    // 初始化时，默认显示第几项
    current: {
      type: [Number, String],
      default: 0
    },
    // 标题的样式，对象形式
    titleStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    // 如果外部的list发生变化，判断长度是否被修改，如果前后长度不一致，重置uCurrent值，避免溢出
    list(nVal, oVal) {
      if (nVal.length !== oVal.length)
        this.uCurrent = 0;
    },
    // 监听外部current的变化，实时修改内部依赖于此测uCurrent值，如果更新了current，而不是更新uCurrent，
    // 就会错乱，因为指示器是依赖于uCurrent的
    current(n) {
      this.uCurrent = n;
    }
  },
  data() {
    return {
      uCurrent: this.current
      // 当前活跃的swiper-item的index
    };
  },
  computed: {
    justifyContent() {
      if (this.indicatorPos == "topLeft" || this.indicatorPos == "bottomLeft")
        return "flex-start";
      if (this.indicatorPos == "topCenter" || this.indicatorPos == "bottomCenter")
        return "center";
      if (this.indicatorPos == "topRight" || this.indicatorPos == "bottomRight")
        return "flex-end";
    },
    titlePaddingBottom() {
      let tmp = 0;
      if (this.mode == "none")
        return "12rpx";
      if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode == "number") {
        tmp = "60rpx";
      } else if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode != "number") {
        tmp = "40rpx";
      } else {
        tmp = "12rpx";
      }
      return tmp;
    },
    // 因为uni的swiper组件的current参数只接受Number类型，这里做一个转换
    elCurrent() {
      return Number(this.current);
    }
  },
  methods: {
    listClick(index) {
      this.$emit("click", index);
    },
    change(e) {
      let current = e.detail.current;
      this.uCurrent = current;
      this.$emit("change", current);
    },
    // 头条小程序不支持animationfinish事件，改由change事件
    // 暂不监听此事件，因为不再给swiper绑定uCurrent属性
    animationfinish(e) {
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return common_vendor.e({
        a: item[$props.name] || item,
        b: $props.title && item.title
      }, $props.title && item.title ? {
        c: common_vendor.t(item.title),
        d: common_vendor.s({
          "padding-bottom": $options.titlePaddingBottom
        }),
        e: common_vendor.s($props.titleStyle)
      } : {}, {
        f: common_vendor.o(($event) => $options.listClick(index), index),
        g: common_vendor.n($data.uCurrent != index ? "u-list-scale" : ""),
        h: $props.effect3d && $data.uCurrent != index ? "scaleY(0.9)" : "scaleY(1)",
        i: $props.effect3d && $data.uCurrent != index ? "0 20rpx" : 0,
        j: index
      });
    }),
    b: $props.imgMode,
    c: `${$props.borderRadius}rpx`,
    d: $options.elCurrent,
    e: common_vendor.o((...args) => $options.change && $options.change(...args)),
    f: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args)),
    g: $props.interval,
    h: $props.circular,
    i: $props.duration,
    j: $props.autoplay,
    k: $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
    l: $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
    m: $props.height + "rpx",
    n: $props.bgColor,
    o: $props.mode == "rect"
  }, $props.mode == "rect" ? {
    p: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    q: $props.mode == "dot"
  }, $props.mode == "dot" ? {
    r: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    s: $props.mode == "round"
  }, $props.mode == "round" ? {
    t: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: index == $data.uCurrent ? 1 : "",
        b: index
      };
    })
  } : {}, {
    v: $props.mode == "number"
  }, $props.mode == "number" ? {
    w: common_vendor.t($data.uCurrent + 1),
    x: common_vendor.t($props.list.length)
  } : {}, {
    y: $props.indicatorPos == "topLeft" || $props.indicatorPos == "topCenter" || $props.indicatorPos == "topRight" ? "12rpx" : "auto",
    z: $props.indicatorPos == "bottomLeft" || $props.indicatorPos == "bottomCenter" || $props.indicatorPos == "bottomRight" ? "12rpx" : "auto",
    A: $options.justifyContent,
    B: `0 ${$props.effect3d ? "74rpx" : "24rpx"}`,
    C: `${$props.borderRadius}rpx`
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d9fea6b1"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-swiper/u-swiper.vue"]]);
wx.createComponent(Component);
