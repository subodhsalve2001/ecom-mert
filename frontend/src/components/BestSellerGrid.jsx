import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from "react-redux"
import { getAllProductsAction } from '../redux/user/actions/productActions';
import { getProducts } from '../redux/user/reducers/productReducer';
import { Alert, CircularProgress } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const BestSellerGrid = () => {
    const dispatch = useDispatch()
    const { products, loading, getProductsError } = useSelector(getProducts)
    useEffect(() => {
        dispatch(getAllProductsAction())
    }, [])
    if (products.length === 0) {
        return `<h1>No rpoducts found</h1>`
    }
    if (loading) {
        return <CircularProgress />
    }
    if (getProductsError) {
        return <Alert variant='error'>{getProductsError}</Alert>
    }
    return <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {

                products.map(item => <Grid xs={4} key={item._id}>
                    <Item><ProductCard product={item} /> </Item>

                </Grid>
                )
            }

        </Grid>
    </Box>


}

export default BestSellerGrid