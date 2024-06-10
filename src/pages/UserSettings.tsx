import Loading from "@/components/shared/Loading";
import UpdateUserForm from "@/features/authentication/UpdateUserForm";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";

const UserSettings = () => {
  const { isLoading } = useAuth();
  useScrollUpWhenMounted();
  if (isLoading)
    return (
      <div className="h-[91dvb] flex items-center justify-center">
        <Loading size={40} />
      </div>
    );
  return (
    <div>
      <UpdateUserForm />
    </div>
  );
};

export default UserSettings;
