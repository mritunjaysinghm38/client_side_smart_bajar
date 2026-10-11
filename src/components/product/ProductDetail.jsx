// import axios from "axios";
// import React, { useEffect, useState, useContext } from "react";
// import AppContext from "../../context/AppContext";
// import { useParams } from "react-router-dom";
// import RelatedProduct from "./RelatedProduct";

// const ProductDetail = () => {
//   const { addToCart } = useContext(AppContext);

//   const [product, setProduct] = useState();// new State variable
//   const { id } = useParams(); //jo value id me hoga useParms le lega.
//   console.log(id);
//   const url = "http://localhost:4000/api";

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const api = await axios.get(`${url}/product/${id}`, {
//         headers: {
//           "Content-Type": "Application/json",
//         },
//         withCredentials: true,
//       });
//       console.log(api.data.product);
//       setProduct(api.data.product);
//     };
//     fetchProduct();
//   }, [id]);
//   return (
//     <>
//       <div
//         className="container text-center my-5"
//         style={{
//           display: "flex",
//           justifyContent: "space-evenly",
//           alignItems: "center",
//         }}
//       >
//         <div className="left">
//           <img
//             src={product?.imgSrc}
//             alt=""
//             style={{
//               width: "250px",
//               height: "250px",
//               borderRadius: "10px",
//               border: "2px solid yellow",
//             }}
//           />
//         </div>
//         <div className="right">
//           <h1>{product?.title}</h1>
//           <p>{product?.description}</p>
//           <h1>
//             {product?.price}
//             {" ₹"}
//           </h1>
//           <h3>{product?.category}</h3>
//           <div className="my-5">
//             <button className="btn btn-danger mx-3">Buy Now</button>
//             <button
//               className="btn  btn-warning "
//               onClick={() =>
//                 addToCart(
//                   product._id,
//                   product.title,
//                   product.price,
//                   1,
//                   product.imgSrc,
//                 )
//               }
//             >
//               Add To Cart
//             </button>
//           </div>
//         </div>
//       </div>
//       <RelatedProduct category={product?.category} />
//     </>
//   );
// };

// export default ProductDetail;

import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { addToCart, token, LoginFirst, url } = useContext(AppContext);

  const [product, setProduct] = useState(); // new State variable
  const [addedId, setAddedId] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams(); //jo value id me hoga useParms le lega.
  // const url = "http://localhost:4000/api";

  const handleAdd = (product) => {
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1200);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 add this

    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="container my-4 my-md-5 px-3">
        <div className="pd-card">
          {!product ? (
            <div className="pd-loading" style={{ gridColumn: "1 / -1" }}>
              Loading product...
            </div>
          ) : (
            <>
              <div className="pd-media">
                <img src={product.imgSrc} alt={product.title} />
              </div>

              <div className="pd-info">
                {product.category && (
                  <span className="pd-category">{product.category}</span>
                )}

                <h1 className="pd-title">{product.title}</h1>

                <p className="pd-price">
                  {Number(product.price).toLocaleString("en-IN")} ₹
                </p>

                {/* <hr className="pd-divider" /> */}
                <div className="pd-actions">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      if (token) {
                        navigate("/buy", { state: product });
                      }else{
                        LoginFirst();
                      }
                    }}
                  >
                    <span className="material-symbols-outlined">bolt</span>
                    Buy Now
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      if(token){
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc,
                      );
                      handleAdd(product);
                    }else{
                      LoginFirst()
                    }
                    }}
                  >
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                    {addedId === product._id ? "Added" : "Add to cart"}
                  </button>
                </div>
                <hr className="pd-divider" />

                <p className="pd-desc">{product.description}</p>

                {/* <div className="pd-actions">
                  <button className="btn btn-danger">
                    <span className="material-symbols-outlined">bolt</span>
                    Buy Now
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc,
                      )
                    }
                  >
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                    Add To Cart
                  </button>
                </div> */}
              </div>
            </>
          )}
        </div>
      </div>

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
