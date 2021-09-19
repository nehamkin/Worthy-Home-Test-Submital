import React from 'react'

const CaratInput = (props) => {
  
  const handleFocus = (event) => event.target.select();
  
  return (
    <div>
      <label> Carat:  
        <div>
      <input type="number"
      min="0"  
      id="carat" 
      step="0.01"
      value = {props.diamond.carat} 
      defaultValue='0.00' 
      onChange={(e)=>props.changeC('carat', e.target.value)}
      onFocus={handleFocus}>
      </input>
      </div>
      </label>
    </div>
  )
}

export default CaratInput
