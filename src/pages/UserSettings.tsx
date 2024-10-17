import Loading from "@/components/shared/Loading";
import DeleteAllPost from "@/features/authentication/DeleteAllPost";
import DeleteUserSetting from "@/features/authentication/DeleteUserSetting";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserForm from "@/features/authentication/UpdateUserForm";
import UserOverview from "@/features/authentication/UserOverview";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";
import { useDocumentTitle } from "@uidotdev/usehooks";

const UserSettings = () => {
  const { user, isLoading } = useAuth();

  useScrollUpWhenMounted();
  useDocumentTitle("Settings");
  if (isLoading)
    return (
      <div className="flex h-[91dvb] items-center justify-center">
        <Loading size={40} />
      </div>
    );
  return (
    <div>
      <UserOverview user={user} />
      <UpdateUserForm user={user} />
      <UpdatePasswordForm />
      {/* {user && <DeleteAllPost userId={user.id} />} */}
      {user && <DeleteUserSetting userId={user.id} />}
    </div>
  );
};

export default UserSettings;
