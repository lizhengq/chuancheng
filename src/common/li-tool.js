//时间戳转成日期
function dealTime(timesTemp=''){
    if(timesTemp=='') return null;
    let temp=timesTemp*1000
    let date=new Date(temp)
    let y=date.getFullYear()
    let m=numberCompare(date.getMonth()+1)
    let d=numberCompare(date.getDate())
    return y+'-'+m+'-'+d;
}


//日期转成时间戳
function dateDeal(date=''){
    if(date==''||date==null) return null;
    let temp=new Date(date).getTime()
    return (temp/1000)
}

// 处理小于10前面加0
function numberCompare(num){
    if(!num||num==null) return null;
    return num <= 9 ? '0'+num : num
}


//将数组按什么要求转成字符串
function arrChangeOver(arrs=[],needKey='',need='&&'){
    let temp=''
    if(arrs.length<=0 || needKey=='') return null;
    for(let i=0;i<arrs.length;i++){
        if(arrs[i][needKey]) temp+=arrs[i][needKey]+'&&';
    }
    temp=temp.substring(0,temp.lastIndexOf(need))
    return temp
}


export default{
    dealTime,
    dateDeal,
    numberCompare,
    arrChangeOver
}