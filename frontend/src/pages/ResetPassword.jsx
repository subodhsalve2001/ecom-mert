import { Box } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { resetPasswordAction } from '../redux/user/actions/authActions'

export default function ResetPassword() {
    const dispatch = useDispatch()
    const { id } = useParams()
    console.log(id, "idsid");
    const [password, setPassword] = useState()
    return <Box sx={{ marginTop: 10 }}>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={e => dispatch(resetPasswordAction(id, password))}>reset password</button>
    </Box>
}
