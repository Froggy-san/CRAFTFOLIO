import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserTag from "./UserTag";
import { UserTagProps } from "@/types/types";
import Loading from "./Loading";
import useLogout from "@/features/authentication/useLogout";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";
import { MdOutlineBugReport } from "react-icons/md";

const UserMenu = ({
  user,
  isLoading,
}: {
  user: UserTagProps;
  isLoading: boolean;
}) => {
  const { logOut } = useLogout();
  if (isLoading) return <Loading />;
  if (!user.username) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {" "}
          <UserTag
            showToolTip={false}
            user={user}
            link=""
            className="w-fit max-w-[120px]"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/user/${user.userId}`}>
            <DropdownMenuItem>
              <LuUser className="mr-2 h-4 w-4" />
              <span> Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link to={`/user-settings`}>
            <DropdownMenuItem>
              <FiSettings className="mr-2 h-4 w-4" />
              <span> Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => logOut()}>
            <CgLogOut className="mr-2 h-4 w-4" />
            <span> Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <MdOutlineBugReport className="mr-2 h-4 w-4" />
          <span> Report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
