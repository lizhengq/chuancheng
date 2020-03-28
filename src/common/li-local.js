function set(key,value){
    if(key && value){
        let _key=key
        let _value=JSON.stringify(value)
        localStorage.setItem(_key,_value)
    }else{
        return
    }
    
}


function get(key){
    if(key==null||!key) return;
    return JSON.parse(localStorage.getItem(key))
}


function remove(key){
    if(key==null || !key) return;
    localStorage.removeItem(key)
}


function removeAll(){
    localStorage.clear()
}


export default{
    set,
    get,
    remove,
    removeAll
}