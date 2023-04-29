import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, BuyNow, Cart, Checkout, OrderHistory, Protected } from '../pages'
import PaymentFail from '../pages/PaymentFail'

import UserLayout from './layout/UserLayout'

export default function UserRoutes() {
  return <Routes>
    <Route path='/user' element={<UserLayout/>}>
      <Route path='order-history' element={<Protected element={<OrderHistory />} />}></Route>
      <Route path='cart' element={<Protected element={<Cart />} />}></Route>
      <Route path='account' element={<Protected element={<Account />} />} ></Route>
      <Route path='checkout' element={<Protected element={<Checkout  />} />} ></Route>
      <Route path='payment-fail' element={<Protected element={<PaymentFail  />} />} ></Route>
      <Route path='buynow/:id/:qty' element={<Protected element={<BuyNow  />} />} ></Route>
    </Route>
  </Routes>
}
