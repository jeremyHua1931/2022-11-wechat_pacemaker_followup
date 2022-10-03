Component({
    options: {
      addGlobalClass: true,
    },
    data: {
      starCount: 3,
      forksCount: 23,
      visitTotal: 4000,
      doctorInfo: "负责医师: 王明 \r\n 所在医院: 武汉大学中南医院"
    },
    attached() {
      console.log("success")
      let that = this;
      wx.showLoading({
        title: '数据加载中',
        mask: true,
      })
      let i = 0;
      wx.hideLoading()
    },
    methods: {
        ShowUserDoctorInfo() {
        wx.showModal({
            title: '医师信息',
            content: this.data.doctorInfo,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
      },
      ShowSystemInfo() {
        wx.showModal({
            title: '系统信息',
            content: 'Version 1.0',
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        },
      showModal(e) {
        this.setData({
          modalName: e.currentTarget.dataset.target
        })
      },
      hideModal(e) {
        this.setData({
          modalName: null
        })
      },
    }
  })