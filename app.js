// app.js
App({

    // mrId 为档案id
    globalData: {
        appid: 'wx9051608e4967c711',
        appsecret: '4d1582c0522ac6851d7f05fea03d9a47',
        url: "http://10.131.146.230:8005",
        userInfo: {},
        openid: '0',
        userid: '0',
        mrinfo: [],
        hasUserInfo: false,
        followList: [],
        followDetailOne: [],
    },

    // 启动app
    onLaunch() {
        console.log("启动小程序，开始登录/档案绑定检查位设置")
        // 读取本地用户id, 判断是否登陆
        var that = this;
        wx.getStorage({
            key: 'openid',
            success(res) {
                console.log(res)
                console.log("用户已登陆")
                console.log("   1-微信用户唯一辨识id：" + res.data)
                that.globalData.openId = res.data;
                wx.getStorage({
                    key: 'userInfo',
                    success(res) {
                        console.log("   2-用户userInfo昵称: " + res.data.nickName)
                        that.globalData.userInfo = res.data;
                        that.globalData.hasUserInfo = true
                        wx.getStorage({
                            key: 'userid',
                            success(res) {
                                console.log("   3-用户userid昵称: " + res.data)
                                that.globalData.userid = res.data
                                // 此时用户已经登录
                                // 查询一下档案id, 并存到全局变量
                                that.getmrld()
                            }
                        });
                    }
                });
            },
            fail: function (err) {
                //用户未注册或者未登陆, 跳转user页面
                console.log("   1-用户未登陆, 跳转user页面登陆")
                wx.setStorageSync('disableNavi', "unlogin");
                wx.switchTab({
                    url: '/pages/user/user',
                })
                wx.showToast({
                    title: '请先登录',
                    icon: 'error'
                })
            }
        });
    },
    //查询档案id
    // apifox  查询档案信息
    getmrld: function () {
        var that = this
        console.log("   4-已登录用户查询绑定的档案信息")
        wx.request({
            url: that.globalData.url + '/user/medicalRecord',
            data: {
                userId:  that.globalData.userid
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("       已登录用户查询档案信息id: " + res.data.id)
                that.globalData.mrinfo = res.data
                console.log(that.globalData.mrinfo)
                console.log("！！已登录用户个人信息与档案信息查询结束")
                console.log("！！！信息验证完毕")
                wx.switchTab({
                  url: '/pages/home/home',
                })
            },
            fail: function (error) {}
        })
    }






})