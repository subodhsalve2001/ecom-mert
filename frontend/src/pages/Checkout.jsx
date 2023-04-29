import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddessForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/user/reducers/authReducer';
import { initiatePaymentAction, paymentFailedAction, placeOrderAction, verifyPaymentAction } from '../redux/user/actions/orderAction';
import { getCartData } from '../redux/user/reducers/CartReducer';
import { getOrdersData } from '../redux/user/reducers/orderReducer';

import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { getCartHistoryAction } from '../redux/user/actions/cartActions';
import { useEffect } from 'react';
import { useState } from 'react';
import { Razorpay } from '../components';



const theme = createTheme();

export default function Checkout() {
    const { initiatePaymentError } = useSelector(getOrdersData)
    const [mode, setMode] = useState("pod")
    const steps = ['Shipping address', 'Payment details', 'Review your order'];

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm setMode={setMode} />;
            case 2:
                return <Review />;
            default:
                throw new Error('Unknown step');
        }
    }
    const { userLogin } = useSelector(getUserAuthData)
    const { orderId, loading, paid, paymentFailedError } = useSelector(getOrdersData)

    const { total, cart } = useSelector(getCartData)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useParams()
    const [params] = useSearchParams()
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        if (activeStep != 2) {

            setActiveStep(activeStep + 1);
        }
    };

    console.log("activeStep before", activeStep);
    const handleBack = () => {
        // console.log("activeStep after", activeStep);
        setActiveStep(activeStep - 1);
    };
    // useEffect(() => {
    //     if (paymentFailedError) {
    //         navigate("/user/payment-fail")
    //     }
    // }, [paymentFailedError])

    useEffect(() => {
        if (params.get("redirect") == "fail") {
            setActiveStep(2)
        }
    }, [params])




    React.useEffect(() => {
        if (paid) {
            setActiveStep(activeStep + 1)
        }
        dispatch(getCartHistoryAction())
    }, [paid])

    useEffect(() => {
        if (initiatePaymentError) {

            navigate("/user/cart")
        }
    }, [initiatePaymentError])


    if (cart.length === 0 && !paid) return <Box>
        <Typography variant='h3'>No cart Item</Typography>
        <Link to='/'> Start Shopping Now</Link>
        {/* <Navigate to="/" /> */}
    </Box>


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Razorpay total={total} type="cart" />
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && paid ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                            <Link to="/user/order-history">Orders</Link>
                            <Link to="/"> continue shopping </Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <h1>{mode}</h1>
                                <Button
                                    variant="contained"
                                    onClick={e => {
                                        handleNext()
                                        if (activeStep === steps.length - 1) {
                                            if (mode === "online") {
                                                dispatch(initiatePaymentAction({ cart, total, type: "cart" }))

                                            } else {
                                                dispatch(placeOrderAction({ type: "cart" }))

                                            }
                                        }
                                    }}
                                    sx={{ mt: 3, ml: 1 }}

                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider >
    );
}