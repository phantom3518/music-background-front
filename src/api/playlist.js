import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

//直接获取歌单列表
export function fetchList(params){
    return request({
        params,
        url: `${baseURL}/playlist/list`,
        method: 'get'
    })
}
//通过id获取歌单信息
export function fetchById(params){
    return request({
        params,
        url: `${baseURL}/playlist/getById`,
        method: 'get'
    })
}
//通过提交的信息更新歌单
export function updatePlaylist(params){
    return request({
        url: `${baseURL}/playlist/updatePlaylist`,
        data: {
            ...params,
        },
        method: 'post'
    })
}
//通过id 删除歌单
export function deletePlaylist(id){
    return request({
        url: `${baseURL}/playlist/deletePlaylist`,
        data: {
            id,
        },
        method: 'post'
    })
}