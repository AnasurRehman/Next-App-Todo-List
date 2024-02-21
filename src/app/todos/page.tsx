import Todos from "./Todos";
import { Stack } from "@mui/material";
import React from "react";
import CreateTodos from "./CreateTodos";

const Listpage = () => {
  return (
    <Stack width={"100%"} maxHeight="50vh">
      <CreateTodos />
      <Todos />
    </Stack>
  );
};

export default Listpage;
