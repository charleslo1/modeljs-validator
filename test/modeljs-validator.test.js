global.wx = {
  setStorageSync: () => {},
  getStorageSync: () => {},
  request: () => {}
}
const assert = require('assert')

const Model = require('modeljs-core')
const ModelValidator = require('../dist/modeljs-validator')

Model.use(ModelValidator)

const User = Model.define('User', {
  id: {
    type: Number,
    default: 0,
    rules: { type: 'number', required: true, message: 'id 的类型必须是数字！' }
  },
  username: {
    type: String,
    default: '',
    rules: [
      { type: 'string', required: true, message: '用户名不能为空！' },
      { pattern: /^[a-zA-Z0-9]{4,16}$/, message: '用户名只能由4-16位字母或数字组成！' }
    ]
  },
  password: {
    type: String,
    default: '',
    rules: [
      { type: 'string', required: true, message: '密码不能为空！' },
      { min: 6, max: 18, message: '密码不能少于6位且不能大于18位！' }
    ]
  },
  sex: {
    type: Number,
    default: 0,
    rules: { type: 'enum', enum: [0, 1, 2], required: true, message: '请选择性别！' }
  }
})

// 测试 modeljs-validator.js
describe('modeljs-validator.js', () => {

  it('model.validate()', () => {
    var user = new User({
      id: 'myid',
      username: 'my',
      password: 'pass',
      sex: 8
    })
    return user.validate().then(() => {
      console.info('validate: success!')
    }).catch((errors) => {
      // console.info('user: ', user)
      // console.info('errors: ', errors)
      assert.equal(4, errors.length)
    })
  })

  it('model.validate(filters)', () => {
    var user = new User({
      id: 'myid',
      username: 'my',
      password: '',
      sex: 8
    })
    return user.validate(['username', 'password']).then(() => {
      console.info('validate: success!')
    }).catch((errors) => {
      // console.info('user: ', user)
      // console.info('errors: ', errors)
      assert.equal(2, errors.length)
    })
  })
})
