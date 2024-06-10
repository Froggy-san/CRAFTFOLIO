import Heading from "@/components/shared/Heading";
import Search from "@/components/shared/Search";
import SelectComp from "@/components/shared/SelectComp";

const Options = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Oldest", value: "created_at-asc" },
  { label: "Newest", value: "created_at-desc" },
];
const ProjectControls = () => {
  return (
    <div className=" relative flex justify-around xs:flex-row  items-center  gap-3  my-5">
      <Heading>Posts</Heading>
      <Search className="   w-[60%] max-w-[500px]" />
      <div className=" flex items-center gap-2">
        <SelectComp
          paramName="sort"
          options={Options}
          selectPlaceholer="Sort by"
          className=" w-[200px] xs:w-[120px]"
        />
      </div>
    </div>
  );
};

export default ProjectControls;
