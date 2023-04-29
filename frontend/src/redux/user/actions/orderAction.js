import api from "../../api"
import { BUY_NOW_FAIL, BUY_NOW_REQUEST, BUY_NOW_SUCCESS, CANCLE_ORDER_FAIL, CANCLE_ORDER_REQUEST, CANCLE_ORDER_SUCCESS, INITIATE_PAYMENT_FAIL, INITIATE_PAYMENT_REQUEST, INITIATE_PAYMENT_SUCCESS, PAYMENT_FAILED_FAIL, PAYMENT_FAILED_REQUEST, PAYMENT_FAILED_SUCCESS, PAYMENT_VERIFY_FAIL, PAYMENT_VERIFY_REQUEST, PAYMENT_VERIFY_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, USER_ORDER_HISTORY_FAIL, USER_ORDER_HISTORY_REQUEST, USER_ORDER_HISTORY_SUCCESS } from "../constants/orderConstants"

export const placeOrderAction = orderData => async (dispatch, getState) => {
    console.log(orderData, "orderData");
    try {
        console.log(orderData, "orderData");
        dispatch({ type: PLACE_ORDER_REQUEST })
        const { data } = await api.post("/order/place", orderData, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        console.log(data, "dataorder");
        dispatch({ type: PLACE_ORDER_SUCCESS })
    } catch (error) {

        dispatch({ type: PLACE_ORDER_FAIL, payload: error.message })
    }
}
export const cancleOrderAction = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: CANCLE_ORDER_REQUEST })
        const { data } = await api.put(`/order/order-cancel/${orderId}`, {}, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        console.log(data);
        dispatch({ type: CANCLE_ORDER_SUCCESS })
    } catch (error) {

        dispatch({ type: CANCLE_ORDER_FAIL, payload: error.message })
    }
}
export const getOrderHistoryAction = e => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_ORDER_HISTORY_REQUEST })
        const { data } = await api.get("/order/order-history", {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: USER_ORDER_HISTORY_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: USER_ORDER_HISTORY_FAIL, payload: error.message })
    }
}
export const initiatePaymentAction = orderData => async (dispatch, getState) => {
    try {
        dispatch({ type: INITIATE_PAYMENT_REQUEST })
        const { data } = await api.post("/order/payment", orderData, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: INITIATE_PAYMENT_SUCCESS, payload: data.order.id })
    } catch (error) {

        dispatch({
            type: INITIATE_PAYMENT_FAIL, payload: {
                message: error.response.data.message || error.message, err: error.response.data.err || []
            }
        })
    }
}
export const verifyPaymentAction = response => async (dispatch, getState) => {
    console.log(response, "response");
    try {
        dispatch({ type: PAYMENT_VERIFY_REQUEST })
        const { data } = await api.post("/order/payment/verify", response, {
            headers: { authorization: getState().auth.userLogin.token }
        })
        dispatch({ type: PAYMENT_VERIFY_SUCCESS })
    } catch (error) {

        dispatch({ type: PAYMENT_VERIFY_FAIL, payload: error.message })
    }
}
export const paymentFailedAction = err => async (dispatch, getState) => {
    try {
        dispatch({ type: PAYMENT_FAILED_REQUEST })
        // const { data } = await api.post("/order/payment/verify", response, {
        //     headers: { authorization: getState().auth.userLogin.token }
        // })
        dispatch({ type: PAYMENT_FAILED_SUCCESS, payload: err })
    } catch (error) {

        dispatch({ type: PAYMENT_FAILED_FAIL, payload: error.message })
    }
}
export const buyNowAction = err => async (dispatch, getState) => {
    try {
        dispatch({ type: BUY_NOW_REQUEST })
        // const { data } = await api.post("/order/payment/verify", response, {
        //     headers: { authorization: getState().auth.userLogin.token }
        // })
        dispatch({ type: BUY_NOW_SUCCESS, payload: err })
    } catch (error) {

        dispatch({ type: BUY_NOW_FAIL, payload: error.message })
    }
}