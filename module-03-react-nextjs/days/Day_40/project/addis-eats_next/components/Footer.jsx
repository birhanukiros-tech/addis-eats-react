function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--primary)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)] font-extrabold text-[var(--primary)]">
                AE
              </div>

              <div>
                <h2 className="text-xl font-extrabold">Addis Eats</h2>
                <p className="text-xs uppercase tracking-widest text-white/60">
                  Ethiopian Food
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Authentic Ethiopian food, prepared with care and delivered with
              the flavors of Addis Ababa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-[var(--accent)]">Quick Links</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-white/75">
              <a href="/" className="transition hover:text-white">
                Home
              </a>

              <a href="/menu" className="transition hover:text-white">
                Menu
              </a>

              <a href="/favorites" className="transition hover:text-white">
                Favorites
              </a>

              <a href="/orders" className="transition hover:text-white">
                Order History
              </a>

              <a href="/cart" className="transition hover:text-white">
                Cart
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-[var(--accent)]">Addis Eats</h3>

            <div className="mt-4 space-y-3 text-sm text-white/75">
              <p>📍 Addis Ababa, Ethiopia</p>
              <p>📞 +251 900 000 000</p>
              <p>✉️ hello@addiseats.com</p>
            </div>

            <div className="mt-5 flex gap-2">
              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">
                Fresh
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">
                Authentic
              </span>
              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs">
                Local
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Addis Eats. All rights reserved.</p>

          <p>Made with ❤️ in Addis Ababa</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
