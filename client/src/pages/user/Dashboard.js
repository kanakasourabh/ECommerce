import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserManu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <h3 className="mb-4">User Information</h3>
              <div className="user-info">
                <p>
                  <strong>User Name:</strong>{" "}
                  {auth?.user?.name || auth?.user?.user?.name}
                </p>
                <p>
                  <strong>User Email:</strong>{" "}
                  {auth?.user?.email || auth?.user?.user?.email}
                </p>
                <p>
                  <strong>User Address:</strong>{" "}
                  {auth?.user?.address || auth?.user?.user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

// import React from "react";
// import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import UserManu from "../../components/Layout/UserMenu";

// const Dashboard = () => {
//   const [auth] = useAuth();
//   return (
//     <Layout title={"DashBoard - Ecommerce App"}>
//       <div className="container-fluid p-3 m-3">
//         <div className="row">
//           <div className="col-md-3">
//             <UserManu />
//           </div>
//           <div className="col-md-9">
//             <div className="card w-75 p-3">
//               <h3>User Name: {auth?.user?.name || auth?.user?.user?.name}</h3>
//               <h3>
//                 User Email: {auth?.user?.email || auth?.user?.user?.email}
//               </h3>
//               <h3>
//                 User Address: {auth?.user?.address || auth?.user?.user?.address}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;
