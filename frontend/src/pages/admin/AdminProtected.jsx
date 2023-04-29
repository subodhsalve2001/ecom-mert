import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getEmployeeData } from '../../redux/admin/reducers/employeeReducer'

const AdminProtected = ({ element }) => {
    const { employeeLogin } = useSelector(getEmployeeData)
    // return employeeLogin ? element : "unauthorized acces"
    return employeeLogin ? element : <Navigate to="/admin" />
}

export default AdminProtected