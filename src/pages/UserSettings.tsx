import Loading from "@/components/shared/Loading";
import UpdateUserForm from "@/features/authentication/UpdateUserForm";
import UserOverview from "@/features/authentication/UserOverview";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";

const UserSettings = () => {
  const { user, isLoading } = useAuth();
  useScrollUpWhenMounted();
  if (isLoading)
    return (
      <div className="h-[91dvb] flex items-center justify-center">
        <Loading size={40} />
      </div>
    );
  return (
    <div>
      <UserOverview user={user} />
      <UpdateUserForm user={user} />
    </div>
  );
};

export default UserSettings;
