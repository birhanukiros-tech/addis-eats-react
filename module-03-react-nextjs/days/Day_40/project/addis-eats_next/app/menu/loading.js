function MenuLoading() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

      <div className="mt-3 h-10 w-64 animate-pulse rounded bg-gray-200" />

      <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-gray-200" />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-[var(--border)] bg-white"
          >
            <div className="h-56 w-full animate-pulse bg-gray-200" />

            <div className="p-6">
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-200" />

              <div className="mt-6 flex items-center justify-between">
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />

                <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuLoading;
