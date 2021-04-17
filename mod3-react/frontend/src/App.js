import React, {useState, useEffect} from 'react'
import { apiGetTodosFrom, apiUpdateTodo, MONTHS, YEARS } from './api/api'
import Select from './components/Select'
import Todo from './components/Todo'

export default function App() {

  const [selectYear, setSelectYear] = useState(2021)
  const [selectMonth, setSelectMonth] = useState(1)
  const [selectTodos, setSelectTodos] = useState([])

  useEffect(() => {
    
    async function getSelectTodos() {
      const apiTodos = await apiGetTodosFrom(selectYear, selectMonth);
      setSelectTodos(apiTodos);
    }

    getSelectTodos();

  }, [selectYear, selectMonth])

  function handleChangeYear(newYear) {
    setSelectYear(newYear)
  }

  function handleChangeMonth(newMonth) {
    setSelectMonth(newMonth);
  }

  async function handleToggle(id){
    const updatedTodos = [...selectTodos];
    const index = updatedTodos.findIndex(todo => {
      return todo.id === id
    });

    updatedTodos[index].done = !updatedTodos[index].done;
  
    await apiUpdateTodo(updatedTodos[index]);
    setSelectTodos(updatedTodos);
  }

  let done, undone = 0;
  
  done = selectTodos.filter(({done}) => {
    return done
  }).length

  undone = selectTodos.filter(({done}) => {
    return !done
  }).length

  return (
    <div className="flex flex-col space-y-2 " >
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl my-2 p-6 font-bold bg-gray-200 text-center">React Todos</h1>
        <Select 
          options={YEARS}
          onSelect = {handleChangeYear}
          selectValue={selectYear}
          labelDescription="Selecione o ano"
        />
        <Select 
          options={MONTHS}
          onSelect = {handleChangeMonth}
          selectValue={selectMonth}
          labelDescription="Selecione o mês"
        />      
      </div>

      <div className="m-4 pt-4 space-x-4">
        <span>Total de tarefas: <strong>{done+undone}</strong> </span>
        <span>Tarefas cumpridas: <strong className="text-green-600">{done}</strong> </span>
        <span>Tarefas não cumpridas: <strong className="text-red-600">{undone}</strong> </span>
      </div>

      {selectTodos.map(todo => {
        return (
          <Todo key={todo.id} onToggle={handleToggle}>{todo}</Todo>
        )
      })}

    </div>
  )
}
