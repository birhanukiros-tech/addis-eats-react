function Header() {
  return(
    <div>
      <h1>Addis Eats</h1>
      <h3>Our Menu</h3>
    </div>
  );
}

const foods=[
  {id:1, name:"Pasta", price:200},
  {id:2, name:"Burger", price: 450},
  {id:3, name:"Pizza", price:500}
];

function Dish({ name, price }) {
  return(
    <div>
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}

function App(){
  return(
    <div>
      <Header/>
      {foods.map(food =>(
        <Dish key={food.id} name={food.name} price={food.price}/>
      ))}
    </div>
  );
}
export default App