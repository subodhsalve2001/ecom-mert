import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useState } from 'react';

export default function PaymentForm({setMode}) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3} paddingX={2}   marginTop={5}>
       
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Choose payment method</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="pod"
            name="paymentMode"
          >
            <FormControlLabel onChange={e=>setMode(e.target.value)} value="pod" control={<Radio />} label="pay on delivery" />
            <FormControlLabel onChange={e=>setMode(e.target.value)} value="online" control={<Radio />} label="pay online" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}