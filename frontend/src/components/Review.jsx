import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { getCartData } from '../redux/user/reducers/CartReducer';
import { getUserAuthData } from '../redux/user/reducers/authReducer';

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: 'Mr John Smith' },
    { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date', detail: '04/2024' },
];

export default function Review() {
    const { cart } = useSelector(getCartData)
    const { userLogin } = useSelector(getUserAuthData)

    const [sum, setsum] = React.useState()
    React.useEffect(() => {
        let totalPrice = 0

        totalPrice += cart.reduce((t, i) => t + i.price * i.qty, 0)

        setsum(totalPrice)
    }, [cart])
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {cart.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0, display: "flex" }}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2"> {`Qty ${product.qty}`} *</Typography>
                        <Typography variant="body2">  ₹{product.price}</Typography>
                    </ListItem>
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${sum}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{userLogin.name}</Typography>
                    <Typography gutterBottom>{`${userLogin.house},${userLogin.landmark},${userLogin.city},${userLogin.state},${userLogin.pincode} `}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                    </Typography>
                    <Grid container>
                        COD/POD
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}