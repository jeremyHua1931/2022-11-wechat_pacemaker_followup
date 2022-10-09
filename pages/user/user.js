const app = getApp()
var openid = wx.getStorageSync("openID");
Component({
    options: {
      addGlobalClass: true,
    },
    data: {
      hasUserInfo:false,
      userInfo: [],
      userID: "",
      starCount: 3,
      forksCount: 23,
      visitTotal: 4000,
      doctorInfo: "负责医师: 王明 \r\n 所在医院: 武汉大学中南医院"
    },
    attached() {
      console.log("success")
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      let i = 0;
      wx.hideLoading()
    },
    methods: {
      doAuthorization: function (e) {
    var ifYes = true
    var that = this
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("设置userInfo 为: " + res.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        console.log("存储userInfo 为: " + res.userInfo, );
        console.log(res.userInfo);
        app.globalData.userInfo = res.userInfo
        wx.setStorageSync('userInfo', res.userInfo,);
        that.login();
      },
      fail: function (err) {
        console.log("record  失败", err);
        loadFailed("获取用户信息失败");
      }
    })
  },


    login:function(){
        var that = this;
        console.log("调用了 doAuthorization 授权");
        // console.log(e);
        //授权
        wx.login({
          success: function (res) {
            console.log('login:code', res.code)
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxcf9a5cc5ed4abadb&secret=bbf59871d44cc7a980fcb9f6d382d6a0&js_code=${res.code}&grant_type=authorization_code`,
              success: (res) => {
                //console.log(res);
                //获取到你的openid
                that.setData({
                  userID: res.data.openid
                });
                // console.log("存储openid 为: " + res.data.openid);
                // wx.setStorageSync('openid', res.data.openid);
                // console.log("设置openid 为: " + res.data.openid);
                // app.globalData.userID = res.data.openid;
                // console.log("userId 为: " + res.data.openid);
  
              },
              fail:(res)=>{
                 console.log("失败，清空用户信息")
           wx.showToast({
          title: '失败，检查网络',
          icon:"error"
        })
        app.globalData.userInfo=[]
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

  
  


  // 事件处理函数
  onShow: function () {
    var that = this;
    if (app.globalData.userInfo.avatarUrl != null) {
      console.log("已获取到本地信息，隐藏登录按钮");
      this.setData({
        hasUserInfo: true,
        userInfo:app.globalData.userInfo
      });
    }
    //that.loadUserInfo();
  },
        ShowUserDoctorInfo() {
        wx.showModal({
            title: '医师信息',
            content: this.data.doctorInfo,
            success (res) {
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
            success (res) {
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