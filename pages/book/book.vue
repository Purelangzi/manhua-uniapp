<template>
	<view class="book-page">
		<view class="book-tabs">
			<u-tabs :list="state.list" active-color="#ff7830"  bar-width="60" :is-scroll="false" v-model="state.current"
				@change="changeTabs" :bar-style="{backgroundColor:'#ff7830'}">
			</u-tabs>
		</view>
		<scroll-view scroll-y="true" style="height: 100vh;" @scroll="scroll" :show-scrollbar="true">
			<view v-show="state.current ==0 " class="book-history">
				<view class="comic-item" v-for="item in state.historyList" :key="item.id">
					<view class="cover" @click="onComicDetail(item.id)">
						<u-image width="165rpx" height="225rpx" :src="item.img_url"></u-image>
					</view>
					<view class="comic-info" @click="onComicDetail(item.id)">
						<view class="info-title">{{item.name}}</view>
						<view class="info-other">上次看到：{{item.title}}</view>
					</view>
					<view class="comic-chapter-go" @click="onComicPage(item.id)">
						<u-icon name="coupon" label-pos="bottom" label="续看" label-color="#ff7830" label-size="24"
							color="#ff7830" size="60"></u-icon>
					</view>
				</view>
			</view>
			
		</scroll-view>
		
		
	</view>
</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { wxIsLogin } from '@/utils/wxLogin'
	import {useUser} from '@/stores/user'
	import api from '@/api/index'
	const userStore = useUser()
	const state = reactive({
		scrollTop: 0,
		list: [{ name: '历史' }, { name: '收藏' }],
		current: 0,// 默认展示历史
		historyList:[],
		loadText: {
			loadmore: '点击加载更多',
			loading: '加载中',
			nomore: '没有更多了'
		},

	})
	onShow(async () => {
		console.log('book-onShow');
		// #ifdef MP-WEIXIN
		if (wxIsLogin()) return
		// #endif
		getHistoricalRecord(userStore.userInfo.id)

	})
	const changeTabs = (index : number) => {
		state.current = index
	}
	const scroll = (e : any) => {
		// #ifndef MP-WEIXIN
		state.scrollTop = e.detail.scrollTop
	
		// #endif
	}
	const getHistoricalRecord = async(uid:number) =>{
		try{
			const {data} = await api.getHistoricalRecord({uid})
			state.historyList = data
		}catch(e){
			console.log(e);
		}
	}
	const onComicDetail = (id : number) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
	}
	// 快速阅读
	const onComicPage = async(comic_id:number) => {
		try{
			const res = await api.getCartoonDetail(comic_id)
			const {read, price, charge,name} = res.data
			const { data } = await api.getChapterList({
				page: 1,
				pageSize: 1,
				comic_id
			})
			const chapter_id = `chapter_id=${data.data[0].chapter_id}`
			const params = `${chapter_id}&comic_id=${comic_id}&name=${name}&read=${read}&price=${price}&charge=${charge}`
			uni.navigateTo({
				url: `/pages/comic-page/comic-page?${params}`
			})
		}catch(e){
			console.log(e);
		}
	}
</script>

<style lang="scss" scoped>
.book-tabs{
	border-bottom: 4rpx solid #eee;
}
.book-history{
	margin: 0 20rpx;
	.comic-item {
		display: flex;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #ebebeb;
		.comic-info {
			margin-left: 25rpx;
			width: 50%;
	
			.info-title {
				padding: 10rpx 0 10rpx 0;
			}
			.info-other {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}
		.comic-chapter-go{
			margin-left: 76rpx;
		}
	}
}
</style>