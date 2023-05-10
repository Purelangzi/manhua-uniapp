<template>
	<view class="comic-item" v-for="item in props.list" :key="item.id">
		<view class="cover" @click="onComicDetail(item.id)">
			<u-image width="165rpx" height="225rpx" :src="item.cover_lateral||item.img_url"></u-image>
		</view>
		<view class="comic-info" @click="onComicDetail(item.id)">
			<view v-show="item.name" class="info-title">{{item.name}}</view>
			<view v-show="item.title" class="info-other">上次看到：{{item.title}}</view>
			<view v-show="item.cartoon_introduction" class="info-other intro">{{item.cartoon_introduction}}</view>
			<view v-show="item.charge" class="info-other vip">{{item.charge === 0?'免费':'会员'}}</view>
			<view v-show="item.price&&item.charge!==0" class="info-other price">价格：{{'¥' + item.price }}</view>
			<view v-show="item.read&&item.read!==0" class="info-other read">阅读量：{{ + item.read }}</view>
			
		</view>
		<view class="comic-chapter-go" @click="onComicPage(item.id)">
			<u-icon name="coupon" label-pos="bottom" label="速看" label-color="#ff7830" label-size="24" color="#ff7830"
				size="60"></u-icon>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import api from '@/api/index'
	interface DetailType {
		list : any[]
	}
	const props = defineProps<DetailType>()
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
			.intro {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.comic-chapter-go {
			margin-left: 76rpx;
		}
	}
</style>