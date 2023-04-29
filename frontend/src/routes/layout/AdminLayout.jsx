import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../pages/admin/AdminNavbar'

export default function AdminLayout() {
  return <>
    <AdminNavbar />
    <Outlet/>
  </>
}
