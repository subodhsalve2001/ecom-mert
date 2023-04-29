import { ADD_TO_CART_FAIL, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, EMPTY_CART_FAIL, EMPTY_CART_REQUEST, EMPTY_CART_SUCCESS, GET_CART_HISTORY_FAIL, GET_CART_HISTORY_REQUEST, GET_CART_HISTORY_SUCCESS, REMOVE_SINGLE_CART_FAIL, REMOVE_SINGLE_CART_REQUEST, REMOVE_SINGLE_CART_SUCCESS } from "../constants/CartConstants"

export const cartReducer = (state = { cart: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART_REQUEST: return {
            ...state,
            loading: true
        }
        case ADD_TO_CART_SUCCESS: return {
            ...state,
            loading: false,
            toggle: !state.toggle
        }
        case ADD_TO_CART_FAIL: return {
            ...state,
            loading: false,
            addToCartError: payload
        }
        case GET_CART_HISTORY_REQUEST: return {
            ...state,
            loading: true
        }
        case GET_CART_HISTORY_SUCCESS: return {
            ...state,
            loading: false,
            cart: payload.cartItems,
            total: payload.total
        }
        case GET_CART_HISTORY_FAIL: return {
            ...state,
            loading: false,
            getCartError: payload
        }
        case EMPTY_CART_REQUEST: return {
            ...state,
            loading: true
        }
        case EMPTY_CART_SUCCESS: return {
            ...state,
            loading: false,
            emptyCart: true,
            toggle: !state.toggle
        }
        case EMPTY_CART_FAIL: return {
            ...state,
            loading: false,
            emptyCartError: payload
        }
        case REMOVE_SINGLE_CART_REQUEST: return {
            ...state,
            loading: true
        }
        case REMOVE_SINGLE_CART_SUCCESS: return {
            ...state,
            loading: false,
            removeSingleCart: true,
            toggle: !state.toggle
        }
        case REMOVE_SINGLE_CART_FAIL: return {
            ...state,
            loading: false,
            removeSingleCartError: payload
        }
        default: return state
    }
}

export const getCartData = state => state.allCart