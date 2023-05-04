/**
 * 格式日期
 * @param date 日期字符串2022-10-26T17:23:35.000Z
 * @returns 2022.10.26
 */
export const formatDate = (date:string) =>{
    return date?.split('T')[0].replaceAll('-','.')
}
