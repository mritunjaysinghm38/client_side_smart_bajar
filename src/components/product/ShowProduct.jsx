// import React, { useContext } from "react";
// import AppContext from "../../context/AppContext";
// import { Link } from "react-router-dom";

// const ShowProduct = () => {
//   const { products, filteredData, addToCart } = useContext(AppContext);
  

//   return (
//     <>
//       <div className="container d-flex justify-content-center align-items-center">
//         <div className="row container d-flex justify-content-center align-items-center ">
//           {filteredData?.map((product) => (
//             <div
//               key={product._id}
//               className=" my-3 col-md-4 d-flex justify-content-center align-items-center "
//             >
//               <div
//                 className="card bg-dark text-light text-center"
//                 style={{ width: "18rem" }}
//               > 
//                 <Link
//                   to={`/product/${product._id}`}
//                   className="d-flex justify-content-center align-items-center p-3"
//                 >
//                   <img
//                     src={product.imgSrc}
//                     className="card-img-top"
//                     alt="..."
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       borderRadius: "10px",
//                       border: "2px solid yellow",
//                     }}
//                   />
//                 </Link>
//                 <div className="card-body">
//                   <h5 className="card-title">{product.title}</h5>
//                   <p className="card-text"></p>
//                   <div className="my-3">
//                     <button className="btn btn-danger m-2">
//                       {product.price}
//                       {" ₹"}
//                     </button>
//                     <button
//                       className="btn btn-warning"
//                       onClick={() =>
//                         addToCart(
//                           product._id,
//                           product.title,
//                           product.price,
//                           1,
//                           product.imgSrc,
//                         )
//                       }
//                     >
//                       Add To Cart
//                     </button>
//                     {/* <button
//                       className="btn btn-warning"
//                       onClick={() =>
//                         addToCart(
//                           product._id,
//                           product.title,
//                           product.price,
//                           1,
//                           product.imgSrc,
//                         )
//                       }
//                     >
//                       {price>30000 ? <p>5%</p>:<p>y</p>}
//                     </button> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ShowProduct;














import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./show-product.css";

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  // shows "Added" on the button for a moment after adding
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product._id, product.title, product.price, 1, product.imgSrc);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="container py-3 py-md-4">
      <div className="sp-grid">
        {(!filteredData || filteredData.length === 0) && (
          <div className="sp-empty">No products found.</div>
        )}

        {filteredData?.map((product) => (
          <div key={product._id} className="sp-card">
            <Link to={`/product/${product._id}`} className="sp-pic">
              <img src={product.imgSrc} alt={product.title} loading="lazy" />
            </Link>

            <div className="sp-body">
              {product.category && (
                <span className="sp-category">{product.category}</span>
              )}

              <h5 className="sp-title">
                <Link to={`/product/${product._id}`}>{product.title}</Link>
              </h5>

              <p className="sp-price">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>

              <button
                className="btn btn-warning sp-btn"
                onClick={() => handleAdd(product)}
              >
                {addedId === product._id ? "Added" : "Add to cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;