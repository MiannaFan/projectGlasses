// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRemoveBasket, setBasketList } from "../store/userSlice";

export default function useBasket() {
  const isSignIn = useSelector((state) => state.user.isSignIn);
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.user.basketList);

  const isInBasket = isSignIn
    ? (id) => basketList.find((item) => item.id === id)
    : () => undefined;

  const AddBasket = (item) => {
    dispatch(setBasketList(item));
  };
  const removeBasket = (id) => {
    const newBasket = basketList.filter((item) => item.id !== id);
    console.log(newBasket);
    dispatch(setRemoveBasket(newBasket));
  };

  const clearBasket = () => {
    const newBasket = [];
    dispatch(setRemoveBasket(newBasket));
  };

  //add the  key "count"to basketList
  // const addCount = () => {
  //   basketList.forEach((element) => {
  //     console.log(element);
  //     element.count = 1;
  //     dispatch(setRemoveBasket(basketList));
  //   });
  // };
  //根据id 增加商品的数量
  const addQuantity = (id) => {
    // const newBasketList = basketList;
    // const basketProduct = newBasketList.find((item) => item.id === id);
    // basketProduct.count += 1;
    basketList.forEach((item) => {
      id === item.id ? (item.count += 1) : (item.count += 0);
    });

    dispatch(setRemoveBasket(basketList));
  };
  return { isInBasket, removeBasket, clearBasket, addQuantity, AddBasket };
}
