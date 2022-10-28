const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    hasUserInfo: false,
    userInfo: [],
    userID: "",
    starCount: 3,
    forksCount: 23,
    visitTotal: 4000,
    doctorInfo: "负责医师: 王明 \r\n 所在医院: 武汉大学中南医院"
  },

  methods: {
    doAuthorization: function (e) {
      console.log("开始注册: ")
      var ifYes = true
      var that = this
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log("微信用户userInfo获取成功, 如下: ")
          console.log("用户userInfo昵称: "+ res.userInfo.nickName);
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          // 存储userInfo并赋值全局数据: 
          app.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo', res.userInfo);
          that.login();
        },
        fail: function (err) {
          console.log("record  失败", err);
          loadFailed("获取用户信息失败");
        }
      })
    },


    login: function () {
      var that = this;
      //授权
      wx.login({
        success: function (res) {
          console.log('login:code: '+ res.code)
          var APPID=app.globalData.appid;
          var SECRET=app.globalData.appsecret;
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${res.code}&grant_type=authorization_code`,
              success: (res) => {
                console.log("获取用户唯一辨识openid获取成功")
              console.log("openid: "+res.data.openid)
              //获取到你的openid
              that.setData({
                userID: res.data.openid
              });

              app.globalData.openid= res.data.openid
              wx.setStorageSync('openid', res.data.openid);

              // that.register()
              that.getFollowList()

            },
            fail: (res) => {
              console.log("失败，清空用户信息")
              wx.showToast({
                title: '失败，检查网络',
                icon: "error"
              })
              app.globalData.userInfo = []
              wx.setStorageSync('userInfo', "");
              that.setData({
                userInfo: [],
                hasUserInfo: false,
                userID: ""
              })
            }
          })

        }
      })
    },

    // register: function(){
    //   var that=this
    //   console.log("开始注册用户")
    //   wx.request({
    //     url: that.globalData.url + "/user/login",
    //     data: {
    //       wechatId: userID
    //     },
    //     method: 'POST',
    //     header: {
    //       'content-type': 'application/json'
    //     },
    //     success: function (res) {
         
    //     },
    //     fail: function (error) {
         
    //     }
    //   })
    // },

    getFollowList:function(){
      console.log("开始请求随访记录列表")
      var that=this
      wx.request({
        url:  app.globalData.url + '/followRecord/followlist',
        data: {
          mrId: 54
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
         console.log(res)
        },
        fail: function (error) {
         
        }
      })

    },

    // 事件处理函数
    onShow: function () {
      var that = this;
      if (app.globalData.userInfo.avatarUrl != null) {
        console.log("已获取到本地用户存储信息，无需登陆");
        this.setData({
          hasUserInfo: true,
          userInfo: app.globalData.userInfo
        });
      }
      //that.loadUserInfo();
    },
    ShowUserDoctorInfo() {
      wx.showModal({
        title: '医师信息',
        content: this.data.doctorInfo,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    ShowSystemInfo() {
      wx.showModal({
        title: '系统信息',
        content: 'Version 1.0',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
  }
})