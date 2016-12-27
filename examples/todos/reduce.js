const xtend = require('xtend')

const model = {
    ADD_TODO (state, action) {
        return xtend(state, {
            text: ""
          , todos: [createTodo(state.text)].concat(state.todos)
        })
    }
,
    UPDATE_TEXT (state, action) {
        return xtend(state, {text: action.value})
    }
,
    TOGGLE_TODO (state, action) {
        const todo  = action.value
        const todos = state.todos.map(t => t.id === todo.id
                           ? xtend(t, {isCompleted: ! t.isCompleted}) : t)
        return xtend(state, {todos: todos})
    }
,
    UPDATE_FILTER (state, action) {
        const filter = xtend(state.filter, {focus: action.value})
        return xtend(state, {filter: filter})
    }
}

module.exports = (state, action) => {
    return model[action.type] ? model[action.type](state, action) : state
}

function createTodo (value) {
    const now = Date.now()
    return {
        text: value.trim()
      , modified: now
      , created: now
      , id: now
      , isCompleted: false
    }
}
