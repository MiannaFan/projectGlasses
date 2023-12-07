import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useBasket from "../hooks/useBasket";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useProduct from "../hooks/useProduct";
import { setNewColorListredux } from "../store/product";

export default function ProductDetail() {
  const { id } = useParams();
  const { isInBasket, removeBasket, AddBasket } = useBasket();
  const recommendList = useSelector((state) => state.product.recommendList);
  const productList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  const product = productList.filter((item) => item.id === id);

  // Create the new colorlist for once
  const { getColorList } = useProduct();
  useEffect(() => {
    getColorList(product);
  }, [id]);
  const newColorList = useSelector((state) => state.product.newColorList);

  // Handle click to select the color we click by the index
  const handleClickColor = (item, index) => {
    setColor(item.newcolor);
    console.log(index);
    dispatch(setNewColorListredux(index));
  };

  // Set the first picture showed as the first in ths list while id changes
  let [imageUrl, setImageUrl] = useState();
  useEffect(() => {
    setImageUrl(product[0].image);
  }, [id]);

  // Handle click to select the size
  const [size, setSize] = useState(product[0].sizes[0]);
  const handleChange = (event) => {
    setSize(event.target.value);
  };

  // Handel click to add the product to basket with some initial information we selected
  const [color, setColor] = useState(product[0].availableColors[0]);
  const handleClick = (item) => {
    AddBasket({
      ...item,
      count: 1,
      totalPrice: item.price,
      selectSize: size,
      selectColor: color,
    });
  };

  const handleClickRemove = (id) => {
    removeBasket(id);
  };
  return (
    <>
      <Outlet />
      <div className="productDetailContent">
        <div className="content_main">
          <NavLink to="/shop">
            <div className="title">
              <img src="/assets/left-arrow.png" alt="" />
              <span>Back to shop</span>
            </div>
          </NavLink>
          <div className="product-modal">
            <div className="product-left">
              <ul>
                {product.map((product) => {
                  return (
                    <li key={product.id}>
                      {product.imageCollection.map((item) => {
                        return (
                          <div key={item.id}>
                            <img
                              src={item.url}
                              alt=""
                              onClick={() => setImageUrl((imageUrl = item.url))}
                            />
                          </div>
                        );
                      })}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="product-middle">
              <img src={imageUrl} alt="" />
            </div>
            <div className="product-right">
              <div className="name">{product[0].name}</div>
              <div className="brand">{product[0].brand}</div>

              <div className="discribe">{product[0].description}</div>
              <hr />
              <div>Lens Width and Frame Sizes</div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ zIndex: "0" }}
                  >
                    -Select Size-
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={size}
                    label="Size"
                    onChange={handleChange}
                  >
                    <MenuItem value="24">{product[0].sizes[0]}mm</MenuItem>
                    <MenuItem value="36">{product[0].sizes[1]}mm</MenuItem>
                    <MenuItem value="48">{product[0].sizes[2]}mm</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div>Choose Color</div>
              <ul>
                {newColorList.map((item, index) => {
                  return (
                    <li key={index}>
                      <div
                        style={{ backgroundColor: item.newcolor }}
                        onClick={() => handleClickColor(item, index)}
                      ></div>
                      <div
                        className="done"
                        style={{
                          display: item.isSelectColor ? "flex" : "none",
                        }}
                      >
                        <img src="/assets/done.png" alt="done" />
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="price">${product[0].price}.00</div>

              {isInBasket(product[0].id) ? (
                <button
                  className="removeBasketButton"
                  type="button"
                  value={product[0].id}
                  onClick={() => handleClickRemove(product[0].id)}
                >
                  Remove from basket
                </button>
              ) : (
                <button
                  className="addBasketButton"
                  type="button"
                  value={product[0]}
                  onClick={() => handleClick(product[0])}
                >
                  Add to basket
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="product productRecommend">
        <div className="title">
          <h1>Recommended Products</h1>
          <NavLink to="/recommended">See All</NavLink>
        </div>
        <ul>
          {recommendList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <div className="productDetail">
                    <div className="picture">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="detail">
                      <h2>{item.name}</h2>
                      <p>{item.brand}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
