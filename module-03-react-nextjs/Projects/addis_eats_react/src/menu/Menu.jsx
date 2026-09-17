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
  const[searchTerm, setSearchTerm] = useState("");


  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory =
    searchParams.get("category") || "all";

  useEffect(() => {
    async function loadDishes() {
        try{
            
        await new Promise((resolve) => setTimeout(resolve, 1000));

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

  const filteredDishes =dishes.filter((dish) =>{
    const matchesCategory =
        selectedCategory === "all" ||
        dish.category === selectedCategory;

    const matchesSearch =
     dish.name.toLowerCase().includes(searchTerm.toLowerCase());

     return matchesCategory && matchesSearch;
  });

  return(
    <div className="menu-page">
        <h1>🍽️ Addis Eats Menu</h1>

        <input 
         className="search-input"
        type="text" 
        placeholder="Search dishes..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}/>

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
                <div className="dish-list">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </div>
            ): error ? (
                <ErrorState message={error}/>
            ) : filteredDishes.length === 0 ? (
                    <p>No dishes available.</p>
            ):(
                <DishList dishes={filteredDishes} />
            )}
    </div>
  );
}

export default Menu;
