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
    img1: [],
    img2: [],
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },




  //图片操作1
  ChooseImage1() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.img1.length == 0) {
          this.setData({
            img1: res.tempFilePaths
          })

          //上传到阿里云
          // uploadImage(res.tempFilePaths, 'image/pacemaker/',
          //   function (result) {
          //     console.log("======上传成功图片地址为：", result);
          //     wx.hideLoading();
          //     wx.showToast({
          //       title: '上传成功',
          //       icon: 'success'
          //     })
          //   },
          //   function (result) {
          //     console.log("======上传失败======", result);
          //     wx.hideLoading()
          //     wx.showToast({
          //       title: '上传失败',
          //       icon: 'error'
          //     })
          //   }
          // )
        } 
      }
    });
  },
  ViewImage1(e) {
    wx.previewImage({
      urls: this.data.img1,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg1(e) {
    wx.showModal({
      title: '请确认',
      content: '确定要删除这张图片吗？',
      cancelText: '不了',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.setData({
            img1: ''
          })
        }
      }
    })
  },
  uploadImage3:function(){
    // wx.request({
    //   url: app.globalData.url + '/followRecord/add',
    //   data: {
    //     image: 54
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '数据已写入',
    //       icon: 'success'
    //     })
    //   },
    //   fail: function (error) {

    //   }
    // })
  },

  //图片操作2
  ChooseImage2() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.img2.length == 0) {
          this.setData({
            img2: res.tempFilePaths
          })

          //上传到阿里云
          // uploadImage(res.tempFilePaths, 'image/pacemaker/',
          //   function (result) {
          //     console.log("======上传成功图片地址为：", result);
          //     wx.hideLoading();
          //     wx.showToast({
          //       title: '上传成功',
          //       icon: 'success'
          //     })
          //   },
          //   function (result) {
          //     console.log("======上传失败======", result);
          //     wx.hideLoading()
          //     wx.showToast({
          //       title: '上传失败',
          //       icon: 'error'
          //     })
          //   }
          // )
        } 
      }
    });
  },
  ViewImage2(e) {
    wx.previewImage({
      urls: this.data.img2,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg2(e) {
    wx.showModal({
      title: '请确认',
      content: '确定要删除这张图片吗？',
      cancelText: '不了',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.setData({
            img2: ''
          })
        }
      }
    })
  },

  uploadImage2:function(){
    // wx.request({
    //   url: app.globalData.url + '/followRecord/add',
    //   data: {
    //     image: 54
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '数据已写入',
    //       icon: 'success'
    //     })
    //   },
    //   fail: function (error) {

    //   }
    // })
  },



  //图片操作3

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

          //上传到阿里云
          uploadImage(res.tempFilePaths, 'image/pacemaker/',
            function (result) {
              console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
            },
            function (result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
              wx.showToast({
                title: '上传失败',
                icon: 'error'
              })
            }
          )

        } else {
          this.setData({
            imgList: res.tempFilePaths
          })

          //上传到阿里云
          uploadImage(res.tempFilePaths, 'image/pacemaker/',
            function (result) {
              console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success'
              })
            },
            function (result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
              wx.showToast({
                title: '上传失败',
                icon: 'error'
              })
            }
          )
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

  uploadImage3:function(){
    // wx.request({
    //   url: app.globalData.url + '/followRecord/add',
    //   data: {
    //     image: 54
    //   },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '数据已写入',
    //       icon: 'success'
    //     })
    //   },
    //   fail: function (error) {

    //   }
    // })
  },



  imgMsgTo:function(){
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    //# 需要请求一次档案信息(最大随访次数 followCounts)或者app.global.data.mrinfo中有
    //最终上传新纪录时需要+1

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