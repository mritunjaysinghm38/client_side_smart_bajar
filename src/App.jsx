import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Register from "./components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Cheakout from "./components/Cheakout";
import OrderConfirmation from "./components/OrderConfirmation";
import AdminLogin from "./admin/AdminLogin";
import ShowItem from "./admin/ShowItem";
import UpdateItem from "./admin/UpdateItem";
import AddProduct from "./admin/AddProduct";
import AllUser from "./admin/AllUser";
import AllOrder from "./admin/AllOrder";
import SearchProduct_2 from "./admin/SearchProduct_2";
import BuyNow from "./components/BuyNow";


const App = () => {
  const { Products } = useContext(AppContext);
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/** ////run this route if after product one varible cames (here id) then this route if any keyword (like:- login or register) then other routes. that variable will be stored in id variable or whatever variable  after : in path. and accesible with params in any jsx page.////  */}
        {/* <Route path="/" element={<ShowProduct />} /> */}
        <Route path="/product/search/:term" element={<SearchProduct />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />   
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/cheakout" element={<Cheakout />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/adminLogin" element={<AdminLogin />} />   
        <Route path="/admin" element={<ShowItem />} />   
        <Route path="/update-item" element={<UpdateItem />} />   
        <Route path="/add-product" element={<AddProduct />} />   
        <Route path="/all-user" element={<AllUser />} />   
        <Route path="/all-user" element={<AllUser />} />   
        <Route path="/all-order" element={<AllOrder />} />   
        <Route path="/product/-search-/:term" element={<SearchProduct_2 />} />   
        <Route path="/buy" element={<BuyNow />} />   

      </Routes>
    </Router>
  );
};

export default App;
