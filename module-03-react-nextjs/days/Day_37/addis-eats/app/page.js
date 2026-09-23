import Link from "next/link";

function HomePage() {
  return(
    <main>
      <h1> Welcome to Addis Eats</h1>
      <p>Dsicover delicious Ethiopian food</p>

      <Link href="/menu"> View Menu</Link>
    </main>
  )
}
export default HomePage;