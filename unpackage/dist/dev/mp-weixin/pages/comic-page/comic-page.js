"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_user = require("../../stores/user.js");
const utils_showMsg = require("../../utils/showMsg.js");
require("../../api/module/common.js");
require("../../api/request.js");
require("../../utils/wxLogin.js");
require("../../api/module/cartoon.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_u_icon2 + _easycom_u_popup2)();
}
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_popup = () => "../../uni_modules/vk-uview-ui/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comic-page",
  setup(__props) {
    const userStore = stores_user.useUser();
    const chapterItemRef = common_vendor.ref([]);
    const toolStatus = common_vendor.ref(false);
    const state = common_vendor.reactive({
      pageContentList: [],
      // 章节内容
      toolStatus: false,
      showCatalog: false,
      sort: true,
      chapterList: [],
      // 章节列表
      detailData: {},
      // 漫画详情
      scrollTop: 0,
      loading: true,
      toolColumn: [
        { id: -1, name: "arrow-left", label: "上一话", labelPos: "bottom", labelSize: 24 },
        { id: 0, name: "grid-fill", label: "目录", labelPos: "bottom", labelSize: 24 },
        { id: 1, name: "arrow-right", label: "下一话", labelPos: "bottom", labelSize: 24 }
      ],
      curChapterId: 0,
      curChapterRefIndex: 0,
      nodeList: void 0
    });
    const setChapterItemRef = (el) => {
      chapterItemRef.value.push(el);
    };
    common_vendor.onLoad((option) => {
      const { comic_id, chapter_id, name, read, price, charge } = option;
      state.detailData = { name, read, price, charge };
      init(comic_id, chapter_id);
    });
    common_vendor.onMounted(() => {
    });
    common_vendor.onShow(() => {
    });
    common_vendor.onReady(() => {
      console.log("onReady");
    });
    const showTool = () => {
      toolStatus.value = !toolStatus.value;
    };
    const onTool = (id) => {
      let index = state.chapterList.findIndex((item2) => item2.chapter_id == state.curChapterId);
      state.curChapterRefIndex = index;
      let el = chapterItemRef.value[index];
      if (id === 0) {
        el.$el.classList.value = "chapter-item chapter-item-current";
        state.showCatalog = true;
        return;
      }
      let page = 0;
      if (index === -1) {
        utils_showMsg.showMsg({ title: "章节不存在" });
        return;
      }
      if (id === -1) {
        el.$el.classList.value = "chapter-item";
        page = index - 1;
        if (page < 0) {
          utils_showMsg.showMsg({ title: "没有上一话了" });
          return;
        }
      } else {
        el.$el.classList.value = "chapter-item";
        page = index + 1;
        if (page > state.chapterList.length) {
          utils_showMsg.showMsg({ title: "没有下一话了" });
          return;
        }
      }
      const item = state.chapterList[page];
      common_vendor.index.setNavigationBarTitle({
        title: (item == null ? void 0 : item.title) || "阅读"
      });
      init(item.comic_id, item.chapter_id);
    };
    const init = async (comic_id, chapter_id) => {
      state.curChapterId = chapter_id;
      const params = {
        comic_id,
        isAll: true
      };
      try {
        const res = await api_index.api.getChapterList(params);
        state.chapterList = res.data.data;
        const item = state.chapterList.find((el) => el.chapter_id == chapter_id);
        common_vendor.index.setNavigationBarTitle({
          title: (item == null ? void 0 : item.title) || "阅读"
        });
        const { read, price, charge } = state.detailData;
        const readParams = {
          chapter_id,
          comic_id,
          is_vip: charge,
          price,
          uid: userStore.userInfo.id,
          read
        };
        const res1 = await api_index.api.getChapterPage(chapter_id);
        state.pageContentList = res1.data;
        await api_index.api.addChapterRead(readParams);
        state.loading = false;
        common_vendor.index.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
      } catch (e) {
        console.log(e);
      }
    };
    const onComicPage = (comic_id, chapter_id) => {
      init(comic_id, chapter_id);
      state.showCatalog = false;
      let el = chapterItemRef.value[state.curChapterRefIndex];
      el.$el.classList.value = "chapter-item";
    };
    const changeSort = () => {
      state.sort = !state.sort;
      let el = chapterItemRef.value[state.curChapterRefIndex];
      if (state.sort) {
        el.$el.classList.value = "chapter-item chapter-item-current";
      } else {
        el.$el.classList.value = "chapter-item";
      }
      state.chapterList.reverse();
    };
    const closePopup = () => {
      if (!state.sort) {
        state.sort = true;
        state.chapterList.reverse();
      }
    };
    const scroll = (e) => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(state.pageContentList, (item, index, i0) => {
          return {
            a: index,
            b: item.image
          };
        }),
        b: common_vendor.o(showTool),
        c: common_vendor.o(($event) => onTool(-1)),
        d: common_vendor.p({
          name: "arrow-left",
          label: "上一话",
          ["label-pos"]: "right"
        }),
        e: common_vendor.o(($event) => onTool(1)),
        f: common_vendor.p({
          name: "arrow-right",
          label: "下一话",
          ["label-pos"]: "left"
        }),
        g: !state.loading,
        h: common_vendor.t(state.detailData.name),
        i: common_vendor.p({
          name: "list",
          label: state.sort ? "正序" : "倒序",
          ["margin-right"]: "20",
          ["label-size"]: "26"
        }),
        j: common_vendor.o(changeSort),
        k: common_vendor.f(state.chapterList, (item, index, i0) => {
          return {
            a: "d62b69dd-4-" + i0 + ",d62b69dd-2",
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => onComicPage(item.comic_id, item.chapter_id), index),
            d: index
          };
        }),
        l: common_vendor.p({
          name: "map-fill"
        }),
        m: setChapterItemRef,
        n: common_vendor.o(scroll),
        o: state.scrollTop,
        p: common_vendor.o(closePopup),
        q: common_vendor.o(($event) => state.showCatalog = $event),
        r: common_vendor.p({
          mode: "right",
          width: "72%",
          modelValue: state.showCatalog
        }),
        s: common_vendor.f(state.toolColumn, (item, index, i0) => {
          return {
            a: "d62b69dd-5-" + i0,
            b: common_vendor.p({
              name: item.name,
              label: item.label,
              ["label-size"]: item.labelSize,
              ["label-pos"]: item.labelPos
            }),
            c: common_vendor.o(($event) => onTool(item.id), index),
            d: index
          };
        }),
        t: toolStatus.value ? 1 : "",
        v: !toolStatus.value ? 1 : ""
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d62b69dd"], ["__file", "F:/HBuilderProjects/manhua/pages/comic-page/comic-page.vue"]]);
wx.createPage(MiniProgramPage);
