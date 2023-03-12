import { useState } from "react";
export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        ...options,
      });
      const data = await res.json();
      if (data.status !== "success") throw new Error(data.message);
      setResponse(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return { fetchData, response, error, loading, setError };
};

export default useFetch;
