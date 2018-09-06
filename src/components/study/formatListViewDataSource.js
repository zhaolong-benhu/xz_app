/**
 * Created by zhaolong on 2017/03/20.
 * File description:json数据格式化
 */
 export default function formatListViewDataSource (data) {
    if (!Array.isArray(data)) {
    throw new Error('function only accept Array')
  }
  var dataBlob = {}
  var sectionIDs = ['s1']
  var rowIDs = [[]]
  data.forEach(function (element, index) {
    dataBlob['r' + index] = {id: 'r' + index, text: element}
    rowIDs[0].push('r' + index)
  })
  dataBlob['s1'] = ''
  return [
    dataBlob,
    sectionIDs,
    rowIDs
    ]
  }
