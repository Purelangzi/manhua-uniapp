<template>
	<view class="user">
		<view class="user-header" @click="handleUser">
			<u-avatar :src="userInfo.avatar?userInfo.avatar:'/static/image/default-avatar.png'" shape="circle"
				size="large"></u-avatar>
			<text class="user-name">{{userInfo.username?userInfo.username:'登录后查看更多精彩'}}</text>
		</view>
		<view class="user-options">
			<u-cell-group>
				<u-cell-item title="个人中心" icon="integral"></u-cell-item>
				<u-cell-item title="浏览记录" icon="clock"></u-cell-item>
				<u-cell-item title="关注/收藏" icon="heart"></u-cell-item>
				<u-cell-item title="设置" icon="setting"></u-cell-item>
				<view class="logOut" v-if="userInfo.username">
					<u-button :custom-style="customStyleExit" :ripple="true" @click="handleLogOut">退出登录</u-button>
				</view>
			</u-cell-group>
		</view>
		<view class="user-login-popup">
			<u-popup v-model="state.show" mode="bottom">
				<view class="popup-title">登录后更精彩</view>
				<view class="login-form">
					<u-form :model="userForm" ref="uForm">
						<u-form-item label="+86"><u-input v-model="userForm.account" /></u-form-item>
						<u-form-item label="密码"><u-input type="password" v-model="userForm.password" /></u-form-item>
						<u-form-item v-if="state.isRegist" label="昵称"><u-input
								v-model="userForm.username" /></u-form-item>
					</u-form>
					<view class="checkout-register" @click="checkRegister">切换到{{state.isRegist?'登录':'注册'}}</view>
					<u-button :custom-style="customStyleLogin" shape="circle" @click="handleLogin" :ripple="true">
						{{!state.isRegist?'登录':'注册'}}
					</u-button>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="user-wx">
					<text class="other-login">其它登录方式</text>
					<u-button :custom-style="customStyleWx" shape="circle" :ripple="true" @click="handleWxLogin">
						<u-icon name="weixin-fill" label="微信登录" margin-left="10rpx" label-color="#fff"></u-icon>
					</u-button>
				</view>
				<!-- #endif -->
				
			</u-popup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { userLogin, userRegister, userWxLogin } from '@/api/index'
	import { nextTick, onMounted, reactive, ref, toRefs } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	const userStore = useUser()
	const state = reactive({
		userInfo: {
			avatar: '',
			username: '',
		},
		userForm: {
			account: '13539660702',
			password: '13539660702',
			username: '',

		},
		show: true,
		isRegist: false
	})


	const customStyleExit = { backgroundColor: '#ffa73c', color: '#fff' }
	const customStyleLogin = { backgroundColor: '#ff6b07', color: '#fff' }
	const customStyleWx = { backgroundColor: '#01a95e', color: '#fff' }

	const { userInfo, userForm } = toRefs(state)

	onLoad(() => {
		if (userStore.token) {
			state.show = false
			userInfo.value.username = userStore.userInfo.username
			userInfo.value.avatar = userStore.userInfo.avatar
		}else{
			state.show = true
		}
	})
	onShow(() => {

	})
	onMounted(() => {

	})

	const handleLogin = async () => {
		const { account, password } = toRefs(state.userForm)
		const option = state.isRegist ? userRegister(state.userForm) : userLogin({ account: account.value, password: password.value })

		const { code, data, msg } = await option
		if (code === 200) {
			if (!state.isRegist) {
				const { avatar, username } = data.userInfo
				state.userInfo.avatar = avatar
				state.userInfo.username = username
				state.show = false
				userStore.$patch((state : any) => {
					console.log('存储token和用户信息');
					state.userInfo = data.userInfo
					state.token = data.token
				})
			} else {
				state.isRegist = false
			}
			uni.showToast({
				title: msg,
				icon: 'success',
				duration: 1500
			})

		}
	}
	const checkRegister = () => {
		state.userForm.account = ''
		state.userForm.password = ''
		state.userForm.username = ''
		state.isRegist = !state.isRegist

	}
	const handleLogOut = () => {
		userStore.logOut()
		uni.reLaunch({
			url: '/pages/user/user'
		})
	}
	const handleWxLogin = async () => {
		uni.getUserProfile({
			desc: '获取用户个人信息',
			success: async (infoRes) => {
				const { avatarUrl, nickName } = infoRes.userInfo
				const codeWx = await getWxCode()
				const params = {
					avatar:avatarUrl,
					username:nickName,
					code:codeWx as string
				}
				const {code,data,msg} = await userWxLogin(params)
				if(code === 200){
					console.log('微信一键登录存储token和用户信息');
					userStore.$patch((state : any) => {
						state.userInfo = data.userInfo
						state.token = data.token
					})
					userInfo.value.avatar = data.userInfo.avatar
					userInfo.value.username = data.userInfo.username
					state.show = false
				}
				uni.showToast({
					title:msg || '',
					icon:'none'
				})
				
			}
		})
	}
	const getWxCode = async () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					resolve(res.code)
				},
				fail: (err) => {
					uni.showToast({
						title:'登录失败,错误码：'+err.code,
						icon:'none'
					})
					reject(err)
				}
			})
		})
	}
	const handleUser = () => {
		if(userInfo.value.username.length){
			uni.navigateTo({
				url:'/pages/user/user-info'
			})
		}else{
			state.show = true
			console.log(state.show);
		}
	}
</script>

<style lang="scss" scoped>
	.user-header {
		width: 100%;
		height: 180rpx;
		background-color: $uni-bg-color-yellow;
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

		.logOut {
			margin-top: 40rpx;
			padding: 0 15%;

		}
	}

	.user-login-popup {
		::v-deep .u-drawer-content {
			padding: 0 65rpx;
		}
		::v-deep .u-drawer__scroll-view{
			height: auto;
		}
		.popup-title {
			margin: 20rpx 0;
			text-align: center;
			font-weight: bold;
		}

		.login-form {
			margin-bottom: 30rpx;
		}

		.checkout-register {
			margin: 15rpx 0;
			text-align: right;
			color: #cdcdcd;
		}

		.user-wx {
			margin-bottom: 20rpx;
			.other-login {
				font-weight: 600;
				display: block;
				margin-bottom: 20rpx;
			}
		}
	}
</style>