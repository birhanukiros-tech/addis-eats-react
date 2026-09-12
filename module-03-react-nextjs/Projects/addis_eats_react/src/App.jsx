import {  Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import Cart from "./cart/Cart";
import Favorites from "./favorites/Favorites";
import Home from "./Home";
import { lazy, Suspense } from "react";
import OrderHistory from "./orders/OrderHistory";
import Login from "./auth/Login";
import RequireAuth from "./auth/RequireAuth";

function App() {
    const Checkout = lazy(() => import("./checkout/Checkout"));

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home/>} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/menu/:id" element={<DishDetail />}/>

                <Route path="/cart" element={<Cart />} />

                <Route path="/favorites" element={<Favorites />} />

                <Route path="/checkout" element={
                    <RequireAuth>
                        <Suspense fallback={<p>Loading checkout...</p>}>
                            <Checkout />
                        </Suspense>
                    </RequireAuth>} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/login" element={<Login />} />
                </Route>
        </Routes>
    );
}

export default App;