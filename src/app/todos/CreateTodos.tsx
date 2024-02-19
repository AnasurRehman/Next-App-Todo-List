import {
  Button,
  FormLabel,
  Input,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

const CreateTodos = () => {
  const [data, setData] = useState<{ todo: string; completed: boolean }>({
    todo: "",
    completed: false,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(data);
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          background: "white",
          alignItems: "flex-end",
          mx: 2,
          p: 2,
          borderRadius: "1rem",
        }}
      >
        <Stack>
          <FormLabel>Todo Title</FormLabel>
          <TextField
            variant="outlined"
            label="Todo"
            size="small"
            value={data.todo}
            onChange={(e) =>
              setData((prev) => ({ ...prev, todo: e.target.value }))
            }
          />
        </Stack>
        <Stack>
          <FormLabel>Select Status</FormLabel>
          <Select
            value={data.completed}
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
        <Button type="submit" disabled={!data.todo} variant="contained">
          Add
        </Button>
      </Stack>
    </form>
  );
};

export default CreateTodos;
