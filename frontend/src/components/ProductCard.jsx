import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { URL } from '../redux/api';
import { Link } from 'react-router-dom';
export default function ProductCard({ product }) {
  return (
    <Link to={`/product-detail/${product._id}`}>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="194"
          image={`${product.image[0]}`}
          alt={`${product.image[0]}`}
        />
        <CardContent>
          <Typography variant='h4' color="green">
            {product.price}
          </Typography>
          <Typography variant='body2' color="text.secondary">
            {product.desc}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}