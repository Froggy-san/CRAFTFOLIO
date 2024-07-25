import { format } from "date-fns";

const TypeAndDate = ({
  type,
  startDate,
  endDate,
}: {
  type: string;
  startDate: string;
  endDate: string;
}) => {
  return (
    <div className=" flex flex-col sm:flex-row gap-y-5 justify-between">
      <div>Type: {type}</div>
      <div className=" flex flex-col xs:flex-row gap-y-6 items-center  justify-between">
        <div className=" text-xs">
          Start date:
          <span className=" text-red-500">
            {" "}
            {format(new Date(startDate), "LLLL/dd/yyyy")}
          </span>{" "}
          - End date:
          <span className=" text-red-500">
            {" "}
            {format(new Date(endDate), "LLLL/dd/yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypeAndDate;
