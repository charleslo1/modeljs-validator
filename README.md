# modeljs-validate
一个 modeljs 模型验证插件，基于 [async-validator](https://github.com/yiminghe/async-validator) 验证规则，为 modeljs 提供简单方便的模型属性验证 API，让数据验证更简单！✌️

# Install
```
npm install modeljs-validator --save
```

# Usage

modeljs-validator 基于 async-validator开发，更多验证规则相关配置请参考 [async-validator](https://github.com/yiminghe/async-validator)

``` js
import Model from 'modeljs-core'
import Validator from 'modeljs-validator'

// 【关键代码】安装插件
Model.use(Validator)

// 定义模型
const User = Model.define('User', {
  id: {
    type: Number,
    default: 0,
    // 【关键代码】需要在模型属性定义上加上 rules 验证规则字段
    rules: { type: 'number', required: true, message: 'id 的类型必须是数字！' }
  },
  username: {
    type: String,
    default: '',
    // 【关键代码】同一个模型属性支持多个验证规则
    rules: [
      { type: 'string', required: true, message: '用户名不能为空！' },
      { pattern: /^[a-zA-Z0-9]{4,16}$/, message: '用户名只能为4-16位字母和数字组成！' }
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

// 实例化模型
var user = new User({
    id: 'myid',
    username: 'my',
    password: '',
    sex: 100
})

// 【关键代码】调用 model.validate 验证模型
user.validate().then(() => {
    console.log('验证成功')
}).catch((errors) => {
    console.log('验证失败', errors)
    /*
        errors:  
        [ { message: 'id 的类型必须是数字！', field: 'id' },
          { message: '用户名只能由4-16位字母或数字组成！', field: 'username' },
          { message: '密码不能为空！', field: 'password' },
          { message: '请选择性别！', field: 'sex' } ]
     */

    // 验证失败后可根据场景使用合适的方式将 message 展示给用户
    let err = errors.shift()
    if (err) alert(err.message)
})

// 【关键代码】支持选择性验证（比如在用户登录场景下只需要验证用户名和密码即可）
user.validate(['username', 'password']).then(() => {
    console.log('验证成功')
}).catch((errors) => {
    console.log('验证失败', errors)
    /*
        errors:  
        [ { message: '用户名只能由4-16位字母或数字组成！', field: 'username' },
          { message: '密码不能为空！', field: 'password' } ]
     */

    // 验证失败后可根据场景使用合适的方式将 message 展示给用户
    let err = errors.shift()
    if (err) alert(err.message)
})

```

# API

``` js

/**
 * 验证
 * @param  {Array} [filters]    指定需要验证的字段（默认为所以字段都会验证）
 * @param  {Promise}            验证结果 promise
 */
model.validate(filters)
```

![star](https://user-gold-cdn.xitu.io/2018/7/24/164ca9c0e943dcd7?w=240&h=240&f=png&s=41877)

如果对你有用，欢迎 star ^_^
