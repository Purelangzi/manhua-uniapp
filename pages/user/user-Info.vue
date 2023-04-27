<template>
	<view class="user-center">
		<u-cell-group>
			<u-cell-item title="头像">
				<template #right-icon>
					<u-avatar :src="userInfo.avatar" mode="square" @click="handleOnAvatar"></u-avatar>
				</template>
			</u-cell-item>
			<u-cell-item title="昵称" :value="userInfo.username?userInfo.username:'未设置'"></u-cell-item>
			<u-cell-item title="手机号" :value="userInfo.phone?userInfo.phone:'未设置'"></u-cell-item>
			<u-cell-item title="密码" :value="userInfo.password?userInfo.password:'未设置'"></u-cell-item>
			<u-cell-item title="邮箱" :value="userInfo.email?userInfo.email:'未设置'"></u-cell-item>
		</u-cell-group>
		<view class="logOut" v-if="userInfo.username">
			<u-button :custom-style="customStyleExit" :ripple="true" @click="handleLogOut">退出登录</u-button>
		</view>
		<button @click="rrr">dddd</button>
	</view>



</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref ,computed} from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import {editAccount} from '@/api/index'
	import { useUser } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import showMsg from '@/utils/showMsg'
	import wxLogin from '@/utils/wxLogin'
	
	const userStore = useUser()
	const state = reactive({

	})
	
	const customStyleExit = { backgroundColor: '#ffa73c', color: '#fff' }
	onLoad(() => {
		
	})
	onShow(() => {
	})
	onMounted(() => {

	})
	const rrr = () =>{
		
		uni.navigateBack()
	}
	const handleLogOut = () => {
		userStore.logOut()
		showMsg({title:'退出成功'})
		
	}
	const userInfo = computed(()=>{
		return userStore.userInfo
	})
	// 点击头像上传图片
	const handleOnAvatar = async () => {
		const filePath = await chooseImage(1) as string
		const {url} = await uploadImage(filePath)
		console.log(url);
		userStore.$patch((state:any)=>{
			state.userInfo.avatar = url
		})
		try{
			const {msg} = await editAccount({id: userStore.userInfo.id, avatar:url})
			showMsg({title:msg,icon:'success'})
		}catch(e){
			console.log(e);
		}
		
	}
	// 选择照片
	const chooseImage = async (count : number) => {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					const file = res.tempFiles[0]
					
					// #ifndef MP-WEIXIN
					const typeArr = ['image/png','image/jpg','image/jpeg']
					if(!typeArr.includes(file.type)){
						showMsg({ title: '上传图片只能是 png、jpg、jpeg 格式', duration: 3000 })
						return
					}
					// #endif
					

					// #ifdef MP-WEIXIN
					const path = file.path
					const wxTypeArr = ['.jpg','jpeg','.png']
					const type = path.substring(path.length - 4)
					if(!wxTypeArr.includes(type)) {
						showMsg({ title: '上传图片只能是 png、jpg、jpeg 格式!!', duration: 3000 })
						return
					}
					// #endif
					
					if (file.size / 1024 > 1024 * 2) {
						showMsg({ title: '图片不能大于2M,请重新上传', duration: 3000 })
						return
					}
					
					// #ifdef MP-WEIXIN
					resolve(path);
					// #endif
					
					// #ifndef MP-WEIXIN
					resolve(res.tempFilePaths[0]);
					// #endif
					
				},
			});
		}).catch(e => {
			console.log(e);
		})
	}
	// 上传文件
	const uploadImage = async (filePath : string) : Promise<any> => {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: 'http://127.0.0.1:7001/api/ali/uploadFile',
				filePath,
				name: 'files',
				header: {
					'token': 'Bearer ' + userStore.token
				},
				success: uploadFileRes => {
					const res = JSON.parse(uploadFileRes.data);
					if (uploadFileRes.statusCode === 200) {
						showMsg({ title: res.msg })
						resolve(res.data)
					} else if(uploadFileRes.statusCode === 401) {
						// #ifndef MP-WEIXIN
						showMsg({ title: res.msg || 'token失效,请重新登录',duration:2000})
						userStore.logOut()
						// #endif
						
						// #ifdef MP-WEIXIN
						
							console.log('微信刷新token');
							 wxLogin()
							return
						// #endif
						
						
					}else{
						showMsg({ title: res.msg || '图片上传失败'})
					}
				}
			});
		}).catch(e => {
			console.log(e);
		});
	}
</script>

<style lang="scss">
	.user-center {
		.logOut {
			margin-top: 40rpx;
			padding: 0 15%;
		
		}
	}
</style>