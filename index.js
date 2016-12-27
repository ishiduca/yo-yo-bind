var yo  = require('yo-yo')
var isPromise = require('is-promise')

module.exports = function bind_app (create, state, reduce) {
    var dom = create(state, dispatch)
    return dom

    function dispatch (state, action) {
        var whats = reduce(state, action)
        if (isPromise(whats))
             whats.then(function (state) {update(state, dispatch)})
        else update(whats, dispatch)
    }

    function update (state, dispatch) {
        yo.update(dom, create(state, dispatch))
    }
}

module.exports.html = yo
