import request from "../request"
import {WxLoginType,EeditCount,UserLogin,UserReg} from './data-type'

export default {
	userLogin: (data : UserLogin) => request.post('/user/login', data),
	userRegister: (data : UserReg) => request.post('/user/reg', data),
	userWxLogin: (data : WxLoginType) => request.post('/user/wxLogin', data),
	editAccount: (data : EeditCount) => request.post('/api/system/editAccount', data),
	getHomeData: () => request.get('/api/home/getHomeData')
}