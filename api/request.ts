import showMsg from '@/utils/showMsg'
type Data = string | object | ArrayBuffer
interface ReqParams {
	url : string,
	method : 'GET' | 'POST' | 'DELETE' | 'PUT',
	data ?: Data,
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
			success: res => {
				uni.hideLoading()
				switch (res.statusCode) {
					case 200:
						resolve(res.data)
						break;
					case 400:
						showMsg({title:'错误的请求',icon:'error'})
						reject(res.data)
						break;
					case 401:
						showMsg({title:'Token 过期',icon:'error'})
						reject(res.data)
						break;
					default:
						showMsg({title:(res.data as any).msg,icon:'error'})
						reject(res.data)
						break;
				}
			},
			fail: (err) => {
				uni.hideLoading()
				reject(err)
			},
			complete: () => {
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