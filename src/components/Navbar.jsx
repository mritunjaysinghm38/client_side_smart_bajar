// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import AppContext from "../context/AppContext";
// const Navbar = () => {
//   const { setFilteredData, products, logout, isAuthenticated, cart, getAllUser, getAllOrder} =useContext(AppContext);

//   const [searchTerm, setSearchTerm] = useState("");

//   const location = useLocation();
//   const navigate = useNavigate();

//   const filterbyCategory = (cat) => {
//     setFilteredData(
//       products?.filter(
//         (data) => data.category?.toLowerCase() == cat?.toLowerCase(),
//       ),
//     );
//   };

//   const filterbyPrice = (price) => {
//     setFilteredData(products?.filter((data) => data?.price <= price));
//   };

//  let b
//   const submitHandler = (e) => {
//     e.preventDefault();
//     navigate(`/product/search/${searchTerm}`);
//     setSearchTerm("");
//   };
//   const submitHandler_2 = (e) => {

//     e.preventDefault();
//     b=(`/product/-search-/${searchTerm}`)
//     // navigate(`/product/-search-/${searchTerm}`);
    
//     setSearchTerm("");

//   };

//   let a=true;
//   function decider() {
//     a = location.pathname != "/admin" && location.pathname != "/update-item" && location.pathname != "/add-product" && location.pathname != "/all-user"  && location.pathname != "/all-order" && location.pathname != b;
//   }
//   decider();


//   return (
//     <>
//       <>
//         {a && (
//           <div className="nav sticky-top">
//             <div className="nav-bar  ">
//               <Link
//                 to={"/"}
//                 className="left"
//                 style={{ textDecoration: "none", color: "white" }}
//                 onClick={()=>{setFilteredData(products)}}
//               >
//                 <div style={{ display: "flex" }}>
//                   {" "}
//                   <span className="material-symbols-outlined ">home</span>{" "}
//                   <h3>
//                     <pre> Smart Bajar</pre>{" "}
//                   </h3>
//                 </div>
//               </Link>
//               <form className="search_bar" onSubmit={submitHandler}>
//                 <span className="material-symbols-outlined">search</span>

//                 <input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   type="text"
//                   placeholder="Search Products..."
//                   style={{ width: "90%" }}
//                 />
//               </form>
//               <div className="right">
//                 {isAuthenticated && (
//                   <>
//                     <Link
//                       to={"/cart"}
//                       type="button"
//                       className="btn btn-primary position-relative"
//                       style={{ height: "30px" }}
//                     >
//                       <span className="material-symbols-outlined">
//                         shopping_cart
//                       </span>
//                       {cart?.items?.length > 0 && (
//                         <span
//                           className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
//                           style={{ height: "23px", width: "20px" }}
//                         >
//                           {cart?.items?.length}
//                           <span className="visually-hidden">
//                             unread messages
//                           </span>
//                         </span>
//                       )}
//                     </Link>
//                     <Link to={"/profile"} className="btn btn-primary mx-3">
//                       profile
//                     </Link>
//                     <button
//                       className="btn btn-danger mx-3"
//                       onClick={() => {
//                         logout();
//                         navigate("/");
//                       }}
//                     >
//                       logout
//                     </button>
//                   </>
//                 )}
//                 {!isAuthenticated && (
//                   <>
//                     <Link to={"/login"} className="btn btn-secondary mx-3">
//                       login
//                     </Link>
//                     <Link to={"/register"} className="btn btn-info mx-3">
//                       register
//                     </Link>
//                     <Link to={"/adminLogin"} className="btn btn-secondary mx-3">
//                       admin
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>

//             {location.pathname == "/" && (
//               <div className="sub_bar">
//                 <div
//                   className="items"
//                   onClick={() => setFilteredData(products)}
//                 >
//                   No Filter
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("mobiles")}
//                 >
//                   Mobiles
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("laptop")}
//                 >
//                   Laptops
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("camara")}
//                 >
//                   Camara
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("Headphone")}
//                 >
//                   Headphones
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("watch")}
//                 >
//                   watches
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(25999)}>
//                   25999
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(49999)}>
//                   49999
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(100000)}>
//                   100000
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(200000)}>
//                   200000
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </>
//       <>
//         {!a && (
//           <div className="nav sticky-top">
//             <div className="nav-bar  ">
//               <Link
//                 to={"/admin"}
//                 className="left"
//                 style={{ textDecoration: "none", color: "white" }}
//               >
//                 <div style={{ display: "flex" }}>
//                   {" "}
//                   <span className="material-symbols-outlined ">home</span>{" "}
//                   <h3>
//                     <pre> Admin</pre>{" "}
//                   </h3>
//                 </div>
//               </Link>
//               <form className="search_bar" onSubmit={submitHandler_2}>
//                 <span className="material-symbols-outlined">search</span>

//                 <input
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   type="text"
//                   placeholder="Search Products..."
//                   style={{ width: "90%" }}
//                 />
//               </form>
//               <div className="right">
//                 {isAuthenticated && (
//                   <>


//                     <button
//                       className="btn btn-warning mx-3"
//                       onClick={() => {
//                         navigate("/add-product");
//                       }}
//                     >
//                       Add Product
//                     </button>

//                     <button
//                       className="btn btn-secondary mx-3"
//                       onClick={async() => {
//                         await getAllOrder()
//                         navigate("/all-order");
//                       }}
//                     >
//                       All Order's
//                     </button>
//                     <button
//                       className="btn btn-primary mx-3"
//                       onClick={async() => {
//                         await getAllUser()
//                         navigate("/all-user");
//                       }}
//                     >
//                       All Users
//                     </button>
//                     <button
//                       className="btn btn-danger mx-3"
//                       onClick={() => {
//                         logout();
//                         navigate("/");
//                       }}
//                     >
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* {location.pathname == "/adimn" && (
//               <div className="sub_bar">
//                 <div
//                   className="items"
//                   onClick={() => setFilteredData(products)}
//                 >
//                   No Filter
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("mobiles")}
//                 >
//                   Mobiles
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("laptop")}
//                 >
//                   Laptops
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("camara")}
//                 >
//                   Camara
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("Headphone")}
//                 >
//                   Headphones
//                 </div>
//                 <div
//                   className="items"
//                   onClick={() => filterbyCategory("watch")}
//                 >
//                   watches
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(25999)}>
//                   25999
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(49999)}>
//                   49999
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(100000)}>
//                   100000
//                 </div>
//                 <div className="items" onClick={() => filterbyPrice(200000)}>
//                   200000
//                 </div>
//               </div>
//             )} */}
//           </div>
//         )}
//       </>
//     </>
//   );
// };
// export default Navbar;

















































































import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import "./navbar.css";

const ADMIN_PATHS = [
  "/admin",
  "/update-item",
  "/add-product",
  "/all-user",
  "/all-order",
];

const CATEGORY_FILTERS = [
  { label: "All", type: "all" },
  { label: "Mobiles", type: "category", value: "mobiles" },
  { label: "Laptops", type: "category", value: "laptop" },
  { label: "Camara", type: "category", value: "camara" },
  { label: "Headphones", type: "category", value: "Headphone" },
  { label: "Watches", type: "category", value: "watch" },
];

const PRICE_FILTERS = [
  { label: "Under ₹25,999", type: "price", value: 25999 },
  { label: "Under ₹49,999", type: "price", value: 49999 },
  { label: "Under ₹1,00,000", type: "price", value: 100000 },
  { label: "Under ₹2,00,000", type: "price", value: 200000 },
];

const Navbar = () => {
  const {
    setFilteredData,
    products,
    logout,
    isAuthenticated,
    cart,
    getAllUser,
    getAllOrder,
  } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();

  const isAdminPage = ADMIN_PATHS.includes(location.pathname);
  const cartCount = cart?.items?.length || 0;

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products?.filter(
        (data) => data.category?.toLowerCase() === cat?.toLowerCase()
      )
    );
  };

  const filterbyPrice = (price) => {
    setFilteredData(products?.filter((data) => data?.price <= price));
  };

  const applyFilter = (f) => {
    setActiveFilter(f.label);
    if (f.type === "all") setFilteredData(products);
    else if (f.type === "category") filterbyCategory(f.value);
    else filterbyPrice(f.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  // Admin search: same as the original, it only clears the input
  const submitHandlerAdmin = (e) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nb">
      <div className="nb-bar">
        {/* Brand */}
        <Link
          to={isAdminPage ? "/admin" : "/"}
          className="nb-brand"
          onClick={() => {
            if (!isAdminPage) {
              setFilteredData(products);
              setActiveFilter("All");
            }
          }}
        >
          <span className="material-symbols-outlined">storefront</span>
          {isAdminPage ? "Admin" : "Smart Bajar"}
        </Link>

        {/* Cart + hamburger (always visible in the top row) */}
        <div className="nb-actions">
          {!isAdminPage && isAuthenticated && (
            <Link to="/cart" className="nb-icon-btn" aria-label="Cart">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
            </Link>
          )}

          <button
            type="button"
            className="nb-icon-btn nb-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Search */}
        <form
          className="nb-search"
          onSubmit={isAdminPage ? submitHandlerAdmin : submitHandler}
        >
          <span className="material-symbols-outlined">search</span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </form>

        {/* Menu */}
        <nav className={`nb-menu ${menuOpen ? "is-open" : ""}`}>
          {isAdminPage ? (
            isAuthenticated && (
              <>
                <button
                  className="nb-btn nb-btn--primary"
                  onClick={() => navigate("/add-product")}
                >
                  Add Product
                </button>
                <button
                  className="nb-btn"
                  onClick={async () => {
                    await getAllOrder();
                    navigate("/all-order");
                  }}
                >
                  All Orders
                </button>
                <button
                  className="nb-btn"
                  onClick={async () => {
                    await getAllUser();
                    navigate("/all-user");
                  }}
                >
                  All Users
                </button>
                <button className="nb-btn nb-btn--danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )
          ) : isAuthenticated ? (
            <>
              <Link to="/profile" className="nb-btn">
                <span className="material-symbols-outlined">person</span>
                Profile
              </Link>
              <button className="nb-btn nb-btn--danger" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/adminLogin" className="nb-btn">
                Admin
              </Link>
              <Link to="/login" className="nb-btn">
                Login
              </Link>
              <Link to="/register" className="nb-btn nb-btn--primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Filter bar (home page only) */}
      {!isAdminPage && location.pathname === "/" && (
        <div className="nb-sub">
          <div className="nb-sub-inner">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                className={`nb-chip ${activeFilter === f.label ? "is-active" : ""}`}
                onClick={() => applyFilter(f)}
              >
                {f.label}
              </button>
            ))}

            <span className="nb-sep" aria-hidden="true" />

            {PRICE_FILTERS.map((f) => (
              <button
                key={f.label}
                type="button"
                className={`nb-chip ${activeFilter === f.label ? "is-active" : ""}`}
                onClick={() => applyFilter(f)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;