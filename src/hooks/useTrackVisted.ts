import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useParams } from "react-router-dom";
import { publicUser, User } from "@/types/types";
import { addVisted } from "@/services/authApi";

export default function useTrackVisted({
  currentViewedProfile,
  isOwnerOfPage,
}: {
  currentViewedProfile: publicUser | null;
  isOwnerOfPage: boolean;
}) {
  const { user } = useAuth();
  useEffect(() => {
    const handleVisted = async function () {
      if (!currentViewedProfile) return;

      const vistedArr: { userId: string; profileId: string }[] = JSON.parse(
        sessionStorage.getItem("vistedArr") || "[]",
      );
      // check if there is a userId property in the sesstionStorage equals the current logged in user's id or equals "visited" and if there is a profileId property equals the current viewed profile.
      const hasAlreadyVisted =
        currentViewedProfile.userId &&
        vistedArr.some((item) =>
          user
            ? item.userId === user.id
            : item.userId === "visited" &&
              item.profileId === currentViewedProfile.userId,
        );
      if (isOwnerOfPage || hasAlreadyVisted) return;

      if (!user && currentViewedProfile.userId) {
        sessionStorage.setItem(
          "vistedArr",
          JSON.stringify([
            ...vistedArr,
            { userId: "visited", profileId: currentViewedProfile.userId },
          ]),
        );
        await addVisted(currentViewedProfile);
      }

      if (user && currentViewedProfile.userId) {
        sessionStorage.setItem(
          "vistedArr",
          JSON.stringify([
            ...vistedArr,
            { userId: user.id, profileId: currentViewedProfile.userId },
          ]),
        );
        await addVisted(currentViewedProfile);
      }
    };

    handleVisted();
  }, [currentViewedProfile]);
}
