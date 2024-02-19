"use client";
import { useSigninMutation } from "@/lib/services/authService";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [signIn] = useSigninMutation();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signIn({ username: data.username, password: data.password }).then(
          (res) => console.log(res)
        );
      }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          background: "white",
          borderRadius: "1rem",
          p: 4,
          mb: 2,
          width: "60%",
        }}
      >
        <TextField
          label="Username"
          placeholder="Enter your Username"
          value={data.username}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e?.target?.value }))
          }
        />
        <TextField
          label="Password"
          placeholder="Enter your Password"
          type="password"
          value={data.password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e?.target?.value }))
          }
        />
        <Stack direction="row" width="inherit" spacing={2}>
          <Button variant="contained" type="submit" disabled={!data}>
            Sign In
          </Button>
          <Button>Sign Up</Button>
        </Stack>
      </Stack>
    </form>
  );
}
