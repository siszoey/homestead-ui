import request from 'axios'

const jsonFileHandler = {}

jsonFileHandler.getAllData = async function (filepath) {
  let res = request.get(filepath)
  return res
}

jsonFileHandler.getData = async function (filepath, propertyName, propertyValue) {
  let res = await this.getAllData(filepath)
  let data = res.data
  if (data instanceof Array) {
    return data.find(t => t[propertyName] === propertyValue)
  } else if (data instanceof Object) {
    return data[propertyName]
  }
}

export default jsonFileHandler
