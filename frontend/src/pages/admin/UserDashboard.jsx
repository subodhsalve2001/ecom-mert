import { Box, Button, Grid, Modal, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileAction, updateUserStatusAction } from '../../redux/admin/actions/userAction';
import { getAllUsersProfile } from '../../redux/admin/reducers/userReducer';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

export default function UserDashboard() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { users, toggle } = useSelector(getAllUsersProfile)
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
    const [editData, setEditData] = useState({
        name: "aarti", email: "", mobile: ""
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserProfileAction())
    }, [toggle])
    const [inp, setInp] = useState("")
    const fetchUsers = async e => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/employee/search", {
                params: {
                    term: inp
                }
            })
            console.log(data.result);
        } catch (error) {
            console.log(error);
        }
    }
    const debounceValue = useDebounce(inp, 2000)
    useEffect(() => {
        fetchUsers()
    }, [debounceValue])

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         fetchUsers()
    //     }, 500);

    //     return e => clearTimeout(timer)
    // }, [inp])

    return <Box>

        <input type="text" onChange={e => setInp(e.target.value)} />

        <TableContainer >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Mobile</TableCell>
                        <TableCell align="center">city</TableCell>
                        <TableCell align="center">Pincode</TableCell>
                        <TableCell align="center">state</TableCell>
                        <TableCell align="center">Active</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(item => <>
                            <TableRow>
                                <TableCell align="center">{item.name}</TableCell>
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center">{item.mobile}</TableCell>
                                <TableCell align="center">{item.city}</TableCell>
                                <TableCell align="center">{item.pincode}</TableCell>
                                <TableCell align="center">{item.state}</TableCell>
                                <TableCell align="center">
                                    <Switch
                                        checked={item.active}
                                        onChange={e => dispatch(updateUserStatusAction({ ...item, active: e.target.checked }))}
                                    />
                                </TableCell>
                                {/* <TableCell align="center">
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} >
                                            <Button
                                                type="submit"
                                                onClick={e => {
                                                    setEditData(item)
                                                    handleOpen()
                                      
                                                }}
                                                variant="contained"
                                            >
                                                Edit
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </TableCell> */}

                            </TableRow>
                        </>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>

        {/* //modal window */}
        <div>
            {
                editData && <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            User Profile
                        </Typography>
                        <TextField
                            required
                            color="secondary"
                            fullWidth
                            value={editData.name}
                            onChange={e => setEditData({ ...editData, name: e.target.value })}
                            id="name"
                            label="Product Name"
                            name="name"
                        />
                    </Box>
                </Modal>
            }
        </div>
    </Box >
}