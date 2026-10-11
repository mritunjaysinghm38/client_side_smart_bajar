import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const { admin_login } = useContext(AppContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const { email, password } = formData;

  const submithandler = async (e) => {
    e.preventDefault();
    const result = await admin_login(email, password);

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
        <h1 className="text-center">Admin Login</h1>
        <form onSubmit={submithandler} className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email{" "}
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={onChangerHandler}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={onChangerHandler}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div>Email: mritunjaysingh@gmail.com <br></br>password: 1</div>
          <br></br>

          <div className="d-grid col-6 mx-auto">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
