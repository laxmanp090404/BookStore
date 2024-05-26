import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import cartReducer from "../Slices/cartSlice";


const appStore = configureStore({
    reducer:{
      user:userReducer,
      cart:cartReducer
    }
})

export default appStore;