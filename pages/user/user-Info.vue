<template>
	<view class="user-center">
		<u-cell-group>
			<u-cell-item title="头像">
				<template #right-icon>
					<u-avatar :src="userInfo.avatar" mode="square" @click="handleOnAvatar"></u-avatar>
				</template>
			</u-cell-item>
			<u-cell-item title="昵称" :value="userInfo.username"></u-cell-item>
			<u-cell-item title="手机号" :value="userInfo.phone"></u-cell-item>
			<u-cell-item title="邮箱" :value="userInfo.email?userInfo.email:'未设置'"></u-cell-item>
		</u-cell-group>


	</view>



</template>

<script lang="ts" setup>
	import { computed, onMounted, reactive, ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	import { useUser } from '@/stores/user'
	import { storeToRefs } from 'pinia'
	import showMsg from '@/utils/showMsg'
	const userStore = useUser()
	const { userInfo } = storeToRefs(userStore)
	const state = reactive({

	})
	onLoad(() => {

	})
	onShow(() => {

	})
	onMounted(() => {

	})
	// 点击头像上传图片
	const handleOnAvatar = async () => {
		const filePath = await chooseImage(1) as string
		const res = await uploadImage(filePath)

		console.log(res);
	}
	// 选择照片
	const chooseImage = async (count : number) => {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (res.tempFiles[0].size / 1024 > 1024 * 2) {
						uni.showToast({
							title: '图片不能大于2M,请重新上传'
						})
						showMsg({ title: '图片不能大于2M,请重新上传', duration: 3000 })
						return
					}
					resolve(res.tempFilePaths[0]);
				}
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
					if (uploadFileRes.statusCode == 200) {
						showMsg({ title: res.data.msg })
						resolve(res.data)
					} else {
						console.log(res);
						showMsg({ title: res.msg || 'error'})
					}
				}
			});
		}).catch(e => {
			console.log(e);
		});
	}
</script>

<style lang="scss">
	.user-center {}
</style>