import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../services/ApiServices";
import axios from "axios";

export default function UpdateProduct(){


    const inp1 = {
        height: 45,
        borderRadius: 8,
        paddingLeft: 20,
    }

    const [productName ,setProductName]= useState("")
    const [productImageName, setProductImageName]= useState("")
    const [price, setPrice]= useState("")
    const [detail ,setDetail]= useState("")
    const [productImage, setProductImage]= useState({})
    const [previousImage, setPreviousImage]= useState("")
     let param = useParams()
     const id =param.id
     useEffect(()=>{
        
        axios.get("http://localhost:5000/admin/products/"+id, {headers:{Authorization:sessionStorage.getItem("token")}}).then((res)=>[
            setProductName(res.data.name),
            setPreviousImage(res.data.image),
            setPrice(res.data.price),
            setDetail(res.data.detail)
        ])
     },[])
     const nav = useNavigate()
     const handleForm =(e)=>{
      e.preventDefault()
        let data1 = new FormData()
            data1.append ("_id",id)
            data1.append("name" , productName )
            data1.append("price",price)
            data1.append("detail",detail)
            if(!!productImage){
                data1.append('picture', productImage)
            }
           axios.put("http://localhost:5000/admin/products/"+ id,(data1), {headers:{Authorization:sessionStorage.getItem("token")}}).then((res) => {
                if (res.data.success === true) {
                    toast.success("Updated successfully")
                   setTimeout(()=>{
                    nav(-1)
                   },1000)
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err)=>{
                toast.error("Something went wrong")
            })
     }
const deleted =()=>{
    axios.delete("http://localhost:5000/admin/products/"+id, {headers:{Authorization:sessionStorage.getItem('token')}}).then((res)=>{
        toast.success("Deleted successfully")
        setTimeout(()=>{
            nav(-1)
           },1000)
})
.catch((err)=>{
    toast.error("Something went wrong")
}

)
}


    return (
        <>
   <ToastContainer/>
  
                    <div className="container-fluid px-4">
                    <h1 className="text-center" style={{marginTop:'5%'}}>Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="text-center breadcrumb-item active">Dashboard/Update product</li>
                        </ol>
                        <hr />

                        <div className="container">
                            <div className="row">

                                <div className="m-auto card mb-4 col-lg-8 col-sm-12">
                                    <div className="card-header">
                                        <h3 className=" text-success">Update product</h3>
                                        <button style={{float:'right'}} onClick={deleted}  className=" btn btn-outline-danger w-25">Delete</button>
                                    </div>
                                    <form onSubmit={handleForm} className="mx-3 my-3">
                                        <input className="mb-4 w-50" style={inp1} type="text"onChange={(e) => { setProductName(e.target.value) }} placeholder="Name" value={productName} />
                                        <img className="mx-2" src={BASE_URL + previousImage} style={{ height: "50px" }} /><br/>
                                        <input className="mb-4 w-25" style={inp1} type="text" onChange={(e)=>{setPrice(e.target.value)}}placeholder="Price" value={price}></input>
                                        <input className="mb-4 mx-4 w-50" style={inp1} type ="text" onChange={(e)=>{setDetail(e.target.value)}} placeholder="Description" value={detail}></input>
                                        <input className="mb-4" style={inp1} type="file" placeholder="image" onChange={(e) => { setProductImageName(e.target.value); setProductImage(e.target.files[0]) }} value={productImageName} />
                                        <br />
                                        <button className=" mx-5 buttn btn btn-outline-success text-light w-25 bg-success">Update</button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
               
        </>
    )
}