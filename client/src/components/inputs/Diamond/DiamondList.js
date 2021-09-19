import React from 'react'
import Diamond from './Diamond'

const DiamondList = (props) => {
  return (
    <div className="scroll">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Carat</th>
          <th>Cut</th>
          <th>Color</th>
          <th>Clarity</th>
          <th>price</th>
          <th>  </th>
        </tr>
      </thead>
      <tbody>
        {props.allDiamonds.map(diamond => (<Diamond diamond={diamond} onDelete={props.onDelete} />))}
      </tbody>
    </table>
    </div>
  )
}



export default DiamondList
