import request from "../request"
import {CartoonList,ChapterList,AddChapterRead} from '../types/cartoon-type'

export default {
	
	getCartoonList: (data : CartoonList) => request.get('/api/product/getCartoonList', data),
	queryCartoon: (works:string) => request.get(`/api/product/queryCartoon?works=${works}`),
	getCartoonDetail: (id:string | number) => request.get(`/api/product/getCartoonDetail?id=${id}`),
	getChapterList:(data:ChapterList) => request.get('/api/cartoon/getChapterList',data),
	
	getChapterPage: (chapter_id:string | number) => request.get(`/api/cartoon/getChapterPage?chapter_id=${chapter_id}`),
	addChapterRead: (data : AddChapterRead) => request.post('/api/chapter/read/add/', data),
	getHistoricalRecord:(data : {uid:string | number,comic_id?:string|number }) => request.get('/api/cartoon/historicalRecord', data),
}