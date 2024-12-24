import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// Function overloads function
// setParam(nameOfParam: string, value: string, replace?: boolean): void; function setParam(nameOfParam: string, value: string, replace?: boolean, deleteParam?: false): void; function setParam(nameOfParam: string, value: undefined, replace?: boolean, deleteParam: true): void; // Function implementation function setParam( nameOfParam: string, value?: string, replace?: boolean, deleteParam?: boolean ): void {

export default function useSetParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setParam(
    nameOfParam: string,
    value: string,
    replace?: boolean,
    deleteParam?: boolean,
  ) {
    //     searchParams.set(nameOfParam, value)
    // setSearchParams(searchParams)
    const newSearchParams = new URLSearchParams(searchParams);
    if (deleteParam) {
      newSearchParams.delete(nameOfParam);
    } else {
      newSearchParams.set(nameOfParam, value);
    }
    setSearchParams(newSearchParams, { replace: replace });
  }
  return setParam;
}
