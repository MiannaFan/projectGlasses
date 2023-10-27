import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./product";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  product: productReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [],
  whiteList: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;

// const store = configureStore({
//   reducer: reducers,
// });
// export default store;
