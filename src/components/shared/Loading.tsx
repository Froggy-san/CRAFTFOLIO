import { PiSpinnerThin } from "react-icons/pi";
const Loading = ({
  size,
  className,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div className={`flex justify-center items-center  ${className}`}>
      <PiSpinnerThin size={size || 20} className="animate-spin" />
    </div>
  );
};

export default Loading;
