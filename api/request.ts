type Data = string | object | ArrayBuffer
interface ReqParams {
	url : string,
	method : 'GET' | 'POST' | 'DELETE' | 'PUT',
	data ?: Data,
}
interface ShowToast {
	title ?: string,
	icon ?: 'error' | 'success' | 'loading' | 'none',
	duration ?: number,
	msg ?: string,
}

const baseUrl = 'http://127.0.0.1:7001'
const request = (options : ReqParams):Promise<any> => {
	uni.showLoading({
		title: '加载中'
	})
	let header = {}
	switch (options.method) {
		case 'GET':
			header = {
				'content-type': 'application/json'
			}
			break;
		case 'POST':
			header = {
				'content-type': 'application/x-www-form-urlencoded'
			}
			break;
	}
	
	const userJson = uni.getStorageSync('USER')
	if(userJson){
		const {token} = JSON.parse(userJson)
		header['token'] = 'Bearer' + token
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url,
			method: options.method,
			data: options.data,
			header,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					switch (res.statusCode) {
						case 400:
							showToast({title:'错误的请求'})
							reject(res)
							break;
						case 401:
							showToast({title:'Token 过期'})
							reject(res)
							break;
						default:
							showToast({msg:(res.data as any).msg})
							reject(res)
							break;
					}
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}
const showToast = ({ title, icon = 'error', duration, msg } : ShowToast) => {
	uni.showToast({
		title: title || msg || 'error',
		icon,
		duration
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