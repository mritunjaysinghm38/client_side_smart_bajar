// import React, { useContext, useEffect, useState } from "react";
// import AppContext from "../context/AppContext";

// const ShowOrderProduct = ({ items }) => {
//   const { addToCart, removeFromCart, decreaseQty, clearCart } =
//     useContext(AppContext);

//   const [qty, setQty] = useState(0);
//   const [price, setPrice] = useState(0);

//   useEffect(() => {
//     let qty = 0;
//     let price = 0;
//     if (items) {
//       for (let i = 0; i < items?.length; i++) {
//         qty += items[i].qty;
//         price += items[i].price;
//       }
//     }
//     setPrice(price);
//     setQty(qty);
//   }, [items]);

//   return (
//     <>
//       <table className="table table-bordered border-primary text-center">
//         <thead>
//           <tr>
//             <th scope="col" className="bg-dark text-light">
//               Product Img
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Title
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Price
//             </th>
//             <th scope="col" className="bg-dark text-light">
//               Qty
//             </th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {items?.map((product) => (
//             <tr>
//               <th scope="row" className="bg-dark text-light">
//                 <img
//                   src={product.imgSrc}
//                   style={{ width: "50px", height: "50px" }}
//                   alt=""
//                 />
//               </th>
//               <td className="bg-dark text-light">{product.title}</td>
//               <td className="bg-dark text-light">{product.price}</td>
//               <td className="bg-dark text-light">{product.qty}</td>
//             </tr>
//           ))}

//           <tr>
//             <td className="bg-dark text-light"></td>
//             <td className="bg-dark text-light">
//               <button
//                 className=" btn btn-primary"
//                 style={{ fontWeight: "bold" }}
//               >
//                 Total
//               </button>
//             </td>
//             <td className="bg-dark text-light">
//               <button
//                 className=" btn btn-warning"
//                 style={{ fontWeight: "bold" }}
//               >
//                 {price}
//               </button> 
//             </td>
//             <td className="bg-dark text-light">
//               <button
//                 className=" btn btn-warning"
//                 style={{ fontWeight: "bold" }}
//               >
//                 {qty}
//               </button>
//             </td>
           
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default ShowOrderProduct;





import React from "react";
import "./show-order-product.css";

const formatINR = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

const ShowOrderProduct = ({ items }) => {
  const list = items || [];

  // same totals as before, calculated directly
  const qty = list.reduce((sum, item) => sum + item.qty, 0);
  const price = list.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <ul className="sop-items">
        {list.map((product, i) => (
          <li key={product.productId || product.id || i} className="sop-item">
            <div className="sop-thumb">
              <img src={product.imgSrc} alt={product.title} loading="lazy" />
            </div>

            <div className="sop-info">
              <p className="sop-title">{product.title}</p>
              <p className="sop-muted">
                Qty {product.qty} &times; {formatINR(product.price / product.qty)}
              </p>
            </div>

            <div className="sop-line-total">{formatINR(product.price)}</div>
          </li>
        ))}
      </ul>

      <div className="sop-total">
        <span className="sop-muted">
          Total ({qty} {qty === 1 ? "item" : "items"})
        </span>
        <strong>{formatINR(price)}</strong>
      </div>
    </>
  );
};

export default ShowOrderProduct;