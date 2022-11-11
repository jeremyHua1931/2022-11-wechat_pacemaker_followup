const app = getApp();
var uploadImage = require('../../../utils/uploadFile.js');
var util = require('../../../utils/util.js');
Page({
    data: {
        basics: 0,
        numList: [{
            name: '审核中'
        }, {
            name: '待修改'
        }, {
            name: '已完成'
        }],
        num: 0,
        scroll: 0,
        id: 0,
        ifPassed: true,
        detailUp: [],
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
            displayImageUpload2: false,
            displayImageUpload3: false,
        },
        img1: [],
        img2: [],
        imgList: [],
        imgListUpload: [],
        img1Upload: [],
        img2Upload: [],

        modalName: null,
        textareaAValue: '',
        textareaBValue: ''
    },


    numSteps() {
        this.setData({
            num: this.data.num == this.data.numList.length - 1 ? 0 : this.data.num + 1
        })
    },
    changeDisplayImageUpload2(e) {
        var state = e.detail.value
        var that = this
        this.setData({
            displayImageUpload2: state
        })
        if (state == false) {
            // this.setData({
            //     img2: '',
            //     img2Upload: '',
            // })
        }
    },
    changeDisplayImageUpload3(e) {
        var that = this
        var state = e.detail.value
        this.setData({
            displayImageUpload3: state
        })
        if (state == false) {
            // this.setData({
            //     imgList: '',
            //     imgListUpload: '',
            // })
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
                        "rvWireFollowRecord": res.data.rvWireFollowRecord == 0 ? '0' : {
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
                        "raWireFollowRecord": res.data.raWireFollowRecord == 0 ? '0' : {
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
                        "lvWireFollowRecord": res.data.lvWireFollowRecord == 0 ? '0' : {
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
                    var tmp1 = ['1']
                    tmp1[0] = res.data.follow_record.image
                    var tmp2 = ['1']
                    tmp2[0] = res.data.heartUltrasound.image

                    var tmp2Length = false
                    if (tmp2[0] != '1') {
                        tmp2Length = true
                    }

                    if (data.follow_record.state == '3') {
                        that.numSteps()
                    } else if (data.follow_record.state == '1') {
                        that.numSteps()
                        that.numSteps()
                    }
                    that.setData({
                        item1: data,
                        img1: tmp1,
                        img2: tmp2,
                        displayImageUpload2: tmp2Length,
                        detailUp: res.data
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
        var that = this
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
                    var dir = app.globalData.userid + "/img1/";
                    uploadImage(res.tempFilePaths[0], dir,
                        function (result) {
                            console.log("img1上传成功图片地址为：", result);
                            that.setData({
                                img1Upload: result
                            })
                            wx.hideLoading();
                            wx.showToast({
                                title: '上传成功',
                                icon: 'success'
                            })
                        },
                        function (result) {
                            console.log(" img1上传失=>", result);
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
                        img1: '',
                        img1Upload: '',
                    })
                }
            }
        })
    },

    //图片操作2
    ChooseImage2() {
        var that = this
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
                    var dir = app.globalData.userid + "/img2/";
                    uploadImage(res.tempFilePaths[0], dir,
                        function (result) {
                            console.log("img2上传成功图片地址为：", result);
                            that.setData({
                                img2Upload: result
                            })
                            wx.hideLoading();
                            wx.showToast({
                                title: '上传成功',
                                icon: 'success'
                            })
                        },
                        function (result) {
                            console.log(" img2上传失=>", result);
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
                        img2: '',
                        img2Upload: '',
                    })
                }
            }
        })
    },



    //图片操作3

    // ChooseImage() {
    //     var that = this
    //     wx.chooseImage({
    //         count: 4, //默认9
    //         sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album'], //从相册选择
    //         success: (res) => {
    //             if (this.data.imgList.length != 0) {
    //                 that.UpLoad3(res.tempFilePaths[0], this.data.imgList.length);
    //                 this.setData({
    //                     imgList: this.data.imgList.concat(res.tempFilePaths)
    //                 })
    //             } else {
    //                 that.UpLoad3(res.tempFilePaths[0], this.data.imgList.length);
    //                 this.setData({
    //                     imgList: res.tempFilePaths
    //                 })
    //             }
    //         }
    //     });
    // },

    // UpLoad3: function (path, index) {
    //     var that = this;
    //     var dir = app.globalData.userid + "/";
    //     uploadImage(path, dir,
    //         function (result) {
    //             console.log("imgList中第 " + (index + 1) + " 图片上传成功图片地址为：", result);
    //             if (that.data.imgListUpload.length != 0) {
    //                 var data = ["1"]
    //                 data[0] = result
    //                 that.setData({
    //                     imgListUpload: that.data.imgListUpload.concat(data)
    //                 })
    //             } else {
    //                 var data = ["1"]
    //                 data[0] = result
    //                 that.setData({
    //                     imgListUpload: data
    //                 })
    //             }
    //             wx.hideLoading();
    //             wx.showToast({
    //                 title: '上传成功',
    //                 icon: 'success'
    //             })
    //         },
    //         function (result) {
    //             wx.hideLoading()
    //             wx.showToast({
    //                 title: '上传失败',
    //                 icon: 'error'
    //             })
    //         }
    //     )
    // },


    // ViewImage(e) {
    //     wx.previewImage({
    //         urls: this.data.imgList,
    //         current: e.currentTarget.dataset.url
    //     });
    // },
    // DelImg(e) {
    //     wx.showModal({
    //         title: '请确认',
    //         content: '确定要删除这张图片吗？',
    //         cancelText: '不了',
    //         confirmText: '删除',
    //         success: res => {
    //             if (res.confirm) {
    //                 this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    //                 this.data.imgListUpload.splice(e.currentTarget.dataset.index, 1);
    //                 this.setData({
    //                     imgList: this.data.imgList,
    //                     imgListUpload: this.data.imgListUpload
    //                 })
    //             }
    //         }
    //     })
    // },



    imgMsgTo1: function () {
        var that = this;
        console.log("==>记录开始添加到数据库中")
        console.log("   ==> img1Upload: ")
        // console.log(that.data.img1)
        // console.log(that.data.img1Upload)

        if (that.data.img1Upload.length == 0) {
            wx.showModal({
                title: '请确认',
                content: '未修改，无需重新上传',
                cancelText: '返回',
                confirmText: '确定',
                success: res => {}
            })
            return;
        }
        var dataUp = that.data.detailUp
        dataUp.follow_record.image = that.data.img1Upload

        var date_in = new Date(dataUp.follow_record.date).format("yyyy-MM-dd hh:mm:ss")
        dataUp.follow_record.date = date_in
        dataUp.follow_record.state = 2
        wx.request({
            url: app.globalData.url + "/followRecord/update",
            data: dataUp.follow_record,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                wx.switchTab({
                    url: '/pages/home/home',
                })
                that.setData({
                    img1: '',
                    img2: '',
                    imgList: [],
                    img1Upload: '',
                    img2Upload: '',
                })
            },
            fail: function (error) {}
        })

    },

    imgMsgTo2: function () {
        var that = this;
        console.log("==>记录开始添加到数据库中")

        console.log("   ==> img2Upload: ")
        // console.log(that.data.img2)
        // console.log(that.data.img2Upload)

        if (that.data.img2Upload.length == 0) {
            wx.showModal({
                title: '请确认',
                content: '未修改，无需重新上传',
                cancelText: '返回',
                confirmText: '确定',
                success: res => {}
            })
            return;
        }
        var dataUp = that.data.detailUp
        dataUp.heartUltrasound.image = that.data.img2Upload

        var date_in = new Date(dataUp.follow_record.date).format("yyyy-MM-dd hh:mm:ss")
        dataUp.follow_record.date = date_in
        dataUp.follow_record.state = 2

        wx.request({
            url: app.globalData.url + "/followRecord/update",
            data: dataUp.follow_record,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                wx.request({
                    url: app.globalData.url + "/heartUltrasound/update",
                    data: dataUp.heartUltrasound,
                    method: 'POST',
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        console.log(res)
                        wx.switchTab({
                            url: '/pages/home/home',
                        })
                        that.setData({
                            img1: '',
                            img2: '',
                            imgList: [],
                            img1Upload: '',
                            img2Upload: '',
                        })
                    },
                    fail: function (error) {}
                })
            },
            fail: function (error) {}
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
    // format: function (dataString) {
    //     //dataString是整数，否则要parseInt转换
    //     var time = new Date(dataString);
    //     var year = time.getFullYear();
    //     var month = time.getMonth() + 1;
    //     var day = time.getDate();
    //     var hour = time.getHours();
    //     var minute = time.getMinutes();
    //     var second = time.getSeconds();
    //     return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' +
    //         (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
    // },


})
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}