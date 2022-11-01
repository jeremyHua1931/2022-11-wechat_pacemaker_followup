const app = getApp();
var uploadImage = require('../../../utils/uploadFile.js');
var util = require('../../../utils/util.js');
Page({
    data: {
        id: 0,
        ifPassed: true,
        item1: {
            time: '12:01',
            date: '2018-12-25',
            tag: "正常",
            content1: "28",
            content2: "吕敏",
            content3: "true",
            content4: "GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOD",
            content5: "false",
            content6: "1",
            content7: "1",
            content8: "1212",
            content9: "1212",
            content10: "这里是备注",
            content11: "这里是建议",
            content12: "true",
            content13: "false",
            content14: "1",
            content15: "1",
            content16: "1212",
            content17: "1212",
            content18: "false",
            content19: "1",
            content20: "1",
            content21: "1212",
            content22: "这里是备注",
            displayImageUpload2:false,
    displayImageUpload3:false,
        },
        img1: [],
        img2: [],
        imgList: [],
        modalName: null,
        textareaAValue: '',
        textareaBValue: ''
    },
      changeDisplayImageUpload2(e){
    var state = e.detail.value
    var that = this
    this.setData({
      displayImageUpload2:state
    })
    if(state==false){
      this.setData({
        img2:''
      })
    }
  },
    changeDisplayImageUpload3(e){
      var that =this
      var state = e.detail.value
    this.setData({
      displayImageUpload3:state
    })
        if(state==false){
      this.setData({
        imgList:''
      })
    }
  },
    onLoad(options) {
        var that = this
        console.log('准备请求随访数据的id为' + options)
        this.setData({
            id: options.data
        }, () => {
            console.log(that.data.id)
            wx.request({
                url: app.globalData.url + '/followRecord/getOne',
                data: {
                    "frId": that.data.id

                },
                method: 'POST',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    console.log("请求详细数据开始")
                    console.log(res.data)
                    console.log("请求详细数据结束")
                    // <!-- todo:date的切分 -->
                    var data = {
                        "rvWireFollowRecord": res.data.rvWireFollowRecord==0?'0':{
                            "id": res.data.rvWireFollowRecord.id,
                            "frId": res.data.rvWireFollowRecord.frId,
                            "position": res.data.rvWireFollowRecord.position,
                            "thresholds": res.data.rvWireFollowRecord.thresholds,
                            "pulsewidth": res.data.rvWireFollowRecord.pulsewidth,
                            "prwave": res.data.rvWireFollowRecord.prwave,
                            "pacingImpedance": res.data.rvWireFollowRecord.pacingImpedance,
                            "pacingPercent": res.data.rvWireFollowRecord.pacingPercent,
                            "perceptualPercent": res.data.rvWireFollowRecord.perceptualPercent,
                            "defibrillationImpedance": res.data.rvWireFollowRecord.defibrillationImpedance,
                            "tdpw": res.data.rvWireFollowRecord.tdpw,
                            "perceptualSensitivity": res.data.rvWireFollowRecord.perceptualSensitivity,
                            "note": res.data.rvWireFollowRecord.note == null ? "暂无" : res.data.rvWireFollowRecord.note,
                        },
                        "raWireFollowRecord":  res.data.raWireFollowRecord==0?'0':{
                            "id": res.data.raWireFollowRecord.id,
                            "frId": res.data.raWireFollowRecord.frId,
                            "position": res.data.raWireFollowRecord.position,
                            "thresholds": res.data.raWireFollowRecord.thresholds,
                            "pulsewidth": res.data.raWireFollowRecord.pulsewidth,
                            "prwave": res.data.raWireFollowRecord.prwave,
                            "pacingImpedance": res.data.raWireFollowRecord.pacingImpedance,
                            "pacingPercent": res.data.raWireFollowRecord.pacingPercent,
                            "perceptualPercent": res.data.raWireFollowRecord.perceptualPercent,
                            "defibrillationImpedance": res.data.raWireFollowRecord.defibrillationImpedance,
                            "tdpw": res.data.raWireFollowRecord.tdpw,
                            "perceptualSensitivity": res.data.raWireFollowRecord.perceptualSensitivity,
                            "note": res.data.raWireFollowRecord.note == null ? "暂无" : res.data.raWireFollowRecord.note,
                        },
                        "lvWireFollowRecord":  res.data.lvWireFollowRecord==0?'0':{
                            "id": res.data.lvWireFollowRecord.id,
                            "frId": res.data.lvWireFollowRecord.frId,
                            "position": res.data.lvWireFollowRecord.position,
                            "thresholds": res.data.lvWireFollowRecord.thresholds,
                            "pulsewidth": res.data.lvWireFollowRecord.pulsewidth,
                            "prwave": res.data.lvWireFollowRecord.prwave,
                            "pacingImpedance": res.data.lvWireFollowRecord.pacingImpedance,
                            "pacingPercent": res.data.lvWireFollowRecord.pacingPercent,
                            "perceptualPercent": res.data.lvWireFollowRecord.perceptualPercent,
                            "defibrillationImpedance": res.data.lvWireFollowRecord.defibrillationImpedance,
                            "tdpw": res.data.lvWireFollowRecord.tdpw,
                            "perceptualSensitivity": res.data.lvWireFollowRecord.perceptualSensitivity,
                            "note": res.data.lvWireFollowRecord.note == null ? "暂无" : res.data.rvWireFollowRecord.note,
                        },
                        "heartUltrasound": res.data.heartUltrasound == 0 ? false : true,
                        "follow_record": {
                            "id": res.data.follow_record.id,
                            "mrId": res.data.follow_record.mrId,
                            "frCount": res.data.follow_record.frCount,
                            "image": res.data.follow_record.image,
                            "date": res.data.follow_record.date,
                            "doctor": res.data.follow_record.doctor,
                            "type": res.data.follow_record.type == 0 ? "true" : "false",
                            "performance": res.data.follow_record.performance,
                            "batteryState": res.data.follow_record.batteryState == 0 ? "true" : "false",
                            "batteryLife": res.data.follow_record.batteryLife,
                            "pacemakerPattern": res.data.follow_record.pacemakerPattern,
                            "minFrequency": res.data.follow_record.minFrequency,
                            "maxFrequency": res.data.follow_record.maxFrequency,
                            //todo: "note": res.data.follow_record.note,页面状态
                            "state": res.data.follow_record.state,
                            "note": res.data.follow_record.note == null ? "无" : res.data.follow_record.note,
                            "suggest": res.data.follow_record.suggest == null ? "无" : res.data.follow_record.suggest,
                        }
                    }
                    that.setData({
                        item1: data
                    })

                },
                fail: function (error) {

                }
            })

        })


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
    RegionChange: function (e) {
        this.setData({
            region: e.detail.value
        })
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
    uploadImage3: function () {
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

    uploadImage2: function () {
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


    imgMsgTo: function () {

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

    uploadImage3: function () {
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