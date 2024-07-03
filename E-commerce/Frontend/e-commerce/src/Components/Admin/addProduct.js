import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import Apiservices from "../../services/ApiServices"
export default function Addproduct() {
    const inp1 = {
        width: "75%",
        height: 45,
        borderRadius: 8,
        paddingLeft: 20,

    }
    const [productName, setProductName] = useState("")
    const [productDetail, setProductDetail] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productImage, setProductImage] = useState("")
    const [productImageName, setProductImageName] = useState("")

    const addName = (e) => { setProductName(e.target.value) }
    const addPrice = (e) => { setProductPrice(e.target.value) }
    const addDetail = (e) => { setProductDetail(e.target.value) }
    const addImage = (e) => {
        setProductImageName(e.target.value);
        setProductImage(e.target.files[0]) }

        const handleForm = (event) => {
            event.preventDefault()
            const data = new FormData()
            data.append("name", productName)
            data.append("detail",productDetail)
            data.append("price",productPrice)
            data.append("picture", productImage)
           Apiservices.adminaddProduct(data).then((res) => {
                if (res.data.success == true) {
                    toast.success("Product Added")
                    setProductName("")
                    setProductDetail("")
                    setProductPrice("")
                    setProductImageName("")
                    setProductImage({})
                } else {
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                toast.error("Something went Wrong! Try again later")
                console.log(err);
            })
        }
   
    return (
        <>
            <ToastContainer />
           
              
                        <div className="container-fluid px-4">
                        <h1 className="text-center" style={{marginTop:'5%'}}>Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className=" breadcrumb-item active">Dashboard/Add product</li>
                            </ol>
                            <hr />
                            <div className="container">
                                <div className="row">
                                    <div className="m-auto card mb-4 col-md-7 col-sm-12">
                                        <div className="card-header">
                                            <h3 className=" text-danger">Add product</h3>
                                        </div>
                                        <form onSubmit={handleForm} className="mx-3 my-3">
                                        <input className="mb-4" style={inp1} type="text" onChange={addName} placeholder="Name" value={productName} />
                                        <input className=" w-25 mb-4" style={inp1} type="text" onChange={addPrice} placeholder="Price" value={productPrice} />
                                        <input className="mb-4" style={inp1} type="text" onChange={addDetail} placeholder="Description" value={productDetail} />
                                            <input className="mb-4" style={inp1} type="file" placeholder="image" onChange={addImage} value={productImageName} />
                                           
                                            <br />
                                            <button className=" mx-5 buttn w-25 bg-danger">Add</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        
        </>
    )
}