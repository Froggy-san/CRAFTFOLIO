import { Button } from "../ui/button";
import { IoReturnDownBack } from "react-icons/io5";
import { variant } from "@/types/types";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  variant?: variant;
  className?: string;
}

const BackButton = ({ variant, className }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      size="sm"
      onClick={() => navigate(-1)}
      variant={variant || "ghost"}
      className={` absolute left-5 top-5 z-50 opacity-80 ${className || ""}`}
    >
      <IoReturnDownBack size={20} />
    </Button>
  );
};

export default BackButton;
