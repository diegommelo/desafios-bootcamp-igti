import React, {useState, useEffect} from 'react'
import { apiGetTodosFrom, MONTHS, YEARS } from './api/api'
import Select from './components/Select'
import Summary from './components/Summary'
import Todos from './components/Todos'

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

    let done, undone = 0;
    
    done = selectTodos.filter(({done}) => {
      return done
    }).length

    undone = selectTodos.filter(({done}) => {
      return !done
    }).length

  return (
    <div className="flex flex-col space-y-2 " >
      <div className="flex flex-col text-center  space-y-4">
        <h1 className="text-4xl my-2 p-6 font-bold bg-gray-200">React Todos</h1>
        <Select 
          options={YEARS}
          onSelect = {handleChangeYear}
          selectValue={selectYear}
        />
        <Select 
          options={MONTHS}
          onSelect = {handleChangeMonth}
          selectValue={selectMonth}
        />      
      </div>
      <Summary totalTodos={done+undone} doneTodos={done} undoneTodos={undone} />
      <Todos selectedTodos={selectTodos} />
    </div>
  )
}
