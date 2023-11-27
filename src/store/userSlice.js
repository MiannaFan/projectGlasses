import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: true,
    showFilter: false,
    basketList: [{ count: 1, totalPrice: 0, selectSize: "" }],
    isSignIn: false,
    userList: [],
    email: "",
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setShowFilter(state, action) {
      state.showFilter = action.payload;
    },
    setBasketList(state, action) {
      state.basketList = [...state.basketList, action.payload];
    },
    setIsSignIn(state, action) {
      state.isSignIn = action.payload;
    },

    setRemoveBasket(state, action) {
      state.basketList = action.payload;
    },
    setUser(state, action) {
      state.userList = action.payload;
    },
    setUserEmail(state, action) {
      state.email = action.payload;
    },

    setBasketlistCount(state, action) {
      const basketProduct = state.basketList.find(
        (item) => item.id === action.payload
      );
      let itemCount = basketProduct.count;
      if (basketProduct) {
        basketProduct.count = itemCount + 1;
        basketProduct.totalPrice = basketProduct.count * basketProduct.price;
        console.log(basketProduct.totalPrice);
      }
    },
    setBasketlistCountMinus(state, action) {
      const basketProduct = state.basketList.find(
        (item) => item.id === action.payload
      );
      let itemCount = basketProduct.count;
      if (basketProduct && itemCount > 1) {
        basketProduct.count = itemCount - 1;
        basketProduct.totalPrice = basketProduct.count * basketProduct.price;
      }
    },
  },
});

export const {
  setIsLoading,
  setShowFilter,
  setBasketList,
  setIsSignIn,
  setRemoveBasket,
  setBasketlistCount,
  setBasketlistCountMinus,
  setUser,
  setUserEmail,
} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
