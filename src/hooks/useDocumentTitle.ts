import { useEffect } from "react";

export default function useDocumentTitle(
  title: string,
  extraDependencies: any
) {
  useEffect(() => {
    document.title = title;
  }, [title, extraDependencies]);
}
