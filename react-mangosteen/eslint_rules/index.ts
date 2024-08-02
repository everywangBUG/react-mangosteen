const bar = require('./require-return-in-map')
console.log(bar, 'bar')

module.exports = {
  rules: {
    "require-return-in-map": require("./require-return-in-map"),
  }
}