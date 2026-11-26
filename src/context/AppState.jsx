import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  // const url = "http://localhost:4000/api";
  const url = "https://mern-smart-bajar-api.onrender.com/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userOrder, setUserOrder] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [allOrder, setAllOrder] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(api.data); ////object can be inside array and vaci-varsa
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_order();
    getAllUser();
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  // //register user
  const register = async (name, email, password) => {
    const api = await axios.post(`${url}/user/register`, {
      name,
      email,
      password,
    });

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //login  user
  const login = async (email, password) => {
    const api = await axios.post(`${url}/user/login`, { email, password });
    if (api.data.success) {
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
    }

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //     logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");

    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        Auth: token,
      },
    });
    // console.log("user profile",api.data.user)
    setUser(api.data.user);
  };

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          Auth: token,
        },
      },
    );
    console.log("55555555555", api);
    userCart();

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        Auth: token,
      },
    });
    // console.log("user profile",api.data.user)
    setCart(api.data.cart);
  };

  // --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          Auth: token,
        },
      },
    );
    console.log("userCart", api.data.message);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //remove item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        Auth: token,
      },
    });
    setCart(api.data.cart);

    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //clear cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: {
        Auth: token,
      },
    });

    setCart(api.data.cart);
    setReload(!reload);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //address sender cart
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      {
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber,
      },
      {
        headers: {
          Auth: token,
        },
      },
    );
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //latest adress getter
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        Auth: token,
      },
    });
    setUserAddress(api.data.userAddress);
  };

  const user_order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        Auth: token,
      },
    });
    console.log("user_order 3333", api.data);
    setUserOrder(api.data);
    return api.data
  };

  
  //admin login
  const admin_login = async (email, password) => {
    const api = await axios.post(`${url}/user/adminLogin`, { email, password });
    if (api.data.success) {
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
    }

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //delete Product from db
  const deleteProduct = async (productId) => {
    const api = await axios.delete(`${url}/product/${productId}`, {});
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //add  product to data base
  const addProduct = async (
    title,
    category,
    description,
    price,
    qty,
    imgSrc,
  ) => {
    const api = await axios.post(`${url}/product/add`, {
      title,
      category,
      description,
      price,
      qty,
      imgSrc,
    });
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //Edit  product of data base
  const editProduct = async (
    productId,
    title,
    category,
    description,
    price,
    qty,
    imgSrc,
  ) => {
    const api = await axios.put(`${url}/product/${productId}`, {
      title,
      category,
      description,
      price,
      qty,
      imgSrc,
    });
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //get all user
  const getAllUser = async () => {
    const api = await axios.get(`${url}/user/all`);
    setAllUser(api.data);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //delete Product from db
  const deleteUser = async (userId) => {
    const api = await axios.delete(`${url}/user/${userId}`);
    setReload(!reload);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //get all Order
  const getAllOrder = async () => {
    const api = await axios.get(`${url}/payment/orders`);
    setAllOrder(api.data);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //delete Product from db
  const LoginFirst = async () => {
    toast.success("Login first", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  return (
    <AppContext.Provider
      value={{
        shippingAddress,
        userAddress,
        clearCart,
        cart,
        removeFromCart,
        decreaseQty,
        addToCart,
        products,
        logout,
        register,
        filteredData,
        user,
        setFilteredData,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        setReload,
        reload,
        userOrder,
        admin_login,
        deleteProduct,
        editProduct,
        addProduct,
        getAllUser,
        allUser,
        deleteUser,
        getAllOrder,
        allOrder,
        getAddress,
        LoginFirst,
        user_order
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
