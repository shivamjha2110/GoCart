import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let debounceTimer = null

export const uploadCart = createAsyncThunk('cart/uploadCart', 
    async ({ getToken }, thunkAPI) => {
        try {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(async ()=> {
                const { cartItems } = thunkAPI.getState().cart;
                const token = await getToken();
                await axios.post('/api/cart', {cart: cartItems}, { headers: { Authorization: `Bearer ${token}` } })
            },1000)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchCart = createAsyncThunk('cart/fetchCart', 
    async ({ getToken }, thunkAPI) => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/cart', {headers: { Authorization: `Bearer ${token}` }})
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        total: 0,
        cartItems: {},
    },
    reducers: {
        addToCart: (state, action) => {
            const { productId } = action.payload;
            // 1. Add/Update Item
            if (state.cartItems[productId]) {
                state.cartItems[productId] += 1;
            } else {
                state.cartItems[productId] = 1;
            }
            // 2. Recalculate Total (Safe Method)
            state.total = Object.values(state.cartItems).reduce((sum, qty) => sum + qty, 0);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        removeFromCart: (state, action) => {
            const { productId } = action.payload;

            if (state.cartItems[productId]) {
                if (state.cartItems[productId] > 1) {
                    state.cartItems[productId] -= 1;
                } else {
                    delete state.cartItems[productId];
                }
            }
            // Recalculate Total
            state.total = Object.values(state.cartItems).reduce((sum, qty) => sum + qty, 0);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        deleteItemFromCart: (state, action) => {
            const { productId } = action.payload;
            delete state.cartItems[productId];

            // Recalculate Total
            state.total = Object.values(state.cartItems).reduce((sum, qty) => sum + qty, 0);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        // Force Clear Action
        clearCart: (state) => {
            state.cartItems = {};
            state.total = 0;
            // Save to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('cart', JSON.stringify(state.cartItems))
            }
        },
        loadCartFromStorage: (state) => {
            if (typeof window !== 'undefined') {
                const cart = localStorage.getItem('cart')
                if (cart) {
                    state.cartItems = JSON.parse(cart)
                    state.total = Object.values(state.cartItems).reduce((acc, item) => acc + item, 0)
                }
            }
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchCart.fulfilled, (state, action)=>{
            state.cartItems = action.payload.cart
            state.total = Object.values(action.payload.cart).reduce((acc, item)=>acc + item, 0)
        })
    }
})

export const { addToCart, removeFromCart, clearCart, deleteItemFromCart, loadCartFromStorage } = cartSlice.actions

export default cartSlice.reducer
