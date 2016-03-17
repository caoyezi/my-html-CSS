/**
 * Created by zhaoldl on 2016/3/17.工具类
 */
!function(){
    var e = {
        //获取url中的参数
        urlParam : function(param){
            var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
                r = window.location.search.substr(1).match(reg);
            return r!=null?decodeURIComponent(r[2]):null;
        },
        //获取cookie
        getCookie : function(name) {
            var arr = [],reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            return (arr=document.cookie.match(reg))?arr[2]:null;
        },
        //专门获取JSON的ajax，url ajax url，type 请求方式类型'GET','POST'，data 要传的数据，succFun 成功回调，failFun 失败回调
        ajaxForJson : function(url, type, data, succFun, failFun){
            //创建XMLHttpRequest对象
            var XMLHttpReq;
            try {
                XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); //IE高版本创建XMLHTTP
            } catch (E) {
                try {
                    XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); //IE低版本创建XMLHTTP
                } catch (E) {
                    XMLHttpReq = new XMLHttpRequest(); //兼容非IE浏览器，直接创建XMLHTTP对象
                }
            }
            XMLHttpReq.open(type, url, true);
            //指定响应函数
            XMLHttpReq.onreadystatechange = function() {
                if (XMLHttpReq.readyState == 4) {
                    var jsonData = JSON.parse(XMLHttpReq.responseText)
                    if (XMLHttpReq.status == 200) {
                        //成功
                        succFun(jsonData);
                    } else {
                        //失败
                        failFun(jsonData);
                    }
                }
            };
            XMLHttpReq.send(data);
        },
		//自动移动到可视区域，如果是IOS直接滚，如果是android，已唤出输入法就直接滚否则要监听onresize事件
		//第一个dom是为了获取当前document的动态高度，docHeight是刚渲染页面时document的高度，是为了判断输入法是否已弹出
		scrollIntoView : function(dom,docHeight){
			if((navigator.userAgent.indexOf('Android') == -1 && navigator.userAgent.indexOf('Linux') == -1)||(dom.offsetHeight < docHeight)){
				e.target.scrollIntoView(true);
			}else{
				window.onresize = function(){
					e.target.scrollIntoView(true);
				}
			}
		}
    };
    "object" == typeof exports ? module.exports = e : "function" == typeof define && (define.cmd || define.amd) ? define(function () {
        return e
    }) : this.util = e;
}()