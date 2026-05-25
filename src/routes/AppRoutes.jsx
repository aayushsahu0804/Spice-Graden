import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/customer/LandingPage";
import MenuPage from "../pages/customer/MenuPage";
import FoodDetailPage from "../pages/customer/FoodDetailPage";
import CartPage from "../pages/customer/CartPage";
import PaymentPage from "../pages/customer/PaymentPage";
import OrderSuccessPage from "../pages/customer/OrderSuccessPage";
import KitchenDashboard from "../pages/kitchen/KitchenDashboard";
import WaiterDashboard from "../pages/waiter/WaiterDashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/food/:name" element={<FoodDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/success" element={<OrderSuccessPage />} />
      <Route path="/kitchen" element={<KitchenDashboard />} />
      <Route path="/waiter" element={<WaiterDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
