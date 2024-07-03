import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  
  const token = sessionStorage.getItem("token")
  const nav = useNavigate()
  const logOut = () => {
    if (window.confirm("Do you really want to Logout")) {
      sessionStorage.clear()
      localStorage.clear()
      toast.success("Logged  Out Successfully")
      setTimeout(() => { nav("/") }, 500)

    }
  }
  const location = useLocation();


    return(
        <>
   <header id="site-header" className=" bg-secondary-subtle fixed-top">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand fs-1" to="/">
              <span className="text-success">Exide</span>Batteries
              <i className="bi bi-car-front-fill" />
            </Link>
            <button
              className=" navbar-toggler collapsed"
              type="button"
          
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon fa icon-expand fa-bars" />
              
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav ms-auto  my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <Link to={"/"} className={`nav-link fs-3 ${location.pathname==="/"?"active text-success":""}`} aria-current="page" >
                    Home
                  </Link>
                </li>
                {!!token &&
                <li className="nav-item">
                  <div class="dropdown">
                    <a className="fs-3 nav-link dropdown-toggle"  href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="bi bi-person-gear "></i>
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><Link class="dropdown-item" to={"/cart"}>Your Cart</Link></li>
                      <li><Link class="dropdown-item" to={"/profile"}>Profile</Link></li>
                    </ul>
                  </div>
                </li>
                }

              </ul>
            </div>

            <ul>
              <li className="nav-item">
                {!token ?
                  <Link className="mt-3 btn btn-outline-success fs-6 rounded-pill" to={"/login"}>Login</Link>
                  :
                  <>
                    <Link  className="mt-3 btn btn-outline-success fs-6 rounded-pill" onClick={logOut} >Logout</Link>
                  </>
                }
              </li>
            </ul>

          </nav>
        </div>
        
      </header>
        </>
    )
}