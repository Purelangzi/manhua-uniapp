interface ShowToast {
	title: string,
	icon ?: 'error' | 'success' | 'loading' | 'none',
	duration ?: number,
}
/** 封装 uni.showToast消息提示
 * @title 文字
 * @icon 图标
 * @duration 持续时间 单位毫秒
 * 
 */
const showMsg = ({ title, icon = 'none', duration = 1500}: ShowToast) => {
	uni.showToast({
		title,
		icon,
		duration
	})
}
export default showMsg