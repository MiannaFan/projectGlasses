import { useSelector, useDispatch } from "react-redux";
import { setRemoveBasket, setBasketList } from "../store/userSlice";

export default function useBasket() {
  const isSignIn = useSelector((state) => state.user.isSignIn);
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.user.basketList);
  // To judge if the product already in the basket after signin
  const isInBasket = isSignIn
    ? (id) => basketList.find((item) => item.id === id)
    : () => undefined;
  // Only can add to basket after signin
  const AddBasket = isSignIn
    ? (item) => {
        dispatch(setBasketList(item));
      }
    : () => {};

  const removeBasket = (id) => {
    const newBasket = basketList.filter((item) => item.id !== id);
    console.log(newBasket);
    dispatch(setRemoveBasket(newBasket));
  };

  const clearBasket = () => {
    const newBasket = [];
    dispatch(setRemoveBasket(newBasket));
  };

  return { isInBasket, removeBasket, clearBasket, AddBasket };
}
