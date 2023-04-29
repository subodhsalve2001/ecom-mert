import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { paymentFailedAction } from '../redux/user/actions/orderAction'
import { getOrdersData } from '../redux/user/reducers/orderReducer'

export default function PaymentFail() {
    const { paymentFailedError } = useSelector(getOrdersData)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch  (paymentFailedAction("fail"))
    }, [])

    return <>
        <Typography variant='h1'>Payment Fail</Typography>
        <Typography>{paymentFailedError}</Typography>
        <Link to="/user/checkout/?redirect=fail">Retry</Link>
    </>
}
