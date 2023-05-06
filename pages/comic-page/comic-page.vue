<template>
	<view class="comic-page" ref="comiCpage">
		<!-- <u-loading mode="circle" :show="state.loading"></u-loading> -->
		<view class="comic-list" @click="showTool">
			<image mode="widthFix" style="width: 100%;" v-for="(item,index) in state.pageContentList" :key="index"
				:src="item.image"></image>

		</view>
		<view class="comic-end" v-show="!state.loading">
			<view class="end-btn">
				<u-icon name="arrow-left" label="上一话" label-pos="right"></u-icon>
				<u-icon name="arrow-right" label="下一话" label-pos="left"></u-icon>
			</view>
		</view>
		<u-popup v-model="state.showCatalog" mode="right" width="72%">
			<view class="popup-content">
				<view class="comic-title">{{state.detailData.name}}</view>
				<view class="comic-status">
					<view class="status">
						连载中
					</view>
					<view class="sort">
						<u-icon name="list" :label="state.sort" margin-right="20" label-size="26"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 100vh;" @scroll="scroll" :show-scrollbar="true"
					:scroll-top="state.scrollTop">
					<view class="chapter-list">
						<view class="chapter-item" @click="onComicPage(item.comic_id,item.chapter_id)" v-for="item in state.chapterList" :ref="setChapterItemRef" :key="item.title_alias">
							<view class="current-icon">
								<u-icon name="map-fill"></u-icon>
							</view>
							<view class="current-title" ref="current">{{item.title}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>


		<view class="comic-tool" :class="{ 'comic-tool-show':toolStatus,'comic-tool-hide':!toolStatus}">
			<view class="tool-content">
				<view class="tool-item" @click="onTool(item.id)" v-for="(item,index) in state.toolColumn" :key="index">
					<u-icon :name="item.name" :label="item.label" :label-size="item.labelSize"
						:label-pos="item.labelPos"></u-icon>
				</view>
			</view>

		</view>
	</view>

</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref,getCurrentInstance,toRaw, nextTick } from 'vue'
	import { onLoad, onShow,onReady } from '@dcloudio/uni-app'
	import api from '@/api/index'
	import { useUser } from '@/stores/user'
	import showMsg from '../../utils/showMsg';

	const userStore = useUser()
	
	const chapterItemRef = ref([])
	const toolStatus = ref(false)
	const state = reactive({
		pageContentList: [], // 章节内容
		toolStatus: false,
		showCatalog: false,
		sort: '正序',
		chapterList: [], // 章节列表
		detailData: {} as any, // 漫画详情
		scrollTop: 0,
		loading: true,
		toolColumn: [
			{ id: -1, name: 'arrow-left', label: '上一话', labelPos: 'bottom', labelSize: 24 },
			{ id: 0, name: 'grid-fill', label: '目录', labelPos: 'bottom', labelSize: 24 },
			{ id: 1, name: 'arrow-right', label: '下一话', labelPos: 'bottom', labelSize: 24 },
		],
		curChapterId: 0,
		curChapterRefIndex:0,
		nodeList: undefined
	})
	const setChapterItemRef = (el) => {
	  chapterItemRef.value.push(el)
	}
	onLoad((option) => {
		const { comic_id, chapter_id } = option
		init(comic_id, chapter_id)
	})
	onMounted(() => {

	})
	onShow(() => {
	})
	onReady(() => {
		console.log('onReady');
	})
	const showTool = () => {
		toolStatus.value = !toolStatus.value
	}
	const onTool = (id : number) => {
		
		const index = state.chapterList.findIndex(item => item.chapter_id == state.curChapterId)
		state.curChapterRefIndex = index
		// 此处 如果chapterItemRef.length为空，但target属性有原始数组，因为在u-view的u-popup源码用v-if而不是v-show，这里我改了源码
		let el = chapterItemRef.value[index]
		
		if (id === 0) {
			el.$el.classList.value  = 'chapter-item'
			el.$el.classList.value  +=  ' chapter-item-current'
			state.showCatalog = true

			return
		}
		let page = 0
		if (index === -1) {
			showMsg({ title: '章节不存在' })
			return
		}
		if (id === -1) {
			el.$el.classList.value  = 'chapter-item'
			page = index - 1
			if (page < 0) {
				showMsg({ title: '没有上一话了' })
				return
			}
		} else {
			el.$el.classList.value  = 'chapter-item'
			page = index + 1
			if (page > state.chapterList.length) {
				showMsg({ title: '没有下一话了' })
				return
			}
		}
		const item = state.chapterList[page]
		uni.setNavigationBarTitle({
			title: item.title,
		})
		init(item.comic_id, item.chapter_id)
	}
	const init = async (comic_id : number, chapter_id : number) => {
		state.curChapterId = chapter_id
		const params = {
			comic_id,
			isAll: true
		}

		try {
			const res = await api.getChapterList(params)
			state.chapterList = res.data.data
			const item = state.chapterList.find(el => el.chapter_id == chapter_id)
			uni.setNavigationBarTitle({
				title: item.title || '阅读'
			})

			const { data } = await api.getCartoonDetail(comic_id)
			state.detailData = data
			const { read, price, charge } = data
			const readParams = {
				chapter_id,
				comic_id,
				is_vip: charge,
				price,
				uid: userStore.userInfo.id,
				read
			}
			const res1 = await api.getChapterPage(chapter_id)
			state.pageContentList = res1.data
			const addRead = await api.addChapterRead(readParams)
			state.loading = false
			console.log(addRead, 'addRead');
		} catch (e) {
			console.log(e);
		}
	}
	const onComicPage =(comic_id:number,chapter_id:number) =>{
		init(comic_id, chapter_id)
		state.showCatalog = false
		let el = chapterItemRef.value[state.curChapterRefIndex]
		el.$el.classList.value  = 'chapter-item'
		
	}
	const scroll = (e : any) => {
		// #ifndef MP-WEIXIN
		state.scrollTop = e.detail.scrollTop

		// #endif

	}
</script>

<style lang="scss" scoped>
	.comic-page {
		height: 100vh;

		.comic-list {
			// :deep(.u-image){
			// 	margin-bottom: -8rpx;
			// }
		}

		.comic-end {
			padding-top: 40rpx;

			.end-btn {
				display: flex;
				justify-content: space-around;
				align-items: center;
				height: 100rpx;
			}
		}

		.comic-tool-show {
			opacity: 1;
			bottom: 0;
			transition: all 1s;
		}

		.comic-tool-hide {
			opacity: 0;
			transition: all 1s;
			bottom: -98rpx;
		}

		.comic-tool {
			position: fixed;
			background-color: #fff;
			width: 100%;
			padding: 10rpx 0 20rpx;

			.tool-content {
				display: flex;
				justify-content: center;
				align-items: center;

				.tool-item {
					width: 30%;
					text-align: center;
				}
			}
		}

		.popup-content {
			.comic-title {
				font-size: 32rpx;
				text-align: center;
				margin: 20rpx;
			}

			.comic-status {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				font-weight: bold;
				height: 80rpx;
			}

			.chapter-list {
				margin-top: 20rpx;

				.chapter-item {
					display: flex;
					padding: 0 20rpx 0 20rpx;
					margin-bottom: 40rpx;
					
					.current-icon {
						display: none;
						padding-right: 10rpx;
					}
				}

				.chapter-item-current {
					display: flex;
					color: $uni-main-color;

					.current-icon {
						display: inline-flex;
					}
				}
			}
		}
	}
</style>