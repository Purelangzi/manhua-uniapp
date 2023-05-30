import showMsg from '@/utils/showMsg'
import { useUser } from '@/stores/user'

import {refreshWxLogin} from '@/utils/wxLogin'
type Data = string | object | ArrayBuffer
interface ReqParams {
	url : string,
	method : 'GET' | 'POST' | 'DELETE' | 'PUT',
	data ?: Data,
}

let isRefreshing = false // 是否正在刷新的标记
let requests = []//重试队列
const baseUrl = 'http://127.0.0.1:7001'
const userStore = useUser()
const request = async(options : ReqParams) : Promise<any> => {
	// 拦截器
	uni.addInterceptor('request', {
		invoke: (args) => {
			// uni.showLoading({
			// 	title: '加载中'
			// })
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
			const token = userStore.token
			if (token) {
				args.header['token'] = 'Bearer ' + token
			}
		},
		complete: () => {
			// uni.hideLoading()
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
					case 201 :
						resolve(res.data)
						break;
					case 400:
						showMsg({ title: '错误的请求', icon: 'error' })
						reject(res.data)
						break;
						
					case 401:
						// #ifndef MP-WEIXIN
						showMsg({ title: '登录过期', icon: 'error', duration: 3000 })
						userStore.logOut()
						reject(res.data)
						// #endif
						// #ifdef MP-WEIXIN
						if(!userStore.userInfo.session_key){
							showMsg({ title: '登录过期', icon: 'error', duration: 3000 })
							userStore.logOut()
							reject(res.data)
						}else{
							if (!isRefreshing) { // 一次进入一个刷新token
								console.log('微信刷新token');
								isRefreshing = true 
								refreshWxLogin().then(()=>{
									// 重新执行当前请求
									resolve(request(options))
									// token 刷新后将数组的方法重新执行
									if(!requests.length){
										requests.map((cb) => cb())
										requests = []  // 清空请求队列
									}
								}).finally(()=>{
									isRefreshing = false
								})
								
							}else{
								// 有后续请求就将存入
								// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
								return requests.push(() => {
									resolve(request(options))
								})
								// 下面方法包多了一层Promise也可以
								// resolve(new Promise((res)=>{
								// 	requests.push(() => {
								// 		res(request(options))
								// 	})
								// }))
								
							}
						}
						// #endif
						break;
					default:
						showMsg({ title: (res.data as any).msg,duration:2000 })
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
	// .catch(e=>{
	// 	console.log(e);
	// })
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