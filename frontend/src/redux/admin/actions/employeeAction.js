import api from "../../api"
import { EMPLOYEE_LOGIN_FAIL, EMPLOYEE_LOGIN_REQUEST, EMPLOYEE_LOGIN_SUCCESS, EMPLOYEE_LOGOUT, EMPLOYEE_LOGOUT_FAIL, EMPLOYEE_LOGOUT_REQUEST, EMPLOYEE_LOGOUT_SUCCESS, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS, GET_STAT_FAIL, GET_STAT_REQUEST, GET_STAT_SUCCESS } from "../constants/employeeConstant"

export const employeeRegisterAction = employeeData => async dispatch => {
    try {
        dispatch({ type: EMPLOYEE_REGISTER_REQUEST })
        const { data } = await api.post("/auth/employee/register", employeeData)
        dispatch({ type: EMPLOYEE_REGISTER_SUCCESS })
    } catch (error) {
        dispatch({ type: EMPLOYEE_REGISTER_FAIL, payload: error.message })

    }
}
export const employeeLoginAction = employeeLoginData => async dispatch => {
    try {
        dispatch({ type: EMPLOYEE_LOGIN_REQUEST })
        console.log(employeeLoginData, "employeeLoginData");
        const { data: { result } } = await api.post("/auth/employee/login", employeeLoginData, { withCredentials: true })
        // const bt = `Bearer ${result.token}`
        const data = { ...result, token: result.token }
        // console.log(data);
        console.log(localStorage.setItem("employeelogin", JSON.stringify({ employeeLogin: data })));
        dispatch({ type: EMPLOYEE_LOGIN_SUCCESS, payload: data })
    } catch (error) {

        dispatch({ type: EMPLOYEE_LOGIN_FAIL, payload: error.message })
    }

}
export const employeeLogoutAction = e => async dispatch => {
    dispatch({ type: EMPLOYEE_LOGOUT })
    localStorage.removeItem("employeelogin")
}
export const employeeStatAction = e => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_STAT_REQUEST })
        const { data } = await api.get("/employee/stat", {
            headers: {
                authorization: getState().allEmployees.employeeLogin.token
            }
        })
        dispatch({ type: GET_STAT_SUCCESS, payload: data.result })
    } catch (error) {
        dispatch({ type: GET_STAT_FAIL, payload: error })

    }
}
