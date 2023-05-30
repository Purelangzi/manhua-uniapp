import api from '@/api/index'
import { useUser } from '@/stores/user'
import showMsg from '@/utils/showMsg'
const userStore = useUser()
export const wxLogin = () => {
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
				const { data, msg } = await api.userWxLogin(params)
				console.log('微信一键登录存储token和用户信息');
				userStore.$patch((state : any) => {
					state.userInfo = data.userInfo
					state.token = data.token
				})
				showMsg({ title: msg || '' })
				uni.switchTab({
					url:'/pages/user/user'
				})
			} catch (e) {
			}
		},
		fail: (e) => {
			if(e.errMsg.indexOf('deny')!==-1){
				showMsg({title:'您拒绝了授权，不能正常使用小程序',duration:3000})
			}else if(e.errMsg.indexOf('getUserAvatarInfo')!==-1){
				showMsg({title:'请检查网络',duration:3000})
			}
			
		}
	})
}
// 获取小程序用户登录临时凭证
const getWxCode = () => {

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
// 微信登录过期无感刷新token
export const refreshWxLogin = () => {
	console.log('refreshWxLogin');
	return new Promise((reslove)=>{
		uni.login({
			provider: 'weixin',
			success: async(res) => {
				const params = {
					avatar: userStore.userInfo.avatar,
					username: userStore.userInfo.username,
					code: res.code as string
				}
				const { data } = await api.userWxLogin(params)
				userStore.token = data.token
				console.log('微信登录过期,无感刷新token');
				reslove(true)
			}
		})
	})
		
}
// 微信小程序点击tabbar判断是否登录
export const wxIsLogin = () =>{
	console.log('isLogin........');
	if (!uni.getStorageSync('USER')) {
		showMsg({title:'请登录'})
		uni.reLaunch({
			url: '/pages/user/user-login'
		})
		return true
	}
	return false
}