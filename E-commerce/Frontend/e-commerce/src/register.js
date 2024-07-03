
import { useState } from "react";
import "./register.css"
import { Link, useNavigate } from "react-router-dom";
import ApiServices from "./services/ApiServices";
import { ToastContainer, toast } from "react-toastify";

export default function Registration() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [name, setName] = useState("")
  const [gender,setGender] =useState("")
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

  const userName = (event) => { setEmail(event.target.value) };
  const pass = (event) => { setPassword(event.target.value) };
  const addres = (event) => { setAddress(event.target.value) };
  const number = (event) => { setContact(event.target.value) };
  const letter = (event) => { setName(event.target.value) };
  const cgender = (event)=> {setGender(event.target.value)};

  const nav = useNavigate()

  const handleForm = (event) => {
    event.preventDefault()
    let data = {
      name:name,
      email: email,
      password: password,
      contact:contact,
      address:address,
      gender:gender
    }
    ApiServices.register(data).then((response)=>{
      console.log(response);
      if(response.data.success==true){
          toast.success(response.data.message)
          let data1={
              email:email,
              password:password
          }
          // console.log(data1);
          ApiServices.login(data1).then((res)=>{
              if(res.data.success==true){
                  sessionStorage.setItem("userData",JSON.stringify(res.data.data))
                  sessionStorage.setItem("userId",res.data.data._id)
                  sessionStorage.setItem("token",res.data.token)
                  
                  localStorage.setItem("token",res.data.token)
                  if(res.data.data.userType==1){
                      nav("/admin")
                  }else{
                      nav("/")
                  }
              }
          })
      }else{
          toast.error(response.data.message)
      }
  }).catch((err)=>{
      console.log(err);
  })
}
  return (
    < >
    <ToastContainer/>
    <div className="body">
      <div className="rcontainer">
        <div className="d-flex">
        <div className="title">Register as Customer</div>
        <div style={{marginLeft:"40%"}} className="title ">EXIDE</div>
        </div>
        <br/>
        <div className="content">
          <form onSubmit={handleForm}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input type="text" value={name} onChange={letter} placeholder="Enter your name" required="" />
              </div>
              {/* <div className="input-box">
                <span className="details">Username</span>
                <input type="text"  placeholder="Enter your username" required="" />
              </div> */}
              <div className="input-box">
                <span className="details">Email</span>
                <input type="email" value={email} onChange={userName} placeholder="Enter your email" required="" />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={contact} maxLength={10} minLength={10} onChange={number} placeholder="Enter your number" required="" />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="password" value={password} onChange={pass} placeholder="Enter your password" required="" />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={address} onChange={addres} placeholder="Enter your Address" required="" />
              </div>
            </div>
            <div className="gender-details">
              <input value='male' onChange={cgender} type="radio" name="gender" id="dot-1" />
              <input value='female' onChange={cgender} type="radio" name="gender" id="dot-2" />
              <input value='other' onChange={cgender} type="radio" name="gender" id="dot-3" />
              <span className="gender-title text-light">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one" />
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two" />
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three" />
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
            </div>
            <div className="button">
              <input type="submit" defaultValue="Register" />
            </div>
          </form>
        </div>
      </div>
      </div>
    </>


  )
}