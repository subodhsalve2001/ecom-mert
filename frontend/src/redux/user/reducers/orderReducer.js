import { CANCLE_ORDER_FAIL, CANCLE_ORDER_REQUEST, CANCLE_ORDER_SUCCESS, INITIATE_PAYMENT_FAIL, INITIATE_PAYMENT_REQUEST, INITIATE_PAYMENT_SUCCESS, PAYMENT_FAILED_FAIL, PAYMENT_FAILED_REQUEST, PAYMENT_FAILED_SUCCESS, PAYMENT_VERIFY_FAIL, PAYMENT_VERIFY_REQUEST, PAYMENT_VERIFY_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, USER_ORDER_HISTORY_FAIL, USER_ORDER_HISTORY_REQUEST, USER_ORDER_HISTORY_SUCCESS } from "../constants/orderConstants"

export const orderReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case PLACE_ORDER_REQUEST: return {
            ...state,
            paid: false,
            loading: true
        }
        case PLACE_ORDER_SUCCESS: return {
            ...state,
            loading: false,
            paid: true,
            toggle: !state.toggle
        }
        case PLACE_ORDER_FAIL: return {
            ...state,
            loading: false,
            orderPlaceError: payload
        }
        case CANCLE_ORDER_REQUEST: return {
            ...state,
            loading: true
        }
        case CANCLE_ORDER_SUCCESS: return {
            ...state,
            loading: false,
            orderCancled: true,
            toggle: !state.toggle
        }
        case CANCLE_ORDER_FAIL: return {
            ...state,
            loading: false,
            orderCancleError: payload
        }
        case USER_ORDER_HISTORY_REQUEST: return {
            ...state,
            loading: true
        }
        case USER_ORDER_HISTORY_SUCCESS: return {
            ...state,
            loading: false,
            orders: payload,
            // toggle: !state.toggle
        }
        case USER_ORDER_HISTORY_FAIL: return {
            ...state,
            loading: false,
            orderHistoryError: payload
        }
        case INITIATE_PAYMENT_REQUEST: return {
            ...state,
            loading: true
        }
        case INITIATE_PAYMENT_SUCCESS: return {
            ...state,
            loading: false,
            orderId: payload,
            paid: null
        }
        case INITIATE_PAYMENT_FAIL: return {
            ...state,
            loading: false,
            initiatePaymentError: payload
        }
        case PAYMENT_VERIFY_REQUEST: return {
            ...state,
            loading: true
        }
        case PAYMENT_VERIFY_SUCCESS: return {
            ...state,
            loading: false,
            paid: true,
            orderId: null
        }
        case PAYMENT_VERIFY_FAIL: return {
            ...state,
            loading: false,
            verifyPaymentError: payload
        }

        case PAYMENT_FAILED_REQUEST: return { ...state, loading: true }
        case PAYMENT_FAILED_SUCCESS: return {
            ...state,
            loading: false,
            orderId: null,
            paymentFailedError: payload
        }
        case PAYMENT_FAILED_FAIL: return { ...state, loading: false, error: payload }
        default: return state
    }
}

export const getOrdersData = state => state.allOrders