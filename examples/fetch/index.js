const d      = require('global/document')
const yo     = require('yo-yo')
const app    = require('../../index')

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
