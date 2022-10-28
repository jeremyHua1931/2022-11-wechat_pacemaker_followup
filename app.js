// app.js
App({
  globalData: {
    appid: 'wx80f70e7ef0391e41',
    appsecret: 'b6de35cfd04a337c5c7fb1570130344f',
    url: "http://10.131.242.79:8005",
    userInfo: {},
    openid: '0',
    userid: '0',
    hasUserInfo: false,
    followlist: [],
    followDetailOne: [],
  },

  // 启动app
  onLaunch() {

    // 读取本地用户id, 判断是否登陆
    var that = this;
    wx.getStorage({
      key: 'openid',
      success(res) {
        console.log("用户已登陆")
        console.log("微信用户唯一辨识id：" + res.data)
        that.globalData.openId = res.data;
        wx.switchTab({
          url: '/pages/home/home',
        })
      },
      fail: function (err) {
        console.log("用户未登陆, 跳转user页面登陆")
        wx.switchTab({
          url: '/pages/user/user',
        })
        wx.showToast({
          title: '请先登录',
          icon: 'error'
        })
      }
    });

    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log("用户userInfo昵称: "+ res.data.nickName)
        that.globalData.userInfo = res.data;
        that.globalData.hasUserInfo = true
      }
    });
  },

})
