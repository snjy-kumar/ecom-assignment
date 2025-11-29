import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface cartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface cartState {
    items: cartItem[];
}

const initialState: cartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<cartItem>) => {
            const existItem = state.items.find(item => item.id === action.payload.id)
            if(existItem) {
                existItem.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        increaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if(item) {
                item.quantity += 1;
            }
        },
        decreaseQty: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if(item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter(item => item.id !== action.payload);
            }

        },
        clearCart: (state) => {
            state.items = [];
        }

    }
})

export const { addItem, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;