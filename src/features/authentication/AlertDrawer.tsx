import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

interface DialogDrawerProps {
  dialogDescription?: string;
  dialogTitle?: string;
}

function AlertDrawer({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const { isDeletingPosts, deleteAllPosts } = useDeleteUserPosts();
  const { count } = useGetNumOfProjects(userId);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  console.log(count, "CCCCCCCCCCCCCCCC");
  console.log(userId, "CCCCCCCCCCCCCCCC");
  const dialogDescriptionText = `This action cannot be undone. This will permanently delete all (${
    count || 0
  }) posts you have and remove your data from our servers`;

  function handleDelete() {
    deleteAllPosts(userId, { onSuccess: () => setOpen(false) });
  }

  if (isDesktop) {
    return (
      <AlertDialogComp
        open={open}
        onOpenChange={setOpen}
        isLoading={isDeletingPosts}
        continueBtnOnClick={handleDelete}
        dialogDescription={dialogDescriptionText}
        triggerBtnText={`${!count ? "No posts to delete" : "Delete all posts"}`}
        triggerVariant="destructive"
        triggerDisabled={!count || isDeletingPosts}
      />
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={!count || isDeletingPosts}
          variant="destructive"
          className=" w-full"
        >
          {!count ? "No posts to delete" : "Delete all posts"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Are you sure?</DrawerTitle>
          <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="pt-2">
          <Button className="" variant="destructive" onClick={handleDelete}>
            {isDeletingPosts ? <Loading /> : "Continue"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AlertDrawer;
