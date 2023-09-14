import React from 'react'

function Comment({name, content}) {
  return (
    <div className='commentContainer'>
         <h5>{name}</h5>
        <p>{content}</p>
    </div>
  )
}

export default Comment