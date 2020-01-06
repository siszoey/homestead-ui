const utils = { }

utils.createProjectNo = function () {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m.toString().padStart(2, '0')
  let d = date.getDate()
  d = d.toString().padStart(2, '0')
  let h = date.getHours()
  let minute = date.getMinutes()
  minute = minute.toString().padStart(2, '0')
  let s = date.getSeconds()
  s = s.toString().padStart(2, '0')
  let milS = date.getMilliseconds()
  milS = milS.toString().padStart(3, '0')
  return y + m + d + h + minute + s + milS
}

export default utils
