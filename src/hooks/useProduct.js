// Create a new color list from the product detail and transfer to redux
import { useDispatch } from "react-redux";
import { setProductColor } from "../store/product";

export default function useProduct() {
  const dispatch = useDispatch();
  const getColorList = (product) => {
    const newColorList = [];

    for (let i = 0; i < product[0].availableColors.length; i++) {
      const newColor = {
        newcolor: product[0].availableColors[i],
        isSelectColor: false,
      };
      newColorList.push(newColor);
    }
    dispatch(setProductColor(newColorList));
    return newColorList;
  };

  return { getColorList };
}
