var yo = require('yo-yo')
var isPromise = require('is-promise')

module.exports = function bindApp (create, state, reduce) {
  var dom = create(state, dispatch)
  return dom
  function dispatch (type, action) {
    var whatIsThis = reduce(state, action, type)
    if (isPromise(whatIsThis)) {
      whatIsThis.then(function (_state){
        state = _state
        yo.update(dom, create(state, dispatch))
      })
    } else {
      state = whatIsThis
      yo.update(dom, create(state, dispatch))
    }
  }
}

module.exports.html = yo
