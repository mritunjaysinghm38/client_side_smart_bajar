// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";
// const Cart = () => {
//   const { cart, addToCart, removeFromCart, decreaseQty, clearCart } =
//     useContext(AppContext);

//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   const navigate = useNavigate();
//   useEffect(() => {
//     let qty = 0;
//     let price = 0;
//     if (cart?.items) {
//       for (let i = 0; i < cart.items?.length; i++) {
//         qty += cart.items[i].qty;
//         price += cart.items[i].price;
//       }
//     }
//     setPrice(price);
//     setQty(qty);
//   }, [cart]);

//   return (
//     <>
//       <div className="my5 text-center">
//         <button
//           className="btn btn-info mx-3"
//           style={{ fontWeight: "bold", fontSize: "1.2rem" }}
//         >
//           Total Qty :- {qty}
//         </button>
//         <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}>
//           Total Price :- {price}
//         </button>
//       </div>
//       {cart?.items?.map((product) => (
//         <div
//           key={product.id}
//           className="container bg-dark my-5 p-3 text-center"
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <div className="cart_img">
//               <img
//                 src={product.imgSrc}
//                 alt=""
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           <div className="cart_des">
//             <h2>{product.title}</h2>
//             <h3>{product.price}</h3>
//             <h3>Qty:-{product.qty}</h3>
//           </div>
//           <div className="cart_action">
//             <button
//               className="btn btn-danger mx-3"
//               style={{ fontWeight: "bold" }}
//               onClick={() => decreaseQty(product.productId, 1)}
//             >
//               Qty--
//             </button>
//             <button
//               className="btn btn-info mx-3"
//               onClick={() =>
//                 addToCart(
//                   product?.productId,
//                   product.title,
//                   product.price / product.qty,
//                   1,
//                   product.imgSrc,
//                 )
//               }
//             >
//               One more Item
//             </button>
//             <button
//               className="btn btn-danger mx-3"
//               onClick={() => removeFromCart(product?.productId)}
//             >
//               Remove{" "}
//             </button>
//           </div>
//         </div>
//       ))}
//       {/* {cart?.items?.length > 0 && ( */}
//       <div className="container text-center p-3">
//         <button
//           className="btn btn-warning mx-3"
//           style={{ fontWeight: "bold" }}
//           onClick={() => navigate("/shipping")}
//         >
//           Add Address
//         </button>
//         <button
//           className="btn btn-warning mx-3"
//           style={{ fontWeight: "bold" }}
//           onClick={() => navigate("/cheakout")}
//         >
//          Use Old Address
//         </button>

//         <button
//           className="btn btn-danger mx-3"
//           style={{ fontWeight: "bold" }}
//           onClick={clearCart}
//         >
//           Clear Cart
//         </button>
//       </div>
//     </>
//   );
// };

// export default Cart;










































































import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const formatINR = (n) => `₹ ${Number(n || 0).toLocaleString("en-IN")}`;

const Cart = () => {
  const { cart, addToCart, removeFromCart, decreaseQty, clearCart } =
    useContext(AppContext);

  const navigate = useNavigate();

  const items = cart?.items || [];

  // Same totals as before, calculated directly instead of via useEffect + state
  const qty = items.reduce((sum, item) => sum + item.qty, 0);
  const price = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="ct-summary mb-4">
        <div className="ct-stat">
          <span>Total Qty</span>
          <strong>{qty}</strong>
        </div>
        <div className="ct-stat">
          <span>Total Price</span>
          <strong>{formatINR(price)}</strong>
        </div>
      </div>

      {/* Items */}
      {items.length === 0 && <div className="ct-empty">Your cart is empty.</div>}

      {items.map((product) => (
        <div key={product.productId || product.id} className="ct-item">
          <div className="ct-img">
            <img src={product.imgSrc} alt={product.title} />
          </div>

          <div className="ct-info">
            <h2 className="ct-title">{product.title}</h2>
            <p className="ct-price">{formatINR(product.price)}</p>
            {product.qty > 1 && (
              <p className="ct-unit">
                {formatINR(product.price / product.qty)} each
              </p>
            )}
          </div>

          <div className="ct-controls">
            <div className="ct-stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => decreaseQty(product.productId, 1)}
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <output aria-label="Quantity">{product.qty}</output>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc,
                  )
                }
              >
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger ct-remove"
              onClick={() => removeFromCart(product?.productId)}
            >
              <span className="material-symbols-outlined">delete</span>
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* Checkout actions */}
      <div className="ct-footer">
        <button
          className="btn btn-warning"
          onClick={() => navigate("/shipping")}
        >
          Add Address
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/cheakout")}
        >
          Use Old Address
        </button>
        <button className="btn btn-danger" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;




