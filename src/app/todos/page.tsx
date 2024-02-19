"use client";
import Todos from "@/app/todos/Todos";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import CreateTodos from "./CreateTodos";

const Listpage = () => {
  return (
    <Stack width={"100%"}>
      <CreateTodos />
      <Todos />
    </Stack>
  );
};

export default Listpage;
