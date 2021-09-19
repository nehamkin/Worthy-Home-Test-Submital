import React from 'react'

const SelectFromList = (props) => {
  return (
    <div className="DropDowns">
       <label> {props.name}: 
       <div>
       <select value = {props.diamond[props.id]}  onChange = {(e)=>props.changeC(props.id, e.target.value)}>
         {props.arr.map((c, i) => <option key={i} c={props[i]}>{props.arr[i]}</option>)}          
       </select>
       </div>
       </label>
    </div>
  )
}

export default SelectFromList
