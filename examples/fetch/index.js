const d    = require('global/document')
const yo   = require('yo-yo')
const app  = require('../../index')

const create = (state, dispatch) => {
  return yo `
    <main>
      <div>
        <button onclick=${ev => dispatch('HOGE', './snapshot.json')}}>
          load
        </button>
      </div>
      <div>
        ${state ? yo `<img src=${state} />` : yo `<p>:(</p>`}
      </div>
    </main>
  `
}

const reduce = (state, action, type) => fetch(action).then(res => res.json()).then(res => res.src)

d.body.appendChild(app(create, null, reduce))
