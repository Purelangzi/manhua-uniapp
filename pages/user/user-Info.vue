<template>
	<view class="user-center">
		<u-cell-group>
			<u-cell-item title="头像">
				<template #right-icon>
					<u-avatar :src="userInfo.avatar" mode="square" @click="handleOnAvatar"></u-avatar>
				</template>
			</u-cell-item>
			<u-cell-item v-for="col in state.column" :key="col.value"
			:title="col.title" 
			:value="userInfo[col.value] || '未设置'" 
			@click="openUpdatePopup(col.title,userInfo[col.value],col.type as string)">

			</u-cell-item>
			
			<!-- <u-cell-item title="昵称" :value="userInfo.username?userInfo.username:'未设置'" @click="openUpdatePopup('昵称',userInfo.username)"></u-cell-item>
			<u-cell-item title="手机号" :value="userInfo.phone?userInfo.phone:'未设置'" @click="openUpdatePopup('手机号',userInfo.phone)"></u-cell-item>
			<u-cell-item title="密码" :value="userInfo.password?userInfo.password:'未设置'" @click="openUpdatePopup('密码',userInfo.password,'password')"></u-cell-item>
			<u-cell-item title="邮箱" :value="userInfo.email?userInfo.email:'未设置'" @click="openUpdatePopup('邮箱',userInfo.email)" ></u-cell-item> -->
		</u-cell-group>
		<view class="logOut" v-if="userInfo.username" border-radius="20">
			<u-button :custom-style="customStyleExit" :ripple="true" @click="handleLogOut">退出登录</u-button>
		</view>
		<u-popup v-model="state.show" mode="bottom" class="update-popup" height="40%" :closeable="true" @close="closePopup">
			<view class="update-title">{{state.title}}</view>
			<view class="update-form">
				<u-input v-model="updateParams" :type="iType" :border="border" :placeholder="place" />
			</view>
			<view class="update-btn">
				<u-button shape="circle" @click="cancelUpdate">取消</u-button>
				<u-button shape="circle" type="error">确认</u-button>
			</view>
		</u-popup>
	</view>



</template>

<script lang="ts" setup>
	import { onMounted, reactive, ref ,toRefs,computed} from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import {editAccount} from '@/api/index'
	import { useUser } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import showMsg from '@/utils/showMsg'
	import {wxLogin} from '@/utils/wxLogin'
	const UPLOAD_URL = 'http://127.0.0.1:7001/api/ali/uploadFile';
	const userStore = useUser()
	const state = reactive({
		inputModel:{
			updateParams:'',
			iType:'text',
			border:true,
			place:'请输入'
		},
		show:false,
		title:'修改',
		column:[
			{title:'昵称',value:'username'},
			{title:'手机号',value:'phone'},
			{title:'密码',value:'password',type:'password'},
			{title:'邮箱',value:'email'},
		]
	})
	const {updateParams,iType,border,place} =  toRefs(state.inputModel)
	
	const customStyleExit = { backgroundColor: '#ffa73c', color: '#fff' }
	onLoad(() => {
		
	})
	onShow(() => {
	})
	onMounted(() => {

	})

	const handleLogOut = () => {
		userStore.logOut()
		showMsg({title:'退出成功'})
		
	}
	const userInfo = computed(()=>{
		return userStore.userInfo
	})
	const openUpdatePopup = (title:string,params:string,type?:string) =>{
		state.title += title
		place.value += title
		updateParams.value = params
		if(type){
			iType.value = type
		}
		state.show = true
	}
	const cancelUpdate = () =>{
		state.show = false
	}
	const closePopup = () =>{
		console.log('closePopup');
		// state.title =
	}
	// 点击头像上传图片
	const handleOnAvatar = async () => {
		try{
			const filePath = await chooseImage(1) as string
			const {url} = await uploadImage(filePath)
			console.log(url);
			userStore.$patch((state:any)=>{
				state.userInfo.avatar = url
			})
			const {msg} = await editAccount({id: userStore.userInfo.id, avatar:url})
			showMsg({title:msg,icon:'success'})
		}catch(e){
			console.log(e);
		}
		
	}
	// 选择照片
	const chooseImage = async (count : number) => {
		return new Promise((resolve) => {
			uni.chooseImage({
				count,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					const file:{path:string,size:number} = res.tempFiles[0]
					if (!validateImage(file)) {
					  return;
					}
					// #ifdef MP-WEIXIN
					resolve(file.path);
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
		return new Promise((resolve) => {
			uni.uploadFile({
				url: UPLOAD_URL,
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
	// 检查图片
	const validateImage = (file) =>{
	  // #ifndef MP-WEIXIN
	  const typeArr = ['image/png', 'image/jpg', 'image/jpeg'];
	  if (!typeArr.includes(file.type)) {
	    showMsg({ title: '上传图片只能是 png、jpg、jpeg 格式', duration: 3000 });
	    return false;
	  }
	  // #endif
	  
	  // #ifdef MP-WEIXIN
	  const path = file.path
	  const wxTypeArr = ['.jpg','jpeg','.png']
	  const type = path.substring(path.length - 4)
	  if(!wxTypeArr.includes(type)) {
	  	showMsg({ title: '上传图片只能是 png、jpg、jpeg 格式!!', duration: 3000 })
	  	return false
	  }
	  // #endif
	  
	  // 检查图片大小
	  if (file.size / 1024 > 1024 * 2) {
	    showMsg({ title: '图片不能大于2M,请重新上传', duration: 3000 });
	    return false;
	  }
	
	  return true;
	}

</script>

<style lang="scss">
	.user-center {
		.logOut {
			margin-top: 80rpx;
			padding: 0 15%;
		
		}
		.update-popup{
			// position: relative;
			.update-title{
				font-weight: bold;
				text-align: center;
			}
			.update-btn{
				display: flex;
				justify-content: space-around;
			}
		}
	}
</style>