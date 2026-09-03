import CartProvider from "./CartProvider";
import Menu from "./Menu";

function App() {
  return (
    <CartProvider>
      <div>
        <Menu />
      </div>
    </CartProvider>
  );
}

export default App;
