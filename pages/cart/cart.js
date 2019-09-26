
import { Cart } from 'cart-model.js';
var cart = new Cart();

Page({


  data: {

  },

  
  onLoad: function (options) {

  },

  onHide:function(){
    cart.execSetStorageSync(this.data.cartData);
      
  },

  onShow: function () {
    var cartData = cart.getCartDataFromLocal();
    //var countsInfo = cart.getCartTotalCounts(true);
    var cal =this._calcTotalAccountAndCounts(cartData);
    console.log(cal);
    this.setData({
      cartData:cartData,
      selectedCounts:cal.selectedCounts,
      account:cal.account,
      selectedTypeCounts:cal.selectedTypeCounts
    })
  },

  _calcTotalAccountAndCounts:function(data){
    var len = data.length,
        account = 0,
        selectedCounts = 0,
        selectedTypeCounts = 0;
    let multiple = 100;

    for (let i=0;i<len;i++){
      if(data[i].selectStatus){
        account += data[i].counts * multiple * Number(data[i].price) * multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts:selectedCounts,
      selectedTypeCounts:selectedTypeCounts,
      account:account/(multiple*multiple),
    }
  },

  toggleSelect:function(event){
    var id = cart.getDataSet(event,'id'),
        status = cart.getDataSet(event,'status'),
        index = this._getProductIndexById(id);

    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },


  toggleSelectAll:function(event){
    var status = cart.getDataSet(event,'status') == 'true';
    var data = this.data.cartData,
        len = data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus = !status;
      this._resetCartData();
    }
  },

  _resetCartData:function(){
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      account:newData.account,
      selectedCounts:newData.selectedCounts,
      selectedTypeCounts:newData.selectedTypeCounts,
      cartData:this.data.cartData
    })
  },

  _getProductIndexById:function(id){
    var data = this.data.cartData,
        len = data.length;
    for(let i=0;i<len;i++){
      if(data[i].id == id){
        return i;
      }
    }
  },

  changeCounts:function(event){
    var id = cart.getDataSet(event,'id'),
        type = cart.getDataSet(event,'type'),
        index = this._getProductIndexById(id),
        counts = 1;
    if(type=='add'){
      cart.addCounts(id);
    }else{
      counts = -1;
      cart.cutCounts(id);
    }
    this.data.cartData[index].counts += counts;
    this._resetCartData();
  },

  delete:function(event){
    var id = cart.getDataSet(event,'id'),
        index = this._getProductIndexById(id);
    this.data.cartData.splice(index,1);
    this._resetCartData();
    cart.delete(id);
  }
})