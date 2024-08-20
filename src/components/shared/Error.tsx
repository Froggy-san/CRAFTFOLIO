import React from "react";
import { useRouteError } from "react-router-dom";
import LinkBtn from "./LinkBtn";
import { Card } from "../ui/card";

const Error = () => {
  const error: any = useRouteError();

  return (
    <Card className="mx-auto mt-14 w-fit p-3">
      <h1>Something went wrong 😢</h1>
      <i>{error.data || error.message}</i>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
      <LinkBtn to="-1" className="ml-5" size="sm">
        &larr; Go back
      </LinkBtn>
    </Card>
  );
};

export default Error;
