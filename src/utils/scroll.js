const scroll = {
    isEnd: false,
    start(callback) {
        // console.log('start')
        let timer = null
        callback && window.addEventListener('scroll', () => {
            if (timer) {
                clearTimeout(timer)
            }
            // 函数防抖
            timer = setTimeout(() => {
                
                // 浏览器向上滚动的高度
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                // 文档的真实高度
                const scrollHeight = document.documentElement.scrollHeight
                // 浏览器窗口（文档）的可视高度,就是肉眼可见的那部分全屏高度
                const clientHeight = document.documentElement.clientHeight

                // console.log(Math.ceil(scrollTop))
                // console.log(scrollTop)
                // console.log('scrollHeight:'+scrollHeight)
                // console.log('clientHeight:'+clientHeight)

                if (!this.isEnd && scrollHeight == Math.ceil(scrollTop) + clientHeight) {
                    window.scrollTo(0, scrollTop - 100)
                    // console.log('到底了')
                    // 请求数据
                    callback()
                }
            }, 300)
        })
    },
    end() {
        this.isEnd = true
    }
}

export default scroll
