import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import CsvExportor from 'csv-exportor'

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

// 表格导出成excel
function exportExcel(ele,title='数据表'){
    let wb=XLSX.utils.table_to_book(document.querySelector(ele))
    let wbout=XLSX.write(wb,{bookType:'xlsx',bookSST:true,type:'array'})
    try{
        FileSaver.saveAs(new Blob([wbout],{type:'application/octet-stream'}),title+'.xlsx')
    }catch(e){
        if(typeof console !== 'undefined') console.log(e,wbout)
    }
    return wbout
}

// 表格导出csv
function exportCsv(data){
        
        /*
        *注：csv文件：","逗号换列，\n换行，\t防止excel将长数字变科学计算法等样式
        */
    
        //要导出的json数据
        let mainLists = data.trade   //主表
        
        //## 数据处理
        //一级表
        let mainTitle = mainLists.tHeader;//一级标题
        let mainTitleForKey = mainLists.filterVal;//一级过滤
        let mainList = mainLists.list;//一级数据
        let mainStr = [];
        mainStr.push(mainTitle.join("\t,")+"\n");   //标题添加上换列转成字符串并存进数组
        for(let i=0;i<mainList.length;i++){
            let temp = [];
            for(let j=0;j<mainTitleForKey.length;j++){
                temp.push(mainList[i][mainTitleForKey[j]]); //根据过滤器拿出对应的值
            }
            mainStr.push(temp.join("\t,")+"\n");    //取出来的值加上逗号换列转字符串存数组
        }
        // console.log(JSON.stringify(mainStr.join("")));//打印文本
    
        
        //两个表数组转成字符串合并
        let merged = mainStr.join("")
        //console.log(JSON.stringify(merged));//打印结果
        
        //## 导出操作
        // encodeURIComponent解决中文乱码
        const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(merged)
        // 通过创建a标签实现
        let link = document.createElement('a')
        link.href = uri
        // 对下载的文件命名
        link.download = '数据表.csv'
        document.body.appendChild(link)
        link.click()
    
}



export default{
    dealTime,
    dateDeal,
    numberCompare,
    arrChangeOver,
    exportExcel,
    exportCsv
}