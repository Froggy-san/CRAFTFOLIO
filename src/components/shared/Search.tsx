import { Input } from "@/components/ui/input";
import { BiSearchAlt } from "react-icons/bi";
import { useLocation, useSearchParams } from "react-router-dom";
import useSetParams from "@/hooks/useSetParams";
import useDeleteParam from "@/hooks/useDeleteParam";
const Search = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const deleteParam = useDeleteParam();
  const url = useLocation();
  const setParam = useSetParams();
  const hasTheUserSearched = url.search.includes("search");
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
            if (e.target.value.trim().length)
              setParam("search", e.target.value, hasTheUserSearched);
            if (e.target.value === "") deleteParam("search", true); // the True here is setting the replace parameter to true. so when deleting we are replaceing it with a new url.
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
