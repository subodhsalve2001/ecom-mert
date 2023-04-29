import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPasswordAction } from '../redux/user/actions/authActions'
import { getUserAuthData } from '../redux/user/reducers/authReducer'

export default function ForgetPassword() {
    const [email, setemail] = useState("aartiwadgaonkar05@gmail.com")
    const dispatch = useDispatch()
    return (
        <Box sx={{ marginTop: 15 }}>
            <input type="text" value={email} onChange={e => setemail(e.target.value)} />
            <button onClick={e => dispatch(forgetPasswordAction(email))}>Change Password</button>
        </Box>
    )
}
