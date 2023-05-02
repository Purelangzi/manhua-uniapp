<template>
	<view class="search">
		<!-- <SearchInput /> -->
		<view class="search-header">
			<u-search placeholder="输入作品名" v-model="state.searchKeyWord" @search="searchCartoon" @custom="searchCartoon" @clear="clearSearch"
				:action-style="{color:'#ff7830'}">
			</u-search>
		</view>
		<view class="search-content" v-show="!state.isSearch">
			<view class="search-hot" >
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
					<view class="record-item" v-for="(item,key) in recordList" :key="item">
						<view class="item-keyword"  @click="onRecord(item)">{{item}}</view>
						<u-icon size="16" name="close" color="#666b6b" class="item-icon" @click="clearRecordItem(key)"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="search-result" v-show="state.isSearch">
			<view class="comic-item" v-for="item in state.querySearchList" :key="item.id">
				<view class="cover">
					<u-image width="165rpx" height="225rpx" :src="item.cover_lateral"></u-image>
				</view>
				<view class="comic-info">
					<view class="info-title">{{item.name}}</view>
					<view class="info-other intro">{{item.cartoon_introduction}}</view>
					<view class="info-other vip">{{item.charge === 0?'免费':'会员'}}</view>
					<view v-show="item.charge!==0" class="info-other price">价格：{{'¥' + item.price }}</view>
					<view v-show="item.read!==0" class="info-other read">阅读量：{{ + item.read }}</view>
					
				</view>
			</view>
			
		</view>
		<view class="search-result-null" v-show="state.isSearch && !state.querySearchList.length">
			<view class="not-found">
				(T-T) 主人， 没有搜索到相关内容
			</view>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import api from '@/api/index'
	// import SearchInput from './component/search-input.vue'
	import { computed, reactive, ref, toRefs } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import {useSearch} from '@/stores/user'
	const searchStore = useSearch()
	const state = reactive({
		searchKeyWord: '',
		searchHotParams: {
			page: 0,
			pageSize: 9
		},
		isSearch:false,
		searchHotList: [],
		// recordList:[],
		querySearchList:[]
	})
	const { searchHotList } = toRefs(state)
	onLoad(() => {

	})
	onShow(() => {

		getHotData()
		
	})
	const recordList = computed(()=>{
		return searchStore.searchHistory
	})
	
	const getHotData = async () => {
		state.searchHotParams.page = Math.floor(Math.random() * (20 - 1)) + 1
		try {
			const { data } = await api.getCartoonList(state.searchHotParams)
			
			searchHotList.value = data.data
		} catch (e) {
			console.log(e);
		}
	}
	
	const searchCartoon = (val : string) => {
		if(!val) return
		queryCartoon(state.searchKeyWord)
		searchStore.searchHistory.push(val)
	}
	const queryCartoon = async(val:string) =>{
		try{
			const {data} = await api.queryCartoon(val)
			state.isSearch = true
			state.querySearchList = data
		}catch(e){
			console.log(e);
		}
	}
	const clearSearch = ()=>{
		state.isSearch = false
		state.querySearchList = []
	}
	const clearRecord = () =>{
		searchStore.clearHistory()
	}
	const clearRecordItem = (key:number) =>{
		searchStore.searchHistory.splice(key,1)
	}
	const goCartoonDetail = (id : number) => {
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
	}
	const onRecord = (val:string) =>{
		state.searchKeyWord = val
		queryCartoon(val)
	}
</script>

<style lang="scss" scoped>
	.search {
		padding: 0 25rpx;
		.title{
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
		.record{
			.record-title{
				margin-top: 20rpx;
				.record-icon{
					float: right;
					margin-top: 4rpx;
					margin-right: 10rpx;
				}
			}
			.record-content{
				margin-right: 10rpx;
				.record-item{
					display: flex;
					justify-content: space-between;
					height: 80rpx;
					line-height: 80rpx;
					border-bottom: 1px solid #ebebeb;
					.item-keyword{
						width: 90%;
					}
					.item-icon{
						padding: 0 20rpx;
					}
				}
			}
		}
		.search-result{
			.comic-item{
				display: flex;
				padding: 20rpx 0;
				border-bottom: 1px solid #ebebeb;
				.cover{
					
				}
				.comic-info{
					margin-left: 25rpx;
					width: 50%;
					.info-title{
						padding: 10rpx 0 10rpx 0;
					}
					.info-other{
						margin: 10rpx 0;
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
					}
					.intro{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.search-result-null{
			.not-found{
				text-align: center;
				height: 160rpx;
				line-height: 160rpx;
			}
		}
	}
</style>