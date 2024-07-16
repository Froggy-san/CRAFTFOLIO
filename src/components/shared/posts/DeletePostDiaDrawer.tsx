// import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@uidotdev/usehooks";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Dispatch, SetStateAction, useState } from "react";
// import DialogComp from "@/components/shared/DialogComp";
// import AlertDialogComp from "@/components/shared/AlertDialogComp";

// import Loading from "@/components/shared/Loading";
// function DeletePostDiaDrawer({
//   open,
//   setOpen,
// }: {
//   open: boolean;
//   setOpen: Dispatch<SetStateAction<boolean>>;

//   handleDelete: () => void;
// }) {
//   //   const [open, setOpen] = useState(false);

//   const isDesktop = useMediaQuery("(min-width: 768px)");

//   const dialogDescriptionText = `This action cannot be undone. This will permanently delete this post from our servers`;

//   function handleDelete() {
//     setOpen(false);
//     handleDelete();
//   }

//   if (isDesktop) {
//     return (
//       <AlertDialogComp
//         open={open}
//         onOpenChange={setOpen}
//         continueBtnOnClick={handleDelete}
//         dialogDescription={dialogDescriptionText}
//         triggerBtnText="Delete all posts"
//         triggerVariant="destructive"
//         showTriggerButton={false}
//       />
//     );
//   }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       {/* <DrawerTrigger asChild>
//         <Button
//           disabled={ isDeletingPosts}
//           variant="destructive"
//           className=" w-full"
//         >
//           {!count ? "No posts to delete" : "Delete all posts"}
//         </Button>
//       </DrawerTrigger> */}
//       <DrawerContent>
//         <DrawerHeader className="text-left">
//           <DrawerTitle>Are you sure?</DrawerTitle>
//           <DrawerDescription>{dialogDescriptionText}</DrawerDescription>
//         </DrawerHeader>

//         <DrawerFooter className="pt-2">
//           <Button className="" variant="destructive" onClick={handleDelete}>
//             Continue
//           </Button>
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }

// export default DeletePostDiaDrawer;
