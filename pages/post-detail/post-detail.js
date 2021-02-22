// pages/post-detail/post-detail.js
import {postList} from '../../data/data.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{},
    _pid:null,
    collected:false,
    _postsCollected:{},
    isPlaying:false,
    _mgr:null
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 根据post页面传来的pid获取数据列表
    const postData = postList[options.pid]
    // 把pid设置为公共数据，方便调用
    this.data._pid = options.pid

// 点击收藏逻辑，状态参数从缓存获取
    const postsCollected = wx.getStorageSync('posts_collected')
    
    if(postsCollected){
      this.data._postsCollected = postsCollected
    }
    
    let collected = postsCollected[this.data._pid]

    if(collected === undefined){
      // 如果undefined 说明文章从来没有被收藏过
      collected = false
    }

    this.setData({
      postData,
      collected
    })

// 音乐播放逻辑
    const mgr = wx.getBackgroundAudioManager()
    this.data._mgr = mgr
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicPause) 
    mgr.onEnded(this.onMusicEnd) 

    // 由判断全局变量的函数确认布尔值  
    this.setData({
      isPlaying: this.currentMusicIsPlaying()
    })
  },

// 点击分享事件
  async onShare(event){
    const itemList=['分享到QQ','分享到微信','分享到朋友圈']
    const result = await wx.showActionSheet({
      itemList,
      success:(res)=>{
        console.log(itemList[res.tapIndex])
      },
      fail:(res)=>{
        console.log(res.errMsg)
      }
    })
  },

// 点击收藏事件
  onCollect(event){

    const postsCollected = this.data._postsCollected

    postsCollected[this.data._pid] = !this.data.collected


    this.setData({
      collected:!this.data.collected
    })

    wx.setStorageSync('posts_collected',postsCollected)

    wx.showToast({
      title: this.data.collected?'收藏成功':'取消收藏',
      duration: 3000
    })

  },

// 音乐播放事件

  // 判断全局变量的函数，决定isPlaying的布尔值
  currentMusicIsPlaying(){
    if(app.gIsPlayingMusic && app.gIsPlayingPostId === this.data._pid ){
      return true
    }
    return false
  },

  // 播放音乐
  onMusicStart(event){
    const mgr = this.data._mgr
    const music = postList[this.data._pid].music
    // 设置路径，曲名，封面即可播放音乐
    mgr.src = music.url
    mgr.title = music.title
    mgr.coverImgUrl = music.coverImg
    // 全局变量的改变
    app.gIsPlayingMusic = true
    app.gIsPlayingPostId = this.data._pid
    
    this.setData({
      isPlaying:true
    })
  },

  // 暂停音乐
  onMusicPause(event){
    const mgr = this.data._mgr
    // 调用pause方法即可暂停音乐
    mgr.pause()
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
    })
  },

  // 音乐自然停止
  onMusicEnd(event){
    app.gIsPlayingMusic = false
    app.gIsPlayingPostId = -1
    this.setData({
      isPlaying:false
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