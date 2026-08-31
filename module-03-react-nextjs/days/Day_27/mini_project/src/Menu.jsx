import Dish from "./Dish";
function Menu({ dishes,category }) {
    const foods = dishes.filter
    (food=>food.category === category
    );

    if(foods.length === 0) {
        return <p>No dishes found.</p>
    }

    return(
        <div>
            {foods.map(food =>(
                <Dish
                 key={food.id}
                 name={food.name}
                 price={food.price}
                 spicy={food.spicy}
                 />
            ))}
        </div>
    );
}
export default Menu;