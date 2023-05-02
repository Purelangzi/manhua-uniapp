import request from "../request"
import {CartoonList} from '../types/cartoon-type'

export default {
	
	getCartoonList: (data : CartoonList) => request.get('/api/product/getCartoonList', data),
	queryCartoon: (works:string) => request.get(`/api/product/queryCartoon?works=${works}`),
	
}