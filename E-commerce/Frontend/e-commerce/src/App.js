import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './Components/Layout/Master';
import Home from './home';
import Login from './login';
import Registration from './register';
import Cart from './Cart';
import Single from './singleProduct';
import AdminMaster from './Components/Admin/Layout/Master';
import Dashboard from './Components/Admin/dashboard';
import Product from './Components/Admin/Product';
import Addproduct from './Components/Admin/addProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import Customer from './Components/Admin/ViewCustomer';
import Profile from './Profile';

function App() {
  return (
   <BrowserRouter>
   <Routes>

    <Route path='/admin' element={<AdminMaster/>}>
    <Route path='/admin' element={<Dashboard/>}/>
    <Route path='/admin/product' element={<Product/>}/>
    <Route path='/admin/product/add' element={<Addproduct/>}/>
    <Route path='/admin/customer' element={<Customer/>}/>
    <Route path='/admin/product/update/:id' element={<UpdateProduct/>}/>
    </Route>
   <Route path='/login' element={<Login/>} />
   <Route path='/register' element={<Registration/>}/>
    <Route path='/' element={<Master/>} >
<Route path='/' element={<Home/>}/>
<Route path='/single/:id' element={<Single/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/profile' element={<Profile/>}/>
  </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
