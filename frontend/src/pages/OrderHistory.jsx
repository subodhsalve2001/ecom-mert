import { Alert, Button, CardMedia, CircularProgress, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { URL } from '../redux/api'
import { cancleOrderAction, getOrderHistoryAction } from '../redux/user/actions/orderAction'
import { getOrdersData } from '../redux/user/reducers/orderReducer'

export default function OrderHistory() {
  const dispatch = useDispatch()
  const { orders, loading, orderHistoryError, toggle } = useSelector(getOrdersData)
  useEffect(() => {
    dispatch(getOrderHistoryAction())
  }, [toggle])

  if (loading) {

    return <CircularProgress />
  }
  if (orderHistoryError) return <Alert severity='error'>{orderHistoryError}</Alert>
  return <>
    <h1>order-history</h1>
    <Grid container>
      <Grid item mdOffset="2" md={8} >
        {
          orders.map(item => <Paper>
            <Typography variant='h5'>Order Status:{item.orderStatus}</Typography>
            {item.products.map(i => <>    <CardMedia
              component="img"
              height="100"
              image={`${URL}/${i.productId.image[0]}`}
            />
              <Typography variant='h5'>
                Name:   {i.productId.name}
              </Typography>
              <Typography variant='h6'>
                Price:  {i.productId.price}
              </Typography>
              <Typography variant='h6'>
                Qty:  {i.qty}
              </Typography>
            </>)}
            {
              item.orderStatus !== "cancel" &&
              <Button variant='outlined' color='error' onClick={e => dispatch(cancleOrderAction(item._id))} >Cancel Order </Button>
            }
          </Paper>)
        }

        {/* <CardMedia
          component="img"
          height="194"
          image={`${URL}/${product.image[0]}`}
          alt={`${URL}/${product.image[0]}`}
        /> */}
      </Grid>
    </Grid>
  </>
}
