import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices"
import { Link } from "react-router-dom"
import { Fragment } from "react"

export default function Product() {
    const [productData, setProductData]= useState([])
    useEffect(()=>{
        ApiServices.product().then((res)=>{
            setProductData(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
},[])
    return (
        <>
            <main>
                <div className="container-fluid px-4">
                <h1 className="text-center" style={{marginTop:'5%'}}>Dashboard</h1>
                    <div className=" breadcrumb mb-4">
                        <h6 className="text-center breadcrumb-item active">Dashboard/Product</h6>
                    </div>
                    <hr />
                    <div className=" m-auto col-xl-8  col-sm-12">
                        <div style={{ height: '50vh', overflow: 'auto' }} className="categorycard card mb-4">
                            <div className="card-header">
                                <i className="fas fa-book me-1" />
                              Product
                                <Link to={"/admin/product/add"} style={{ float: "right" }} className="btn btn-outline-success "> Add</Link>
                            </div>

                            <div className="card-body">
                                <table className="table table-responsive table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Price</th>
                                            <th className="Productimage" scope="col">Image</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {productData?.map((el, index) => (
                                            <Fragment key={index}>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        {el.name}
                                                    </td>
                                                    <td >
                                                    &#8377;{el.price}
                                                    </td>
                                                    <td className="Productimage"><img style={{ height: "50px", width: '60%', borderRadius: "10px" }} src={"http://localhost:5000/" + el.image} /></td>
                                                    <td>
                                                        <Link to={"/admin/product/update/" + el._id} className="categorybutton1 btn btn-outline-success"><i className="bi bi-pencil-square "></i></Link>
                                                        {/* {el.status == true ? <button className="categorybutton2 btn btn-outline-danger ms-1" onClick={() => { changeStatus(el._id, el.status) }}>Disable</button> : <button className="categorybutton2 btn btn-outline-success ms-1" onClick={() => { changeStatus(el._id, el.status) }}>Enable</button>} */}

                                                    </td>
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
        </>

    )
}