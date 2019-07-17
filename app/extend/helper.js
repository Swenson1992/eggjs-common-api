const moment = require('moment')
const _ = require('lodash')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' })=> {
  ctx.body = {
    code: 200,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.parse = (query) => {
  let condition = {};
  let separator = /==|!=|=in=|=out=/g;
  let _arr = query.split(';')
  _arr.forEach((v) => {
    let field = v.split(separator)[0];
    let operator = v.match(separator)[0];
    let raw_value = v.split(separator)[1];
    switch (operator){
      case "==":
        condition[field] = _.merge( {}, condition[field],{ $eq: raw_value })
        break;
      case "!=":
        condition[field] = _.merge( {}, condition[field],{ $ne: raw_value })
        break;
      case "=in=":
        condition[field] = _.merge( {}, condition[field],{ $in: raw_value.substring(1,raw_value.length - 1).split(',')})
        break;
      case "=out=":
        condition[field] = _.merge( {}, condition[field],{ $nin: raw_value.substring(1,raw_value.length - 1).split(',')})
        break;
      default:
    }
  })
  return condition
}

exports.compare = (property) => {
    return function(obj1,obj2){
        var value1 = obj1[property];
        var value2 = obj2[property];
        if (typeof value1 == "string") {
            return value1.localeCompare(value2);
        }
        return value1 - value2;     // 升序
    }
}

/**
 * 按照指定字段进行分组
 * @param arr 分组的数组
 * @param field 分组的字段
 */
exports.groupBy = (arr, field) => {
    let map = {}, dest = [];
    for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai[field]]) {
            dest.push({
                [field]: ai[field],
                children: [ai]
            });
            map[ai[field]] = ai;
        } else {
            for (var j = 0; j < dest.length; j++) {
                var dj = dest[j];
                if (dj[field] == ai[field]) {
                    dj.children.push(ai)
                    break;
                }
            }
        }
    }
    return dest
}