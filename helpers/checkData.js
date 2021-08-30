const isDataEmpty = (result) => {
    if(result?.rows.length == 0){
       return { isEmpty: true }
    }
    return { isEmpty: false }
}
  
module.exports = isDataEmpty;