// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */

// 接收movie-list传递的{{item}}数据
  properties: {
    movie:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgstate:""
  },

  /**
   * 组件的方法列表
   */

// 跳转movie-detail页面：传递mid（所选电影的id）
  methods: {
    onGoToDetail(event){
      const mid = this.properties.movie.id
      wx.navigateTo({
        url: '/pages/movie-detail/movie-detail?mid=' + mid
      })
    }
  }
})
