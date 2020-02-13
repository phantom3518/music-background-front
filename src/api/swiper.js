import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

//获取轮播图
export function fetchSwiperList() {
    return request({
        url: `${baseURL}/swiper/list`,
        method: 'get'
    })
}
//删除轮播图
export function deleteSwiper(params) {
    return request({
        params,
        url: `${baseURL}/swiper/del`,
        method: 'get'
    })
}
