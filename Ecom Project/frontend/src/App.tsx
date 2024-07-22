import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./layout/layout";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./routes/Private";
import Dashboard from "./user/Dashboard";
import AdminRoute from "./routes/Admin";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import {UserList} from "./admin/UserList";
import ShowProducts from "./admin/ShowProducts";
import  UpdateProduct  from './admin/updateProduct';
import ShowCategory from "./admin/ShowCategory";
import UpdateCategory from "./admin/updateCategory";
import CartPage from "./pages/CartPage";


function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout title="Best Offers" />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="user" element={<Dashboard/>}/>
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="admin/create-category" element={<CreateCategory/>}/>
            <Route path="admin/create-product" element={<CreateProduct/>}/>
            <Route path="admin/show-products" element={<ShowProducts/>}/>
            <Route path="admin/update-product/:slug" element={<UpdateProduct/>}/>
            <Route path="admin/show-category" element={<ShowCategory/>}/>
            <Route path="admin/update-category/:id" element={<UpdateCategory/>}/>
            <Route path="admin/users" element={<UserList/>}/>
        </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
