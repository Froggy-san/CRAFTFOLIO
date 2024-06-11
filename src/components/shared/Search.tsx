import { Input } from "@/components/ui/input";
import { BiSearchAlt } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import useSetParams from "@/hooks/useSetParams";
import useDeleteParam from "@/hooks/useDeleteParam";
const Search = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const deleteParam = useDeleteParam();
  const setParam = useSetParams();

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
            setParam("search", e.target.value);
            if (e.target.value === "") deleteParam("search");
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
