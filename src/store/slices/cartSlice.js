import {createSlice} from "@reduxjs/toolkit";
import {addToLocalStorage, getFromLocalStorage} from "../../storage/localStorage";

const initialState = [];
const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            addToCart(state, {payload: product}) {
                const existingProduct = state.find(p => p.id === product.id);
                if (existingProduct) {
                    existingProduct.cartQuantity++;
                }
                else {
                    state.push({...product, cartQuantity: 1});
                }
            },
            deleteFromCart(state, {payload: productId}) {
                return state.filter(p => p.id !== productId);
            },
            increaseQuantity(state, {payload: productId}) {
                const product = state.find(p => p.id === productId);

                if (product) {
                    product.cartQuantity++;
                }
            },
            decreaseQuantity(state, {payload: productId}) {
                const product = state.find(p => p.id === productId);

                if (product) {
                    product.cartQuantity--;
                }
            }
        }
    }
);

let cartState = [];
const subscribeToStore = (store) => {
    store.subscribe(() => {
        const cart = store.getState().cart;
        if(cartState !== cart) {
            addToLocalStorage('cart', cart);
            cartState = cart;
        }
    });
}

const loadProductsFromLocalStorage = () => getFromLocalStorage('cart') || [];

export default cartSlice.reducer;

export const {
    addToCart,
    deleteFromCart,
    increaseQuantity,
    decreaseQuantity
} = cartSlice.actions;

export {
    subscribeToStore,
    loadProductsFromLocalStorage
}
