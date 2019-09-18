import { Base } from "../../utils/base.js";

class Home extends Base{
    constructor(){
        super();
    }

    getBannerData(id,callback){
        var params = {
            url: 'banner/'+ id,
            sCallback:function(res){
                callback && callback(res.items);
            } 
        }
        this.request(params);

        // wx.request({
        //     url: 'http://z.cn/api/v1/banner/'+id,
        //     method: 'GET',
        //     success:function(res){
        //        callBack(res);
        //     }
        // })
    }

    getThemeData(callback){
        var param = {
            url: 'theme?ids=1,2,3',
            sCallback:function(data){
                callback && callback(data);
            } 
        }
        this.request(param);
    }

    getProductsData(callback){
        var param = {
            url: 'product/recent',
            sCallback:function(data){
                callback && callback(data);
            } 
        }
        this.request(param);
    }
}

export{Home};