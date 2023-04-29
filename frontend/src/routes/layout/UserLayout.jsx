import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from "react-router-dom"
import UserNavbar from '../../components/UserNavbar'
import { userLogoutAction } from '../../redux/user/actions/authActions'
import { getUserData } from '../../redux/user/reducers/userReducer'
export default function UserLayout() {
  const { error } = useSelector(getUserData)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (error && error.status === 401) {
      dispatch(userLogoutAction())
      navigate("/login")
    }
  }, [error])

  return <>
    <UserNavbar />
  </>
}
