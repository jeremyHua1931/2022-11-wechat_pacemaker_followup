// pages/home/home.js
const app = getApp();
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {

        dataList: [ {
            "date": "2022-10-28",
            "pacemakerPattern": "1",
            "image": null,
            "note": null,
            "maxFrequency": 1.0,
            "frCount": 28,
            "suggest": null,
            "type": 0,
            "minFrequency": 1.0,
            "doctor": 53,
            "doctorName": "吕敏",
            "mrId": 54,
            "performance": "1",
            "batteryState": 0,
            "id": 86,
            "batteryLife": 1
        }],

    },

      

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
       
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        // this.sleep(5000);
        console.log("主页数据加载")
        var that = this
        var data = []
        
            // wx.request({
            //     url: app.globalData.url + '/followRecord/followlist',
            //     data: {
            //         mrId: 54
            //     },
            //     method: 'POST',
            //     header: {
            //         'content-type': 'application/json'
            //     },
            //     success: function (res) {
            //         console.log("主页请求数据开始")
            //         console.log(res.data.data)
            //         console.log("主页请求数据结束")
            //         data = that.transDateList(res.data.data)
            //         that.setData({
            //         dataList: data
            //     })
 
            //     },
            //     fail: function (error) {

            //     }
            // })



    },
    
    //跳转到详情页
    //Todo：传参
    jumpToDetail(e) {
           console.log("准备跳转到id"+e.currentTarget.dataset.id);
        wx.navigateTo({
     
            url: '/pages/home/detail/detail?data='+e.currentTarget.dataset.id,
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
       var state;
       state = wx.getStorageSync('disableNavi')
       console.log("检查是否需要跳回:"+state)
       if(state=="noRecord"||state=="unlogin"){
   wx.switchTab({
           
          url: '/pages/user/user'
        })
       }
      
      },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        wx.showToast({
            title: '没有更多数据了',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }

    ,

    // 往dataList中添加类似 "time: 22-10-15"的属性
    transDateList:function(data){
        var result=[]

        console.log("开始处理数据")
        // console.log(data)

        for(var x in data){
            // console.log(String(data[x].date).substring(2,10))
            data[x].time1=String(data[x].date).substring(2,10);
            data[x].time2=String(data[x].date).substring(0,10);
        }
        console.log(data)
        return data;

    }
})