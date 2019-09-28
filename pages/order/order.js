// pages/order/order.js

 import { Cart } from '../cart/cart-model.js';
 import { Order } from '../order/order-model.js';
 import { Address } from '../../utils/address.js';

 var cart = new Cart();
 var order = new Order();
 var address = new Address();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productsArr;
    this.data.account = options.account;

    productsArr = cart.getCartDataFromLocal(true);
    console.log(productsArr);

    this.setData({
      productsArr:productsArr,
      account:options.account,
      orderStatus:0
    });

    address.getAddress((res)=>{
      this._bindAddressInfo(res);
    });


  },

  editAddress:function(event){
    var that = this;
    wx.chooseAddress({
      success:function(res){
        console.log(res);
        var addressInfo = {
          name:res.userName,
          mobile:res.telNumber,
          totalDetail:address.setAddressInfo(res)
        }
        that._bindAddressInfo(addressInfo);
        address.submitAddress(res,(flag)=>{
          if(!flag){
            this.showTips('操作提示','地址信息更新失败！');
          }
        })
      } 
    });    
  },

  showTips: function (title, content, flag) {
    wx.showModal({
      title: title,
      content: content,
      showCancel: false,
      success: function (res) {
        if (flag) {
          wx.switchTab({
            url: '/pages/my/my'
          });
        }
      }
    });
  },

  _bindAddressInfo:function(addressInfo){
    this.setData({
      addressInfo:addressInfo
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