import { Base } from "../../utils/base.js";


class Cart extends Base{
    constructor(){
        super();
        this._storageKeyName = 'cart';
    }

    add(item, counts){
        var cartData = this.getCartDataFromLocal();
        var isHasInfo = this._isHasThatOne(item.id,cartData);
        if(isHasInfo.index == -1){
            item.counts = counts;
            item.selectStatus = true;
            cartData.push(item);
        }else{
            cartData[isHasInfo.index].counts += counts;
        }
        wx.setStorageSync(this._storageKeyName, cartData);
    }

    getCartDataFromLocal(){
        var res = wx.getStorageSync(this._storageKeyName);
        if(!res){
            res = [];
        }
        return res;
    }

    getCartTotalCounts(){
        var data = this.getCartDataFromLocal();
        var counts=0;

        for (let i = 0;i<data.length;i++){
            counts += data[i].counts;
        }
        return counts;
    }


    _isHasThatOne(id,arr){
        var item,
            result = {index:-1};
        for (let i=0;i<arr.length;i++){
            item = arr[i];
            if(item.id == id){
                result = {
                    index:i,
                    data:item
                };
                break;
            }
        }
        return result;
    }
}

export{Cart};