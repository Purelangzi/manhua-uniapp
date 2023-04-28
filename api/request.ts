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
const request = (options : ReqParams) : Promise<any> => {
	// 拦截器
	uni.addInterceptor('request', {
		invoke: (args) => {
			console.log(args)
			uni.showLoading({
				title: '加载中'
			})
			// #ifdef MP-WEIXIN
			//当前时间(毫秒)
			if(userStore.token && userStore.userInfo.session_key){
				const nowTime = parseInt(new Date().getTime() as any);
				// 登录后与当前时间的时间差（分）秒
				const expireTime = parseInt((nowTime - userStore.tokenTime)/1000 as any)
				// 过期前一小时就刷新token 20秒
				console.log(expireTime,'expireTime');
				if(expireTime>20){
					if (!isRefreshing) { // 一次进入一个刷新token
						console.log('微信刷新token');
						isRefreshing = true 
						refreshWxLogin()
						console.log(requests);
						// token 刷新后将数组的方法重新执行
						requests.forEach((cb) => cb())
						isRefreshing = false
						requests = []  // 清空请求队列
					}
				}
			}
			
			// #endif
			
			
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
						// #ifndef MP-WEIXIN
						console.log('h5')
						showMsg({ title: '登录过期（token过期）', icon: 'error', duration: 3000 })
						userStore.logOut()
						reject(res.data)
						// #endif
						// #ifdef MP-WEIXIN
						if(!userStore.userInfo.session_key){
							showMsg({ title: '登录过期（token过期）', icon: 'error', duration: 3000 })
							userStore.logOut()
							reject(res.data)
						}else{
							// 让这个Promise一直处于Pending状态（即不调用resolve）
							resolve(new Promise(reslove => {
								// 用函数形式将 resolve 存入，等待刷新后再执行
								requests.push(() => {
									console.log('p');
									reslove(request(options))
								})
							}))
							console.log('401wx')
							if (!isRefreshing) { // 一次进入一个刷新token
								console.log('微信刷新token');
								isRefreshing = true 
								refreshWxLogin()
								console.log(requests);
								// token 刷新后将数组的方法重新执行
								requests.map((cb) => cb())
								isRefreshing = false
								requests = []  // 清空请求队列
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
	}).catch(e=>{
		console.log(e);
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