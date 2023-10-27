import { createSlice } from "@reduxjs/toolkit";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

const userSlice = createSlice({
  name: "user",
  initialState: {
    basketList: [],
    isSignIn: false,
    // isInBasket:false,
  },
  reducers: {
    setBasketList(state, action) {
      state.basketList = [...state.basketList, action.payload];
    },
    setIsSignIn(state, action) {
      state.isSignIn = action.payload;
    },

    setRemoveBasket(state, action) {
      state.basketList = action.payload;
    },
    setBasketlistCount(state, action) {
      console.log(state.basketList);
      const basketProduct = state.basketList.find(
        (item) => item.id === action.payload
      );

      console.log(basketProduct);
      console.log(action.payload);
    },
  },
});

export const {
  setBasketList,
  setIsSignIn,
  setRemoveBasket,
  setBasketlistCount,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
