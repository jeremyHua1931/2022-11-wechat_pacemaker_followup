const app = getApp();
var uploadImage = require('../../../utils/uploadFile.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    ifPassed:true,
    item1:{     time: '12:01',
                date: '2018-12-25',
                tag:"正常",
                content1:"28",
                content2:"吕敏",
                content3:"true",
                content4:"GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD",
                content5:"false",
                content6:"1",
                content7:"1",
                content8:"1212",
                content9:"1212",
                content10:"这里是备注",
                content11:"这里是建议",
                content12:"true",
                content13:"false",
                content14:"1",
                content15:"1",
                content16:"1212",
                content17:"1212",
                content18:"false",
                content19:"1",
                content20:"1",
                content21:"1212",
                content22:"这里是备注",
            },
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: ''
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
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
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
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












  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  }
})