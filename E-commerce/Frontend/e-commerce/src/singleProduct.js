import { useEffect, useState } from "react"
import ApiServices from "./services/ApiServices"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"

export default function Single(){
let param = useParams()
const id = param.id
const nav = useNavigate()
const [data, setData] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:5000/customer/products/'+ id).then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    const addCart = ()=>{
        let data ={
            userId: sessionStorage.getItem("userId"),
            productId: id,
            quantity: 1
        }
        ApiServices.addCart(data).then((res)=>{
            if (!sessionStorage.getItem("userId")) {
                toast.error("Please Login")
                nav("/login")
              }
              else{toast.success("Product added to cart succesfully") }
            console.log(res) 
              
        })
        .catch((err)=>{
            console.log(err)
        })
    } 
    return(
        <>
        <ToastContainer/>
        <div style={{marginTop:"80px"}} className="container-fluid">
        <h2 className="fw-bold mt-5 text-dark text-center" >OUR PRODUCT</h2>
    </div>


    <div className=" container">
  
 
        <div style={{marginLeft:'10%'}} className=" card">
          
          <div className="path">
          <Link to={"/"}>HOME</Link>   /{data.name}
          </div>
          <div className="row">
            
            <div className="col-md-6 text-center align-self-center">
              
              <img
              style={{height:"30vh"}}
                className="image img-fluid"
                src={"http://localhost:5000/"+data.image}
              />
            </div>
            <div  className="mx-5 col-md-4 info">
              
              <div className="row title">
                
                <div className="col">
                  <h2>{data.name}</h2>
                </div>
              </div>
              <p>{data.detail}</p> <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
              <span className="fa fa-star checked" />
        
              <div className="row price">
                
                <label className="radio">
                  
                
                  <span>
                    <div className=" text-light row"> &#8377;{data.price}</div>
                  </span>
                </label>
                
              </div>
            </div>
          </div>
          
              <button style={{marginLeft:"50%"}} onClick={addCart}  className=" btnn">Add to cart</button>
            
        </div>
      </div>
      
    

        </>
    )
}