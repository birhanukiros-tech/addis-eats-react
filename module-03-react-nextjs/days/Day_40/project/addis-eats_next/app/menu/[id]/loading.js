function DishDetailsLoading() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div className="grid gap-8 md:grid-cols-2">
       
        <div className="h-80 animate-pulse rounded-xl bg-gray-200" />

        <div>
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-3 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-5 h-5 w-full animate-pulse rounded bg-gray-200" />

          <div className="mt-2 h-5 w-5/6 animate-pulse rounded bg-gray-200" />

          <div className="mt-6 h-8 w-28 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-5 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
export default DishDetailsLoading;
