import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components'

export default function PublicLayout() {
  return <>
  <Navbar/>
  <Outlet/>
  </>
}
