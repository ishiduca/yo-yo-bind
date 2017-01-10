# yo-yo-bind

[yo-yo-app](https://www.npmjs.com/package/yo-yo-app) is good. but, it is hard to use it with lazy handling. in such a case throw Promise.

## example

```js
const d = require('global/document')
const app = require('yo-yo-bind')

const create = (state, dispatch) => app.html `
    <main>
        <div>
            <button
                onclick=${ev => dispatch('FETCH', './snapshot.json')}}
            >load</button>
        </div>
        <div>
            ${
                state ? yo `<img src=${state} />` : yo `<p>:(</p>`
            }
        </div>
    </main>
`

const reduce = (state, action) => fetch(action).then(res => res.json()).then(res => res.src)

d.body.appendChild(app(create, null, reduce))
```

## api

### var app = require('yo-yo-bind')

```js
var dom = app(create, state, reduce)
```

#### create

`create` is a function. tate 2 arguments. returns `DOM`.

```js
const crate = (state, dispatch) => {
  return app.html `
    <div>
      <button onclick=${ev => dispatch('UPDATE', +1)}>INC</button>
      <button onclick=${ev => dispatch('UPDATE', -1)}>DEC</button>
      <h1>${state.count}</h1>
    </div>
  `
}
```

* `state`.
* `dispatch` is function. take 2 arguments(`type`, `action`).
  * `type`
  * `action`

#### state

#### reduce

`reduce` is a function. take 3 arguments(`state`, `action`, `type`). returns `new state` or `Promise object`.

```js
const xtend = require('xtend')
const reduce = (state, action, type) => {
  if (type === 'UPDATE') {
    return xtend(state, {count: action})
  }
  return state
}
```

async

```js
const xtend = require('xtend')
const reduce = (state, action, type) => {
  if (type === 'UPDATE') {
    return new Promise(resolve => {
      setTimeout(() => resolve(xtend(state, {count: action})), 1000)
    })
  }
  return state
}
```

* `state`
* `action`
* `type`

