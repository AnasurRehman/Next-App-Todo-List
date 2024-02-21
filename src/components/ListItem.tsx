"use client";

import { useUpdateTodoMutation } from "../lib/services/todoService";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Button,
  Chip,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export interface ListItemProps {
  title: string;
  id: number;
  status: true | false;
}

const ListItem: React.FC<ListItemProps> = ({ title, status = false, id }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<{
    todo: string;
    completed: boolean;
    id: number;
  }>({ todo: "", completed: false, id: 0 });
  const getColor = () => {
    switch (status) {
      case false:
        return "primary";
      case true:
        return "success";
      default:
        return "default";
    }
  };
  const [editTodo] = useUpdateTodoMutation();
  return (
    <>
      {!edit ? (
        <Stack
          direction="row"
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            p: 1,
            mb: 1,
            width: "100%",
            borderRadius: "0.3rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" alignItems={"center"} spacing={2}>
            <Typography>{title}</Typography>
            <Chip
              color={getColor()}
              label={status ? "Complete" : "In-Complete"}
            />
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Edit
              onClick={() => {
                setEditData({ todo: title, completed: status, id: id });
                setEdit(true);
              }}
            />
            <DeleteOutline
              onClick={() => console.log("sad")}
              sx={{ color: "red" }}
            />
          </Stack>
        </Stack>
      ) : (
        <Stack
          direction="row"
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            p: 1,
            width: "100%",
            borderRadius: "0.3rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editTodo({
                body: { todo: editData.todo, completed: editData.completed },
                todoId: editData.id,
              });
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                background: "white",
                alignItems: "flex-end",
                // mx: 2,
                // p: 2,
                borderRadius: "1rem",
              }}
            >
              <Stack>
                <TextField
                  variant="outlined"
                  label="Todo"
                  size="small"
                  value={editData.todo}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, todo: e.target.value }))
                  }
                />
              </Stack>
              <Stack>
                <Select
                  value={editData.completed}
                  label="Completed"
                  size="small"
                  onChange={(e) =>
                    setEditData((prev) => ({
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
                disabled={!editData.todo}
                variant="contained"
              >
                Done
              </Button>
            </Stack>
          </form>
        </Stack>
      )}
    </>
  );
};

export default ListItem;
