import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserForm from "@/features/authentication/UpdateUserForm";
import UserOverview from "@/features/authentication/UserOverview";
import useDeleteUserPosts from "@/features/projects/useDeleteUserPosts";
import { useAuth } from "@/hooks/useAuth";
import useScrollUpWhenMounted from "@/hooks/useScrollUpWhenMounted";

const UserSettings = () => {
  const { user, isLoading } = useAuth();
  const { isDeletingPosts, deleteAllPosts } = useDeleteUserPosts();
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
      <UpdatePasswordForm />
      {user && (
        <Button variant="destructive" onClick={() => deleteAllPosts(user.id)}>
          Delete all posts
        </Button>
      )}
    </div>
  );
};

export default UserSettings;
