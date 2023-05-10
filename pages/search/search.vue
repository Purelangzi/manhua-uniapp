<template>
	<view class="search">
		<!-- <SearchInput /> -->
		<view class="search-header">
			<u-search placeholder="输入作品名" v-model.trim="state.searchKeyWord" @search="searchCartoon" @custom="searchCartoon"
				@clear="clearSearch" :action-style="{color:'#ff7830'}">
			</u-search>
		</view>
		<view class="search-content" v-show="!state.isSearch">
			<view class="search-hot">
				<!-- #ifdef MP-WEIXIN -->
				<view class="hot-title title">- 热门搜索 -</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="hot-title title">热门搜索</view>
				<!-- #endif -->

				<view class="hot-content">
					<view class="hot-item" v-for="cartoon in searchHotList" :key="cartoon.id"
						@click="goCartoonDetail(cartoon.id)">
						{{cartoon.name}}
					</view>
				</view>
			</view>

			<view class="record" v-show="recordList.length">
				<view class="record-title title">
					<!-- #ifdef MP-WEIXIN -->
					- 搜索历史 -
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					搜索历史
					<!-- #endif -->
					<u-icon class="record-icon" @click="clearRecord" size="36" name="trash"></u-icon>
				</view>

				<view class="record-content">
					<view class="record-item" v-for="(item,key) in recordList" :key="key">
						<view class="item-keyword" @click="onRecord(item)">{{item}}</view>
						<u-icon size="16" name="close" color="#666b6b" class="item-icon"
							@click="clearRecordItem(key)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="search-active" v-show="state.isActive">
			<view class="search-active-item" @click="onComicDetail(item.id)" v-for="item in state.searchList" :key="item.id">
				<view class="item-name">{{item.name}}</view>
				<view class="item-vip">{{item.charge===1?'收费':'免费'}}</view>
			</view>
		</view>

		<view class="search-result" v-show="state.isSearch && !state.isActive">
			<comic-list :list="state.searchList"></comic-list>
			
			<!-- 加载更多 -->
			<view class="more">
				<u-loadmore v-show="state.searchList.length" :status="status" font-size="22"
					color="#b4b4b4" margin-top="20" :load-text="state.loadText" @loadmore="onLoadMore" />
			</view>
			
		</view>

		<view class="search-result-null" v-show="state.isSearch && !state.searchList.length">
			<view class="not-found">
				(T-T) 苟修金sama， 没有搜索到相关内容
			</view>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import api from '@/api/index'
	import { computed, reactive, ref, toRefs,watch } from 'vue'
	import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app'
	import { useSearch } from '@/stores/user'
	const searchStore = useSearch()
	const status = ref('loadmore')
	const state = reactive({
		searchKeyWord: '',
		searchHotParams: {
			page: 0,
			pageSize: 9
		},
		isSearch: false, // 是否已输入
		isActive:false, // 是否开启关键词下拉列表
		searchHotList: [],
		searchAllList: [],
		searchList: [],
		start: 0, //  搜索漫画的列表的开始切割的位置
		end: 10,// 搜索漫画的列表的末尾切割的位置,
		loadText: {
			loadmore: '点击加载更多',
			loading: '加载中',
			nomore: '没有更多了'
		},
		isRequest:false // 控制点击历史记录后，不重复请求
	})
	const { searchHotList } = toRefs(state)
	onLoad(() => {

	})
	onShow(() => {

		getHotData()

	})
	onReachBottom(() => {
		if(state.isActive) return // 防止搜索下拉列表触发
		// 不超过十条或没有数据了
		if (!state.searchAllList.length || state.end >= state.searchAllList.length) {
			status.value = 'nomore'
			return
		}
		
		status.value = 'loading'
		// 每次显示十条数据
		state.start += 10
		state.end += 10
		// 最后不够十条把剩余的加上
		if (state.end > state.searchAllList.length) {
			state.end = state.start + state.searchAllList.length - state.start
			state.searchList = [...state.searchList, ...state.searchAllList.slice(state.start, state.end)]
			status.value = 'nomore'
			return
		}
		state.searchList = [...state.searchList, ...state.searchAllList.slice(state.start, state.end)]

	})
	const recordList = computed(() => {
		return searchStore.searchHistory
	})

	const getHotData = async () => {
		state.searchHotParams.page = Math.floor(Math.random() * (20 - 1)) + 1
		try {
			const { data } = await api.getCartoonList(state.searchHotParams)
			searchHotList.value = data.data
		} catch (e) {
		}
	}

	const queryCartoon = async (val? : string,size?:number) => {
		// if(state.isRequest) return
		state.isRequest = true
		try {
			const { data } = await api.queryCartoon(val?val:state.searchKeyWord)
			state.isSearch = true
			if (data.length < 10) {
				state.searchList = data
			} else {
				// 切割数据
				state.searchAllList = data
				state.searchList = state.searchAllList.slice(0, size?size:15)
			}

		} catch (e) {
			console.log(e);
		}
		const flag:number = searchStore.searchHistory.findIndex((item:string)=>item === val)
		if(flag === -1){
			searchStore.searchHistory.push(val)
		}
		
	}
	const clearSearch = () => {
		state.isSearch = false
		state.isActive = false
		state.isRequest =false
		state.searchList = []
		status.value = 'loadmore'
	}
	const clearRecord = () => {
		searchStore.clearHistory()
	}
	const clearRecordItem = (key : number) => {
		searchStore.searchHistory.splice(key, 1)
	}
	const goCartoonDetail = (id : number) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
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
	const onRecord = (val : string) => {
		queryCartoon(val)
		state.isRequest = true
		state.searchKeyWord = val
		
	}
	const onLoadMore = ()=>{
		status.value = 'loading'
		setTimeout(()=>{
			status.value = 'nomore'
		},500)
	}
	const searchCartoon = (val : string) => {
		if (!val) return
		state.isActive = false
	}

	watch(()=>state.searchKeyWord,(newVal:string)=>{
		if(newVal!=='' && !state.isRequest){
			state.isActive = true
			queryCartoon(newVal)
			// state.isRequest = false
		}else{
			
			clearSearch()
		}
	})
</script>

<style lang="scss" scoped>
	.search {
		padding: 0 25rpx;

		.title {
			margin-bottom: 20rpx;
			color: $uni-text-color-grey;
			/* #ifdef MP-WEIXIN */
			text-align: center;
			/* #endif */
			/* #ifndef MP-WEIXIN */
			text-align: left;
			/* #endif */

		}

		.search-header {
			margin: 10rpx 0 30rpx;
		}

		.search-hot {
			.hot-content {
				display: flex;
				flex-wrap: wrap;

				.hot-item {
					margin-right: 20rpx;
					margin-bottom: 25rpx;
					padding: 15rpx 20rpx;

					border-radius: 40%;
					/* #ifdef MP-WEIXIN */
					font-size: 26rpx;
					background-color: #f5f5f5;
					/* #endif */
					/* #ifndef MP-WEIXIN */
					font-size: 24rpx;
					border: 1px solid #D0D0D0;
					/* #endif */
				}
			}
		}
		.record {
			.record-title {
				margin-top: 20rpx;

				.record-icon {
					float: right;
					margin-top: 4rpx;
					margin-right: 10rpx;
				}
			}

			.record-content {
				margin-right: 10rpx;

				.record-item {
					display: flex;
					justify-content: space-between;
					height: 80rpx;
					line-height: 80rpx;
					border-bottom: 1px solid #ebebeb;

					.item-keyword {
						width: 90%;
					}

					.item-icon {
						padding: 0 20rpx;
					}
				}
			}
		}
		.search-active{
			padding:  0 20rpx;
			.search-active-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 20rpx 0;
				// height: 140rpx;
				border-bottom:1px solid #ebebeb;
				.item-vip{
					padding-top: 10rpx;
					font-size: 24rpx;
					color: $uni-text-color-grey;
				}
			}
		}
		
		.search-result{
			.more{
				height: 50rpx;
			}
		}

		.search-result-null {
			.not-found {
				text-align: center;
				height: 160rpx;
				line-height: 160rpx;
			}
		}
	}
</style>