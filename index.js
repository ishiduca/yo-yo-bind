var yo = require('yo-yo')

module.exports = function bindApp (create, state, reduce) {
  var dom = create(state, dispatch)
  return dom
  function dispatch (type, action) {
    var whatIsThis = reduce(state, action, type)
    if (typeof whatIsThis === 'function') {
      whatIsThis(dispatch)
    } else {
      yo.update(dom, create((state = whatIsThis), dispatch))
    }
  }
}

module.exports.html = yo
