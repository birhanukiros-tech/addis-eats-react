import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CartProvider from "../components/CartProvider";
import CartDrawer from "../components/CartDrawer";
import FavoritesProvider from "../components/FavoritesProvider";
import AuthProvider from "../components/AuthProvider";
import OrderProvider from "../components/OrderProvider";
import AdminAuthProvider from "@/components/AdminAuthProvider";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Addis Eats",
  description: "Authentic Ethiopian food ordering experience",
};

function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <AdminAuthProvider>
          <ThemeProvider>
        <CartProvider>
          <FavoritesProvider>
            <AuthProvider>
              <OrderProvider>
                <Header />

                <main className="flex-1">
                  {children}
                </main>

                <Footer />
                <CartDrawer />
              </OrderProvider>
            </AuthProvider>
          </FavoritesProvider>
        </CartProvider>
        </ThemeProvider>
      </AdminAuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
