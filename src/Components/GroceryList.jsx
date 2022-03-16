import React from 'react'
import "./GroceryList.css"

function GroceryList({title,status,id,togglebtn,deletebtn}) {
    return (
        <div className='todo'>
            <h2>{title}</h2>
            <p>{status ? "Completed" : "Not Completed"}</p>
            <button className='toggle' onClick={() => togglebtn(id)}>Toggle</button>
            <button className='delete' onClick={() => deletebtn(id)}>Delete</button>
        </div>
    )
}

export {GroceryList}