import request from "./request"
export const userLogin = (data:object) => request.post('/user/login',data)
export const userRegister = (data:object) => request.post('/user/reg',data)