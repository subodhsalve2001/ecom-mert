import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddProduct, EmployeeLogin } from '../pages/admin'
import AdminProtected from '../pages/admin/AdminProtected'
import Dashboard from '../pages/admin/Dashboard'
import ProductDetail from '../pages/admin/ProductDetail'
import UserDashboard from '../pages/admin/UserDashboard'
import AdminLayout from './layout/AdminLayout'

export default function AdminRoutes() {
  return <Routes>
    <Route path='/admin' element={<AdminLayout />}>
      <Route index element={<EmployeeLogin />} ></Route>
      <Route path='dashboard' element={< AdminProtected element={<Dashboard />} />} ></Route>
      <Route path='product-detail' element={< AdminProtected element={<ProductDetail />} />} ></Route>
      <Route path='add-product' element={<AdminProtected element={<AddProduct />} />} ></Route>
      <Route path='user-dashboard' element={<AdminProtected element={<UserDashboard />} />} ></Route>
    </Route>
  </Routes>
}
