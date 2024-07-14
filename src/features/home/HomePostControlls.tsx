import Search from "@/components/shared/Search";
import SelectComp from "@/components/shared/SelectComp";
import LinkBtn from "@/components/shared/LinkBtn";
import { HiOutlinePlus } from "react-icons/hi";
import { UserTagProps } from "@/types/types";

const Options = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Oldest", value: "created_at-asc" },
  { label: "Newest", value: "created_at-desc" },
  {
    label: "newestssssssssssssaaassssssssss",
    value: "created_asssssssssst-desc",
  },
  { label: "Add post", value: "/login", valueOne: "/user/" },
];

const HomePostControlls = ({
  user,
  selectDisabled,
  className,
}: {
  selectDisabled?: boolean;
  user?: UserTagProps;
  className?: string;
}) => {
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
          user={user}
          paramName="sort"
          options={Options}
          selectPlaceholer="Sort by"
          className=" w-[200px] xs:w-[120px]"
        />
      </div>
    </div>
  );
};

export default HomePostControlls;
