import mapValues from 'lodash/mapValues'
import omitBy from 'lodash/omitBy'
import Validator from './Validator'

/**
 * 模型验证插件
 * @param  {Function} Model   模型类
 * @param  {Object} options   插件选项
 */
export default function (Model, options) {
  options = Object.assign({
    customeTypes: {
      /* phone: function (rule, value, callback, source, options) {
        let errors = []
        // xxx
        callback(errors)
      } */
    }
  }, options)

  // 注册自定义类型
  mapValues(options.customeTypes, (validateFn, typeName) => {
    Validator.register(typeName, validateFn)
  })

  /**
   * 从属性定义对象中获取并过滤验证规则
   * @param  {Object} attributes 验证
   * @param  {Array} filters      需要验证的属性
   * @return {Object}            验证规则对象
   */
  function getRules (attributes = {}, filters) {
    let rules = mapValues(attributes, (attribute, name) => attribute.rules)

    if (filters && Array.isArray(filters)) {
      return omitBy(rules, (value, key) => (value === undefined || filters.indexOf(key) < 0))
    } else {
      return omitBy(rules, (value, key) => value === undefined)
    }
  }

  /**
   * 验证模型
   * @param  {Array} filters 需要验证的属性
   * @return {Promise}      promise
   */
  Model.prototype.validate = function (filters) {
    // 获取验证规则
    const attributes = this.constructor.attributes
    const rules = getRules(attributes, filters)

    // 实例化验证器
    const validator = new Validator(rules)
    // 返回验证结果
    return validator.validatePromise(this)
  }
}
