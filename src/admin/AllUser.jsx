// import React, { useContext } from "react";
// import AppContext from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const AllUser = () => {
//   const { allUser, deleteUser } = useContext(AppContext);
//   const navigate = useNavigate();

//   return (
//     <>
//       {allUser?.map((user) => (
//         <div
//           key={user?._id}
//           className="container bg-dark my-5 p-3 text-center"
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
          
//             <span class="material-symbols-outlined" style={{"font-size": "90px"}}> person </span>

//           <div className="cart_des">
//             <h2>{user?.name}</h2>
//             <h3>{user?.email}</h3>
//           </div>
//           <div className="cart_action">
//             <button
//               className="btn btn-danger mx-3"
//               onClick={() => {
//                 deleteUser(user?._id);
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

// export default AllUser;























































import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import "./all-user.css";

const AllUser = () => {
  const { allUser, deleteUser } = useContext(AppContext);

  const handleDelete = (user) => {
    if (window.confirm(`Delete user "${user?.name || user?.email}"?`)) {
      deleteUser(user?._id);
    }
  };

  return (
    <div className="container my-4 my-md-5 px-3">
      <h1 className="au-title">
        All Users
        <small>
          {allUser?.length || 0} {allUser?.length === 1 ? "user" : "users"}
        </small>
      </h1>

      <div className="au-list">
        {(!allUser || allUser.length === 0) && (
          <div className="au-empty">No users found.</div>
        )}

        {allUser?.map((user) => (
          <div key={user?._id} className="au-row">
            {/* first letter of the name as the avatar */}
            <div className="au-avatar" aria-hidden="true">
              {user?.name?.trim()?.[0] || (
                <span className="material-symbols-outlined">person</span>
              )}
            </div>

            <div className="au-info">
              <h2 className="au-name">{user?.name}</h2>
              <p className="au-email">{user?.email}</p>
            </div>

            <div className="au-action">
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user)}
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

export default AllUser;