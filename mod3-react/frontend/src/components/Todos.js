import React from 'react'
import Todo from './Todo'

export default function Todos({selectedTodos}) {

  return (
    <div>
      {selectedTodos.map(todo => {
        return (
          <Todo key={todo.id}>{todo}</Todo>
        )
      })}
    </div>
  )
}
