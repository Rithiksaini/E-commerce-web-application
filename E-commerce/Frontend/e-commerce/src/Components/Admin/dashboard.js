import { Link } from "react-router-dom"
export default function Dashboard(){
    return(
        <>
        <div className="container-fluid px-4">
<h1 className="text-center" style={{marginTop:'5%'}}>Dashboard</h1>


<div className=" text-center row">
    <div className="  col-md-6 col-xl-6">
        <Link to={"/admin/product"}><div className="card bg-secondary order-card">
            <div className="card-block">
                <h6 className="m-b-20 fs-3 text-center text-light">Product</h6>
                <h2 className="text-right text-light"><i className="fa fa-cart-plus"></i><span className='f-right'></span></h2>

            </div>
        </div></Link>
    </div>

    <div className="col-md-6 col-xl-6">
    <Link to={"/admin/customer"}>   <div className="card bg-c-green order-card">
            <div className="card-block">
                <h6 className="m-b-20 fs-3 text-center text-light">Customers</h6>
                <h2 className="text-right text-light"><i className="fa fa-user "></i><span className='f-right'></span></h2>

            </div>
        </div>
        </Link>
    </div>
    </div>
    </div>
        </>
    )
}

