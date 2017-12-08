define(function(){
    var tool = {};
    tool.http = function(url,type,params,callback){
        if(type.toUpperCase()=="POST"){
            var t = []
            for (var  key in params){
                t.push(key+"="+params[key]);
            }
        }
        $.ajax({
            type 		: type,
            dataType 	: "json",
            contentType: "application/json",
            url  		: url,
            data 		: params,
            complete 	: function(jqXHR){
                var obj = jqXHR.responseJSON;
                switch(jqXHR.status){
                    case 200:
                    case 201:
                    case 202:
                    case 203:
                    case 204:
                        console.log(obj);
                        if(obj)
                        {
                            callback(true,obj);
                        }
                        else
                        {
                            callback(false,'null');
                        }
                        break;
                    default:
                        if(_.isNull(obj.message) || _.isUndefined(obj.message)) {
                            if(obj.message.length > 0) {
                                alert(obj.message);
                                callback(false,"server error "+jqXHR.status);
                                return;
                            }
                        }
                        switch (jqXHR.status)
                        {
                            case 500:
                                alert("服务器错误");
                                break;
                            default :
                                alert("网络连接失败,请检查网络配置!")
                                break;
                        }
                        callback(false,"server error "+jqXHR.status);
                        break;
                }
            }
        });

    }

    tool.upload = function(url,data,callback){
        $.ajax({
            url:url ,
            type: 'POST',
            data: data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                var obj = returndata;
                if(obj.code == 1)
                {
                    callback(true);
                }
                else
                {
                    alert(obj.message);
                    callback(false);
                }
            },
            error: function (returndata) {
                alert("上传失败");
                callback(false);
            }
        });
    }
    return tool;
});