import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '../redux/user/reducers/authReducer';
import { Button, Card, CardActions, CardContent, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getUserProfileAction, updateUserProfileAction } from '../redux/user/actions/userAction';
import { getUserData } from '../redux/user/reducers/userReducer';

export default function Account() {
    const { userLogin } = useSelector(getUserAuthData)
    const { profile, toggle } = useSelector(getUserData)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({})
    const [selectedFeild, setSelectedFeild] = useState()
    const [feilds, setFeilds] = useState([])
    useEffect(() => {
        dispatch(getUserProfileAction())
        setSelectedFeild(undefined)
    }, [toggle])
    useEffect(() => {
        if (profile) {

            const keynames = []
            for (const [key, val] of Object.entries(profile)) {
                keynames.push(key)
            }
            setFeilds(keynames)
        }
    }, [profile])

    return <Grid container>
        {JSON.stringify(selectedFeild)}
        <Grid md={8} mdOffset={2}>
            <pre>{JSON.stringify(userData)}</pre>
            <Card>
                <CardContent>
                    {
                        feilds.map(item => <Stack direction="row" justifyContent="space-between">
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {item}
                            </Typography>
                            <Typography color="green" gutterBottom>
                                {profile[item]
                                    ? <>
                                        {
                                            item === selectedFeild
                                                ? < TextField
                                                    value={userData[item]}
                                                    onChange={e => setUserData({ ...userData, [item]: e.target.value })}
                                                    placeholder={` please enter ${item}`} />
                                                : profile[item]
                                        }
                                        {
                                            item !== "name" && item !== "email" &&
                                            <Button onClick={e => setSelectedFeild(item)}>Edit</Button>
                                        }

                                    </>
                                    :
                                    <TextField onChange={e => setUserData({ ...userData, [item]: e.target.value })} placeholder={` please enter ${item}`} />}
                            </Typography>
                        </Stack>)
                    }
                    {/* <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Name
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                      {userLogin.name}
                  </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Email
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                      {userLogin.email}
                  </Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Mobile
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                      {userLogin.mobile ? userLogin.mobile:<TextField placeholder='enter mobile no'/>}
                  </Typography>
              </Stack> */}

                </CardContent>
                <CardActions>
                    <Button onClick={e => dispatch(updateUserProfileAction({ ...userData }))} size="small">Update Profile</Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
    // {
    //     userLogin.mobile ? userLogin.mobile : <input type="text" placeholder='please enter mobile'
    //     />
    // }
}
