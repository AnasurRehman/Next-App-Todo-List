"use client";

import React, { useEffect } from "react";
import ListItem from "../../components/ListItem";
import { CircularProgress, Stack } from "@mui/material";
import { useGetAllTodosQuery } from "../../lib/services/todoService";
import { useAppSelector } from "../../lib/store/hooks";
import { getToken, getUserId } from "../../lib/store/AuthSlice";

const Todos = () => {
  const userId: string | null = useAppSelector(getUserId);
  const token: string | null = useAppSelector(getToken);
  const { data, isLoading } = useGetAllTodosQuery({
    userId: userId,
    userToken: token,
  });

  return (
    <Stack
      sx={{
        background: "white",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        borderRadius: "1rem",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        m: 2,
      }}
    >
      {isLoading ? (
        <CircularProgress size={"80px"} />
      ) : (
        <>
          {data?.todos?.map((item: any, index: number) => (
            <>
              <ListItem
                key={index}
                id={item.id}
                status={item.completed}
                title={item.todo}
              />
              <ListItem
                key={index}
                id={item.id}
                status={item.completed}
                title={item.todo}
              />
            </>
          ))}
        </>
      )}
    </Stack>
  );
};

export default Todos;
