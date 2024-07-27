import { Input } from "@/components/ui/input";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation, useSearchParams } from "react-router-dom";
import useSetParams from "@/hooks/useSetParams";
import useDeleteParam from "@/hooks/useDeleteParam";
const Search = ({ className }: { className?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const currentPage = searchParams.get("page");
  const deleteParam = useDeleteParam();
  const url = useLocation();
  const setParam = useSetParams();
  const hasTheUserSearched = url.search.includes("search");

  function handleSearch(value: string) {
    // setParam("search", value, hasTheUserSearched);
    searchParams.set("search", value);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: hasTheUserSearched });
  }

  return (
    <div className={`  ${className}`}>
      <div className={` relative `}>
        <Input
          id="search-bar"
          value={searchTerm}
          type="search"
          placeholder="Search..."
          aria-label="search"
          onChange={(e) => {
            if (e.target.value.trim().length) handleSearch(e.target.value);
            // setParam("search", e.target.value, hasTheUserSearched);
            if (e.target.value === "") {
              deleteParam("search", true);
            } // the True here is setting the replace parameter to true. so when deleting we are replaceing it with a new url.
          }}
        />
        <label
          htmlFor="search-bar"
          className=" absolute right-2 top-1/2 translate-y-[-50%]"
        >
          <BiSearchAlt size={20} />
        </label>
      </div>
    </div>
  );
};

export default Search;
