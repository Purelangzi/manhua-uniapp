"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-sticky",
  emits: ["fixed", "unfixed"],
  props: {
    // 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
    offsetTop: {
      type: [Number, String],
      default: 0
    },
    //列表中的索引值
    index: {
      type: [Number, String],
      default: ""
    },
    // 是否开启吸顶功能
    enable: {
      type: Boolean,
      default: true
    },
    // h5顶部导航栏的高度
    h5NavHeight: {
      type: [Number, String],
      default: 44
    },
    // 吸顶区域的背景颜色
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    // z-index值
    zIndex: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      fixed: false,
      height: "auto",
      stickyTop: 0,
      elClass: this.$u.guid(),
      left: 0,
      width: "auto"
    };
  },
  watch: {
    offsetTop(val) {
      this.initObserver();
    },
    enable(val) {
      if (val == false) {
        this.fixed = false;
        this.disconnectObserver("contentObserver");
      } else {
        this.initObserver();
      }
    }
  },
  computed: {
    uZIndex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.sticky;
    }
  },
  mounted() {
    this.initObserver();
  },
  methods: {
    initObserver() {
      if (!this.enable)
        return;
      this.stickyTop = this.offsetTop != 0 ? common_vendor.index.upx2px(this.offsetTop) : 0;
      this.disconnectObserver("contentObserver");
      this.$uGetRect("." + this.elClass).then((res) => {
        this.height = res.height;
        this.left = res.left;
        this.width = res.width;
        this.$nextTick(() => {
          this.observeContent();
        });
      });
    },
    observeContent() {
      this.disconnectObserver("contentObserver");
      const contentObserver = common_vendor.index.createIntersectionObserver(this, {
        thresholds: [0.95, 0.98, 1]
      });
      contentObserver.relativeToViewport({
        top: -this.stickyTop
      });
      contentObserver.observe("." + this.elClass, (res) => {
        if (!this.enable)
          return;
        this.setFixed(res.boundingClientRect.top);
      });
      this.contentObserver = contentObserver;
    },
    setFixed(top) {
      const fixed = top < this.stickyTop;
      if (fixed)
        this.$emit("fixed", this.index);
      else if (this.fixed)
        this.$emit("unfixed", this.index);
      this.fixed = fixed;
    },
    disconnectObserver(observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    }
  },
  beforeUnmount() {
    this.disconnectObserver("contentObserver");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.fixed ? "fixed" : "static",
    b: $data.stickyTop + "px",
    c: $data.left + "px",
    d: $data.width == "auto" ? "auto" : $data.width + "px",
    e: $options.uZIndex,
    f: common_vendor.n($data.elClass),
    g: $data.fixed ? $data.height + "px" : "auto",
    h: $props.bgColor
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0087e446"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-sticky/u-sticky.vue"]]);
wx.createComponent(Component);
