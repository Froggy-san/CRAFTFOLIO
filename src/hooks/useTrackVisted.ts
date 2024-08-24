import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useParams } from "react-router-dom";
import { publicUser, User } from "@/types/types";
import { addVisted } from "@/services/authApi";

export default function useTrackVisted({
  profileUser,
  isOwnerOfPage,
}: {
  profileUser: publicUser | null;
  isOwnerOfPage: boolean;
}) {
  useEffect(() => {
    const handleVisted = async function () {
      if (!profileUser) return;
      console.log("FUNCTION");
      const vistedArr: string[] = JSON.parse(
        sessionStorage.getItem("vistedArr") || "[]",
      );
      const hasAlreadyVisted =
        profileUser.userId && vistedArr.includes(profileUser.userId);
      if (isOwnerOfPage || hasAlreadyVisted) return;

      if (!hasAlreadyVisted && profileUser.userId) {
        sessionStorage.setItem(
          "vistedArr",
          JSON.stringify([...vistedArr, profileUser.userId]),
        );
        await addVisted(profileUser);
      }
    };

    handleVisted();
  }, [profileUser]);
}
