import { useEffect } from "react";

function useScrollUpWhenMounted() {
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }, []);
}

export default useScrollUpWhenMounted;
