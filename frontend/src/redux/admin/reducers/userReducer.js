import { GET_USERS_FAIL, GET_USERS_REQUEST, GET_USERS_SUCCESS, UPDATE_USER_STATUS_FAIL, UPDATE_USER_STATUS_REQUEST, UPDATE_USER_STATUS_SUCCESS } from "../constants/userConstant"

export const userDashboardReducer = (state = { users: [] }, { type, payload }) => {
    switch (type) {
        case GET_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_USERS_SUCCESS: return {
            ...state,
            loading: false,
            users: payload
        }
        case GET_USERS_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        case UPDATE_USER_STATUS_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_USER_STATUS_SUCCESS: return {
            ...state,
            loading: false,
            usersStatusUpdated: true,
            toggle: !state.toggle
        }
        case UPDATE_USER_STATUS_FAIL: return {
            ...state,
            loading: false,
            error: payload
        }
        default: return state
    }
}

export const getAllUsersProfile = state => state.allUser

