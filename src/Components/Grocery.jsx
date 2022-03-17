import React from 'react'
import { GroceryInput } from './GroceryInput'
import { GroceryList } from './GroceryList'
import {v4 as uuid} from "uuid"
import "./Grocery.css"

function Grocery() {
    const [item, setItem] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [isError, setIsError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    function getdata() {
        setIsLoading(true)
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
        .then((res) => res.json())
        .then((res) => setItem(res))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false))
    }

    React.useEffect(() => {
        getdata();
    },[page])

    function addList(inp) {
        setIsLoading(true)
        var obj = {
            title:inp,
            status:false,
            uuid_id : uuid()
        }
        const jsonobj = JSON.stringify(obj)
        if(inp.length > 2) {
            fetch(`http://localhost:3001/todos`, {
                method : "POST",
                body : jsonobj,
                headers : {
                    "content-type" : "application/json"
                }
            })
            .then((res) => res.json())
            .then(() => getdata())
            .catch((err) => setIsError(true))
            .finally(() => setIsLoading(false))
        } else {
            alert("Add atleast 3 characters")
            setIsLoading(true)
        fetch(`http://localhost:3001/todos?_page=${page}&_limit=4`)
        .then((res) => res.json())
        .then((res) => setItem(res))
        .catch((err) => setIsError(true))
        .finally(() => setIsLoading(false))
        }
    }

    function togglebtn(id) {
        item.map((item) => {
            if(item.id === id) {
                if(item.status === true){
                    fetch(`http://localhost:3001/todos/${id}`,{
                        method : "PATCH",
                        body : JSON.stringify( { status : false } ),
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })
                    .then(() => getdata())
                } else {
                    fetch(`http://localhost:3001/todos/${id}`,{
                        method : "PATCH",
                        body : JSON.stringify( { status : true } ),
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    })
                    .then(() => getdata())
                }
            }
        })
    }

    function deletebtn(id) {
        fetch(`http://localhost:3001/todos/${id}`,{
            method : "DELETE"
        })
        .then(() => getdata())
    }

    return isLoading ? <h1>... LOADING</h1> : isError ? <h1>ERROR... SOMETHING IS WRONG</h1> : (
        <div className='container'>
            <GroceryInput addList={addList}/>
            <h1>Todo Lists</h1>
            <div className="main">
                {item.map((item) =>
                    <GroceryList {...item} key={item.id} togglebtn={togglebtn} deletebtn={deletebtn}/>
                )}
            </div>
            <br />
            <br />
            <button className='prev' disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
            <button className='next' disabled={item.length < 4} onClick={() => setPage(page+1)}>Next</button>
        </div>
    )
}

export {Grocery}