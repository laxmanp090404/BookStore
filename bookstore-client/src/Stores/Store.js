import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlice";
import cartReducer from "../Slices/cartSlice";
import bookReducer from "../Slices/bookSlice"

const appStore = configureStore({
    reducer:{
      user:userReducer,
      cart:cartReducer,
      books:bookReducer
    }
})

export default appStore;