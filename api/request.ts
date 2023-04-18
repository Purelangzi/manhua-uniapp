const baseUrl = 'http://127.0.0.1:7001'

type Data = string | object | ArrayBuffer
interface ReqParams {
	url : string,
	method : 'GET' | 'POST' | 'DELETE' | 'PUT',
	data ?: Data,
}

const request = (options : ReqParams) => {
	uni.showLoading({
		title: '数据加载中'
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
							uni.showToast({
								title: '错误的请求',
								icon: "error"
							})
							reject(res)
							break;
						case 401:
							uni.showToast({
								title: 'Token 过期',
								icon: "error",
								duration: 1000
							})
							reject(res)
							break;
						default:
							uni.showToast({
								title: `${(res.data as any).msg}` || '错误',
								icon: "error",
								duration: 3000
							})
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