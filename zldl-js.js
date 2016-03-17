/**
 * Created by zhaoldl on 2016/3/17.������
 */
!function(){
    var e = {
        //��ȡurl�еĲ���
        urlParam : function(param){
            var reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)'),
                r = window.location.search.substr(1).match(reg);
            return r!=null?decodeURIComponent(r[2]):null;
        },
        //��ȡcookie
        getCookie : function(name) {
            var arr = [],reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            return (arr=document.cookie.match(reg))?arr[2]:null;
        },
        //ר�Ż�ȡJSON��ajax��url ajax url��type ����ʽ����'GET','POST'��data Ҫ�������ݣ�succFun �ɹ��ص���failFun ʧ�ܻص�
        ajaxForJson : function(url, type, data, succFun, failFun){
            //����XMLHttpRequest����
            var XMLHttpReq;
            try {
                XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); //IE�߰汾����XMLHTTP
            } catch (E) {
                try {
                    XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); //IE�Ͱ汾����XMLHTTP
                } catch (E) {
                    XMLHttpReq = new XMLHttpRequest(); //���ݷ�IE�������ֱ�Ӵ���XMLHTTP����
                }
            }
            XMLHttpReq.open(type, url, true);
            //ָ����Ӧ����
            XMLHttpReq.onreadystatechange = function() {
                if (XMLHttpReq.readyState == 4) {
                    var jsonData = JSON.parse(XMLHttpReq.responseText)
                    if (XMLHttpReq.status == 200) {
                        //�ɹ�
                        succFun(jsonData);
                    } else {
                        //ʧ��
                        failFun(jsonData);
                    }
                }
            };
            XMLHttpReq.send(data);
        },
		//�Զ��ƶ����������������IOSֱ�ӹ��������android���ѻ������뷨��ֱ�ӹ�����Ҫ����onresize�¼�
		//��һ��dom��Ϊ�˻�ȡ��ǰdocument�Ķ�̬�߶ȣ�docHeight�Ǹ���Ⱦҳ��ʱdocument�ĸ߶ȣ���Ϊ���ж����뷨�Ƿ��ѵ���
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