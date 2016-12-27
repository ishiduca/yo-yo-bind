const yo = require('yo-yo')
const domcss = require('dom-css')

function css (dom, style) {
    domcss(dom, style)
    return dom
}

function listItem (state, dispatch, todo) {
    const text = (state.filter.focus === 2 && todo.isCompleted)
               ? todo.text
               : (state.filter.focus === 1 && ! todo.isCompleted)
               ? todo.text
               : (state.filter.focus === 0)
               ? todo.text
               : ''

    if (! text) return

    return css(yo `
        <li onclick=${ev => {
            dispatch(state, {
                type: 'TOGGLE_TODO'
              , value: todo
            })
        }}>${text}</li>    
    `, {
        cursor: 'pointer'
      , textDecoration: todo.isCompleted ? 'line-through' : 'none'
    })
}

function tab (state, dispatch, val, index) {
    return css(yo `
        <div>
            ${
                (index !== state.filter.focus) 
                ? yo `<a
                        href="#"
                        onclick=${ev => {
                            ev.preventDefault()
                            dispatch(state, {
                                type: 'UPDATE_FILTER'
                              , value: index
                            })
                        }}
                      >${val}</a>`
                : val
            }
        </div>
    `, {
        margin: '6px'
    })
}

function tabs (state, dispatch) {
    return css(yo `
        <div>
            ${state.filter.values.map((v, i) => tab(state, dispatch, v, i))}
        </div>
    `, {
        display: 'flex'
      , flexDirection: 'row'
    })
}

module.exports = (state, dispatch) => {
    return yo `
        <main>
            ${tabs(state, dispatch)}
            <form
                onsubmit=${ev => {
                    ev.preventDefault()
                    dispatch(state, {type: 'ADD_TODO'})
                }}
            >
                <input
                    type="text"
                    required
                    placeholder="todo"
                    onchange=${ev => {
                        dispatch(state, {
                            type: 'UPDATE_TEXT'
                          , value: ev.target.value
                        })
                    }}
                    value=${state.text}
                />
            </form>
            <ul>
                ${state.todos.map(todo => listItem(state, dispatch, todo))}
            </ul>
        </main>
    `
}
