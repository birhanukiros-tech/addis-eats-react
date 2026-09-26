import Link from "next/link";
import OrderForm from "@/componentes/OrderForm";
function HomePage() {
  return(
    <main>
      <h1> Welcome to Addis Eats</h1>
      <p>Dsicover delicious Ethiopian food</p>

      <Link href="/menu"> View Menu</Link>
      <OrderForm/>
    </main>
  )
}
export default HomePage;