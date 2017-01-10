const xtend = require('xtend')

const model = {
  ADD_TODO (state) {
    return xtend(state, {
      text: '',
      todos: [createTodo(state.text)].concat(state.todos)
    })
  },
  UPDATE_TEXT (state, text) {
    return xtend(state, {text: text})
  },
  TOGGLE_TODO (state, todo) {
    const todos = state.todos.map(t => t.id === todo.id ? xtend(t, {isCompleted: !t.isCompleted}) : t)
    return xtend(state, {todos: todos})
  },
  UPDATE_FILTER (state, index) {
    const filter = xtend(state.filter, {focus: index})
    return xtend(state, {filter: filter})
  }
}

module.exports = (state, action, type) => (model[type] ? model[type](state, action) : state)

function createTodo (value) {
  const now = Date.now()
  return {
    text: value.trim(),
    modified: now,
    created: now,
    id: now,
    isCompleted: false
  }
}
