<template>
	<view class="login-header">
		<view class="login-header-logo"></view>
	</view>
	<view class="login-form">
		<u-form :model="userForm" ref="loginFrom">
			<u-form-item prop="account" left-icon="account" :left-icon-style="letIconStyle">
				<u-input v-model.trim="userForm.account" placeholder="请输入手机号/邮箱" />
			</u-form-item>
			<u-form-item prop="password" left-icon="lock" :left-icon-style="letIconStyle">
				<u-input type="password" placeholder="请输入密码" v-model.trim="userForm.password" /></u-form-item>
			<u-form-item v-if="regStatus" prop="username" left-icon="bookmark" :left-icon-style="letIconStyle">
				<u-input v-model.trim="userForm.username" placeholder="请输入昵称"  /></u-form-item>
		</u-form>
		
		<u-button v-if="state.customStyleLogin" :custom-style="state.customStyleLogin" shape="circle"
			@click="handleLogin" :ripple="true">
			{{!regStatus?'登录':'注册'}}
		</u-button>
	</view>
	<view class="register" @click="switchRegister">{{regStatus?'<&nbsp;返回登录':'手机号快速注册&nbsp;>'}}</view>
	

	<view class="other-login">
		<view class="other-title">其它登录方式</view>
		<view class="other-icon">
			<u-icon name="weixin-circle-fill" label-pos="bottom" label="微信" label-size="14" size="64" color="#01a95e" @click="handleWxLogin"></u-icon>
			<u-icon name="qq-fill" label-pos="bottom" label="QQ" label-size="14" size="64" color="#1a8ef1" @click="handleWxLogin"></u-icon>
			<u-icon name="weibo" label-pos="bottom" label="微博" label-size="14" size="64" color="#ff5427" @click="handleWxLogin"></u-icon>
		</view>
		
	</view>

</template>

<script lang="ts" setup>
	import { userLogin, userRegister, userWxLogin } from '@/api/index'
	import { onActivated, onDeactivated, nextTick, onMounted, reactive, ref, toRefs, computed, watch, watchEffect } from 'vue'
	import { onLoad, onShow, onReady, onHide } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	import {wxLogin} from '@/utils/wxLogin'
	import showMsg from '@/utils/showMsg'
	const userStore = useUser()
	const loginFrom = ref()
	const state = reactive({

		userForm: {
			account: '',
			password: '',
			username: '',
		},
		isRegist: false,
		customStyleLogin: { backgroundColor: "#ffc09f", color: '#fff', marginTop: '40rpx' }
	})
	const letIconStyle = {fontSize:'35rpx',color:'#bcbcbc'}


	const { userForm } = toRefs(state)

	// onLoad(() => {


	// })
	onShow(() => {
		if(uni.getStorageSync('USER')){
			console.log('33');
			uni.switchTab({
				url:'/pages/user/user'
			})
		}

	})

	// onMounted(() => {

	// })

	const regStatus = computed(()=>state.isRegist)

	watch(()=>state.userForm,()=>{
		changeLoginBtn()
		
	},{deep:true})
	// watch(() => userStore.userInfo.username, () => {
	// 	if (userStore.token) {
	// 		userInfo.value.username = userStore.userInfo.username
	// 	}
	// })
	// watch(() => userStore.userInfo.avatar, () => {
	// 	if (userStore.token) {
	// 		userInfo.value.avatar = userStore.userInfo.avatar
	// 	}
	// })


	// // 监听登录弹出框，隐藏小程序tabbar
	// // #ifdef MP-WEIXIN
	// watchEffect(() => {
	// 	if (state.show === true) {
	// 		uni.hideTabBar()
	// 	} else {
	// 		uni.showTabBar()
	// 	}
	// })
	// // #endif

	const handleLogin = async () => {
		const { account, password } = toRefs(state.userForm)
		const option = regStatus.value ? userRegister(state.userForm) : userLogin({ account: account.value, password: password.value })
		try {
			const { data, msg,time } = await option
			if (!regStatus.value) {
				userStore.$patch((state : any) => {
					console.log('pinia存储token和用户信息');
					state.userInfo = data.userInfo
					state.token = data.token
					state.tokenTime = time
				})
				uni.switchTab({
					url:'/pages/user/user'
				})
			} else {
				state.isRegist = false
				loginFrom.value.resetFields()
			}
			showMsg({ title: msg })
		} catch (e) {
			console.log(e);
		}
	}
	const switchRegister = () => {
		/* nextTick(() => {
			loginFrom.value.resetFields()
		}) */
		loginFrom.value.resetFields()
		state.isRegist = !state.isRegist
		state.customStyleLogin.backgroundColor = '#ffc09f'
	}

	const handleWxLogin = () => {
		wxLogin()

	}
	
	const changeLoginBtn = () =>{
		const flag = state.userForm.account.length && state.userForm.password.length
		if(regStatus.value? flag && state.userForm.username.length :flag){
			state.customStyleLogin.backgroundColor = '#ff7830'
		}else{
			state.customStyleLogin.backgroundColor = '#ffc09f'
		}
	}
	
</script>

<style lang="scss">
	.login-header{
		margin-top: 80rpx;
		.login-header-logo{
			margin: 0 auto;
			width: 210rpx;
			height: 136rpx;
			background: url('https://static.mkzcdn.com/mobile/img/login/pic_login_logo@2x.png') no-repeat center center;
			background-size: cover;
		}
	}
	.login-form {
		margin: 80rpx 10% 0;
	}

	.register {
		margin-top: 40rpx;
		text-align: center;
	}

	.other-login {
		margin-top: 150rpx;

		.other-title {
			text-align: center;
			margin-bottom: 40rpx;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		.other-icon{
			display: flex;
			justify-content: space-around;
			margin: 0 10%;
		}
	}
</style>