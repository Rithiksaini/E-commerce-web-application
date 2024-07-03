import axios from 'axios'
import { toast } from 'react-toastify'

export const BASE_URL = 'http://localhost:5000/'
class ApiServices {
    getToken() {
        let obj = {
            Authorization: sessionStorage.getItem('token')
        }
       
        if (!obj) {
            toast.error("Please Login / Your session is expired please login again.")
        }
        return obj
    }
    login(data) {
        return axios.post(BASE_URL + 'user/login', data)
    }
    register(data) {
        return axios.post(BASE_URL + 'customer/register', data)
    }
    allProducts() {
        return axios.get(BASE_URL + 'customer/products')
    }
    product(){
        return axios.get(BASE_URL + 'admin/products',{headers:this.getToken()})
    }
  adminaddProduct(data){
    return axios.post(BASE_URL + 'admin/products',data,{headers:this.getToken()})
  }
  addCart(data){
    return axios.post(BASE_URL + 'customer/cart', data, { headers: this.getToken() })
  }
  adminallCustomer(){
    return axios.post(BASE_URL + 'admin/customer/all',{},{headers:this.getToken()})
  }
  singleCustomerProfile(data) {
    return axios.post(BASE_URL + 'admin/customer/single', data, { headers: this.getToken() })
}
}
export default new ApiServices