import mapValues from 'lodash/mapValues'
import compact from 'lodash/compact'
import pick from 'lodash/pick'

/**
 * 模型验证插件
 * @param  {Function} Model   模型类
 * @param  {Object} options   插件选项
 */
export default function (Model, options) {

  function getRules (attributes, filter) {
    let rules = mapValues(attributes, (attribute, name) => {
      return attribute.rules
    })

    rules = filter && filter.length ? pick(rules, filter): rules

    return compact(rules)
  }

  /**
   * 验证模型
   * @param  {Array} filter 需要验证的属性
   * @return {Promise}      promise
   */
  Model.prototype.validate = function (filter) {
    const attributes = this.constructor.attributes
    const rules = getRules(attributes, filter)
    console.info('attributes: ', attributes)
    console.info('rules: ', rules)
  }

}
