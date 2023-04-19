import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../store/cartSlice";
import { fetchProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  useEffect(
    () => {
      dispatch(fetchProducts());
    },
    // eslint-disable-next-line
    []
  );

  const handleAdd = (product) => {
    dispatch(add(product));
  };
  const handleRemove = (product) => {
    dispatch(remove(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className="productsWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>

          {cart.some((e) => e.id === product.id) ? (
            <button onClick={() => handleRemove(product)} className="btn">
              Remove
            </button>
          ) : (
            <button onClick={() => handleAdd(product)} className="btn">
              Add to cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Products;
