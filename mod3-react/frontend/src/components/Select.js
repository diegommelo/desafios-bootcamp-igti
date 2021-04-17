import React from 'react'

export default function Select({
  options = [],
  onSelect = null,
  selectValue = 1
}) {

  function handleChange(event){
    onSelect(event.currentTarget.value)
  }

  return (
    <select className="bg-gray-100 p-2" value={selectValue} onChange={handleChange}>
      {options.map(({id, description}) => {
        return (
        <option value={id} key={id}>{description}</option>
        )
      })}
    </select>
  )
}
