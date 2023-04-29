import { EMPLOYEE_LOGOUT, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS, GET_STAT_FAIL, GET_STAT_REQUEST, GET_STAT_SUCCESS } from "../constants/employeeConstant"

export const employeeReducer = (state = { stats: [] }, { type, payload }) => {
    switch (type) {
        case EMPLOYEE_REGISTER_REQUEST: return {
            ...state,
            loading: true
        }
        case EMPLOYEE_REGISTER_SUCCESS: return {
            ...state,
            loading: false,
            employeeRegistered: true
        }
        case EMPLOYEE_REGISTER_FAIL: return {
            ...state,
            loading: false,
            employeeRegisteredError: payload
        }


        case EMPLOYEE_LOGOUT: return {
            loading: true,
            statError: payload
        }
        case GET_STAT_REQUEST: return {
            ...state,
            loading: false
        }
        case GET_STAT_SUCCESS: return {
            ...state,
            loading: false,
            stats: payload
        }
        case GET_STAT_FAIL: return {
            loading: true,
            statError: payload
        }
        default: return state
    }
}

export const getEmployeeData = state => state.allEmployees