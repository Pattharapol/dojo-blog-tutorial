import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          // var msg = 'Could not fetch data for that resource';
          // setError(msg);
          throw Error("Could not fetch data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          return () => abortCont.abort();
        } else {
          var msg = "Could not fetch data for that resource";
          setError(msg);
          setIsPending(false);
        }
      });
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
