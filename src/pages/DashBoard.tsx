import FullSnLoading from "@/components/shared/FullSnLoading";
import { Card } from "@/components/ui/card";
import DashBoardContent from "@/features/dashboard/DashBoardContent";
import UserInfo from "@/features/dashboard/UserInfo";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const DashBoard = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <FullSnLoading />;
  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <Card
      className=" flex flex-col md:flex-row mt-3  p-2 "
      style={{ height: "calc( 99dvh  - (50px + 0.5rem + 0.75rem)" }}
    >
      <UserInfo />
      <DashBoardContent userId={user?.id || ""} />
    </Card>
  );
};

export default DashBoard;
