import React, { Dispatch, SetStateAction } from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DialogComp from "@/components/shared/DialogComp";
import AlertDialogComp from "@/components/shared/AlertDialogComp";
import useDeleteUserPosts from "../projects/useDeleteUserPosts";
import useGetNumOfProjects from "../projects/useGetNumOfProjects";
import Loading from "@/components/shared/Loading";
import useDeleteUserAccount from "../authentication/useDeleteUserAccount";
import { useAuth } from "@/hooks/useAuth";
import useLogout from "../authentication/useLogout";
import { useNavigate } from "react-router-dom";

interface DialogDrawerProps {
  userId: string;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteUserAlert = ({ userId, open, setOpen }: DialogDrawerProps) => {
  const { user } = useAuth();
  const { isLoading: isDeleting, deleteUser } = useDeleteUserAccount();
  const { logOut } = useLogout();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dialogDescriptionText = (
    <>
      <span className=" text-destructive  font-semibold">WARNING!</span>:
      Deleting your account will permanently remove all your posts and data from
      our system. This action cannot be undone. Are you sure you want to
      continue?
    </>
  );

  function handleDelete() {
    deleteUser(userId, {
      onSuccess: () => {
        // Case 1 : The user want s to deelete their account along side their posts form the app, that is why we are checking if the logged in userId === the inputed userId in the component, if so, once the delete function is called the user will be automatically navigated to the home page.
        if (user?.id === userId) {
          logOut();
          navigate("/");
        }
        setOpen(false);
      },
    });
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogDescriptionText}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className=" flex flex-col pt-2 sm:py-0 sm:flex-row-reverse  justify-start items-center gap-2 sm:gap-2">
            <Button variant="destructive" onClick={handleDelete}>
              {isDeleting ? <Loading /> : "Continue"}
            </Button>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className=" text-center sm:text-left">
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <Button className="" variant="destructive" onClick={handleDelete}>
            {isDeleting ? <Loading /> : "Continue"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteUserAlert;
