import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    cartBasket : [],
    totalProducts : 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducer: {
        addProduct(state, action){
            const founded = state.cartBasket.find((p) => (p.id == action.payload.id))
            if (!founded){
                state.cartBasket.push({...action.payload, quantity: 1})
                state.totalProducts = state.cartBasket.length
            } else {
                founded.quantity += 1
            }
        },
        removeProduct(state, action){
         state.cartBasket = state.cartBasket.filter((p) => p.id != action.payload.id)


        },
        clearCart(state){
           state.cartBasket = []
        }
    }
})


export const {addProduct, removeProduct, clearCart} = cartSlice.actions;
export default cartSlice.reducer;