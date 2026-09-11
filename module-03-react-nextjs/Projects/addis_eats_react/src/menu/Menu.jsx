import { useEffect, useState } from "react";
import getDishes from "../api/dishes";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";
import DishList from "./DishList";
function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  useEffect(() => {
    async function loadDishes() {
        try{
      const data = await getDishes();

      setDishes(data);
        } catch(error) {
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }
    loadDishes();
  }, []);

  return(
    <div className="menu-page">
        <h1>Addis Eats Menu</h1>
    
            {loading ? (
                <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ): error ? (
                <ErrorState message={error}/>
            ) : (
                <DishList dishes={dishes} />
            )}
    </div>
  );
}

export default Menu;
