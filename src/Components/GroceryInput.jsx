import React from 'react'
import "./GroceryList.css"

function GroceryInput({addList}) {
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

export { GroceryInput }