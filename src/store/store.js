import cart, {loadProductsFromLocalStorage, subscribeToStore} from "./slices/cartSlice";
import {logger} from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";
import user, {getUserFromLocalStorage} from './slices/userSlice';


const createNewStore = () => {
    const store =  configureStore(
        {
            reducer: {
                cart,
                user
            },
            middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
            preloadedState :{
                cart: loadProductsFromLocalStorage(),
                user: getUserFromLocalStorage()
            }
        }
    );

    subscribeToStore(store);

    return store;
}

const store = createNewStore();

export default store;