// pages/addNew/addNew.js
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        Check: true,
        time: '08:00',
        date: '2022-10-1',
        imgList: [],
        modalName: null,
        textareaAValue: '',
        textareaBValue: ''
    },

    switchCheck() {
        if (this.data.Check == true) {
            this.setData({
                Check: false
            })
            console.log("身体状况异常!")
        } else{
            this.setData({
                Check: true
            })
            console.log("身体状况健康!")
        }

    },

    TimeChange(e) {
        this.setData({
            time: e.detail.value
        })
    },
    DateChange(e) {
        this.setData({
            date: e.detail.value
        })
    },
    ChooseImage() {
        wx.chooseImage({
            count: 3, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },
    ViewImage(e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.url
        });
    },
    DelImg(e) {
        wx.showModal({
            title: '删除图片',
            content: '确定要删除这张图片吗？',
            cancelText: '取消',
            confirmText: '确定',
            success: res => {
                if (res.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },
    textareaAInput(e) {
        this.setData({
            textareaAValue: e.detail.value
        })
    },
    textareaBInput(e) {
        this.setData({
            textareaBValue: e.detail.value
        })
    },

    // 上传图片到阿里云示例
    uploadImage:function(){
        wx.chooseImage({
           count: 3, // 默认最多一次选择9张图
           sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
           sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
           success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths;
              var nowTime = util.formatTime(new Date());
              //支持多图上传
              for (var i = 0; i < res.tempFilePaths.length; i++) {
                 //显示消息提示框
                 wx.showLoading({
                    title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
                    mask: true
                 });
                console.log('正在上传'+res.tempFilePaths[i]);
                 uploadImage(res.tempFilePaths[i], 'image/pacemaker/',
                    function (result) {
                       console.log("===> 上传成功图片地址为：", result);
                       wx.hideLoading();
                    }, function (result) {
                       console.log("===> 上传失败", result);
                       wx.hideLoading()
                    }
                 )
              }
           }
        })
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

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})