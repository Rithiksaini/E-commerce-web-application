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
          <h1>
              <span className="text-success">Exide</span>Batteries
              <i className="bi bi-car-front-fill" />
              </h1>
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
                  <Link to={"/admin"} className={`nav-link fs-3 ${location.pathname==="/admin"?"active text-success":""}`} aria-current="page" >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/admin/product"} className={`nav-link fs-3 ${location.pathname==="/admin/product"?"active text-success":""}`} aria-current="page" >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/admin/customer"} className={`nav-link fs-3 ${location.pathname==="/admin/customer"?"active text-success":""}`} aria-current="page" >
                    Customers
                  </Link></li>
               

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