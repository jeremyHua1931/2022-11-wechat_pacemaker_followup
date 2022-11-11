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
        imgListUpload: [],
        img1Upload: [],
        img2Upload: [],
        modalName: null,
        textareaAValue: '',
        textareaBValue: '',
        displayImageUpload2: false,
        displayImageUpload3: false,
    },

    changeDisplayImageUpload2(e) {
        var state = e.detail.value
        var that = this
        this.setData({
            displayImageUpload2: state
        })
        if (state == false) {
            this.setData({
                img2: '',
                img2Upload: '',
            })
        }
    },
    changeDisplayImageUpload3(e) {
        var that = this
        var state = e.detail.value
        this.setData({
            displayImageUpload3: state
        })
        if (state == false) {
            this.setData({
                imgList: '',
                imgListUpload: '',
            })
        }
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
                    var dir = app.globalData.userid + "img1/";
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
                            wx.showModal({
                                title: '上传失败',
                                content: '请重试（注意：图片不能大于5M或者请勿勾选原图）',
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
                    var dir = app.globalData.userid + "img2/";
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
                            wx.showModal({
                                title: '上传失败',
                                content: '请重试（注意：图片不能大于5M或者请勿勾选原图）',
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

    ChooseImage() {
        var that = this
        wx.chooseImage({
            count: 4, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    that.UpLoad3(res.tempFilePaths[0], this.data.imgList.length);
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    that.UpLoad3(res.tempFilePaths[0], this.data.imgList.length);
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        });
    },

    UpLoad3: function (path, index) {
        var that = this;
        var dir = app.globalData.userid + "/";
        uploadImage(path, dir,
            function (result) {
                console.log("imgList中第 " + (index + 1) + " 图片上传成功图片地址为：", result);
                if (that.data.imgListUpload.length != 0) {
                    var data = ["1"]
                    data[0] = result
                    that.setData({
                        imgListUpload: that.data.imgListUpload.concat(data)
                    })
                } else {
                    var data = ["1"]
                    data[0] = result
                    that.setData({
                        imgListUpload: data
                    })
                }
                wx.hideLoading();
                wx.showToast({
                    title: '上传成功',
                    icon: 'success'
                })
            },
            function (result) {
                wx.hideLoading()
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                })
            }
        )
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
                    this.data.imgListUpload.splice(e.currentTarget.dataset.index, 1);
                    this.setData({
                        imgList: this.data.imgList,
                        imgListUpload: this.data.imgListUpload
                    })
                }
            }
        })
    },



    imgMsgTo: function () {
        var that = this;
        console.log("==>记录开始添加到数据库中")
        // console.log("   1-img1Upload: ")
        // console.log(that.data.img1Upload)
        // console.log("   2-img2Upload: ")
        // console.log(that.data.img2Upload)
        // console.log("   3-imgList: ")
        // console.log(that.data.imgList)
        // console.log("   4-imgListUpload: ")
        // console.log(that.data.imgListUpload)

        if (that.data.img1Upload.length == 0) {
            wx.showModal({
                title: '请确认',
                content: '必须添加随访表基本图片',
                cancelText: '返回',
                confirmText: '继续编辑',
                success: res => {}
            })
            console.log("==>继续返回编辑")
            return;
        }
        // var tmp1 = ["1"]
        // tmp1[0] = that.data.img1Upload
        // var imgLink = tmp1

        console.log("目前随访次数为: " + app.globalData.mrinfo.followCounts)
        var newfrCount = app.globalData.mrinfo.followCounts + 1
        app.globalData.mrinfo.followCounts = newfrCount
        var newRecord = {
            followRecord: {
                frCount: newfrCount,
                date: that.format(new Date().getTime()),
                doctor: 53,
                image: that.data.img1Upload,
                id: 0,
                mrId: app.globalData.mrinfo.id,
                state: 2,
            },
        }

        if (that.data.img2Upload.length != 0) {
            newRecord = {
                followRecord: {
                    frCount: newfrCount,
                    date: that.format(new Date().getTime()),
                    doctor: 53,
                    image: that.data.img1Upload,
                    id: 0,
                    mrId: app.globalData.mrinfo.id,
                    state: 2,
                },
                heartUltrasound: {
                    image: that.data.img2Upload
                }
            }
        }
        if (app.globalData.mrinfo.raIn == true) {
            newRecord["raWireRecord"] = {
                id: 0
            }
        }
        if (app.globalData.mrinfo.lvIn == true) {
            newRecord["lvWireRecord"] = {
                id: 0
            }
        }
        if (app.globalData.mrinfo.rvIn == true) {
            newRecord["rvWireRecord"] = {
                id: 0
            }
        }

        if (that.data.imgListUpload.length != 0) {
            imgLink = imgLink.concat(that.data.imgListUpload)
        }
        // console.log("添加新纪录上传的图片链接组为: ")
        // console.log(imgLink)

        console.log("新纪录如下： ")
        console.log(newRecord)
        that.addNewRecord(newRecord)


    },

    addNewRecord: function (newRecord) {
        var that = this
        wx.request({
            url: app.globalData.url + "/medicalRecords/followRecordWeChat",
            data: newRecord,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res)
                console.log("==>新纪录已经添加成功")
                console.log("跳转home查看新加入的记录")
                wx.switchTab({
                    url: '/pages/home/home',
                })
                that.setData({
                    img1: '',
                    img2: '',
                    imgList: [],
                    img1Upload: '',
                    img2Upload: '',
                    imgListUpload: [],
                })
            },
            fail: function (error) {}
        })

    },

    // getPhoneNumber (e) {
    //     console.log("获取用户手机号码")
    //     console.log(e)
    // },

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
        var state;
        state = wx.getStorageSync('disableNavi')
        console.log("检查是否需要跳回:" + state)
        if (state == "noRecord" || state == "unlogin") {
            wx.switchTab({
                url: '/pages/user/user'
            })
        }
        var that = this
        wx.request({
            url: app.globalData.url + '/user/medicalRecord',
            data: {
                userId: app.globalData.userid
            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log("！！档案信息更新")
                app.globalData.mrinfo = res.data
                console.log(res.data)
            },
            fail: function (error) {}
        })
    
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

},
 format:function(dataString) {
    //dataString是整数，否则要parseInt转换
    var time = new Date(dataString);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' +
    (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second)
},
})