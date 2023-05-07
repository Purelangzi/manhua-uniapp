import request from "../request"
import { CartoonList, ChapterList, AddChapterRead } from '../types/cartoon-type'

export default {

	getCartoonList: (data : CartoonList) => request.get('/api/product/getCartoonList', data), // 漫画列表
	queryCartoon: (works : string) => request.get(`/api/product/queryCartoon?works=${works}`), // 搜索
	getCartoonDetail: (id : string | number) => request.get(`/api/product/getCartoonDetail?id=${id}`), //漫画详情
	getChapterList: (data : ChapterList) => request.get('/api/cartoon/getChapterList', data), // 漫画章节列表

	getChapterPage: (chapter_id : string | number) => request.get(`/api/cartoon/getChapterPage?chapter_id=${chapter_id}`), // 漫画章节内容
	addChapterRead: (data : AddChapterRead) => request.post('/api/chapter/read/add/', data), // 添加章节阅读记录
	getHistoricalRecord: (data : { uid : string | number, comic_id ?: string | number }) => request.get('/api/cartoon/historicalRecord', data), // 获取阅读记录
	getCtcategory: (data : object) => request.get('/api/product/getCtcategory', data), // 漫画分类
}