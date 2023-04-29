import api from "../../api"
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADMIN_GET_ALL_PRODUCT_FAIL, ADMIN_GET_ALL_PRODUCT_REQUEST, ADMIN_GET_ALL_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_IMAGES_FAIL, UPDATE_PRODUCT_IMAGES_REQUEST, UPDATE_PRODUCT_IMAGES_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstants"

export const addProductAction = productData => async (dispatch, getState) => {
    console.log(productData, "productData");
    try {
        dispatch({ type: ADD_PRODUCT_REQUEST })

        const { data } = await api.post("/products/add-product", productData, {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data })
        console.log(data, "datat");
    } catch (error) {

        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message })
    }

}



export const adminGetAllProductAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_PRODUCT_REQUEST })

        const { data } = await api.get("/employee/admin-products", {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        // console.log(data);
        dispatch({ type: ADMIN_GET_ALL_PRODUCT_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: ADMIN_GET_ALL_PRODUCT_FAIL, payload: error.message })
    }

}

export const updateProductAction = (updatedData, fd) => async (dispatch, getState) => {
    console.log(updatedData, fd, "updatedData");
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const { data } = await api.put(`/products/update-product/${updatedData._id}`, fd, {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.message })
    }

}

export const updateProductImagesAction = (updatedData, fd) => async (dispatch, getState) => {
    console.log(updatedData, fd, "fd");
    try {
        dispatch({ type: UPDATE_PRODUCT_IMAGES_REQUEST })

        const { data } = await api.put(`/products/update-product-image/${updatedData._id}`, fd, {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: UPDATE_PRODUCT_IMAGES_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: UPDATE_PRODUCT_IMAGES_FAIL, payload: error.message })
    }

}

export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await api.delete(`/products//delete/${id}`, {
            headers: { authorization: getState().allEmployees.employeeLogin.token }
        })
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.result })
    } catch (error) {

        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message })
    }

}