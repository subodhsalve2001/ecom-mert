import { Button } from '@mui/material'
import React from 'react'
import api from '../redux/api'
import { useSelector } from "react-redux"
import { getUserAuthData } from '../redux/user/reducers/authReducer'
export default function Pay() {
    const { userLogin } = useSelector(getUserAuthData)
    const handlePayment = async () => {
        const amount = 500
        const { data } = await api.post("/order/payment", { amount })
        console.log(data);
        const Razor = new window.Razorpay({
            key: "rzp_test_JaZX8PVyfNpGE6",
            amount: amount * 100,
            currency: "INR",
            description: "good keyboard",
            order_id: data.order.id,
            prefill: {
                email: "john@gmail.com",
                contact: "9898989898"
            },
            image: "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg",
            handler: async response => {
                try {
                    console.log(response);
                    const { data } = await api.post("/order/payment/verify", response, {
                        headers: { authorization: userLogin.token }
                    })
                    console.log(data);
                    console.log("payment success");
                    //  backend call
                    // payment success
                } catch (error) {
                    // payment fail
                    console.log(error);
                }
            }
        })
        Razor.open()
    }
    return <>
        <Button variant='text' color='primary' onClick={handlePayment} >
            Pay
        </Button>
    </>
}
