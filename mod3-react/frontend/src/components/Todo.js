import React from 'react'

export default function Todo({children: todo, onToggle=null}) {
  const {id, date, description, done} = todo;

  const bgTodoColor = done ? 'bg-green-200' : 'bg-red-200';

  function handleClick() {
    onToggle(id)
  }

  return (
    <div className={`m-3 my-4 p-2 space-x-4 md-shadow rounded-xl ${bgTodoColor}`} onClick={handleClick}>
      <span>
        {date.split('-').reverse().join('/')} - {description}
      </span>
    </div>
  )
}
