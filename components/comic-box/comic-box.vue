<template>
	<view class="detail-item" @click="goCartoonDetail(item.id as number)" v-for="item in props.detail" :key="item.id">
		<u-image :src="item.cover_lateral" height="275rpx" />
		<view v-show="item.charge ==1" class="t-icon detail-vip t-icon-vip"></view>
		<view class="detail-name">{{item.name}}</view>
		<view class="detail-introduction">{{item.cartoon_introduction}}</view>
	</view>
</template>

<script lang="ts" setup>
	
	interface DetailType{
		detail:any[]
	}
	const props = defineProps<DetailType>()

	const goCartoonDetail = (id : number) => {
		uni.pageScrollTo({
			scrollTop:0,
			duration:0
		})
		uni.navigateTo({
			url: `/pages/detail/detail?id=${id}`,
		})
	}
</script>

<style lang="scss" scoped>
	.box-detail {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.detail-item{
			position: relative;
			margin-bottom: 30rpx;
			width: calc(90% / 3);
			.detail-vip{
				position: absolute;
				top: 0;
				right: 0;
				width: 40rpx;
				height: 40rpx;
				border-bottom-left-radius: 40%;
				background-color: #f6caa8;
				
			}
			.detail-name{
				margin-top: 10rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				
			}
			.detail-introduction{
				margin-top: 6rpx;
				font-size: 24rpx;
				color: $uni-text-color-grey;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>