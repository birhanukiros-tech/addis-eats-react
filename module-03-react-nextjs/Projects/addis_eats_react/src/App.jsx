import {  Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./cart/Cart";
import Favorites from "./favorites/Favorites";
import Home from "./Home";
import Checkout from "./checkout/Checkout";
import OrderHistory from "./orders/OrderHistory";
function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home/>} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/menu/:id" element={<DishDetail />}/>

                <Route path="/cart" element={<Cart />} />

                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<OrderHistory />} />
                </Route>
        </Routes>
    );
}

export default App;