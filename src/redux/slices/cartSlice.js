import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        data: JSON.parse(localStorage.getItem('cart')) || []

    },
    reducers: {
        addToCart: (state, action) => {
            const iteminCart = state.data.find((item) => item.id === action.payload.id)
            if (iteminCart) {
                iteminCart.qty++
            } else {
                state.data.push(action.payload)
            }
        },
        updateQuantity: (state, action) => {
            const { id, qty } = action.payload;
            const item = state.data.find(item => item.id === id);
            if (item) {
                if (qty <= 1) {
                    state.data = state.data.filter(item => item.id !== id);
                } else {
                    item.qty = qty;
                }
            }
        },
        deleteItem: (state, action) => {
            const { id } = action.payload;
            state.data = state.data.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(state.data));
        }
    }
})

export const { addToCart, updateQuantity, deleteItem } = cartSlice.actions
export default cartSlice.reducer 