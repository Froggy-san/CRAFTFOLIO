import { useAuth } from "@/hooks/useAuth";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import LinkBtn from "./LinkBtn";
import HeaderSearchBar from "./headerSearchBar/HeaderSearchBar";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  const { user, isLoading } = useAuth();

  const userObj = {
    username: user?.username,
    userId: user?.id,
    avatar: user?.avatar,
  };
  return (
    <header className=" flex items-center justify-between bg-background/80 border border-border shadow-md rounded-lg   py-1 px-2 ">
      <Logo />

      <div className=" flex flex-1 justify-end ml-3 sm:flex-none items-center gap-1">
        <HeaderSearchBar />

        {user || isLoading ? null : (
          <LinkBtn variant="ghost" size="sm" to="/login">
            Login
          </LinkBtn>
        )}
        <UserMenu user={userObj} isLoading={isLoading} />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
