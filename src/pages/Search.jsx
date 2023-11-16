import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useBasket from "../hooks/useBasket";

export default function Search() {
  //Get the name you input in the search box
  const { name } = useParams();
  const { AddBasket } = useBasket();
  const productList = useSelector((state) => state.product.productList);

  //Get the whole list that includes in the productList
  const searchProductList = productList.filter((item) =>
    item.name.toLowerCase().includes(`${name}`.toLowerCase())
  );

  const { isInBasket, removeBasket } = useBasket();
  const handleClick = (item) => {
    AddBasket({
      ...item,
      count: 1,
      totalPrice: item.price,
      selectSize: item.sizes[0],
      selectColor: item.availableColors[0],
    });
  };

  const handleClickRemove = (id) => {
    removeBasket(id);
  };
  return (
    <>
      {searchProductList.length === 0 && (
        <div className="noFindContent">
          <div className="noFind">
            <h2>No product found</h2>
          </div>
        </div>
      )}
      {searchProductList.length > 0 && (
        <div className="searchContent">
          <div className="title">
            Found {searchProductList.length} product with keyword '{name}'
          </div>

          <div className="searchWrap">
            <ul>
              {searchProductList.map((item) => {
                return (
                  <div key={item.id} className="searchProduct">
                    <Link to={`/product/${item.id}`}>
                      <div className="productDetail">
                        <div className="picture">
                          <img src={item.image} alt="" />
                        </div>
                        <div className="detail">
                          <h5>{item.name}</h5>
                          <p className="brand">{item.brand}</p>
                          <h4 className="price">${item.price}.00</h4>
                        </div>
                      </div>
                    </Link>
                    {isInBasket(item.id) ? (
                      <button
                        className="removeBasketButton"
                        type="button"
                        value={item}
                        onClick={() => handleClickRemove(item.id)}
                      >
                        Remove from basket
                      </button>
                    ) : (
                      <button
                        className="addBasketButton"
                        type="button"
                        value={item}
                        onClick={() => handleClick(item)}
                      >
                        Add to basket
                      </button>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
