import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import axios from "axios"
import { toast } from "react-toastify"

export default function Cart() {
    const [cart, setCart] = useState([])
    let userId = sessionStorage.getItem('userId')
    useEffect(() => {
       getData()
       
    }, [])
    const getData=()=>{
        axios.get("http://localhost:5000/customer/cart/"+userId, { headers: { Authorization: sessionStorage.getItem("token") } }).then((res) => {
            console.log(res.data.data)
            setCart(res.data.data)
        })
            .catch((err) => {
                console.log(err)
            }
            )
    }
    const deleted = (id) => {
        axios.delete("http://localhost:5000/customer/cart/"+ id, { headers: { Authorization: sessionStorage.getItem("token") } }).then((res)=>{
            
            toast.success("Deleted Succesfully")
            getData()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <div style={{ marginTop: "80px" }} className="container-fluid">
                <h2 className="fw-bold mt-5 text-dark text-center" >Your Cart</h2>
            </div>
            <div className="container  py-md-4">
                <div className="row">
                    {cart.length > 0 ?
                        cart?.map((el) => (
                            <div className="col-sm-12 col-md-8 offset-md-2">

                                <div className="card mb-4 mt-3">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <img style={{ height: "12vh", width: "100%" }} src={"http://localhost:5000/" + el?.productId?.image} className="" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body text-capitalize">
                                                <div className="d-flex justify-content-between">
                                                    <h4 className="card-title">{el?.productId?.name}</h4>
                                                    <span>Quantity : {el?.quantity}</span>
                                                </div>
                                                <p className="card-text">{el?.productId?.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => { deleted(el?._id) }} style={{ width: '10%', marginLeft: '40%' }}><i className="bi bi-trash-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <>
                            <h3 className="text-center m-auto">No Data Found</h3>
                            <Link to={"/"} style={{ width: '12%' }} className="  text-center m-auto mt-5"><button className="btn btn-outline-danger ">BUY NOW</button></Link>
                        </>
                    }
                </div>
            </div>


        </>
    )
}