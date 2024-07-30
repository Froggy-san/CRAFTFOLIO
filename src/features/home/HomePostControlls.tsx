import Search from "@/components/shared/Search";
import SelectComp from "@/components/shared/SelectComp";
import LinkBtn from "@/components/shared/LinkBtn";
import { HiOutlinePlus } from "react-icons/hi";
import { UserTagProps } from "@/types/types";

const HomePostControlls = ({
  user,
  selectDisabled,
  className,
}: {
  selectDisabled?: boolean;
  user?: UserTagProps;
  className?: string;
}) => {
  const options = [
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Latest", value: "created_at-desc" },
    { label: "Oldest", value: "created_at-asc" },

    {
      label: (
        <span className=" flex  items-center">
          {" "}
          <HiOutlinePlus className="mr-2 h-4 w-4" />
          <span className="truncate">Add post</span>
        </span>
      ),
      value: "",
      link: user?.username ? `/user/${user.userId}` : "/login",
    },
  ];
  return (
    <div
      className={`relative flex justify-around xs:flex-row  items-center  gap-3  my-5 ${
        className || ""
      }`}
    >
      <h1 className=" font-semibold text-2xl sm:text-3xl">Posts</h1>
      <Search className="   w-[60%] max-w-[500px]" />
      <div className=" flex items-center gap-2">
        <LinkBtn
          to={user && user.username ? `/user/${user.userId}` : "/login"}
          variant="ghost"
          className=" text-[12px] px-2 h-7  gap-1  hidden sm:flex  "
        >
          Add Post <HiOutlinePlus className=" h-3 w-3" />
        </LinkBtn>
        <SelectComp
          disabled={selectDisabled}
          paramName="sort"
          options={options}
          selectPlaceholer="Sort by"
          className=" w-[200px] xs:w-[120px]"
        />
      </div>
    </div>
  );
};

export default HomePostControlls;
