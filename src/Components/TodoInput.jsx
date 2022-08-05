import React from 'react'
import "./TodoList.css"

function TodoInput({addList}) {
    var [inp, setInp] = React.useState("")
    function handelInp(e) {
        setInp(e.target.value)
    }
    return (
        <>
            <input className='inp' type="text" placeholder='Enter Text' onChange={handelInp} value={inp} />
            <button className='add' onClick={() => addList(inp)}>ADD</button>
        </>
    )
}

export { TodoInput }