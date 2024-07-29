import React, { useState } from "react";
import useUsers from "../authentication/useUsers";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { defaultProfilePicture } from "@/utils/constants";
import { format } from "date-fns";
import TableDropDown from "./TableDropDown";
import { Input } from "@/components/ui/input";
import UserControls from "./UserControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/useDebounce";

const SORTING_BY: { label: string; value: string }[] = [
  { label: "Email", value: "email" },
  { label: "Username", value: "username" },
  { label: "Joined at", value: "created_at" },
];

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("");

  const value = useDebounce(searchTerm, 400);
  const { users, isLoading, error, pageCount } = useUsers({
    page,
    searchTerm: value,
    sortValue,
  });

  function handleNext() {
    if (page === pageCount || !pageCount) return;
    setPage((page) => page + 1);
  }
  function handlePrevious() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }
  console.log(users, "usersssss");

  return (
    <div>
      <div className=" flex  justify-between my-3">
        <Input
          value={searchTerm}
          onChange={(e) => {
            if (page > 1) setPage(1);
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search..."
          className=" max-w-[500px]"
        />

        <Select
          value={sortValue}
          onValueChange={setSortValue}
          disabled={!users?.length}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort users" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {SORTING_BY.map((sort, i) => (
                <SelectItem key={i} value={sort.value}>
                  {sort.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Card className=" mt-4     overflow-auto">
        <Table>
          {/* <TableCaption className=" border-t h-1/2">
            <div className=" flex">
              <Badge>Previous</Badge>
              <Badge>Next</Badge>
            </div>
          </TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="">Avatar</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Speciality</TableHead>
              <TableHead className="text-right">Joined at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.length
              ? users.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell className=" py-1">
                      <img
                        className=" w-9 h-9 rounded-full "
                        src={user.avatar || defaultProfilePicture}
                        alt="user's image"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      {!user.speciality ? "-" : user.speciality}
                    </TableCell>
                    <TableCell className=" flex  justify-end items-center">
                      {format(new Date(user.created_at), "LLLL/dd/yyyy")}
                      <TableDropDown id={user.userId} />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
          <TableFooter className=" bg-background h-12">
            <TableRow>
              <TableCell>
                Page: {page} / {pageCount}{" "}
              </TableCell>

              <TableCell className="py-0" colSpan={4}>
                <div className="  justify-end gap-3 flex">
                  <Button
                    disabled={page === 1}
                    onClick={handlePrevious}
                    variant="outline"
                    size="sm"
                  >
                    Previous
                  </Button>
                  <Button
                    disabled={page === pageCount || !pageCount}
                    onClick={handleNext}
                    variant="outline"
                    size="sm"
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    </div>
  );
};

export default UsersList;
