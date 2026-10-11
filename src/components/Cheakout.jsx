// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../context/AppContext";
// import TableProduct from "./TableProduct";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cheakout = () => {
//   const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);
//   const Navigate = useNavigate()

//   useEffect(() => {
//     let qty1 = 0;
//     let price = 0;
//     if (cart?.items) {
//       for (let i = 0; i < cart.items?.length; i++) {
//         qty1 += cart.items[i].qty;
//         price += cart.items[i].price;
//       }
//     }
//     setPrice(price);
//     setQty(qty1);
//   }, [cart]);

//   const handlePayment = async () => {
//     try {
//       const orderResponse = await axios.post(`${url}/payment/checkout`, {
//         amount: price,
//         cartItems: cart?.items,
//         userShipping: userAddress,
//         userId: user._id,
//       });

//       console.log("orderResponseeeeeee", orderResponse);
//       const { orderId, amount: orderAmount } = orderResponse.data;

//       const options = {
//         key: "rzp_test_Tj5PjMdkqHGWUx", // Replace with your Razorpay key_id
//         amount: orderAmount * 100, // Amount is in currency subunits.
//         currency: "INR",
//         name: "Mritunjay",
//         description: "Test Transaction2",
//         order_id: orderId, // This is the order_id created in the backend
//         // callback_url: "http://localhost:4000/", // Your success URL
//         prefill: {
//           name: "Abhay",
//           email: "abhay@gmail.com",
//           contact: "9999999989",
//         },
//         theme: {
//           color: "#F37254",
//         },
//         handler: async function (response) {
//           const paymentData = {
//             orderId: response.razorpay_order_id,
//             payment_id: response.razorpay_payment_id,
//             signature: response.razorpay_signature,
//             qty: qty,
//             amount: orderAmount,
//             orderItems: cart?.items,
//             userId: user._id,
//             userShipping: userAddress,
//           };

//           const api = await axios.post(
//             `${url}/payment/verify-payment`,
//             paymentData,
//           );
//           if(api.data.success){
//           clearCart()
//           Navigate('/orderconfirmation')
//           }
//           // console.log(api)
//         },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.log("m error", error);
//     }
//   };

//   // console.log("user address ", userAddress);
//   return (
//     <>
//       <div className="container  my-3">
//         <h1 className="text-center">Order Summary</h1>

//         <table className="table table-bordered border-primary">
//           <thead>
//             <tr>
//               <th scope="col" className="bg-dark text-light text-center">
//                 Product Detail
//               </th>

//               <th scope="col" className="bg-dark text-light text-center">
//                 Shipping Address
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row" className="bg-dark text-light">
//                 <TableProduct cart={cart} />
//               </th>

//               <td className="bg-dark text-light">
//                 <ul>
//                   <li>Name:{userAddress?.fullName}</li>
//                   <li>Phone:{userAddress?.phoneNumber}</li>
//                   <li>Country:{userAddress?.country}</li>
//                   <li>State:{userAddress?.state}</li>
//                   <li>Pincode:{userAddress?.pincode}</li>
//                   <li>NearBy:{userAddress?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <div className="container text-center my-5">
//         <button className="btn btn-secondary btn-lg" onClick={handlePayment}>
//           Procced To Pay
//         </button>
//       </div>
//     </>
//   );
// };

// export default Cheakout;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./checkout.css";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const Cheakout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [paying, setPaying] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();

  // Same totals as before, calculated directly (no useEffect/state needed)
  // const items = cart?.items || [];
  const items = location.state ? [location.state] : cart?.items || [];

  console.log("rrrrr", location.state);

  const qty = items.reduce((sum, item) => sum + item.qty, 0);
  const price = items.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = async () => {
    setPaying(true);
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        cartItems: items,
        userShipping: userAddress,
        userId: user._id,
      });

      const { orderId, amount: orderAmount } = orderResponse.data;

      const options = {
        key: "rzp_test_Tj5PjMdkqHGWUx", // Replace with your Razorpay key_id
        amount: orderAmount * 100, // Amount is in currency subunits.
        currency: "INR",
        name: "Mritunjay",
        description: "Test Transaction2",
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: "Mritunjay",
          email: "mritunjay@gmail.com",
          contact: "9999999989",
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          // re-enable the button if the user closes the payment window
          ondismiss: () => setPaying(false),
        },
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            qty: qty,
            amount: orderAmount,
            orderItems: items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData,
          );
          if (api.data.success) {
            if(!location.state){
            clearCart();
            }
            Navigate("/orderconfirmation");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("m error", error);
      setPaying(false);
    }
  };

  const addressRows = [
    ["Name", userAddress?.fullName],
    ["Phone", userAddress?.phoneNumber],
    ["Country", userAddress?.country],
    ["State", userAddress?.state],
    ["Pincode", userAddress?.pincode],
    ["Nearby", userAddress?.address],
  ];

  return (
    <div className="container my-4 my-md-5 px-3">
      <h1
        className="text-center mb-4"
        style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
      >
        Order Summary
      </h1>

      <div className="co-layout">
        {/* Left: products (built directly from the cart, no table) */}
        <section className="co-panel">
          <h2>
            Product Detail
            <span className="co-count">
              {qty} {qty === 1 ? "item" : "items"}
            </span>
          </h2>

          {items.length === 0 && (
            <p className="co-muted m-0">Your cart is empty.</p>
          )}

          <ul className="co-items">
            {items.map((item) => (
              <li key={item.productId || item.id} className="co-item">
                <div className="co-thumb">
                  <img src={item.imgSrc} alt={item.title} />
                </div>

                <div className="co-item-info">
                  <p className="co-item-title">{item.title}</p>
                  <p className="co-muted m-0">
                    Qty {item.qty} &times; {formatINR(item.price / item.qty)}
                  </p>
                </div>

                <div className="co-item-total">{formatINR(item.price)}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Right: address + payment summary */}
        <div className="co-side">
          <section className="co-panel">
            <h2>Shipping Address</h2>
            <dl className="co-address">
              {addressRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value || "-"}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              className="co-link"
              onClick={() => Navigate("/shipping")}
            >
              Change address
            </button>
          </section>

          <section className="co-panel">
            <h2>Payment Summary</h2>
            <div className="co-row">
              <span>Total items</span>
              <span>{qty}</span>
            </div>
            <div className="co-row co-total">
              <span>Total amount</span>
              <span>{formatINR(price)}</span>
            </div>
            <button
              className="btn btn-warning co-pay"
              onClick={handlePayment}
              disabled={paying || items.length === 0}
            >
              {paying ? "Processing..." : "Proceed To Pay"}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cheakout;
