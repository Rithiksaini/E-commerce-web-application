
import { useState, Fragment } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import "./login.css"
import ApiServices from "./services/ApiServices";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const userName = (event) => { setEmail(event.target.value) };
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
  const pass = (event) => { setPassword(event.target.value) };
  const nav = useNavigate()

  const handleForm = (event) => {
    event.preventDefault()
    let data = {
      email: email,
      password: password
    }
    ApiServices.login(data).then((res) => {
      if (res.data.success == true) {
        toast.success(res.data.message)
        sessionStorage.setItem("userData", JSON.stringify(res.data.data))
        sessionStorage.setItem("userId", res.data.data._id)
        sessionStorage.setItem("token", res.data.token)
        localStorage.setItem("token", res.data.token)
        if (res.data.data.userType == 1) {
          nav("/admin")
          toast.success("Login successfully")
        }
      
        else if (res.data.data.userType == 2) {
          nav("/")
          toast.success("Login successfully")
        }
      } else {
        toast.error(res.data.message);
      }
    }).catch((err) => {
      console.log(err);
      toast.error("Something went wrong")
    })

  }
  return (
    <Fragment>
      <ToastContainer />
      <div className="containerr">
        <div className="card carder">
          <div className="logo">
            <img
              src="https://icon-library.com/images/username-icon/username-icon-24.jpg"
              alt=""
            />
          </div>
          <div className="text-center mt-2 name">EXIDE</div>
          <form autoComplete="off" onSubmit={handleForm} className="p-3 mt-3">
            <div className="form-field d-flex align-items-center">
              <span style={{ color: 'white' }} className="far fa-user" />
              <input className="input1" type="text" name="userName" value={email} onChange={userName} id="userName" placeholder="Email" />
            </div>
            <div className="form-field d-flex align-items-center">
              <span style={{ color: 'white' }} className=" fas fa-key" />
              <input className="input1" type="password" value={password} onChange={pass} name="password" id="pwd" placeholder="Password" />
            </div>
            <button className="buttn btn mt-3">Login</button>
          </form>
          <div className="text-center fs-6">
            <Link to={"/register"}>Not a User?</Link>  <Link to="/register">Sign up</Link>
          </div>
        </div>
      </div>
      <button className="d-none" onClick={topFunction}  id="movetop" title="Go to top">
        <span className="fa fa-level-up-alt" aria-hidden="true" />
      </button>
      
    </Fragment>


  )
}