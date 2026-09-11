import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "./cart/Cart";
import Navbar from "./ui/Navbar";

function App() {
    return (
        <div>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Navigate to="/menu" replace />} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/menu/:id" element={<DishDetail />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;

