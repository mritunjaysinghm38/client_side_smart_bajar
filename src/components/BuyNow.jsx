import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./cart.css";
import ProductDetail from "./product/ProductDetail";

const BuyNow = () => {
  const { cart, addToCart, removeFromCart, decreaseQty_2, clearCart, token } =
    useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [qty_2, setQty_2] = useState(1);
  const [price, setPrice] = useState(location.state.price);
  console.log("pppppp", location.state);

  // const abc = ()=> setPrice(()=>{return location.state.price*qty_2})
  return (
    <div className="container my-4 my-md-5 px-3">
      {/* <div className="ct-summary mb-4">
        <div className="ct-stat">
          <span>Total Qty</span>
          <strong>{qty_2}</strong>
        </div>
        <div className="ct-stat">
          <span>Total Price</span>
          <strong>{price}</strong>
        </div>
      </div> */}

      {/* Item */}

      <div key={location.state._id} className="ct-item">
        <div className="ct-img">
          <img src={location.state.imgSrc} alt={location.state.title} />
        </div>

        <div className="ct-info">
          <h2 className="ct-title">{location.state.title}</h2>
          <p className="ct-price">{location.state.price}</p>
        </div>

        <div className="ct-controls">
          <div className="ct-stepper">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => {
                if(qty_2>=2){
                setQty_2(() => {
                  return qty_2 - 1;
                });
                setPrice(() => {
                  return location.state.price * qty_2;
                });
              }
              }}
            >
              <span className="material-symbols-outlined">remove</span>
            </button>

            <output aria-label="Quantity">{qty_2}</output>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => {
                setQty_2(() => {
                  return qty_2 + 1;
                });
                setPrice(() => {
                  return location.state.price * (qty_2+1);
                });
              }}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="ct-summary mb-4">
        <div className="ct-stat">
          <span>Total Qty</span>
          <strong>{qty_2}</strong>
        </div>
        <div className="ct-stat">
          <span>Total Price</span>
          <strong>{price}</strong>
        </div>
      </div>      

      {/* Checkout actions */}

      <div className="ct-footer">
        <button
          className="btn btn-warning"
          onClick={() =>
            navigate("/cheakout", {
              state: {
                title: location.state.title,
                qty: qty_2,
                price: location.state.price,
                imgSrc: location.state.imgSrc,
                category: location.state.category,
              },
            })
          }
        >
          Add Address
        </button>
        <button
          className="btn btn-warning"
          onClick={() =>
            navigate("/cheakout", {
              state: {
                productId: location.state._id,
                title: location.state.title,
                price: price,
                qty: qty_2,
                imgSrc: location.state.imgSrc,
              },
            })
          }
        >
          Use Old Address
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
