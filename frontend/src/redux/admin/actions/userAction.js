import api from "../../api"
import { GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, UPDATE_USER_STATUS_FAIL, UPDATE_USER_STATUS_REQUEST, UPDATE_USER_STATUS_SUCCESS } from "../constants/userConstant"

export const getUserProfileAction = productData => async (dispatch, getState) => {
    try {
        // console.log(productData);
        dispatch({ type: GET_USERS_REQUEST })

        const { data } = await api.get("/employee/users", {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: GET_USERS_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: GET_USERS_FAIL, payload: error.message })
    }

}
export const updateUserStatusAction = user => async (dispatch, getState) => {
    try {
        // console.log(productData);
        dispatch({ type: UPDATE_USER_STATUS_REQUEST })

        const { data } = await api.put(`/employee/users/status/${user._id}`, user, {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: UPDATE_USER_STATUS_SUCCESS })
    } catch (error) {

        dispatch({ type: UPDATE_USER_STATUS_FAIL, payload: error.message })
    }

}