import React from 'react'
import { GroceryInput } from './GroceryInput'
import { GroceryList } from './GroceryList'
import {v4 as uuid} from "uuid"

function Grocery() {
    const [item, setItem] = React.useState([])
    function addList(inp) {
        var obj = {
            title:inp,
            status:false,
            id : uuid()
        }
        setItem([...item, obj])
    }
    function togglebtn(id) {
        var updata = item.map((item) => 
            item.id === id ? {...item,status : !item.status} : item 
        )
        setItem(updata)
    }
    function deletebtn(id) {
        var updata = item.filter((item) => 
            item.id !== id && item 
        )
        setItem(updata)
    }
    return (
        <>
            <GroceryInput addList={addList}/>
            <h1>Todo Lists</h1>
            {item.map((item) =>
                <GroceryList {...item} key={item.id} togglebtn={togglebtn} deletebtn={deletebtn}/>
            )}
        </>
    )
}

export {Grocery}