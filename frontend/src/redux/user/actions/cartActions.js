import api from "../../api"
import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, GET_CART_HISTORY_FAIL, GET_CART_HISTORY_REQUEST, GET_CART_HISTORY_SUCCESS, REMOVE_SINGLE_CART_FAIL, REMOVE_SINGLE_CART_REQUEST, REMOVE_SINGLE_CART_SUCCESS } from "../constants/CartConstants"

export const addToCartAction = (cartData) => async (dispatch, getState) => {

    try {
        console.log(cartData);
        dispatch({ type: ADD_TO_CART_REQUEST })
        const { data } = await api.post("/cart/add-to-cart", cartData, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: ADD_TO_CART_SUCCESS })
    } catch (error) {
        dispatch({ type: ADD_TO_CART_FAIL, payload: error.message })

    }
}
export const getCartHistoryAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_CART_HISTORY_REQUEST })
        const { data } = await api.get(`/cart/cart-history`, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        let total = 0
        total += data.result.reduce((t, i) => t + i.price * i.qty, 0)
        dispatch({
            type: GET_CART_HISTORY_SUCCESS, payload: {
                cartItems: data.result,
                total
            }
        })
    } catch (error) {
        dispatch({ type: GET_CART_HISTORY_FAIL })
    }
}
export const emptyCartAction = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: EMPTY_CART_REQUEST })
        const { data } = await api.delete(`/cart/empty-cart`, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: EMPTY_CART_SUCCESS })
    } catch (error) {
        dispatch({ type: EMPTY_CART_FAIL })
    }
}
export const removeSingleCartAction = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: REMOVE_SINGLE_CART_REQUEST })
        const { data } = await api.delete(`/cart/cart-remove-single/${productId}`, {
            headers: {
                authorization: getState().auth.userLogin.token
            }
        })
        dispatch({ type: REMOVE_SINGLE_CART_SUCCESS })
    } catch (error) {
        dispatch({ type: REMOVE_SINGLE_CART_FAIL })
    }
}