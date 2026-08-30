import Dish from "./Dish";
function Header() {
  return(
    <div>
      <h1>Addis Eats</h1>
      <h2>Our Menu</h2>
    </div>
  );
}

const dishes=[
  {id:1, name:"Doro wet", price:400},
  {id:2, name:"Dulet", price:500},
  {id:3, name:"Firfir", price: 200},
  {id:4, name:"Fast food", price:300}
];

function App() {
  return(
    <div>
       <Header/>
   {dishes.map(dish =>(
        <Dish 
            key={dish.id}
            name={dish.name} 
            price={dish.price}
          />
      ))}
    </div>   
  );

}

export default App