import Link from "next/link";
function NotFound(){
    return(
        <section  className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]"> Addis Eats</p>

            <h1 className="mt-3 text-5xl font-bold">Dish Not Found</h1>

            <p className="mt-4 max-w-md text-[var(--muted)]">Sorry, we couldn't find the dish you're looking for.</p>
            
            <Link href="/menu"
            className="mt-6 rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white"
            >Back to Menu</Link>
        </section>
    );
}
export default NotFound;