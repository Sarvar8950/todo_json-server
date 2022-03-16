import React from 'react'
import { GroceryInput } from './GroceryInput'
import { GroceryList } from './GroceryList'
import {v4 as uuid} from "uuid"

function Grocery() {
    const [item, setItem] = React.useState([])
    function getdata() {
        fetch(`http://localhost:3001/todos`)
        .then((res) => res.json())
        .then((res) => setItem(res))
    }

    React.useEffect(() => {
        getdata()
    }, [])

    function addList(inp) {
        var obj = {
            title:inp,
            status:false,
            uuid_id : uuid()
        }
        setItem([...item, obj])

        const jsonobj = JSON.stringify(obj)
        fetch(`http://localhost:3001/todos`, {
            method : "POST",
            body : jsonobj,
            headers : {
                "content-type" : "application/json"
            }
        })
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
        fetch(`http://localhost:3001/todos/${id}`,{
            method : "DELETE"
        })
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