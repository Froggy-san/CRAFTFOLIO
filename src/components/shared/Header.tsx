import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import LinkBtn from "./LinkBtn";

const Header = () => {
  const { user, isLoading } = useAuth();

  const userObj = {
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };
  return (
    <header className=" flex items-center justify-between  rounded-sm bg-teal-300 mt-3 py-1 px-2">
      <Logo />
     
   <div className=" flex items-center gap-1">
    {user?    null : <LinkBtn   variant="ghost"  size="sm"  to="/login" >Login</LinkBtn>}
   <UserMenu user={userObj} isLoading={isLoading} />

   </div>
    </header>
  );
};

export default Header;
