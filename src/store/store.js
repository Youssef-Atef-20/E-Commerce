import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice'

const Store = configureStore({
    reducer: {
        Cart: cartSlice
    }
})

export default Store