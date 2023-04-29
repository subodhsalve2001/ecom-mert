import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { employeeproductReducer, employeeReducer } from "./admin/reducers/employeeReducer"
import { employeeProductReducer } from "./admin/reducers/productReducer"
import { userDashboardReducer } from "./admin/reducers/userReducer"
import { authReducer } from "./user/reducers/authReducer"
import { cartReducer } from "./user/reducers/CartReducer"
import { orderReducer } from "./user/reducers/orderReducer"
import { productReducer } from "./user/reducers/productReducer"
import { userReducer } from "./user/reducers/userReducer"
const localData = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {}
const adminLocalData = localStorage.getItem("employeelogin")
    ? JSON.parse(localStorage.getItem("employeelogin"))
    : {}
console.log(localData);
const initialState = {
    auth: localData,
    allEmployees: adminLocalData
    // allCart: {
    //     cart: localData.userLogin ? localData.userLogin.cart : []
    // }
}
const rootReducer = combineReducers({
    allProducts: productReducer,
    auth: authReducer,
    allAdminProducts: employeeProductReducer,
    allOrders: orderReducer,
    allEmployees: employeeReducer,
    user: userReducer,
    allCart: cartReducer,
    allUser: userDashboardReducer
})
const reduxStore = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default reduxStore