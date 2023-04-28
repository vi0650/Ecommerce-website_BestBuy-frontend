import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import authService from "./services/authService";
import categoryService from "./services/categoryService";
import productService from "./services/productService";
import paymentService from "./services/paymentService";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import cartReducer from "./reducers/cartReducer";
import homeProducts from "./services/homeProducts";
import orderService from "./services/orderService";
import userOrdersService from "./services/userOrdersService";
import mailService from "./services/sendMail";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    localStorage
  }),
});

const Store = configureStore({
  reducer: {
    api: api.reducer,
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
    [orderService.reducerPath]: orderService.reducer,
    [userOrdersService.reducerPath]: userOrdersService.reducer,
    [mailService.reducerPath]: mailService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,  
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
      orderService.middleware,
      userOrdersService.middleware,
      mailService.middleware,
      api.middleware,
    ]),
});

setupListeners(Store.dispatch)
export default Store;
