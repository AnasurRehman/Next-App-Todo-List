"use client";
import { useRouter } from "next/navigation";
import { useCreateTodoMutation } from "../../lib/services/todoService";
import { getUserId, setToken, setUserId } from "../../lib/store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import {
  Button,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const CreateTodos = () => {
  // useAuthRedirect()
  const userId = useAppSelector(getUserId);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [todo, setData] = useState<{ todo: string; completed: boolean }>({
    todo: "",
    completed: false,
  });
  const [createTodo] = useCreateTodoMutation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({
          todo: todo.todo,
          completed: todo.completed,
          userId: userId,
        });
      }}
    >
      <Stack
        direction="row"
        sx={{
          width: "inherit",
          background: "white",
          alignItems: "flex-end",
          justifyContent: "space-between",
          mx: 2,
          p: 2,
          borderRadius: "1rem",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Stack>
            <FormLabel>Todo Title</FormLabel>
            <TextField
              variant="outlined"
              label="Todo"
              size="small"
              value={todo.todo}
              onChange={(e) =>
                setData((prev) => ({ ...prev, todo: e.target.value }))
              }
            />
          </Stack>
          <Stack>
            <FormLabel>Select Status</FormLabel>
            <Select
              value={todo.completed}
              label="Completed"
              size="small"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  completed: e.target.value === "true",
                }))
              }
            >
              <MenuItem value={"false"}>In Complete</MenuItem>
              <MenuItem value={"true"}>Complete</MenuItem>
            </Select>
          </Stack>
          <Button
            type="submit"
            disabled={!todo.todo}
            variant="contained"
            sx={{ height: "2.5rem" }}
          >
            Add
          </Button>
        </Stack>
        <Button
          onClick={() => {
            document.cookie =
              "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            dispatch(setUserId(null));
            dispatch(setToken(null));
            router.replace("/");
          }}
        >
          Log Out
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTodos;
