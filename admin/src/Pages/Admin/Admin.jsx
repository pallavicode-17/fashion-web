import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ProductList from '../../Components/ProductList/ProductList'
import Orders from '../../Components/Order/Orders'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/list-product' element={<ProductList/>}/>
        <Route path="/Orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default Admin