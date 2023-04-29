import request from "./request"
interface WxLoginType{
	avatar:string,
	username:string,
	code:string
}
export const userLogin = (data:object) => request.post('/user/login',data)
export const userRegister = (data:object) => request.post('/user/reg',data)
export const userWxLogin = (data:WxLoginType) => request.post('/user/wxLogin',data)
export const editAccount = (data:object) => request.post('/api/system/editAccount',data)

export const getHomeData = ()=> request.get('/api/home/getHomeData')
export const getT = ()=>request.get('/api/product/getCtcategory')

