// import React from "react";
// import { useContext, useEffect, useState } from "react";
// import ShowOrderProduct from "../components/ShowOrderProduct";

// import AppContext from "../context/AppContext";

// const AllOrder = () => {
 
//   const { allOrder } = useContext(AppContext);


  
//   return (
//     <>
//       <div className="container my-5">
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



// {allOrder?.map((allOrder_2)=>(
//           <tbody>
//             <tr>
//               <th scope="row" className="bg-dark text-light">
//                 <ShowOrderProduct items={allOrder_2?.orderItems}/>
//               </th>

//               <td className="bg-dark text-light">
//                 <ul style={{fontWeight: "bold"}}>
//                   <li>OrderId : {allOrder_2?.orderId}</li>
//                   <li>Payment_id : {allOrder_2?.payment_id}</li>
//                   <li>Payment Status : {allOrder_2?.paystatus}</li>
//                   <li>Name : {allOrder_2?.userShipping?.fullName}</li>
//                   <li>Phone : {allOrder_2?.userShipping?.phoneNumber}</li>
//                   <li>Country : {allOrder_2?.userShipping?.country}</li>
//                   <li>State : {allOrder_2?.userShipping?.state}</li>
//                   <li>Pincode : {allOrder_2?.userShipping?.pincode}</li>
//                   <li>NearBy : {allOrder_2?.userShipping?.address}</li>
//                 </ul>
//               </td>
//             </tr>
//           </tbody>
//           ))}
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

// export default AllOrder;





























import React from "react";
import { useContext } from "react";

import AppContext from "../context/AppContext";
import "./all-order.css";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const AllOrder = () => {
  const { allOrder } = useContext(AppContext);

  return (
    <div className="container my-4 my-md-5 px-3">
      <h1 className="ao-title">
        All Orders
        <small>
          {allOrder?.length || 0} {allOrder?.length === 1 ? "order" : "orders"}
        </small>
      </h1>

      <div className="ao-list">
        {(!allOrder || allOrder.length === 0) && (
          <div className="ao-empty">No orders found.</div>
        )}

        {allOrder?.map((order) => {
          const items = order?.orderItems || [];
          const ship = order?.userShipping;
          const isPaid = /paid|success|captured/i.test(order?.paystatus || "");
          // use the stored amount if present, otherwise add up the items
          const total =
            order?.amount ?? items.reduce((sum, item) => sum + item.price, 0);

          const detailRows = [
            ["Payment ID", order?.payment_id],
            ["Name", ship?.fullName],
            ["Phone", ship?.phoneNumber],
            ["Country", ship?.country],
            ["State", ship?.state],
            ["Pincode", ship?.pincode],
            ["Nearby", ship?.address],
          ];

          return (
            <article key={order?._id || order?.orderId} className="ao-card">
              {/* Header: order id + payment status */}
              <header className="ao-head">
                <div className="ao-id">
                  <span className="ao-label">Order ID</span>
                  <strong>{order?.orderId || "-"}</strong>
                </div>
                <span className={`ao-badge ${isPaid ? "is-paid" : ""}`}>
                  {order?.paystatus || "-"}
                </span>
              </header>

              <div className="ao-body">
                {/* Items */}
                <section className="ao-section">
                  <h3>Order Items</h3>
                  <ul className="ao-items">
                    {items.map((item, i) => (
                      <li key={item.productId || item.id || i} className="ao-item">
                        <div className="ao-thumb">
                          <img src={item.imgSrc} alt={item.title} loading="lazy" />
                        </div>
                        <div className="ao-item-info">
                          <p className="ao-item-title">{item.title}</p>
                          <p className="ao-muted">
                            Qty {item.qty} &times;{" "}
                            {formatINR(item.price / item.qty)}
                          </p>
                        </div>
                        <div className="ao-item-total">
                          {formatINR(item.price)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Payment + shipping details */}
                <section className="ao-section">
                  <h3>Order Details &amp; Shipping Address</h3>
                  <dl className="ao-rows">
                    {detailRows.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value || "-"}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>

              <footer className="ao-foot">
                <span className="ao-muted">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
                <span className="ao-total">{formatINR(total)}</span>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrder;