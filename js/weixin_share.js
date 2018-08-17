'use strict';
!function(wx){
window.weixin_share=function(options){
    var nowUrl=function(){
        var a = window.location.href;
        var b = a.split('//')[1].split('/');
        var c = b.length-1;
        var d = b[c];
        return a.replace(d,'');
    };
    var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };
    var createTimestamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };
    var raw = function (args) {
        var keys = Object.keys(args);
        keys = keys.sort()
        var newArgs = {};
        keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
        });
        var string = '';
        for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
        }
        string = string.substr(1);
        return string;
    };
    var getSecond=function(){
        var d = new Date();
        var  milliseconds=d.getTime();
        var second=milliseconds/1000;
        return second;
    }
    function isWx(){
        if((/micromessenger/gi).test(navigator.userAgent)){
            return true;
        }
        //return false;
        return true;
    }
    var apiHost="http://adapi.yushangad.com/yingad";
    this.share_defaulOptions={
        appid:'wxa7c8ef3312062af3',//默认使用的微信appid
        shareTitle:'分享标题',
        shareDesc:'分享描述',
        shareImgUrl:'images/share_icon.jpg',//分享图片的相对路径
        shareUrl:window.location.href,//分享当前页
        shareLink:'index.html'//分享给好友的连接
    };

    this.share_options=this.share_defaulOptions;
    for(var key in options){
        this.share_options[key]=options[key];
    }
    this.share_options.shareImgUrl=nowUrl()+this.share_options.shareImgUrl;
    this.share_options.shareLink=nowUrl()+this.share_options.shareLink;



    var sign = function (jsapi_ticket, url) {
        var ret = {
            jsapi_ticket: jsapi_ticket,
            nonceStr: createNonceStr(),
            timestamp: createTimestamp(),
            url: url
        };
        var string = raw(ret);
        var shaObj = new jsSHA(string, 'TEXT');
        ret.signature = shaObj.getHash('SHA-源码', 'HEX');
        return ret;
    };
    var ajax = function (src) {
        this.s = null;
        this.s = document.createElement("script");
        this.s.type = "text/javascript";
        this.s.src = src;
        document.getElementsByTagName("head")[0].appendChild(this.s);
    }

    var getTicketFlag=function(){
        if(!isWx()){
            return false;
        }
        var flag=false;
        var ticket_outTime=localStorage.getItem("ticket_outTime");
        if(ticket_outTime==null){
            flag=true;
        }else{
            var second=getSecond();
            if(second>=ticket_outTime){
                flag=true;
            }
        }
        return flag;
    }
    var url = apiHost+'/wx/ticket.action?appid='+this.share_options.appid+'&rettype=json&callback=';
    var runajax = function (wx_share_obj) {
        if(!isWx()){
            return;
        }
        var ticket_url=url+wx_share_obj+".get_ticket";
        var aj = new ajax(ticket_url,wx_share_obj);
    }
    this.get_ticket = function (data) {
        var second=0;
        if (data.expires_in && data.expires_in != ""&&data.expires_in>0) {
            second=getSecond()+data.expires_in;
        }
        localStorage.setItem("ticket_outTime", second);
        localStorage.setItem("ticket", data.ticket);
        this.wx_init_refresh();
    }
    this.wx_init_refresh=function(){
        if(!isWx()) return;
        var obj = sign(localStorage.getItem("ticket"),this.share_options.shareUrl);
        var appid=this.share_options.appid;
        var imgUrl =this.share_options.shareImgUrl ;
        var shareTitle = this.share_options.shareTitle;
        var descContent =this.share_options.shareDesc;
        var lineLink = this.share_options.shareLink;
        wx.config({
            debug: false,
            appId:appid,
            timestamp: obj.timestamp,
            nonceStr: obj.nonceStr,
            signature: obj.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });

        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title:shareTitle,
                desc: descContent,
                link: lineLink,
                imgUrl: imgUrl,
                success: function () {
                    //location.href=nowUrl()+'success.html';
                },
                cancel: function () { }
            });
            wx.onMenuShareTimeline({
                title:shareTitle,
                link: lineLink,
                imgUrl: imgUrl,
                success: function () {
                    //location.href=nowUrl()+'success.html';
                },
                cancel: function () { }
            });


        });
        wx.error(function (res) {
            //init_runwx();
        });
    }
    this.runwx=function(wx_share_obj){
        if(getTicketFlag()==true){
            runajax(wx_share_obj);
        }else{
            this.wx_init_refresh();
        }
    }
}
}(wx);