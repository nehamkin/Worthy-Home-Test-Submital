import React from 'react'
import Diamond from './inputs/Diamond/Diamond'

const DiamondName = (props) => {
  
  const handleFocus = (event) => event.target.select();

  return (
    <div>
    <label> Name: 
      <div>
    <input type="text"
     value={props.diamond.dname}  
     id="name" 
     onChange={(e)=>props.changeC(props.id, e.target.value)}
     onFocus={handleFocus}>
       </input>    
       </div>
       </label> 
    </div>
  )
}

export default DiamondName
