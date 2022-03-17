import React from 'react'

function UseEffects() {
    const [count, setCount] = React.useState(0)
    const [product, setProduct] = React.useState([])


    // console.log("before")  // print at 1st place  
    // React.useEffect(() => {
    //     console.log("inside use effect")
    // })  // print last (when whole page Mount ) , it will every time when page update
    // console.log("after")  // print at 2nd place 


    // console.log("before")  // print at 1st place  
    // React.useEffect(() => {
    //     console.log("inside use effect")
    //     document.title = `Count is : ${count}`
    // }, [])  // print last, now it will not render again and again
    // console.log("after")  // print at 2nd place 


    console.log("before") 
    React.useEffect(() => {
        console.log("inside useEffect")
        document.title = `Count is : ${count}`
    }, [count]); // useEffect will run every time when count update
    console.log("after") 


    React.useEffect(() => {
        getData()
        console.log("getData render 1st time")
    }, []); // here useEffect run 1 time only

    function getData() { // fetch data using promise
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => setProduct(json))
        .catch((err) => console.log(err))
        .finally(() => console.log("final"))
    }



    return (
        <div>
            <h1>Use Effect</h1>
            <p>Count is : {count}</p>


            {/* <button onClick={() => setCount(count+1)}>ADD</button>
            <button onClick={() => setCount(count-1)}>Subtract</button> */}


            <button onClick={() => setCount(count+1)}>ADD</button>
            {product.map((item,id) => <div key={id}>Title : {item.title}</div> )}

        </div>
    )  // print at 3rd place
}

export {UseEffects}