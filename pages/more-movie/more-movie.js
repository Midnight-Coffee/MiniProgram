// pages/more-movie/more-movie.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    _type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

// 获取movie页面传来的type并设置为数据
    const type = options.type
    this.data._type = type

// 获取服务器数据：利用传来的type设置动态路径
    wx.request({
      url: app.gBaseUrl + type,
      data:{
        start:0,
        count:12
      },
      success:(res)=>{
        this.setData({
          movies:res.data.subjects
        })
      }
    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

// 导航条标题显示关联
    let title = '电影'
    switch(this.data._type){
      case 'in_theaters':
        title='正在热映'
        break
      case 'coming_soon':
        title = '即将上映'
        break
      case 'top250':
        title = '豆瓣Top250'
        break
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

// 下拉刷新：重新加载服务器数据
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start:0,
        count:12,
      },
      success:(res)=>{
        this.setData({
          movies:res.data.subjects
        })
        // 加载完成取消刷新动画，避免动画消失延时
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

// 上拉加载更多数据：
    wx.showNavigationBarLoading()
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        start: this.data.movies.length,
        count:12
      },
      success:(res)=>{
        this.setData({
          movies:this.data.movies.concat(res.data.subjects)
        })
        // 加载完成取消加载动画，避免动画消失延时
        wx.hideNavigationBarLoading()
      }
    })  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})