import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { paymentFailedAction, verifyPaymentAction } from '../redux/user/actions/orderAction'
import { getOrdersData } from '../redux/user/reducers/orderReducer'

export default function Razorpay({ total, type, details = {} }) {
    const { orderId, loading, paid, paymentFailedError } = useSelector(getOrdersData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (orderId) {
            const Razor = new window.Razorpay({
                key: "rzp_test_JaZX8PVyfNpGE6",
                amount: total * 100,
                currency: "INR",
                description: "good keyboard",
                order_id: orderId,

                image: "https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg",
                handler: async response => {

                    dispatch(verifyPaymentAction({ ...response, ...details, type }))
                    // if (paid) setActiveStep(activeStep + 1)
                },
                modal: {
                    ondismiss: () => {
                        navigate("/user/payment-fail")
                    }
                }
            })
            Razor.open()
            Razor.on('payment.failed', err => {
                dispatch(paymentFailedAction(err.error.description))
                // console.log(err.error.description);
                // Razor.close()
            })
        }
    }, [orderId])

    return <>

    </>
}
