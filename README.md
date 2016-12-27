# yo-yo-bind

[yo-yo-app](https://www.npmjs.com/package/yo-yo-app) is good. but, it is hard to use it with lazy handling. in such a case throw Promise.

## example

```js
const d   = require('global/document')
const yo  = require('yo-yo')
const app = require('yo-yo-bind')

const create = (state, dispatch) => {
    return yo `
        <main>
            <div>
                <button
                    onclick=${ev => dispatch(state, './snapshot.json')}}
                >load</button>
            </div>
            <div>
                ${
                    state ? yo `<img src=${state} />` : yo `<p>:(</p>`
                }
            </div>
        </main>
    `
}

const reduce = (state, action) => {
    if (action)
        return fetch(action).then(res => res.json()).then(res => res.src)
    return state
}

d.body.appendChild(app(create, null, reduce))
```
