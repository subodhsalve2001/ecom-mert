import { Button } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Razorpay } from '../components'
import { initiatePaymentAction, placeOrderAction, verifyPaymentAction } from '../redux/user/actions/orderAction'
import { getProducts } from '../redux/user/reducers/productReducer'

export default function BuyNow() {
    const { singleProduct } = useSelector(getProducts)
    const [mode, setMode] = useState("online")
    const dispatch = useDispatch()
    const { qty } = useParams()
    return <>
        <Razorpay total={singleProduct.price * qty} type="buynow" details={{ productId: singleProduct._id, qty }} />
        <Link to='/'>Back</Link>
        <h1>{singleProduct.name}</h1>
        <h1>{qty}</h1>
        <input type="radio" onChange={e => setMode(e.target.value)} name='mode' value='pod' /> COD
        <input type="radio" onChange={e => setMode(e.target.value)}
            name='mode' value='online' /> Online
        <hr />
        <button onClick={e => {
            if (mode === "online") {
                dispatch(initiatePaymentAction(singleProduct.price * qty))
            } else {
                dispatch(placeOrderAction({ productId: singleProduct._id, qty, type: "buynow" }))
            }
        }}>{mode === "online" ? "Pay online" : "Place order"}</button>
    </>

}
