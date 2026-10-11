import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const UpdateItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {editProduct}= useContext(AppContext)


  const [formData, setFormData] = useState({
    title: location.state.title,
    category: location.state.category,
    description: location.state.description,
    price: location.state.price,
    qty: location.state.qty,
    imgSrc: location.state.imgSrc,
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setFormData({ ...formData, [name]: value }); //doubt [name]?
  };
  let productId= location.state._id
  const { title, category, description, price, qty , imgSrc } = formData;              ///////,,,,,,,,,,,,

  const submithandler = async (e) => {
    e.preventDefault();
    const result = await editProduct(location.state._id, title, category, description, price, qty , imgSrc);

    // if (result.success) {
    navigate("/admin");
    // }
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
        <h1 className="text-center">Product Editor </h1>
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
          {/* <div>
            <textarea id="message" name="message" rows="5" cols="40" placeholder="Type your multi-line message here..."></textarea>

          </div> */}
          <div className="mb-3">
            <label htmlFor="exampleInputPassword11" className="form-label">
              Description
            </label>
            <textarea 
              rows="5"
              name="description"
              value={formData.description}
              onChange={onChangerHandler}
              type="text"
              className="form-control"
              id="exampleInputPassword11"
            ></textarea>
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

export default UpdateItem;
