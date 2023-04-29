import React, { useEffect, useState } from "react";

export default function useDebounce(val, delay) {
  const [serchTerm, setserchTerm] = useState(val);
  useEffect(() => {
    const timer = setTimeout((e) => setserchTerm(val), delay);
    return (e) => clearTimeout(timer);
  }, [val, delay])
  return serchTerm
}