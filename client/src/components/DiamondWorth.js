import React from 'react'

const DiamondWorth = (props) => {
  return (
    <div >
        <label className='ApproxWorth'> Approx Worth: {`$${parseInt(props.worth)}`}   </label>
    </div>
  )
}

export default DiamondWorth
