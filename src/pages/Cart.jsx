import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import {incQuantity,decQuantity,removeProduct,clearCart,addProduct,} from "../store/slices/cartSlice";
const Cart = () => {
    const dispatch = useDispatch();
    const { cartBasket, subtotal } = useSelector((state) => state.cart);
    return (
        <div>
        <h1>Shopping Cart</h1>
        {cartBasket?.length > 0 ? (
        cartBasket.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.title}</p>
            <p>${item.price}</p>

            <div>
              <button onClick={() => dispatch(decQuantity({ id: item.id }))}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(incQuantity({ id: item.id }))}>
                +
              </button>
            </div>

            <button onClick={() => dispatch(removeProduct({ id: item.id }))}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}

      <h3>Subtotal: ${subtotal ? subtotal.toFixed(2) : "0.00"}</h3>

      {cartBasket?.length > 0 && (
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      )}
        </div>
    )
}
export default Cart