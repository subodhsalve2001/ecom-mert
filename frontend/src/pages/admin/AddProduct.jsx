
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input, Switch } from '@mui/material';

import { InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { purple } from "@mui/material/colors";
import { addProductAction } from "../../redux/admin/actions/productAction";
const theme = createTheme({
    color: "red",
});
//modal css
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddProduct() {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const formik = useFormik({
        initialValues: {
            name: "",
            brand: "",
            // image: [],
            category: "",
            desc: "",
            price: "",
            stock: "",

        },
        validationSchema: yup.object({
            name: yup.string().required("Please Enter Your Product Name"),

            brand: yup.string().required("Please Enter Brand Name"),

            // image: yup
            //     .array[string]
            //     .required("Please choose images "),

            category: yup
                .string()
                .required("Please Choose Category "),

            desc: yup
                .string()
                .required("Please Enter description "),
            price: yup
                .string()
                .required("Please Enter price "),
            stock: yup
                .number()
                .required("Please Enter price "),
        }),
        onSubmit: (values, e) => {
            console.log(values);
            const fd = new FormData()
            fd.append("name", values.name)
            fd.append("brand", values.brand)
            fd.append("category", values.category)
            fd.append("desc", values.desc)
            fd.append("price", values.price)
            fd.append("stock", values.stock)
            fd.append("publish", checked)
            // for (const [key, val] of values.entries()) {
            //     console.log(key, val,"key");
            // }
            for (let i of images) {
                fd.append("image", i)
            }
            for (let i of fd.entries()) {
                console.log(i, "i");
            }
            dispatch(addProductAction(fd))
            // for (let e of fd.entries()) {
            //     console.log(e);
            // }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{ bgcolor: "secondary" }} component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        bgcolor: "danger",
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily: "revert-layer",
                    }}
                >
                    {JSON.stringify(images)}
                    <Typography component="h1" variant="h4">
                        Add Product
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    color="secondary"
                                    fullWidth
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.name && formik.touched.name
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    id="name"
                                    label="Product Name"
                                    name="name"
                                // autoComplete="email"
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.name}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    color="secondary"
                                    fullWidth
                                    name="brand"
                                    value={formik.values.brand}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.brand && formik.touched.brand
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    label="Name Brand"
                                    type="text"
                                    id="brand"
                                // autoComplete="family-name"
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.brand}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel id="demo-simple-select-label">Select Category*</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="category"
                                    fullWidth
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.category && formik.touched.category
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    type="text"
                                >
                                    <MenuItem value={"cloths"}>cloths</MenuItem>
                                    <MenuItem value={"electronics"}>electronics</MenuItem>
                                    <MenuItem value={"gadgets"}>gadgets</MenuItem>
                                    <MenuItem value={"footware"}>footware</MenuItem>
                                </Select>
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.category}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} >
                                <TextField
                                    required
                                    color="success"
                                    fullWidth
                                    name="desc"
                                    value={formik.values.desc}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.desc && formik.touched.desc
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    label="desc"
                                    type="text"
                                    id="desc"
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.desc}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    color="warning"
                                    fullWidth
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.price && formik.touched.price
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    label="price"
                                    type="text"
                                    id="price"
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.price}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    color="secondary"
                                    fullWidth
                                    name="stock"
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.stock && formik.touched.stock
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    label="stock"
                                    type="number    "
                                    id="stock"
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.stock}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                {/* <Input
                                    required
                                    color="secondary"
                                    fullWidth

                                    name="image"
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.image && formik.touched.image
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    // label="image"
                                    type="file"
                                    id="image"
                                    multiple
                                />
                                <Typography
                                    sx={{ color: "red", fontFamily: "revert-layer" }}
                                    className="invalid-feedback"
                                >
                                    {formik.errors.image}
                                </Typography> */}
                                <input
                                    multiple
                                    type="file"
                                    class="form-control"
                                    id="image"
                                    placeholder="Enter Your name"
                                    onChange={e => setImages(e.target.files)}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                IsPublish :<Switch
                                    checked={checked}
                                    onChange={handleChange}

                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Grid>


                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Product
                        </Button>

                    </Box>
                </Box>
            </Container>
           
        </ThemeProvider >




    );
}