import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const AddProduct = () => {
  const { addProduct } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    qty: "",
    imgSrc: ""
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //doubt [name]?
  };
  const { title, category, description, price, qty, imgSrc } = formData; ///////,,,,,,,,,,,,

  const submithandler = async (e) => {
    e.preventDefault();
    console.log(description)
    const result = await addProduct(title, category, description, price, qty, imgSrc);
    // console.log("ttttttt",result);
    if (result.success) {
    navigate("/admin");
    }
  };
  return (
    <>
      <div
        className="container my-5 p-3"
        style={{
          width: "calc(100% - 2rem)",
          maxWidth: "600px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Product Add </h1>
        <form onSubmit={submithandler} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail3" className="form-label">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Category
            </label>
            <input
              name="category"
              value={formData.category}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail144" className="form-label">
              description
            </label>
            <input
              name="description"
              value={formData.description}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputEmail144"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword111" className="form-label">
              Price
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={onChangerHandler}
              type="number"
              className="form-control"
              id="exampleInputPassword111"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword112" className="form-label">
              Quantity
            </label>
            <input
              name="qty"
              value={formData.qty}
              onChange={onChangerHandler}
              type="number"
              className="form-control"
              id="exampleInputPassword112"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword113" className="form-label">
              Image Link
            </label>
            <input
              name="imgSrc"
              value={formData.imgSrc}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputPassword113"
            />
          </div>

          <div className="d-grid col-6 mx-auto">
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
