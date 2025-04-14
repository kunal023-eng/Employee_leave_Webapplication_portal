// import {configureStore} from '@reduxjs/toolkit'
// import AuthReducer from '../features/auth/AuthSlice'
// const store = configureStore({
//     reducer:{
//         auth:AuthReducer
//     }
// })
// export default store;


// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/auth/AuthSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,  // AuthReducer is added to the store here
  },
});

export default store;
