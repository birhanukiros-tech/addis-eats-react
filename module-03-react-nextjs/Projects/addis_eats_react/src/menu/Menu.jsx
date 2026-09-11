import { useEffect, useState } from "react";
import getDishes from "../api/dishes";
import Skeleton from "../ui/Skeleton";
import ErrorState from "../ui/ErrorState";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import { useSearchParams } from "react-router-dom";
function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);


  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory =
    searchParams.get("category") || "all";

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

  const filteredDishes =
  selectedCategory === "all" 
                ? dishes 
                : dishes.filter(
                    (dish) =>dish.category === selectedCategory);

  return(
    <div className="menu-page">
        <h1>Addis Eats Menu</h1>
        <CategoryBar
        selectedCategory={selectedCategory}
        onSelect={(category) =>{
            if(category === "all") {
                setSearchParams({});
            }else {
                setSearchParams({ category });
            }
        }}/>
    
            {loading ? (
                <div>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ): error ? (
                <ErrorState message={error}/>
            ) : dishes.length === 0 ? (
                    <p>No dishes available.</p>
            ):(
                <DishList dishes={filteredDishes} />
            )}
    </div>
  );
}

export default Menu;
