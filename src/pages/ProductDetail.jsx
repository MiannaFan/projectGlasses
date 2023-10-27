import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { fetchRecommendList } from "../store/product";
import { setBasketList } from "../store/userSlice";
import useBasket from "../hooks/useBasket";
import { app } from "../service/config";
// import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Recommended from "./Recommended";

export default function ProductDetail() {
  const { id } = useParams();
  const { isInBasket, removeBasket } = useBasket();
  const dispatch = useDispatch();
  let [imageUrl, setImageUrl] = useState();
  //   console.log(imageUrl);
  const recommendList = useSelector((state) => state.product.recommendList);
  const productList = useSelector((state) => state.product.productList);

  const product = productList.filter((item) => item.id === id);

  useEffect(() => {
    setImageUrl((imageUrl = product[0].image));
  }, [id]);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClick = (item) => {
    dispatch(setBasketList(item));
  };
  const handleClickRemove = (id) => {
    console.log(id);
    removeBasket(id);
  };
  return (
    <>
      <Outlet />
      <div className="content">
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
              <div className="brand">{product[0].brand}</div>
              <div className="name">{product[0].name}</div>
              <div className="discribe">{product[0].description}</div>
              <hr />
              <div>Lens Width and Frame Sizes</div>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    -Select Size-
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>{product[0].sizes[0]}mm</MenuItem>
                    <MenuItem value={20}>{product[0].sizes[1]}mm</MenuItem>
                    <MenuItem value={30}>{product[0].sizes[2]}mm</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div>Choose Color</div>
              <ul>
                {product[0].availableColors.map((item, index) => {
                  return (
                    <li key={index}>
                      <div style={{ backgroundColor: item }}></div>
                    </li>
                  );
                })}
              </ul>

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
