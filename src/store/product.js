import { createSlice } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    recommendList: [],
    productDetail: [],
    newColorList: [],
  },
  reducers: {
    setProductList(state, action) {
      state.productList = action.payload;
    },
    setRecommendList(state, action) {
      state.recommendList = action.payload;
    },
    setProductColor(state, action) {
      state.newColorList = action.payload;
    },

    setNewColorListredux(state, action) {
      const indexList = Array.from({
        length: state.newColorList.length,
      }).map((val, i) => {
        return i;
      });
      console.log(indexList);

      for (let i = 0; i < indexList.length; i++) {
        if (i === action.payload) {
          state.newColorList[i].isSelectColor = true;
        } else {
          state.newColorList[i].isSelectColor = false;
        }
      }
    },
  },
});

export const {
  setProductList,
  setRecommendList,
  setProductColor,
  setNewColorListredux,
} = productSlice.actions;
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
