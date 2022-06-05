import { instance } from "./index"
export type MyLanguage = "中文" | "英文"
export type MyDocType = "文档" | "链接" | "翻译"
export type MyLinkType = "书" | "文章" | "论文" | "代码" | "标准"
export interface MyDoc {
    id: number,
    cnName: string,
    enName: string,
    docType: MyDocType,
    linkType: MyLinkType,
    description: string,
    author: string,
    link: string,
    pageNo: number,
    language: MyLanguage,
    content: string,
}
export function queryList(pageSize: number, pageNum: number, options?: Partial<MyDoc>) {
    return instance({
        url: `/doc`,
        method: "get",
        params: {
            pageSize: pageSize,
            pageNum: pageNum,
            ...options
        }
    })
}
export function findById(id: number) {
    return instance({
        url: `/doc/${id}`,
        method: "get",
    })
}
export function update(id: number, newValue: MyDoc) {
    return instance({
        url: `/doc/${id}`,
        method: "put",
        data: newValue
    })
}
export function create(newValue: MyDoc) {
    return instance({
        url: `/doc`,
        method: "post",
        data: newValue
    })
}
export function deleteOp(id: number) {
    return instance({
        url: `/doc/${id}`,
        method: "delete",
    })
}