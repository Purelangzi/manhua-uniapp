"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-skeleton",
  props: {
    // 需要渲染的元素背景颜色，十六进制或者rgb等都可以
    elColor: {
      type: String,
      default: "#e5e5e5"
    },
    // 整个骨架屏页面的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    // 是否显示加载动画
    animation: {
      type: Boolean,
      default: false
    },
    // 圆角值，只对类名为u-skeleton-fillet的元素生效，为数值，不带单位
    borderRadius: {
      type: [String, Number],
      default: "10"
    },
    // 是否显示骨架，true-显示，false-隐藏
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      windowWinth: 750,
      // 骨架屏宽度
      windowHeight: 1500,
      // 骨架屏高度
      filletNodes: [],
      // 圆角元素
      circleNodes: [],
      // 圆形元素
      RectNodes: [],
      // 矩形元素
      top: 0,
      left: 0
    };
  },
  methods: {
    // 查询各节点的信息
    selecterQueryInfo() {
      let query = "";
      query = common_vendor.index.createSelectorQuery().in(this.$parent);
      query.selectAll(".u-skeleton").boundingClientRect().exec((res) => {
        this.windowHeight = res[0][0].height;
        this.windowWinth = res[0][0].width;
        this.top = res[0][0].bottom - res[0][0].height;
        this.left = res[0][0].left;
      });
      this.getRectEls();
      this.getCircleEls();
      this.getFilletEls();
    },
    // 矩形元素列表
    getRectEls() {
      let query = "";
      query = common_vendor.index.createSelectorQuery().in(this.$parent);
      query.selectAll(".u-skeleton-rect").boundingClientRect().exec((res) => {
        this.RectNodes = res[0];
      });
    },
    // 圆角元素列表
    getFilletEls() {
      let query = "";
      query = common_vendor.index.createSelectorQuery().in(this.$parent);
      query.selectAll(".u-skeleton-fillet").boundingClientRect().exec((res) => {
        this.filletNodes = res[0];
      });
    },
    // 圆形元素列表
    getCircleEls() {
      let query = "";
      query = common_vendor.index.createSelectorQuery().in(this.$parent);
      query.selectAll(".u-skeleton-circle").boundingClientRect().exec((res) => {
        this.circleNodes = res[0];
      });
    }
  },
  // 组件被挂载
  mounted() {
    let systemInfo = common_vendor.index.getSystemInfoSync();
    this.windowHeight = systemInfo.windowHeight;
    this.windowWinth = systemInfo.windowWidth;
    this.selecterQueryInfo();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.loading
  }, $props.loading ? {
    b: common_vendor.f($data.RectNodes, (item, index, i0) => {
      return {
        a: item.width + "px",
        b: item.height + "px",
        c: item.left - $data.left + "px",
        d: item.top - $data.top + "px"
      };
    }),
    c: _ctx.$u.guid(),
    d: common_vendor.n($props.animation ? "skeleton-fade" : ""),
    e: $props.elColor,
    f: common_vendor.f($data.circleNodes, (item, index, i0) => {
      return {
        a: item.width + "px",
        b: item.height + "px",
        c: item.width / 2 + "px",
        d: item.left - $data.left + "px",
        e: item.top - $data.top + "px"
      };
    }),
    g: _ctx.$u.guid(),
    h: common_vendor.n($props.animation ? "skeleton-fade" : ""),
    i: $props.elColor,
    j: common_vendor.f($data.filletNodes, (item, index, i0) => {
      return {
        a: item.width + "px",
        b: item.height + "px",
        c: item.left - $data.left + "px",
        d: item.top - $data.top + "px"
      };
    }),
    k: _ctx.$u.guid(),
    l: common_vendor.n($props.animation ? "skeleton-fade" : ""),
    m: $props.elColor,
    n: $props.borderRadius + "rpx",
    o: $data.windowWinth + "px",
    p: $data.windowHeight + "px",
    q: $props.bgColor,
    r: $data.left + "px",
    s: $data.top + "px",
    t: common_vendor.o(() => {
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8315116d"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-skeleton/u-skeleton.vue"]]);
wx.createComponent(Component);
