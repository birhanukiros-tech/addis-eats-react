function Header() {
  return (
  <div>
    <h1>Addis Eats</h1>
    <h2>Our Menu</h2>
    </div>
  )
}
function Dish({ name,price }) {
  return(
    <div>
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}

const foods =[
  {id:1, name:"Shiro", price:120},
  {id:2, name:"Kitfo", price:400},
  {id:3, name:"Tibs", price:300},
];

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
  export default App;
