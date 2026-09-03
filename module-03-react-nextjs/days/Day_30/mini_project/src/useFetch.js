import { useState, useEffect } from "react";

function useFetch(url, category) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Could not load the menu items");
        }

        const json = await res.json();

        if (category === "All") {
          setData(json);
        } else {
          setData(json.filter((item) => item.category === category));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, category]);

  return { data, loading, error };
}

export default useFetch;
