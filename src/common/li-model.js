
function succ(msg='成功',flag=true){
    ELEMENT.Message({
        showClose: flag,
        message: msg,
        type:'success'
    })
}


function warn(msg='警告',flag=true){
    ELEMENT.Message({
        showClose: flag,
        message: msg,
        type:'warning'
    })
}


function normal(msg='消息',flag=true){
    ELEMENT.Message({
        showClose: flag,
        message: msg
    })
}


function err(msg='报错',flag=true){
    ELEMENT.Message({
        showClose: flag,
        message: msg,
        type:'error'
    })
}



function alert(title="提示",txt="自定义内容",fn){
    ELEMENT.MessageBox({
        title:title,
        message:txt,
        callback(res){
            fn(res)
        }
    })
}


function confirm(title="提示",txt="自定义内容",fn){
    ELEMENT.MessageBox({
        title:title,
        message:txt,
        showCancelButton:true,
        callback(res){
            fn(res)
        }
    })
}




export default{
    succ,
    err,
    normal,
    warn,
    alert,
    confirm
}