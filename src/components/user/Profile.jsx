// import React, { useContext } from "react";
// import AppContext from "../../context/AppContext";
// import ShowOrderProduct from "../ShowOrderProduct";

// const Profile = () => {
//   const { user, userOrder } = useContext(AppContext);

//   return (
//     <>
//       <div className="container">
//         <h1 className="text-center">Wellcome,{user?.name}</h1>
//         <h3 className="text-center">{user?.email}</h3>
//       </div>
//       <div className="container my-5">
//         <h1 className="text-center"> Your order has been confirm, </h1>
//         <h1 className="text-center"> It will delivered soon</h1>
//       </div>
//       {userOrder?.map((userOrder) => (
//         <>
//           <div className="container  ">
//             <table className="table table-bordered border-primary">
//               <thead>
//                 <tr>
//                   <th scope="col" className="bg-dark text-light text-center">
//                     OrderItems
//                   </th>

//                   <th scope="col" className="bg-dark text-light text-center">
//                     OrderDetails & ShippingAddress
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row" className="bg-dark text-light">
//                     {/* <TableProduct cart={cart} /> */}
//                     <ShowOrderProduct items={userOrder?.orderItems} />
//                   </th>

//                   <td className="bg-dark text-light">
//                     <ul style={{ fontWeight: "bold" }}>
//                       <li>OrderId : {userOrder?.orderId}</li>
//                       <li>Payment_id : {userOrder?.payment_id}</li>
//                       <li>Payment Status : {userOrder?.paystatus}</li>
//                       <li>Name : {userOrder?.userShipping?.fullName}</li>
//                       <li>Phone : {userOrder?.userShipping?.phoneNumber}</li>
//                       <li>Country : {userOrder?.userShipping?.country}</li>
//                       <li>State : {userOrder?.userShipping?.state}</li>
//                       <li>Pincode : {userOrder?.userShipping?.pincode}</li>
//                       <li>NearBy : {userOrder?.userShipping?.address}</li>
//                     </ul>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </>
//       ))}
//     </>
//   );
// };

// export default Profile;









































import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";
import "./profile.css";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <div className="container my-4 my-md-5 px-3">
      {/* User header */}
      <div className="pr-header">
        <div className="pr-avatar" aria-hidden="true">
          {user?.name?.trim()?.[0] || (
            <span className="material-symbols-outlined">person</span>
          )}
        </div>
        <h1>Welcome, {user?.name}</h1>
        <p className="pr-email">{user?.email}</p>
      </div>

      {/* Orders */}
      <h2 className="pr-section-title">
        Your Orders
        <small>
          {userOrder?.length || 0}{" "}
          {userOrder?.length === 1 ? "order" : "orders"}
        </small>
      </h2>

      <div className="pr-list">
        {(!userOrder || userOrder.length === 0) && (
          <div className="pr-empty">You haven't placed any orders yet.</div>
        )}

        {userOrder?.map((order) => {
          const ship = order?.userShipping;
          const isPaid = /paid|success|captured/i.test(order?.paystatus || "");

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
            <article key={order?._id || order?.orderId} className="pr-card">
              <header className="pr-head">
                <div className="pr-id">
                  <span className="pr-label">Order ID</span>
                  <strong>{order?.orderId || "-"}</strong>
                </div>
                <span className={`pr-badge ${isPaid ? "is-paid" : ""}`}>
                  {order?.paystatus || "-"}
                </span>
              </header>

              <div className="pr-body">
                <section className="pr-section">
                  <h3>Order Items</h3>
                  <ShowOrderProduct items={order?.orderItems} />
                </section>

                <section className="pr-section">
                  <h3>Order Details &amp; Shipping Address</h3>
                  <dl className="pr-rows">
                    {detailRows.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value || "-"}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
















































