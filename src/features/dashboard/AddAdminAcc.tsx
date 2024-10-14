import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignUpForm from "../authentication/SignUpForm";
const AddAdminAcc = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-auto mt-4 block" variant="outline">
          Add an admin account
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[65vh] overflow-y-auto sm:max-h-[600px] sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add an admin account.</DialogTitle>
          <DialogDescription>
            Note this form resgisters admin accounts only, if you want to
            register user accounts navigate to the signUp page.
          </DialogDescription>
        </DialogHeader>
        <SignUpForm adminSession className="h-full" />
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminAcc;
