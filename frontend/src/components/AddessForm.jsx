import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/user/reducers/authReducer';

export default function AddressForm() {
  const { userLogin } = useSelector(getUserAuthData)
  const userData = [
    { label: "enetr name", val: userLogin ? userLogin.name : "",disable:true },
    { label: "enetr house", val: userLogin ? userLogin.house : "" },
    { label: "enetr landmark", val: userLogin ? userLogin.landmark : "" },
    { label: "enetr city", val: userLogin ? userLogin.city : "" },
    { label: "enetr state", val: userLogin ? userLogin.state : "" },
    { label: "enetr pincode", val: userLogin ? userLogin.pincode : "" },
    { label: "enetr mobile no", val: userLogin ? userLogin.mobile : "" }
  ]

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        {
          userData.map(item => <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                disabled={item?.disable}
                id={item.val}
                name={item.val}
                label={item.label}
                fullWidth
                value={item.val}
                autoComplete={item.val}
                variant="standard"
              />
            </Grid>


          </>)
        }
      </Grid>
    </React.Fragment>
  );
}