import "./globals.css";
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
        {children}
        <Footer />
      </body>
    </html>
  );
}

 export default RootLayout;