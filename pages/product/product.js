import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';
var product = new Product();
var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    countsArray :[1,2,3,4,5,6,7,8,9,10],
    productCount:1,
    currentTabsIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    this._loadData();
  },

  _loadData:function(){
    product.getDetailInfo(this.data.id,(data)=>{
      this.setData({
        cartTotalCounts:cart.getCartTotalCounts(),
        product:data
      })
    });
  },

  bindPickerChange:function(event){
    console.log(event)
    var index = event.detail.value;
    var selectCount = this.data.countsArray[index];
    this.setData({
      productCount:selectCount
    })
  },

  onProductsItemTap:function(event){
   
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id
    
    });
  },

  onTabsItemTap:function(event){
    var index = product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex:index
    })
  },

  onAddingToCartTap:function(event){
    this.addToCart();
    var counts = this.data.cartTotalCounts + this.data.productCount;
    this.setData({
      cartTotalCounts:cart.getCartTotalCounts()
    })
  },

  addToCart:function(){
    var tempObj = {};
    var keys = ['id','name','main_img_url','price'];

    for(var key in this.data.product){
      console.log(key);
      console.log(this.data.product);
      if(keys.indexOf(key)>=0){
        console.log(keys.indexOf(key));
        tempObj[key] = this.data.product[key];
  
      }
    }

    cart.add(tempObj,this.data.productCount);
  },

  onCartTap:function(event){
    wx.switchTab({
      url: '/pages/cart/cart'
    });
      
  }

  
})