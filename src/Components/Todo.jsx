import React from 'react'

// run grocery list at    $ json-server --watch db.json --port 3001
// (it will run db.json at localhost 3001 which we use in our project )

function Todo() {
    const [inputValue, setInputValue] = React.useState("")
    const [dos, setDos] = React.useState([])

    function handelInput(e) {
        setInputValue(e.target.value)
    }

    function getTodos() {
        fetch(`http://localhost:3001/todos`)
        .then((res) => res.json())
        .then((res) => setDos(res))
        .catch((err) => console.log(err))
    }
    React.useEffect(() => {
        getTodos()
    }, []); // it will run once an load all dat present in db.json using fetch

    function handelAdd() {
        var obj = {
            title : inputValue,
            status : false
        }
        setInputValue("")
        const jsonobj = JSON.stringify(obj)
        fetch(`http://localhost:3001/todos`, {
            method : "POST",
            body : jsonobj,
            headers : {
                "content-type" : "application/json"
            }
        }).then(() => {
            getTodos();
        })
    }
    return (
        <div>
            <h1>Todo</h1>
            <input type="text" placeholder='Add Todo' value={inputValue} onChange={handelInput}/>
            <button onClick={handelAdd}>Add</button>
            {dos.map((item,id) => <div key={id}>{item.title}
            </div> )}
        </div>
    )
}

export {Todo}