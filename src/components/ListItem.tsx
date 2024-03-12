"use client";

import { ListItemProps } from "@/_helpers/types";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../lib/services/todoService";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ListItem: React.FC<ListItemProps> = ({ title, id, status }) => {
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
  const [editTodo, { isLoading: isEditLoading }] = useUpdateTodoMutation();
  const [onDelete, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();

  const handleEdit = () => {
    const body = {
      todo: editData.todo,
      completed: editData.completed,
      id: editData.id,
    };
    editTodo(body).then((res: any) => {
      if (res.data) {
        alert("Todo updated successfully");
      }
      setEdit(!edit);
    });
  };
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
              sx={{ cursor: "pointer" }}
            />

            {isDeleteLoading ? (
              <CircularProgress size={"20px"} />
            ) : (
              <DeleteOutline
                onClick={() => {
                  onDelete(id).then(() => alert("Todo Deleted"));
                }}
                sx={{ color: "red", cursor: "pointer" }}
              />
            )}
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
              handleEdit();
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                background: "white",
                alignItems: "flex-end",
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
                disabled={!editData.todo || isEditLoading}
                variant={isEditLoading ? "outlined" : "contained"}
              >
                {isEditLoading ? <CircularProgress size={"20px"} /> : "Done"}
              </Button>
            </Stack>
          </form>
        </Stack>
      )}
    </>
  );
};

export default ListItem;
