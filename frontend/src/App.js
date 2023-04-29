import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from './components'
import { Home, Login, PageNotFound, ProductDetail, Register } from './pages'
import Account from './pages/Account'
import { AddProduct, EmployeeLogin, EmployeeRegister } from './pages/admin'
import OrderHistory from './pages/OrderHistory'
import Pay from './pages/Pay'
import Protected from './pages/Protected'
import AdminRoutes from './routes/AdminRoutes'
import AdminLayout from './routes/layout/AdminLayout'
import PublicRoutes from './routes/PublicRoutes'
import UserRoutes from './routes/UserRoutes'
import "./style.css"
import Test from './pages/Test'

const App = () => {
  // return < Test />
  return <>
    <BrowserRouter>
      {/* <Pay /> */}
      <AdminRoutes />
      <PublicRoutes />
      <UserRoutes />
      <Routes>

        {/* <Route path='/admin'>
          <Route path='employee/register' element={<EmployeeRegister />} />
          <Route path='employee/login' element={<EmployeeLogin />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='employee/add-product' element={<AddProduct />} />
        </Route> */}
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App