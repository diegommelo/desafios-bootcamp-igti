import React from 'react'

export default function Todo({children: todo}) {
  const {date, description, done} = todo;

  const bgTodoColor = done ? 'bg-green-200' : 'bg-red-200';

  return (
    <div className={`m-3 my-4 p-2 space-x-4 md-shadow rounded-xl ${bgTodoColor}`}>
      <span>
        {date.split('-').reverse().join('/')} - {description}
      </span>
    </div>
  )
}
