import React from 'react'

export default function Summary({doneTodos, undoneTodos, totalTodos}) {
  return (
    <div className="m-4 pt-4 space-x-4">
      <span>Total de tarefas: <strong>{totalTodos}</strong> </span>
      <span>Tarefas cumpridas: <strong className="text-green-600">{doneTodos}</strong> </span>
      <span>Tarefas não cumpridas: <strong className="text-red-600">{undoneTodos}</strong> </span>
    </div>
  )
}
