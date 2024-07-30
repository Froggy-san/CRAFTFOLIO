import Heading from "@/components/shared/Heading";
import LinkBtn from "@/components/shared/LinkBtn";
import Search from "@/components/shared/Search";
import SelectComp from "@/components/shared/SelectComp";
import { Button } from "@/components/ui/button";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TbLayoutGridAdd } from "react-icons/tb";

const options = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Latest", value: "created_at-desc" },
  { label: "Oldest", value: "created_at-asc" },
];
const ProjectControls = ({
  selectDisabled,
  isTheOwnerOfPage,
}: {
  isTheOwnerOfPage: boolean;
  selectDisabled?: boolean;
}) => {
  return (
    <div className=" mt-16  mb-5">
      {isTheOwnerOfPage ? (
        <div className=" flex items-center justify-center mb-10">
          <Button
            size="sm"
            className=" mx-auto w-full  max-w-[250px]  gap-2  sm:hidden"
            asChild
          >
            <Link to="/upload-post">
              <TbLayoutGridAdd size={20} /> Upload a post
            </Link>
          </Button>
        </div>
      ) : null}
      <div className=" relative flex justify-around xs:flex-row  items-center  gap-3  ">
        <Heading>Posts</Heading>
        <Search className="   w-[60%] max-w-[500px]" />
        <div className=" flex items-center gap-2">
          {isTheOwnerOfPage && (
            <LinkBtn
              to="/upload-post"
              variant="ghost"
              className=" text-[12px] px-2 h-7  gap-1  hidden sm:flex  "
            >
              Add Post <HiOutlinePlus className=" h-3 w-3" />
            </LinkBtn>
          )}
          <SelectComp
            paramName="sort"
            disabled={selectDisabled}
            options={options}
            selectPlaceholer="Sort by"
            className=" w-[200px] xs:w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectControls;
