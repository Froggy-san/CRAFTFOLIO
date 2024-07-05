import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import LinkBtn from "./LinkBtn";
import HeaderSearchBar from "./headerSearchBar/HeaderSearchBar";

const Header = () => {
  const { user, isLoading } = useAuth();

  const userObj = {
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };
  return (
    <header className=" flex items-center justify-between  border shadow-md rounded-lg  mt-3 py-1 px-2">
      <Logo />

      <div className=" flex flex-1 justify-end ml-3 sm:flex-none items-center gap-1">
        <HeaderSearchBar />

        {user || isLoading ? null : (
          <LinkBtn variant="ghost" size="sm" to="/login">
            Login
          </LinkBtn>
        )}
        <UserMenu user={userObj} isLoading={isLoading} />
      </div>
    </header>
  );
};

export default Header;
