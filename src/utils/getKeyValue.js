
function getKeyValue(Obj, includedString) {
  let newArray = []

  if (Object.keys(Obj).length>0 ) {
    // to check if there is a obj
    Object.keys(Obj).forEach(item => {
      // for every keys includes the right key, return it
      if(item.includes(includedString)) {
        newArray.push(Obj[item])
      }
    })
  }
  return newArray
}

export default getKeyValue ;