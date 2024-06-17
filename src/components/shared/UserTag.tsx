import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import useLogout from "@/features/authentication/useLogout";
import { PiSpinnerThin } from "react-icons/pi";
import { UserTagProps } from "@/types/types";
import TooltipComp from "./TooltipComp";
import { defaultProfilePicture } from "@/utils/constants";

const UserTag = ({
  user,
  isLoading,
  className,
  link,
  showToolTip = true,
}: {
  user: UserTagProps;
  isLoading?: boolean;
  className?: string;
  link?: string;
  showToolTip?: boolean;
}) => {
  const { isLogingOut } = useLogout();

  if (isLoading || isLogingOut)
    return (
      <div className=" animate-spin">
        <PiSpinnerThin size={20} />
      </div>
    );

  return (
    <>
      {user.username ? (
        <Link
          to={link || ""}
          className={`flex items-center gap-1  ${className}`}
        >
          {" "}
          <Avatar className="w-7 h-7">
            <AvatarImage
              src={user.avatar || defaultProfilePicture}
              className=" object-cover"
            />
            <AvatarFallback>image</AvatarFallback>
          </Avatar>
          {showToolTip ? (
            <TooltipComp toolTipText={user.username}>
              <p className="    flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis ">
                {isLoading ? "Loading..." : user.username || "user"}
              </p>
            </TooltipComp>
          ) : (
            <p className=" flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis hidden sm:block ">
              {isLoading ? "Loading..." : user.username || "user"}
            </p>
          )}
        </Link>
      ) : null}
    </>
  );
};

export default UserTag;

/*import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import useLogout from "@/features/authentication/useLogout";
import { PiSpinnerThin } from "react-icons/pi";
import { UserTagProps } from "@/types/types";



const UserTag = ({
  user,
  isLoading,
  showLoginBtn = true,
  className,
  link,
}: {
  user: UserTagProps;
  isLoading?: boolean;
  showLoginBtn?: boolean;
  className?: string;
  link?: string;
}) => {
  const { logOut, isLogingOut } = useLogout();

  if (isLoading || isLogingOut)
    return (
      <div className=" animate-spin">
        <PiSpinnerThin size={20} />
      </div>
    );

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {user.username ? (
        <>
          {showLoginBtn ? (
            <Button
              size="sm"
              disabled={isLogingOut}
              onClick={() => logOut()}
              variant="ghost"
            >
              Logout
            </Button>
          ) : null}
          <Link to={link || ""} className="flex items-center gap-1">
            {" "}
            <Avatar className="w-7 h-7">
              <AvatarImage
                src={
                  user.avatar ||
                  "https://ixzmsptjfugshygjmvmh.supabase.co/storage/v1/object/public/projects/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
                }
                className=" object-cover"
              />
              <AvatarFallback>image</AvatarFallback>
            </Avatar>
            <p className="  w-fit max-w-36 overflow-hidden whitespace-nowrap overflow-ellipsis">
              {isLoading ? "Loading..." : user.username || "user"}
            </p>
          </Link>
        </>
      ) : (
        <>
          {showLoginBtn ? (
            <Link to="/login">
              <Button size="sm" variant="ghost">
                Login
              </Button>
            </Link>
          ) : null}
        </>
      )}
    </div>
  );
};

export default UserTag;
 */
