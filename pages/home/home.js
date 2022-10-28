// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        dataList:[
            {
                time:"22-10-28",
                tag:"正常",
                content1:"28",
                content2:"吕敏",
                content3:"常规随访",
                content4:"正常"
            },
            {
                time:"22-06-16",
                tag:"正常",
                content1:"26",
                content2:"郭刚",
                content3:"常规随访",
                content4:"正常"
            },
            {
                time:"22-06-15",
                tag:"正常",
                content:"上传记录"
            },
            {
                time:"22-06-14",
                tag:"正常",
                content:"上传记录"
            },
            {
                time:"22-06-13",
                tag:"正常",
                content:"上传记录"
            },
            {
                time:"22-06-12",
                tag:"正常",
                content:"所属随访次数：26 \n 主治医师：郭刚\n随访种类：常规随访\n电池状态：正常"
            }
        ],

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
    //跳转到详情页
    //Todo：传参
    jumpToDetail(){
        wx.navigateTo({
          url: '/pages/home/detail/detail',
        })
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
        wx.showToast({
            title: '没有更多数据了',
          })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})