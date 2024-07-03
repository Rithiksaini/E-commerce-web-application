
import { Link } from "react-router-dom"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from "react"
import { Fragment } from "react"
import 'react-toastify/dist/ReactToastify.css'
import Apiservices from "../../services/ApiServices"
export default function Customer() {
    const [customerData, setCustomerData] = useState([])
    const [isChange, setIsChange] = useState(false)
    useEffect(() => {

        Apiservices.adminallCustomer().then((res) => {
            setCustomerData(res.data.data)
        })
            .catch((error) => {
                console.log(error);
            })
    }, [isChange])
   
    return (
        <>
            <ToastContainer />
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                    <h1 className="text-center" style={{marginTop:'5%'}}>Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className=" breadcrumb-item active">Dashboard/Customers</li>
                        </ol>
                        <hr />
                        <div className=" m-auto col-xl-7 col-md-8 col-sm-12">
                            <div style={{ height: '50vh', overflow: "auto" }} className="card mb-4">
                                <div className="card-header">
                                    <i className="fas fa-user me-1" />
                                    Customer
                                </div>
                                <div className="card-body">
                                    <table className="table table-responsive table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th className="customeraddress" scope="col">Address</th>
                                                <th scope="col">Status</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {customerData?.map((el, index) => (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>
                                                            {el.name}
                                                        </td >
                                                        <td>
                                                            {el.email}
                                                        </td >
                                                        <td className="customeraddress">
                                                            {el.address}
                                                        </td >
                                                        <td className={el.userId.status == true ? "text-success" : "text-danger"}> {el.userId.status == true ? "Active" : "Inactive"} </td>
                     
                                                    </tr>
                                                </Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        </>
    )
}