function MenuLayout({ children }) {
    return(
        <div>
         <div className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <p className="text-sm font-semibold text-[var(--primary)]">Addis Eats Menu</p>
            </div>
         </div>
         {children}
        </div>
    )
}
export default MenuLayout;