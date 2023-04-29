import React from 'react'
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { getUserAuthData } from '../redux/user/reducers/authReducer'
const Protected = ({ element }) => {
    const { userLogin } = useSelector(getUserAuthData)
    return userLogin ? element : <Navigate to="/login/?redirected=401" />
}

export default Protected