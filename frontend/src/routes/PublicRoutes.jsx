import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, ProductDetail, Register } from '../pages'
import ForgetPassword from '../pages/ForgetPassword'
import ResetPassword from '../pages/ResetPassword'
import PublicLayout from './layout/PublicLayout'

export default function PublicRoutes() {
  return <Routes>
    <Route path='/' element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='forget-password' element={<ForgetPassword />} />
      <Route path='reset-password/:id' element={<ResetPassword />} />
      <Route path='product-detail/:id' element={<ProductDetail />} />
    </Route>
  </Routes>
}
