import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_GET_FAIL, PRODUCT_GET_REQUEST, PRODUCT_GET_SUCCESS } from "../constants/productConstants"

export const productReducer = (state = { products: [], singleProduct: {} }, { type, payload }) => {
    switch (type) {
        case PRODUCT_GET_REQUEST: return {
            ...state,
            loading: true
        }
        case PRODUCT_GET_SUCCESS: return {
            ...state,
            loading: false,
            products: payload
        }
        case PRODUCT_GET_FAIL: return {
            ...state,
            loading: false,
            getProductsError: payload
        }
        case PRODUCT_DETAIL_REQUEST: return {
            ...state,
            loading: true
        }
        case PRODUCT_DETAIL_SUCCESS: return {
            ...state,
            loading: false,
            singleProduct: payload
        }
        case PRODUCT_DETAIL_FAIL: return {
            ...state,
            loading: false,
            singleProductError: payload
        }


        default: return state
    }
}

export const getProducts = state => state.allProducts