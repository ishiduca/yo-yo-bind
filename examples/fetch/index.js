const d = require('global/document')
const yo = require('yo-yo')
const app = require('../../index')

const create = (state, dispatch) => {
  return yo `
    <main>
      <div>
        <button onclick=${ev => dispatch('FETCH', './snapshot.json')}}>
          load
        </button>
      </div>
      <div>
        ${state ? yo `<img src=${state} />` : yo `<p>:(</p>`}
      </div>
    </main>
  `
}

const reduce = (state, action, type) => {
  if (type === 'FETCH') {
    return dispatch => {
      fetch(action).then(res => res.json()).then(res => dispatch('IMGLOAD', res.src))
    }
  } else if (type === 'IMGLOAD') {
    return action
  }
  return state
}

d.body.appendChild(app(create, null, reduce))
