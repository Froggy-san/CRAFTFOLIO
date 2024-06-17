import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useDeleteParam() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const deleteParam = useCallback(
    (paramName: string, replace?: boolean) => {
      // Create a new URLSearchParams object without the product parameter
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(paramName);

      // Navigate to the same pathname with the new search string
      navigate({ search: newParams.toString() }, { replace: replace });
    },
    [navigate, searchParams]
  );

  return deleteParam;
}
