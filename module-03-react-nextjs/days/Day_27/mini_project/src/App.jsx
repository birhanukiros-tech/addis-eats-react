import dishes from "./data";
import Menu from "./Menu";

function App() {
return(
  <div>
    <h1>Addis Eats</h1>
    <Menu dishes={dishes} 
    category = "fast"/>
  </div>
);

}

export default App;