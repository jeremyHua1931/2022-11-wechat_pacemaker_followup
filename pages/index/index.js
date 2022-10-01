Page({
    data: {
      PageCur: 'home'
    },
    NavChange(e) {
      this.setData({
        PageCur: e.currentTarget.dataset.cur
      })
    },
    onShareAppMessage() {
      return {
        title: '起搏器随访系统',
        imageUrl: '/images/logo.png',
        path: '/pages/index/index'
      }
    },
  })