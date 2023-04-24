import { userWxLogin } from '@/api/index'
import { useUser } from '@/stores/user'
import showMsg from '@/utils/showMsg'
const userStore = useUser()
const wxLogin = () => {
	console.log(1);
	uni.getUserProfile({
		desc: '获取用户个人信息',
		success: async (infoRes) => {
			console.log(2);
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
				showMsg({ title: msg || '' })
			} catch (e) {
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
export default wxLogin