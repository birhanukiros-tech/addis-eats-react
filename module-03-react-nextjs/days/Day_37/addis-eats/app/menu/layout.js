import Link from "next/link"
function MenuLayout({ children }) {
    return(
        <div className="menu-layout">
            <aside>
                <h2>Categories</h2>

                <nav>
                    <ul>
                        <li>
                            <Link href="/menu">All Dishes</Link>
                        </li>

                         <li>
                            <Link href="/menu?category=fasting"> Fasting</Link>
                        </li>

                         <li>
                            <Link href="/menu?category= non-fasting">Non-Fasting</Link>
                        </li>

                         <li>
                            <Link href="/menu?category= drinks">Drinks</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <maiN>
                {children}
            </maiN>
        </div>
    );
}

export default MenuLayout;