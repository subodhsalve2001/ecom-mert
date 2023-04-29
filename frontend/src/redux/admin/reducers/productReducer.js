import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADMIN_GET_ALL_PRODUCT_FAIL, ADMIN_GET_ALL_PRODUCT_REQUEST, ADMIN_GET_ALL_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants"

export const employeeProductReducer = (state = { adminProduct: [] }, { type, payload }) => {
    switch (type) {
        case ADD_PRODUCT_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_PRODUCT_SUCCESS: return {
            ...state,
            loading: false,
            productAdded: true
        }
        case ADD_PRODUCT_FAIL: return {
            ...state,
            loading: false,
            productaddError: payload
        }
        case ADMIN_GET_ALL_PRODUCT_REQUEST: return {
            ...state,
            loading: true
        }
        case ADMIN_GET_ALL_PRODUCT_SUCCESS: return {
            ...state,
            loading: false,
            adminProduct: payload
        }
        case ADMIN_GET_ALL_PRODUCT_FAIL: return {
            ...state,
            loading: false,
            adminProductsError: payload
        }
        case UPDATE_PRODUCT_REQUEST: return {
            ...state,
            loading: true
        }
        case UPDATE_PRODUCT_SUCCESS: return {
            ...state,
            loading: false,
            toggle: !state.toggle,
            productUpdated: true
        }
        case UPDATE_PRODUCT_FAIL: return {
            ...state,
            loading: false,
            toggle: !state.toggle,
            productUpdatedError: payload
        }
        case DELETE_PRODUCT_REQUEST: return {
            ...state,
            loading: true
        }
        case DELETE_PRODUCT_SUCCESS: return {
            ...state,
            loading: false,
            toggle: !state.toggle,
            productDeleted: true
        }
        case DELETE_PRODUCT_FAIL: return {
            ...state,
            loading: false,
            toggle: !state.toggle,
            productDeletedError: payload
        }

        default: return state
    }
}

export const getAdminProducts = state => state.allAdminProducts

