import request from '@/utils/request'   //request方法用于发送请求
const baseURL = 'http://localhost:3000' //后端服务器地址

export function fetchBlog(params) {
    return request({
        url: `${baseURL}/blog/blog`,
        method: 'get',
        params: {
            ...params
        }
    })
}

export function delBlog(params) {
    return request({
        url: `${baseURL}/blog/del`,
        method: 'post',
        data: {
            ...params
        }
    })
}