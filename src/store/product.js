import { createSlice } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    recommendList: [],
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
      //   console.log(state.productList);
    },
    setRecommendList(state, action) {
      state.recommendList = action.payload;
    },
  },
});

export const { setProductList, setRecommendList } = productSlice.actions;
const db = getFirestore(app);
const fetchFeatureList = () => {
  return async (dispatch) => {
    const q = query(
      collection(db, "productList"),
      where("isFeatured", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      const res = doc.data();

      arr.push(res);
    });
    dispatch(setProductList(arr));
  };
};

const fetchRecommendList = () => {
  return async (dispatch) => {
    const q = query(
      collection(db, "productList"),
      where("isRecommended", "==", true)
    );
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      const res = doc.data();

      arr.push(res);
    });
    dispatch(setRecommendList(arr));
  };
};

const fetchAllList = () => {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "productList"));
    const arr = [];
    querySnapshot.forEach((doc) => {
      const res = doc.data();

      arr.push(res);
    });
    dispatch(setProductList(arr));
  };
};

export { fetchFeatureList, fetchRecommendList, fetchAllList };
const productReducer = productSlice.reducer;
export default productReducer;
