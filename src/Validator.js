import Validator from 'async-validator'

/**
 * Promise 验证方法
 * @param  {Object}   inputObj 输入对象
 * @param  {Function} callback 验证回调
 * @return {Promise}           验证 Promise
 */
Validator.prototype.validatePromise = function (inputObj, callback) {
  return new Promise((resolve, reject) => {
    this.validate(inputObj, function (errors, fields) {
      if (errors && errors.length) {
        reject(errors, fields)
      } else {
        resolve()
      }
    })
  }).catch((errors) => {
    errors = Array.isArray(errors) ? errors : [errors]
    return Promise.reject(errors)
  })
}

export default Validator
