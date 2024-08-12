import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { IoIosBuild } from "react-icons/io";
import { Link } from "react-router-dom";

const BannerBtns = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-3 xs:gap-6">
      <Button size="sm" asChild>
        <Link
          to={isAuthenticated ? `/user/${user?.id}` : "/login"}
          className="md:text-md gap-2 text-base"
        >
          <IoIosBuild size={20} /> Start building...
        </Link>
      </Button>
      <Button
        size="sm"
        variant="secondary"
        className="md:text-md text-base font-semibold"
      >
        Learn more
      </Button>
    </div>
  );
};

export default BannerBtns;
