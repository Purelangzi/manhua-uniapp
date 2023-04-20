/* interface ShowToast {
	title ?: string,
	icon ?: 'error' | 'success' | 'loading' | 'none',
	duration ?: number,
	msg ?: string,
}
const showToast = ({ title, icon = 'error', duration = 1500, msg } : ShowToast) => {
	uni.showToast({
		title: title || msg || 'error',
		icon,
		duration
	})
}
export default showToast */