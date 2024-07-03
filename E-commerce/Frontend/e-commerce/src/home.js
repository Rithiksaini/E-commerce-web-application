import { useEffect, useState } from "react"
import ApiServices from "./services/ApiServices"
import { Link } from "react-router-dom"


export default function Home() {
  const [product,setProduct] =useState([])
  useEffect(()=>{
    ApiServices.allProducts().then((res)=>{
      console.log(res.data.data)
      setProduct(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
    return(
        <>
    <div style={{marginTop:"80px"}} className="container-fluid">
        <h2 className="fw-bold mt-5 text-dark text-center" >OUR PRODUCT</h2>
    </div>
    <div className="container-fluid mt-5">
      <div className="row">
        {product.map((el)=>(
  <div className="col-md-4">
    <Link to={'/single/' + el._id}>
    <div style={{height:'70vh'}} className=" card">
  <img className="w-100" src={"http://localhost:5000/" + el?.image} alt="Products" />
  <figcaption >{el?.name} </figcaption>
</div><br/>
    </Link>
    

     </div>
        ))}
      

        </div>
     
    </div>
 
        </>
    )
}