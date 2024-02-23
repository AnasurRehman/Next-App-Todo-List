"use client";
import { useRouter } from "next/navigation";
import { useCreateTodoMutation } from "../../lib/services/todoService";
import { getUserId, setUserId } from "../../lib/store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import {
  Button,
  CircularProgress,
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [todo, setData] = useState<{ todo: string; completed: boolean }>({
    todo: "",
    completed: false,
  });
  const [createTodo, { isLoading }] = useCreateTodoMutation();
  const handleCreate = () => {
    createTodo({
      todo: todo.todo,
      completed: todo.completed,
      userId: userId ?? "",
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
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
              placeholder="Enter your Todo Title"
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
            variant={isLoading ? "outlined" : "contained"}
            type="submit"
            disabled={!todo.todo || isLoading}
          >
            {isLoading ? <CircularProgress size={"20px"} /> : "Add"}
          </Button>
        </Stack>
        <Button
          onClick={() => {
            document.cookie =
              "userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            dispatch(setUserId(null));
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
