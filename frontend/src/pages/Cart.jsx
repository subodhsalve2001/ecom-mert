import { Alert, Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { URL } from '../redux/api'
import { emptyCartAction, getCartHistoryAction, removeSingleCartAction } from '../redux/user/actions/cartActions'
import { getCartData } from '../redux/user/reducers/CartReducer'
import { getProducts } from '../redux/user/reducers/productReducer'

export default function Cart() {
    const { cart, toggle, loading, getCartError, total } = useSelector(getCartData)
    const { products } = useSelector(getProducts)
    const [sum, setsum] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartHistoryAction())
    }, [toggle])
    // let totalPrice = 0
    // useEffect(() => {

    //     totalPrice += cart.reduce((t, i) => t + i.price * i.qty, 0)

    //     setsum(totalPrice)
    // }, [cart])


    if (loading) {
        return <CircularProgress></CircularProgress>
    }
    if (getCartError) {
        return <Alert severity='error'>unable to fetch cart data</Alert>
    }
    if (cart && cart.length === 0) {
        return <Box>
            <Typography variant='h2'>No cart Item </Typography>
            <Button variant='outlined'>Start Shopping now</Button>
        </Box>
    }


    return <>
        {/* {<h1>{JSON.stringify(sum)}</h1>} */}
        <Grid container sx={{ padding: "0px 4rem" }}>
            <Grid md={6}>
                <Button variant='outlined' color='success' sx={{ m: 4 }} onClick={e => dispatch(emptyCartAction())}>Empty Cart</Button>
                {
                    cart.map(item => <Stack direction="row" gap={4}
                        sx={{ border: item.qty > item.stock ? "5px solid red" : "" }}
                    >
                        {item.image && <><img variant='square' alt="Remy Sharp" className='img-fluid' height={"400px"} width={"400px"}
                            src={`${item.image[0]}`} />
                            <Box>

                                <Typography variant='h6'>
                                    {item.price}
                                </Typography>
                                <Typography variant='h6'>
                                    {item.qty}
                                </Typography>
                                <Typography variant='h6' >
                                    {item.stock === 0 ? "out of stock" : ""}
                                </Typography>
                                <Button variant="contained" color="error" onClick={e => dispatch(removeSingleCartAction(item._id))}>
                                    Remove Item
                                </Button>
                            </Box>

                        </>}
                    </Stack>

                    )
                }
            </Grid>
            <Grid md={6}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography variant='h4' color="text.secondary" gutterBottom>
                            Price Details
                        </Typography>

                        <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Price(1 Item)
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                45000
                            </Typography>
                        </Stack>
                        <Divider />
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant='h4' color="text.secondary">
                                Total                            </Typography>
                            <Typography variant='h4' color="text.secondary">
                                {total}
                            </Typography>
                        </Stack>
                        <Typography variant='h6' color="red">
                            You have saved 1200. on this Order.
                        </Typography>
                    </CardContent>

                    <Link to="/user/checkout">Checkout</Link>
                </Card>

            </Grid>
        </Grid>
    </>
}

