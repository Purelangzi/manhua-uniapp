<template>
	<view class="user">
		<view class="user-header" @click="handleUserOption('/pages/user/user-Info')">
			<!-- <u-avatar :src="userInfo.avatar?userInfo.avatar:'/static/image/default-avatar.png'" shape="circle" size="large"></u-avatar> -->
			<u-avatar :src="userInfo.avatar" shape="circle" size="large"></u-avatar>
			<view class="user-name">{{userInfo.username?userInfo.username:'登录后查看更多精彩'}}</view>
		</view>
		<view class="user-options">
			<u-cell-group>
				<u-cell-item title="个人中心" icon="integral"
					@click="handleUserOption('/pages/user/user-Info')"></u-cell-item>
				<u-cell-item title="浏览记录" icon="clock"></u-cell-item>
				<u-cell-item title="关注/收藏" icon="heart"></u-cell-item>
				<u-cell-item title="设置" icon="setting"></u-cell-item>

			</u-cell-group>
		</view>

	</view>
</template>

<script lang="ts" setup>
	import { onActivated, nextTick, onMounted, reactive, ref, toRefs, computed, watch, watchEffect } from 'vue'
	import { onLoad, onShow, onReady, onHide } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	import {wxIsLogin} from '@/utils/wxLogin'
	const userStore = useUser()
	const state = reactive({
		userInfo: {
			avatar: '',
			username: '',
		}
	})
	
	const { userInfo, userForm } = toRefs(state)


	onLoad(() => {

		// #ifdef MP-WEIXIN
		if(wxIsLogin()) return
		// #endif
		userInfo.value.username = userStore.userInfo.username
		userInfo.value.avatar = userStore.userInfo.avatar

	})
	onShow(() => {
		console.log('onShow');
		// load()
	})
	onActivated(() => {
		// activated()
	})
	onMounted(() => {

	})



	watch(() => userStore.userInfo.username, () => {
		if (userStore.token) {
			userInfo.value.username = userStore.userInfo.username
		}
	})
	watch(() => userStore.userInfo.avatar, () => {
		if (userStore.token) {
			userInfo.value.avatar = userStore.userInfo.avatar
		}
	})








	const handleUserOption = (url : string) => {
		uni.navigateTo({
			url
		})
	}
</script>

<style lang="scss" scoped>
	.user-header {
		width: 100%;
		height: 180rpx;
		background-color: $uni-main-color;
		border-radius: 0 0 40rpx 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.user-name {
			margin-left: 20rpx;
			color: #fff;
		}

	}

	.user-options {
		margin-top: 30rpx;


	}
</style>