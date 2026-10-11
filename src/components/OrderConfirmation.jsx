// import React from "react";
// import { useContext, useEffect, useState } from "react";
// import ShowOrderProduct from "./ShowOrderProduct";

// import AppContext from "../context/AppContext";

// const OrderConfirmation = () => {
//   const { userOrder } = useContext(AppContext);
//   const [latestOrder, setLatestOrder ] = useState({});
//   useEffect(()=>{
//       if(userOrder){
//       setLatestOrder(userOrder[0])
//       }
//   },[userOrder])

//   return (
//     <>
//       <div className="container my-5">
//         <h1 className="text-center"> Your order has been confirm, </h1>
//         <h1 className="text-center"> It will delivered soon</h1>
//       </div>

//       <div className="container  ">

//         <table className="table table-bordered border-primary">
//           <thead>
//             <tr>
//               <th scope="col" className="bg-dark text-light text-center">
//                 OrderItems
//               </th>

//               <th scope="col" className="bg-dark text-light text-center">
//                 OrderDetails & ShippingAddress
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row" className="bg-dark text-light">
//                 {/* <TableProduct cart={cart} /> */}
//                 <ShowOrderProduct items={latestOrder?.orderItems}/>
//               </th>

//               <td className="bg-dark text-light">
//                 <ul style={{fontWeight: "bold"}}>
//                   <li>OrderId : {latestOrder?.orderId}</li>
//                   <li>Payment_id : {latestOrder?.payment_id}</li>
//                   <li>Payment Status : {latestOrder?.paystatus}</li>
//                   <li>Name : {latestOrder?.userShipping?.fullName}</li>
//                   <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
//                   <li>Country : {latestOrder?.userShipping?.country}</li>
//                   <li>State : {latestOrder?.userShipping?.state}</li>
//                   <li>Pincode : {latestOrder?.userShipping?.pincode}</li>
//                   <li>NearBy : {latestOrder?.userShipping?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       {/* <div className="container text-center my-5">
//         <button className="btn btn-secondary btn-lg" >
//           Procced To Pay
//         </button>
//       </div> */}
//     </>
//   );
// };

// export default OrderConfirmation;





























// import React, { useEffect, useState } from "react";
// import { useContext } from "react";
// import AppContext from "../context/AppContext";
// import "./order-confirmtion.css";

// const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// const OrderConfirmation = () => {
//   const { user_order } = useContext(AppContext);

//   const [userOrder, setUserOrder] = useState([]);
//   const [latestOrder, setLatestOrder] = useState([]);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const data = await user_order();
//         console.log("Order API response:", data);

//         setUserOrder(data);
//         setLatestOrder(data[0]);

//       } catch (error) {
//         console.error("Failed to fetch order:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, []);

//   // latest order = first item (same as before)

//   const items = latestOrder?.orderItems || [];
//   const ship = latestOrder?.userShipping;

//   const isPaid = /paid|success|captured/i.test(latestOrder?.paystatus || "");

//   const orderRows = [
//     ["Order ID", latestOrder?.orderId],
//     ["Payment ID", latestOrder?.payment_id],
//   ];

//   const addressRows = [
//     ["Name", ship?.fullName],
//     ["Phone", ship?.phoneNumber],
//     ["Country", ship?.country],
//     ["State", ship?.state],
//     ["Pincode", ship?.pincode],
//     ["Nearby", ship?.address],
//   ];

//   return (
//     <div className="container my-4 my-md-5 px-3">
//       <div className="oc-hero">
//         <div className="oc-check">
//           <span className="material-symbols-outlined">check_circle</span>
//         </div>
//         <h1>Your order has been confirmed</h1>
//         <p>It will be delivered soon.</p>
//       </div>

//       {!latestOrder ? (
//         <p className="oc-muted text-center">Loading order details...</p>
//       ) : (
//         <div className={`oc-layout ${items.length === 1 ? "has-single" : ""}`}>
//           {/* Order items */}
//           <section
//             className={`oc-panel ${items.length === 1 ? "is-single" : ""}`}
//           >
//             <h2>
//               Order Items
//               <span className="oc-count">
//                 {items.length} {items.length === 1 ? "item" : "items"}
//               </span>
//             </h2>

//             <ul className="oc-items">
//               {items.map((item) => (
//                 <li key={item.productId || item.id} className="oc-item">
//                   <div className="oc-thumb">
//                     <img src={item.imgSrc} alt={item.title} />
//                   </div>

//                   <div className="oc-item-info">
//                     <p className="oc-item-title">{item.title}</p>
//                     <p className="oc-muted">
//                       Qty {item.qty} &times; {formatINR(item.price / item.qty)}
//                     </p>
//                   </div>

//                   <div className="oc-item-total">{formatINR(item.price)}</div>
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Order details + shipping address */}
//           <div className="oc-side">
//             <section className="oc-panel">
//               <h2>Order Details</h2>
//               <dl className="oc-rows">
//                 {orderRows.map(([label, value]) => (
//                   <div key={label}>
//                     <dt>{label}</dt>
//                     <dd>{value || "-"}</dd>
//                   </div>
//                 ))}
//                 <div>
//                   <dt>Payment Status</dt>
//                   <dd>
//                     <span className={`oc-badge ${isPaid ? "is-paid" : ""}`}>
//                       {latestOrder?.paystatus || "-"}
//                     </span>
//                   </dd>
//                 </div>
//               </dl>
//             </section>

//             <section className="oc-panel">
//               <h2>Shipping Address</h2>
//               <dl className="oc-rows">
//                 {addressRows.map(([label, value]) => (
//                   <div key={label}>
//                     <dt>{label}</dt>
//                     <dd>{value || "-"}</dd>
//                   </div>
//                 ))}
//               </dl>
//             </section>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderConfirmation;

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import "./order-confirmtion.css";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const OrderConfirmation = () => {
  const { user_order } = useContext(AppContext);

  // null = nothing loaded yet (the old `[]` was truthy, so "Loading..." never showed)
  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true); // this state was missing before
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false; // ignore the result if the page is left before it arrives

    const fetchOrder = async () => {
      try {
        const data = await user_order();
        console.log("Order API response:", data);

        // never do data[0] on something that may be undefined or not an array
        const list = Array.isArray(data) ? data : [];
        if (!cancelled) setLatestOrder(list[0] || null);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        if (!cancelled) setError("Could not load your order. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOrder();

    return () => {
      cancelled = true;
    };
    // run once when the page opens. Adding `user_order` here would re-run the
    // fetch on every render, because the context creates a new function each time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = latestOrder?.orderItems || [];
  const ship = latestOrder?.userShipping;

  const isPaid = /paid|success|captured/i.test(latestOrder?.paystatus || "");

  const orderRows = [
    ["Order ID", latestOrder?.orderId],
    ["Payment ID", latestOrder?.payment_id],
  ];

  const addressRows = [
    ["Name", ship?.fullName],
    ["Phone", ship?.phoneNumber],
    ["Country", ship?.country],
    ["State", ship?.state],
    ["Pincode", ship?.pincode],
    ["Nearby", ship?.address],
  ];

  return (
    <div className="container my-4 my-md-5 px-3">
      <div className="oc-hero">
        <div className="oc-check">
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <h1>Your order has been confirmed</h1>
        <p>It will be delivered soon.</p>
      </div>

      {loading ? (
        <p className="oc-muted text-center">Loading order details...</p>
      ) : error ? (
        <p className="oc-muted text-center">{error}</p>
      ) : !latestOrder ? (
        <p className="oc-muted text-center">No order found.</p>
      ) : (
        <div className={`oc-layout ${items.length === 1 ? "has-single" : ""}`}>
          {/* Order items */}
          <section
            className={`oc-panel ${items.length === 1 ? "is-single" : ""}`}
          >
            <h2>
              Order Items
              <span className="oc-count">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </h2>

            <ul className="oc-items">
              {items.map((item, i) => (
                <li key={item.productId || item.id || i} className="oc-item">
                  <div className="oc-thumb">
                    <img src={item.imgSrc} alt={item.title} />
                  </div>

                  <div className="oc-item-info">
                    <p className="oc-item-title">{item.title}</p>
                    <p className="oc-muted">
                      Qty {item.qty} &times; {formatINR(item.price / item.qty)}
                    </p>
                  </div>

                  <div className="oc-item-total">{formatINR(item.price)}</div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order details + shipping address */}
          <div className="oc-side">
            <section className="oc-panel">
              <h2>Order Details</h2>
              <dl className="oc-rows">
                {orderRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value || "-"}</dd>
                  </div>
                ))}
                <div>
                  <dt>Payment Status</dt>
                  <dd>
                    <span className={`oc-badge ${isPaid ? "is-paid" : ""}`}>
                      {latestOrder?.paystatus || "-"}
                    </span>
                  </dd>
                </div>
              </dl>
            </section>

            <section className="oc-panel">
              <h2>Shipping Address</h2>
              <dl className="oc-rows">
                {addressRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value || "-"}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;