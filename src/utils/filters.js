// 필터 전역사용위해 등록
// eslint-disable-next-line import/prefer-default-export
export function formatDate() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : `0${month}`
  let day = date.getDate()
  day = day > 9 ? day : `0${day}`

  // let hours = date.getHours()
  // hours = hours > 9 ? hours : `0${hours}`


  return `${year}-${month}-${day}`
}
