"use client";

import React, { Fragment } from "react";
import ListItem from "../../components/ListItem";
import { CircularProgress, Stack } from "@mui/material";
import { useGetAllTodosQuery } from "../../lib/services/todoService";
import { useAppSelector } from "../../lib/store/hooks";
import { getUserId } from "../../lib/store/AuthSlice";

const Todos = () => {
  const userId: string | null = useAppSelector(getUserId);
  const { data, isLoading } = useGetAllTodosQuery({
    userId: userId ?? "",
  });

  return (
    <Stack
      sx={{
        background: "white",
        height: "50vh",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "1rem",
        alignItems: "center",
        p: 3,
        m: 2,
      }}
    >
      {isLoading ? (
        <CircularProgress size={"80px"} />
      ) : (
        <Fragment>
          {data?.todos?.map((item: any, index: number) => (
            <ListItem
              key={item.id}
              id={item.id}
              status={item.completed}
              title={item.todo}
            />
          ))}
        </Fragment>
      )}
    </Stack>
  );
};

export default Todos;
