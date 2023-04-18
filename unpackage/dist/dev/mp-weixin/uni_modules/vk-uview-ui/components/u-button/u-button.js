"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-button",
  emits: ["click", "getphonenumber", "getuserinfo", "error", "opensetting", "launchapp"],
  props: {
    // 是否细边框
    hairLine: {
      type: Boolean,
      default: true
    },
    // 按钮的预置样式，default，primary，error，warning，success
    type: {
      type: String,
      default: "default"
    },
    // 按钮尺寸，default，medium，mini
    size: {
      type: String,
      default: "default"
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: "square"
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: false
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: ""
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: ""
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: ""
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: false
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: "en"
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: ""
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: ""
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: ""
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: ""
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: false
    },
    // 手指按（触摸）按钮时按钮时的背景颜色
    hoverBgColor: {
      type: String,
      default: ""
    },
    // 水波纹的背景颜色
    rippleBgColor: {
      type: String,
      default: ""
    },
    // 是否开启水波纹效果
    ripple: {
      type: Boolean,
      default: false
    },
    // 按下的类名
    hoverClass: {
      type: String,
      default: ""
    },
    // 自定义样式，对象形式
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: ""
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: 500
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: 20
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: 150
    },
    timerId: {
      type: [String, Number]
    }
  },
  computed: {
    // 当没有传bgColor变量时，按钮按下去的颜色类名
    getHoverClass() {
      if (this.loading || this.disabled || this.ripple || this.hoverClass)
        return "";
      let hoverClass = "";
      hoverClass = this.plain ? "u-" + this.type + "-plain-hover" : "u-" + this.type + "-hover";
      return hoverClass;
    },
    // 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
    showHairLineBorder() {
      if (["primary", "success", "error", "warning"].indexOf(this.type) >= 0 && !this.plain) {
        return "";
      } else {
        return "u-hairline-border";
      }
    }
  },
  data() {
    let btnTimerId = this.timerId || "button_" + Math.floor(Math.random() * 1e8 + 0);
    return {
      btnTimerId,
      rippleTop: 0,
      // 水波纹的起点Y坐标到按钮上边界的距离
      rippleLeft: 0,
      // 水波纹起点X坐标到按钮左边界的距离
      fields: {},
      // 波纹按钮节点信息
      waveActive: false
      // 激活水波纹
    };
  },
  methods: {
    // 按钮点击
    click(e) {
      this.$u.throttle(() => {
        if (this.loading === true || this.disabled === true)
          return;
        if (this.ripple) {
          this.waveActive = false;
          this.$nextTick(function() {
            this.getWaveQuery(e);
          });
        }
        this.$emit("click", e);
      }, this.throttleTime, true, this.btnTimerId);
    },
    // 查询按钮的节点信息
    getWaveQuery(e) {
      this.getElQuery().then((res) => {
        let data = res[0];
        if (!data.width || !data.width)
          return;
        data.targetWidth = data.height > data.width ? data.height : data.width;
        if (!data.targetWidth)
          return;
        this.fields = data;
        let touchesX = "", touchesY = "";
        touchesX = e.touches[0].clientX;
        touchesY = e.touches[0].clientY;
        this.rippleTop = touchesY - data.top - data.targetWidth / 2;
        this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
        this.$nextTick(() => {
          this.waveActive = true;
        });
      });
    },
    // 获取节点信息
    getElQuery() {
      return new Promise((resolve) => {
        let queryInfo = "";
        queryInfo = common_vendor.index.createSelectorQuery().in(this);
        queryInfo.select(".u-btn").boundingClientRect();
        queryInfo.exec((data) => {
          resolve(data);
        });
      });
    },
    // 下面为对接uniapp官方按钮开放能力事件回调的对接
    getphonenumber(res) {
      this.$emit("getphonenumber", res);
    },
    getuserinfo(res) {
      this.$emit("getuserinfo", res);
    },
    error(res) {
      this.$emit("error", res);
    },
    opensetting(res) {
      this.$emit("opensetting", res);
    },
    launchapp(res) {
      this.$emit("launchapp", res);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.ripple
  }, $props.ripple ? {
    b: common_vendor.n($data.waveActive ? "u-wave-active" : ""),
    c: $data.rippleTop + "px",
    d: $data.rippleLeft + "px",
    e: $data.fields.targetWidth + "px",
    f: $data.fields.targetWidth + "px",
    g: $props.rippleBgColor || "rgba(0, 0, 0, 0.15)"
  } : {}, {
    h: common_vendor.n("u-size-" + $props.size),
    i: common_vendor.n($props.plain ? "u-btn--" + $props.type + "--plain" : ""),
    j: common_vendor.n($props.loading ? "u-loading" : ""),
    k: common_vendor.n($props.shape == "circle" ? "u-round-circle" : ""),
    l: common_vendor.n($props.hairLine ? $options.showHairLineBorder : "u-btn--bold-border"),
    m: common_vendor.n("u-btn--" + $props.type),
    n: common_vendor.n($props.disabled ? `u-btn--${$props.type}--disabled` : ""),
    o: Number($props.hoverStartTime),
    p: Number($props.hoverStayTime),
    q: $props.disabled,
    r: $props.formType,
    s: $props.openType,
    t: $props.appParameter,
    v: $props.hoverStopPropagation,
    w: $props.sendMessageTitle,
    x: $props.lang,
    y: $props.dataName,
    z: $props.sessionFrom,
    A: $props.sendMessageImg,
    B: $props.showMessageCard,
    C: common_vendor.o((...args) => $options.getphonenumber && $options.getphonenumber(...args)),
    D: common_vendor.o((...args) => $options.getuserinfo && $options.getuserinfo(...args)),
    E: common_vendor.o((...args) => $options.error && $options.error(...args)),
    F: common_vendor.o((...args) => $options.opensetting && $options.opensetting(...args)),
    G: common_vendor.o((...args) => $options.launchapp && $options.launchapp(...args)),
    H: common_vendor.s($props.customStyle),
    I: common_vendor.s({
      overflow: $props.ripple ? "hidden" : "visible"
    }),
    J: common_vendor.o(($event) => $options.click($event)),
    K: $options.getHoverClass,
    L: $props.loading
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-097def2b"], ["__file", "F:/HBuilderProjects/manhua/uni_modules/vk-uview-ui/components/u-button/u-button.vue"]]);
wx.createComponent(Component);
