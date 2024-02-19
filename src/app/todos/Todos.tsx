"use client";

import React from "react";
import ListItem from "@/components/ListItem";
import { Stack } from "@mui/material";
import { useGetAllTodosQuery } from "@/lib/services/todoService";

const Todos = () => {
  const { data, isLoading } = useGetAllTodosQuery(null);
  console.log(data);
  if (isLoading) {
    return <>isloading</>;
  }
  return (
    <Stack
      sx={{
        background: "white",
        height: "70vh",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "1rem",
        alignItems: "center",
        p: 3,
        m: 2,
      }}
    >
      {data.todos.map((item: any, index: number) => (
        <ListItem
          key={index}
          id={item.id}
          status={item.completed}
          title={item.todo}
        />
      ))}
    </Stack>
  );
};

export default Todos;
