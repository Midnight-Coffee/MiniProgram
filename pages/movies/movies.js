// pages/movies/movies.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    comingSoon:[],
    top250:[],
    searchResult:false,
    searchData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

// 获取三组服务端数据
    wx.request({
      url: app.gBaseUrl + 'in_theaters',
      data:{
        start:5,
        count:3
      },
      success:(res)=>{
        this.setData({
          inTheaters:res.data.subjects
        })
      }
    })   
  
    wx.request({
      url: app.gBaseUrl + 'coming_soon',
      data:{
        start:2,
        count:3
      },
      success:(res)=>{
        this.setData({
          comingSoon:res.data.subjects
        })
      }
    })
    wx.request({
      url: app.gBaseUrl + 'top250',
      data:{
        start:6,
        count:3
      },
      success:(res)=>{
        this.setData({
          top250:res.data.subjects
        })
      }
    })
  },

// 跳转到more-movie页面并传递type(后缀)
  onGotoMore(event){
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },

// 搜索栏关联
  // lin-ui提供的监听输入值函数  
  onConfirm(event){
    this.setData({
      searchResult:true
    })
    wx.request({
      url: app.gBaseUrl + 'search',
      data:{
        q:event.detail.value
      },
      success:(res)=>{
        this.setData({
          searchData:res.data.subjects
        })
      },
    })
  },
  // lin-ui提供的监听搜索取消函数
  onSearchCancel(event){
    this.setData({
      searchResult:false
    })
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})