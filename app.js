// app.js
App({
  globalData:{
    userInfo: {},
    openID:'0',
    userID:'0',
    hasUserInfo:false
  },
  onLaunch() {
    var that = this;
      wx.getStorage({
        key: 'openid',
        success(res) {
          console.log("成功读取本地id：" + res.data)
          that.globalData.openId = res.data;
        }
      });

      wx.getStorage({
        key: 'userInfo',
        success(res) {
          console.log("成功读取本地userInfo：" + res.data)
          console.log(res.data.nickName)
          that.globalData.userInfo = res.data;
          that.globalData.hasUserInfo = true
        }
      });

    if(that.globalData.userInfo.avatarUrl==null){
      wx.switchTab({
        url: '/pages/user/user',
      })
      wx.showToast({
        title: '请先登录',
        icon:'error'
      })
      
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

})
