import Link from "next/link";

function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Categories</h2>

        <nav>
          <ul>
            <li>
              <Link href="/menu">All Dishes</Link>
            </li>

            <li>
              <Link href="/menu?category=fasting">
                Fasting
              </Link>
            </li>

            <li>
              <Link href="/menu?category=traditional">
                Traditional
              </Link>
            </li>

            <li>
              <Link href="/menu?category=breakfast">
                Breakfast
              </Link>
            </li>

            <li>
              <Link href="/menu?category=snacks">
                Snacks
              </Link>
            </li>

            <li>
              <Link href="/menu?category=fast-food">
                Fast Food
              </Link>
            </li>

            <li>
              <Link href="/menu?category=drinks">
                Drinks
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="menu-content">
        {children}
      </main>
    </div>
  );
}

export default MenuLayout;