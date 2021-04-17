import React from 'react'

export default function Select({
  options = [],
  onSelect = null,
  selectValue = 1,
  labelDescription = 'Descrição do label'
}) {

  function handleChange(event){
    onSelect(event.currentTarget.value)
  }

  return (
    <div className="flex flex-col p-2">
      <label className="text-sm text-gray-500">{labelDescription}</label>
      <select className="bg-gray-100 p-2" value={selectValue} onChange={handleChange}>
        {options.map(({id, description}) => {
          return (
          <option value={id} key={id}>{description}</option>
          )
        })}
      </select>
    </div>
    )
}
