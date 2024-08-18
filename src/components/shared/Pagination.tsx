import { useSearchParams } from "react-router-dom";
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
import IconButton from "./IconButton";
import { PaginationEllipsis } from "../ui/pagination";
import { Link } from "react-scroll";
import { cn } from "@/lib/utils";

const scrollOffest = -50;
const scrollDuraiton = 200;

const Pagination = ({
  pageCount,
  className,
}: {
  pageCount: number;
  className?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  // const pageNumbers = Array.from({ length: 3 }, (_, index) => {
  //   const page = currentPage - 1 + index;
  //   return page > 0 && page <= pageCount ? page : null;
  // }).filter(Boolean);

  const pageNumbers = Array.from({ length: 3 }, (_, index) => {
    // Adjust the starting point based on the current page
    let basePage = currentPage - 1;
    if (currentPage === 1) {
      basePage = 1; // Start from the first page
    } else if (currentPage === pageCount) {
      basePage = pageCount - 2; // Start two pages before the last page
    }
    // Calculate the page number
    const page = basePage + index;
    // Return the page number if it's within the valid range
    return page > 0 && page <= pageCount ? page : null;
  }).filter(Boolean); // Filter out any null values

  function handleNext() {
    if (currentPage === pageCount) return;
    const next = String(currentPage + 1);
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function handlePrev() {
    if (currentPage === 1) return;
    const prev = String(currentPage - 1);
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  function handleGoToPage(page: number) {
    const pageNumber = String(page);
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Link
        to={currentPage === 1 ? "" : "posts-container"}
        smooth
        duration={scrollDuraiton}
        offset={scrollOffest}
      >
        <IconButton
          disabled={currentPage === 1}
          variant="ghost"
          onClick={handlePrev}
        >
          <TiArrowLeftThick size={20} />
        </IconButton>
      </Link>
      <div className="flex items-center">
        {currentPage > 3 && <PaginationEllipsis />}
        {pageNumbers.map((page) => (
          <Link
            to={currentPage === page ? "" : "posts-container"}
            smooth
            offset={scrollOffest}
            duration={scrollDuraiton}
            key={page}
          >
            <IconButton
              variant="ghost"
              disabled={currentPage === page}
              onClick={() => handleGoToPage(page as number)}
            >
              {" "}
              {page}
            </IconButton>
          </Link>
        ))}
        {currentPage < pageCount - 2 && <PaginationEllipsis />}
      </div>
      <Link
        to={currentPage === pageCount ? "" : "posts-container"}
        smooth
        offset={scrollOffest}
        duration={scrollDuraiton}
      >
        <IconButton
          disabled={currentPage === pageCount}
          variant="ghost"
          onClick={handleNext}
        >
          {" "}
          <TiArrowRightThick size={20} />
        </IconButton>
      </Link>
    </div>
  );
};

export default Pagination;
