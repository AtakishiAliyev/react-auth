import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import NotFound from "./pages/404";

function App() {
  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
