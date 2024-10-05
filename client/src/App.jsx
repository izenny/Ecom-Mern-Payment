import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Account/Login";
import AuthLayout from "./Components/Auth/layout";
import Register from "./Account/Register";
import AdminLayout from "./Components/Admin-view/layout";
import AdminDashboard from "./Pages/Admin-View/dashboard";
import AdminProducts from "./Pages/Admin-View/products";
import AdminFeaturs from "./Pages/Admin-View/features";
import AdminOrder from "./Pages/Admin-View/orders";
import ShoppingLayout from "./Components/Shopping-View/layout";
import NotFound from "./Pages/Not-Found";
import ShoppingAccount from "./Pages/Shopping-View/Acoount";
import ShoppingHome from "./Pages/Shopping-View/Home";
import ShoppingCheckout from "./Pages/Shopping-View/CheckOut";
import ShoppingListing from "./Pages/Shopping-View/Listing";
import CheckAuth from "./Components/Common/CheckAuth";
import UnAuthPage from "./Pages/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./Redux/AuthSlice";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
console.log(isLoading,user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
if (isLoading) {
  return        <div className=" w-screen h-screen flex items-center justify-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px] bg-slate-200" />
    <Skeleton className="h-4 w-[200px] bg-slate-200" />
  </div>
</div>

}
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeaturs />} />
          <Route path="orders" element={<AdminOrder />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
};

export default App;





// import React from "react";

// const App = () => {
//   return (
    
      // <div className=" w-screen h-screen flex items-center justify-center space-x-4">
      //   <Skeleton className="h-12 w-12 rounded-full bg-slate-200" />
      //   <div className="space-y-2">
      //     <Skeleton className="h-4 w-[250px] bg-slate-200" />
      //     <Skeleton className="h-4 w-[200px] bg-slate-200" />
      //   </div>
      // </div>
   
//   );
// };

// export default App;
