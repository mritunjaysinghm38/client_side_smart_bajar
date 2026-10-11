import React, { useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const SearchProduct_2 = () => {
  const { term } = useParams();
  const { products, deleteProduct } = useContext(AppContext);
  const [seachProduct, setSearchProduct] = useState([]);
  const navigate2 = useNavigate();

  useEffect(() => {
    setSearchProduct(
      products.filter((data) =>
        data?.title?.toLowerCase().includes(term.toLowerCase()),
      ),
    );
  }, [term, products]);
  return (
    <>
      {seachProduct?.map((product) => (
        <div
          key={product._id}
          className="container bg-dark my-5 p-3 text-center"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="cart_des">
            <h2>{product.title}</h2>
            <h3>{product.price}</h3>
            <h3>Qty:-{product.qty}</h3>
          </div>
          <div className="cart_action">
            <button
              className="btn btn-info mx-3"
              onClick={() => {
                navigate2("/update-item", { state: product });
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-danger mx-3"
              onClick={() => {
                deleteProduct(product?._id);
              }}
            >
              Delete{" "}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchProduct_2;
