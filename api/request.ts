import showMsg from '@/utils/showMsg'
import { useUser } from '@/stores/user'
type Data = string | object | ArrayBuffer
interface ReqParams {
	url : string,
	method : 'GET' | 'POST' | 'DELETE' | 'PUT',
	data ?: Data,
}


const baseUrl = 'http://127.0.0.1:7001'
const userStore = useUser()
const request = (options : ReqParams) : Promise<any> => {
	// 拦截器
	uni.addInterceptor('request', {
		invoke: (args) => {
			uni.showLoading({
				title: '加载中'
			})
			switch (options.method) {
				case 'GET':
					args.header = {
						'content-type': 'application/json'
					}
					break;
				case 'POST':
					args.header = {
						'content-type': 'application/x-www-form-urlencoded'
					}
					break;
			}
			const token = userStore.userInfo.token
			if (token) {
				args.header['token'] = 'Bearer' + token
			}
		},
		complete: () => {
			uni.hideLoading()
		}
	})

	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method,
			data: options.data,
			success: res => {
				switch (res.statusCode) {
					case 200:
						resolve(res.data)
						break;
					case 400:
						showMsg({ title: '错误的请求', icon: 'error' })
						reject(res.data)
						break;
					case 401:
						showMsg({ title: 'Token 过期或未登录', icon: 'error', duration: 3000 })
						userStore.logOut()
						reject(res.data)
						break;
					default:
						showMsg({ title: (res.data as any).msg, icon: 'error' })
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default {
	get(url : string, data ?: Data) {
		return request({ url, method: "GET", data })
	},
	post(url : string, data ?: Data) {
		return request({ url, method: "POST", data })
	},
	delete(url : string, data ?: Data) {
		return request({ url, method: "DELETE", data })
	},
	put(url : string, data ?: Data) {
		return request({ url, method: "PUT", data })
	},
}