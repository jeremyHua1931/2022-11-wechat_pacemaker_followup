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

    ChooseImage() {
        wx.chooseImage({
          count: 4, //默认9
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'], //从相册选择
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
          title: '请确认',
          content: '确定要删除这张图片吗？',
          cancelText: '不了',
          confirmText: '删除',
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
    
     // 上传图片到阿里云
        uploadImage:function(){
                          //支持多图上传
                          console.log(this.data.imgList);
                  for (var i = 0; i < this.data.imgList.length; i++) {
                     //显示消息提示框
                     wx.showLoading({
                        title: '上传中' + (i + 1) + '/' +  this.data.imgList.length,
                        mask: true
                     });
      
            
                     uploadImage( this.data.imgList[i], 'image/pacemaker/',
                        function (result) {
                           console.log("======上传成功图片地址为：", result);
                           wx.hideLoading();
                           wx.showToast({
                             title: '上传成功',
                             icon:'success'
                           })
                        }, function (result) {
                           console.log("======上传失败======", result);
                           wx.hideLoading()
                            wx.showToast({
                             title: '上传失败',
                             icon:'error'
                           })
                        }
                     )
                  }
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