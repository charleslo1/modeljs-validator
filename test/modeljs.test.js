global.wx = {
  setStorageSync: () => {},
  getStorageSync: () => {},
  request: () => {}
}
const assert = require('assert')

const Model = require('../dist/modeljs')

// 测试 modeljs-validate.js
describe('modeljs-validate.js', () => {

  it('Model.define(props)', () => {
    const User = Model.define('User', {
      id: {
        type: Number,
        default: 0
      },
      name: {
        type: String,
        default: 'name'
      }
    })
    var user = new User({ id: 100, name: 'Charles Lo'})
    assert.equal('Charles Lo', user.name)
  })
})
