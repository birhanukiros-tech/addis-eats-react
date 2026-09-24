import "./globals.css";
import Providers from "@/componentes/Providers";
function Header() {
  return(
    <header>
      <h2>🍽️Addis Eats</h2>
    </header>
  );
}

function Footer() {
  return(
    <footer>
      <p>© 2026 Addis Eats</p>
    </footer>
  );
}

function RootLayout({ children }) {
  return(
    <html lang="en">
      <body>
        <Header />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}

 export default RootLayout;