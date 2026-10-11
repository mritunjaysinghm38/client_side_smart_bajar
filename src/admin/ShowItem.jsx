// import React, { useContext } from "react";
// import AppContext from "../context/AppContext";
// import { Link, useNavigate } from "react-router-dom";

// const ShowItem = () => {
//   const { filteredData, deleteProduct } = useContext(AppContext);
//     const navigate2 = useNavigate()

//   return (
//     <>
//       {filteredData?.map((product) => (
//         <div
//           key={product._id}
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
//             <button className="btn btn-info mx-3" onClick={()=>{navigate2('/update-item', {state : product})}}>Edit</button>

//             <button
//               className="btn btn-danger mx-3"
//               onClick={() => {
//                 deleteProduct(product?._id);
//               }}
//             >
//               Delete{" "}
//             </button>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default ShowItem;

import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import "./show-item.css";

const ShowItem = () => {
  const { filteredData, deleteProduct } = useContext(AppContext);
  const navigate2 = useNavigate();

  const handleDelete = (product) => {
    if (window.confirm(`Delete "${product.title}"?`)) {
      deleteProduct(product?._id);
    }
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <h1 className="si-heading">
        All  {" "}
        <small>
          {filteredData?.length || 0}{" "}
          {/* {filteredData?.length === 1 ? "Product" : "Products"} */}
        </small>
        Products
      </h1>
      <div className="si-list">
        {(!filteredData || filteredData.length === 0) && (
          <div className="si-empty">No products found.</div>
        )}

        {filteredData?.map((product) => (
          <div key={product._id} className="si-row">
            <div className="si-thumb">
              <img src={product.imgSrc} alt={product.title} loading="lazy" />
            </div>

            <div className="si-info">
              <h2 className="si-title">{product.title}</h2>
              <p className="si-meta">
                <span className="si-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>
                <span>Qty: {product.qty}</span>
              </p>
            </div>

            <div className="si-actions">
              <button
                className="btn btn-info"
                onClick={() => {
                  navigate2("/update-item", { state: product });
                }}
              >
                <span className="material-symbols-outlined">edit</span>
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(product)}
              >
                <span className="material-symbols-outlined">delete</span>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowItem;
