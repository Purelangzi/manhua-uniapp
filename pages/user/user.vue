<template>
	<view class="user">
		<view class="user-header" @click="handleClickAvatar">
			<u-avatar :src="userInfo.avatar?userInfo.avatar:'/static/image/default-avatar.png'" shape="circle"
				size="large"></u-avatar>
			<view class="user-name">{{userInfo.username?userInfo.username:'登录后查看更多精彩'}}</view>
		</view>
		<view class="user-options">
			<u-cell-group>
				<u-cell-item title="个人中心" icon="integral"
					@click="handleUserOption('/pages/user/user-Info')"></u-cell-item>
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
					<u-form :model="userForm" ref="loginFrom">
						<u-form-item prop="account" label="+86"><u-input v-model.trim="userForm.account" /></u-form-item>
						<u-form-item prop="password" label="密码"><u-input type="password" v-model.trim="userForm.password" /></u-form-item>
						<u-form-item v-if="state.isRegist" prop="username" label="昵称"><u-input
								v-model.trim="userForm.username" /></u-form-item>
					</u-form>
					<text v-if="!state.isRegist" class="checkout-register" @click="checkRegister">切换到注册</text>
					<u-button v-if="state.customStyleLogin" :custom-style="state.customStyleLogin" shape="circle" @click="handleLogin" :ripple="true">
						{{!state.isRegist?'登录':'注册'}}
					</u-button>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="user-wx">
					<view class="other-login">其它登录方式</view>
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
	import { nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
	import { onLoad, onShow,onReady } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	import showMsg from '@/utils/showMsg'
	const userStore = useUser()
	const loginFrom = ref()
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
		rules: {
			account: [
				{
					required: true,
					message: '手机号不能为空',
					trigger: ['change','blur'],
				},
				{
					required: true,
					pattern: /^1[3-9]\d{9}$/,
					message: '请输入正确的手机号',
					trigger: ['change'],
				}
			],
			password: [
				{
					required: true,
					message: '密码不能为空',
					trigger: ['change','blur'],
				}
			],
			username:[{required: true,message: '昵称不能为空', trigger: ['change','blur']}]
		},
		show: true,
		isRegist: false,
		customStyleLogin:{ backgroundColor: '#ff6b07', color: '#fff',marginTop:'85rpx'}
	})


	const customStyleExit = { backgroundColor: '#ffa73c', color: '#fff' }
	
	const customStyleWx = { backgroundColor: '#01a95e', color: '#fff' }

	const { userInfo, userForm } = toRefs(state)

	onLoad(() => {
		if (userStore.token) {
			state.show = false
			userInfo.value.username = userStore.userInfo.username
			userInfo.value.avatar = userStore.userInfo.avatar
		} else {
			state.show = true
		}
	})
	onShow(() => {
		
	})
	onMounted(() => {

	})
	onReady(() =>{
		loginFrom.value.setRules(state.rules);
	})
	watch(()=>state.isRegist,(newVal)=>{
		nextTick(()=>{
			console.log(1);
			loginFrom.value.resetFields()
			loginFrom.value.setRules(state.rules)
		})
		
		if(newVal === true){
			state.customStyleLogin.marginTop = '50rpx'
		}
	})
	watch(()=>state.show,(newVal)=>{
		if(newVal === true)
		nextTick(()=>{
			loginFrom.value.resetFields()
			
			loginFrom.value.setRules(state.rules)
		})
	})
	const handleLogin = async () => {
		const { account, password } = toRefs(state.userForm)
		const option = state.isRegist ? userRegister(state.userForm) : userLogin({ account: account.value, password: password.value })
		try {
			const { data, msg } = await option
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
			showMsg({ title: msg, icon: 'success' })
		} catch (e) {

		}



	}
	const checkRegister = () => {
		nextTick(()=>{
			loginFrom.value.resetFields()
			loginFrom.value.setRules(state.rules)
		})
		
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
					avatar: avatarUrl,
					username: nickName,
					code: codeWx as string
				}
				try {
					const { data, msg } = await userWxLogin(params)
					console.log('微信一键登录存储token和用户信息');
					userStore.$patch((state : any) => {
						state.userInfo = data.userInfo
						state.token = data.token
					})
					userInfo.value.avatar = data.userInfo.avatar
					userInfo.value.username = data.userInfo.username
					state.show = false
					showMsg({ title: msg || '' })
				} catch (e) {
				}
			}
		})
	}
	// 获取小程序用户登录临时凭证
	const getWxCode = async () => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: 'weixin',
				success: (res) => {
					resolve(res.code)
				},
				fail: (err) => {
					showMsg({ title: '登录失败,错误码：' + err.code })
					reject(err)
				}
			})
		})
	}
	const handleClickAvatar = () => {
		if (userInfo.value.username.length) {
			uni.navigateTo({
				url: '/pages/user/user-info'
			})
		} else {
			state.isRegist = false
			state.show = true

			
		}
	}
	const handleUserOption = (url : string) => {
		if (!userStore.userInfo.token) {
			state.isRegist = false
		} else {
			uni.navigateTo({
				url
			})
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
		position: relative;
		::v-deep .u-drawer-content {
			padding: 0 65rpx;
		}

		::v-deep .u-drawer__scroll-view {
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
			position: absolute;
			right: 0;
			/* #ifdef MP-WEIXIN */
			top: 48%;
			/* #endif */
			bottom: 26%;
			color: $uni-text-color-grey;
		}

		.user-wx {
			margin-bottom: 20rpx;

			.other-login {
				font-weight: 600;
				margin-bottom: 20rpx;
			}
		}
	}
</style>