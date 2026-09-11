import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/menu" replace />} />

                <Route path="/menu" element={<Menu />} />

                <Route path="/menu/:id" element={<DishDetail />} />
            </Routes>
        </div>
    );
}

export default App;

