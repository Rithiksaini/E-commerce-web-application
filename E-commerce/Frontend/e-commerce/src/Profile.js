import { useEffect, useState } from "react"
import Apiservices from "./services/ApiServices"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"


export default function Profile() {
 const [data,setData]= useState([])

  useEffect(() => { getData() }, [])
  const getData = (e) => {
    let data = {
      userId: sessionStorage.getItem("userId"),
    }
    Apiservices.singleCustomerProfile(data).then((res) => {
      console.log(res)
      if (res.data.success == true) {
        setData(res.data.data)
      }
      else {
        toast.error(res.data.message)
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }
  
  return (
    <>
      <ToastContainer />
      <div style={{marginTop:"80px"}} className="container-fluid">
        <h2 className="fw-bold mt-5 text-dark text-center" >Profile</h2>
    </div>
      

            <div className="container  py-md-4">
              <div className="row">
                <div className="col-sm-12 col-md-8 offset-md-2">

                  <div className="card mb-4 mt-3">
                    <div className="row">
                      <div className="col-md">
                        <div className="card-body text-capitalize">
                          <div className="text-center">
                            <h4 className="card-title">{data.name}</h4>
                            <p>Email: {data.email}</p>
                            <p>Phone: {data.contact}</p>
                            <p>Addresss: {data.address}</p>
                            <p>Gender: {data.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          
      
    </>
  )
}