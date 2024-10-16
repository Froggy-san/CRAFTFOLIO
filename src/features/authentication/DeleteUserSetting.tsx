import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import DeleteUserAlert from "../dashboard/DeleteUserDialog";

const DeleteUserSetting = ({
  userId,
  className = "",
}: {
  userId: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className={`mx-auto mb-3 flex flex-col items-center justify-between gap-y-6 rounded-lg border p-4 xs:flex-row sm:w-[90%] ${className}`}
      >
        <div className="w-full space-y-0.5 text-center xs:w-fit xs:text-left">
          <div className="text-base font-semibold">Delete account</div>
          <div>
            Delete your account and permanently remove all associated data.
          </div>
        </div>
        <div className="w-full xs:w-fit">
          <Button
            className="w-full"
            onClick={() => setOpen(true)}
            variant="destructive"
          >
            DELETE ACCOUNT
          </Button>
          {/* <AlertDrawer userId={userId} /> */}
        </div>
      </div>
      <DeleteUserAlert userId={userId} open={open} setOpen={setOpen} />
    </>
  );
};

export default DeleteUserSetting;
