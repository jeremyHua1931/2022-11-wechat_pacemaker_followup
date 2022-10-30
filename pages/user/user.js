const app = getApp()
Component({
    options: {
        addGlobalClass: true,
    },
    data: {
        userState: "已绑定档案",
        hasUserInfo: false,
        userInfo: [],
        userID: "",
        starCount: 3,
        forksCount: 23,
        visitTotal: 4000,
        doctorInfo: "负责医师: 王明 \r\n 所在医院: 武汉大学中南医院"
    },

    methods: {
       onLoad(options) {
           var state;
           var that =this;
       state = wx.getStorageSync('disableNavi')
         console.log(state)
         if(state=="noRecord"){
           this.showModal()
           that.setData({
             userState:"未绑定档案"
           })
         }
         if(state=="unlogin"){
          that.setData({
             userState:"未登录"
           })
          wx.showToast({
                    title: '请先登录',
                    icon: 'error'
                })
         }
       },
      showModal() {
    this.setData({
      modalName: "Modal"
    })
  },
  hideModal() {
    this.setData({
      modalName: null
    })
  },
        doAuthorization: function (e) {
            console.log("开始注册: ")
            var ifYes = true
            var that = this
            wx.getUserProfile({
                desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    console.log("微信用户userInfo获取成功, 如下: ")
                    console.log("用户userInfo昵称: " + res.userInfo.nickName);
                    console.log(res.userInfo)
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
                    console.log('login:code: ' + res.code)
                    var APPID = app.globalData.appid;
                    var SECRET = app.globalData.appsecret;
                    wx.request({
                        url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${res.code}&grant_type=authorization_code`,
                        success: (res) => {
                            console.log("获取用户唯一辨识openid获取成功")
                            console.log("openid: " + res.data.openid)
                            //获取到你的openid
                            that.setData({
                                userID: res.data.openid
                            });
                            wx.setStorageSync('openid', res.data.openid);
                            app.globalData.openid = res.data.openid
                            that.register();
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

        register: function () {
            var that = this
            console.log("开始注册用户")
            wx.request({
                url: app.globalData.url + "/user/add",
                data: {
                    name: app.globalData.userInfo.nickName,
                    phone: "18627026188",
                    wechatId: app.globalData.openid,
                    image: app.globalData.userInfo.avatarUrl,
                    type: 0,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log("1-注册成功, uerid: " + res.data.id)
                    wx.setStorageSync('userid', res.data.id);
                    app.globalData.userid = res.data.id;
                    // 查询是否有绑定信息
                    that.getmrld(res.data.id);
                     wx.setStorageSync('disableNavi', "noRecord");
                },
                fail: function (error) {

                }
            })
        },

        //查询档案id
        // apifox  查询档案信息
        getmrld: function (userid) {
          var that =this
            console.log("2-未登录(或未注册)用户查询绑定的档案信息")
            wx.request({
                url: app.globalData.url + '/user/medicalRecord',
                data: {
                    userId: userid
          
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                  if(res.data.code==8){
                    
                    wx.setStorageSync('disableNavi',"noRecord");
                     that.setData({
             userState:"未绑定档案"
           })
                    that.showModal()
                    
                  }else{
                    console.log("档案信息: " + res.data.id)
                    console.log(res.data)
                    wx.setStorageSync('disableNavi', false);
                    that.setData({
             userState:"已绑定档案"
           })
                  }

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
       
    }
})