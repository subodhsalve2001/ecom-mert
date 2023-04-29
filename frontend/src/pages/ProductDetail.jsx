import { Avatar, Box, Button, Paper, Stack, styled, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../redux/user/reducers/productReducer';
import { URL } from "../redux/api"
import { getsingleProductsDetailsAction } from '../redux/user/actions/productActions';
import { addToCartAction, getCartHistoryAction } from '../redux/user/actions/cartActions';
import { getCartData } from '../redux/user/reducers/CartReducer';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const ProductDetail = () => {
    const [stock, setStock] = useState(1)
    const [selectedImg, setSelectedImg] = useState()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { singleProduct } = useSelector(getProducts)
    const { toggle } = useSelector(getCartData)

    useEffect(() => {
        dispatch(getsingleProductsDetailsAction(id))

    }, [])
    useEffect(() => {
        dispatch(getCartHistoryAction())
    }, [toggle])

    if (singleProduct.image) {

        return <>
            <Box sx={{ flexGrow: 1, marginTop: "150px" }}>
                <Grid container spacing={2}>
                    <Grid sm={6}>
                        <Grid container spacing={2}>
                            <Grid xs={2}>
                                <Stack direction="column" spacing={2}>
                                    {
                                        singleProduct?.image.map(item => <img src={`${item}`} onMouseOver={e => setSelectedImg(item)} />)
                                    }
                                </Stack>
                            </Grid>
                            <Grid xs={10}>
                                {
                                    <img src={`${selectedImg ? selectedImg : singleProduct.image[0]}`} style={{ maxWidth: "100%" }} />
                                }
                                {/* <img src="https://rukminim1.flixcart.com/image/312/312/l5fnhjk0/dslr-camera/g/t/7/eos-r10-24-2-r10-canon-original-imagg4y52cybasdr.jpeg?q=70" alt="" style={{ maxWidth: "100%" }} /> */}
                            </Grid>
                        </Grid>
                        {
                            singleProduct.stock > 0 ? <>
                                <Grid container spacing={2} >
                                    <Grid mdOffset={3} md={6}>
                                        <Stack spacing={2} direction="row">
                                            <Button variant='contained' onClick={e => setStock(stock > 1 ? stock - 1 : stock)
                                            }>-</Button>
                                            <h1>{stock}</h1>
                                            <Button variant='contained' onClick={e => setStock(stock < singleProduct.stock ? stock + 1 : stock)}>+</Button>
                                        </Stack>
                                    </Grid>
                                    <Grid mdOffset={3} md={6}>
                                        <Stack spacing={2} direction="row">
                                            <Button variant='contained' color='error'><Link to={`/user/buynow/${id}/${stock}`}>Buy Now</Link></Button>
                                            <Button variant='contained' onClick={e => dispatch(addToCartAction({ productId: singleProduct._id, qty: stock }))}>Add to Cart</Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </> : <h1> <output> of stock</output></h1>
                        }
                    </Grid>
                    <Grid sm={6}>
                        <Typography variant='h4'>{singleProduct.name}
                        </Typography>
                        <Typography variant='h5'>{singleProduct.price}</Typography>
                        <Typography>{singleProduct.desc}
                        </Typography>
                    </Grid>


                </Grid>
            </Box>
        </>
    }
}

export default ProductDetail