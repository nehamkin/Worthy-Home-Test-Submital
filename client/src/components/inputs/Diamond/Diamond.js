import React from 'react'
import {FaTimes} from 'react-icons/fa'

const Diamond = (props) => {
  
  const toDelete= ()=> {
    console.log(props.diamond.id);
    props.onDelete(props.diamond.id)};

  return (
    <tr>
      <td>{props.diamond.dname}</td>
      <td>{props.diamond.carat}</td>
      <td>{props.diamond.cut}</td>
      <td>{props.diamond.color}</td>
      <td>{props.diamond.clarity}</td>
      <td>${props.diamond.price}</td>
      <td> <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={toDelete}
        /></td>
    </tr>
  )
}

export default Diamond
