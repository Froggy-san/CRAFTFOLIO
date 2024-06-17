import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useSetParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setParam(nameOfParam: string, value: string, replace?: boolean) {
    //     searchParams.set(nameOfParam, value)
    // setSearchParams(searchParams)
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(nameOfParam, value);
    setSearchParams(newSearchParams, { replace: replace });
  }
  return setParam;
}
