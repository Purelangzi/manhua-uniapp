export interface WxLoginType {
	avatar : string,
	username : string,
	code : string
}
export interface EeditCount {
	id : string,
	username ?: string,
	password ?: string,
	email ?: string,
	phone ?: string,
	avatar ?: string
}
export interface UserLogin {
	account : string,
	password : string
}
export interface UserReg {
	account : string,
	password : string,
	username : string
}