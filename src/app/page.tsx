"use client";
import toast from "react-hot-toast";
import { useSigninMutation } from "../lib/services/authService";
import { getToken, setToken, setUserId } from "../lib/store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import {
  Button,
  CircularProgress,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [user, setData] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [signIn, { isLoading }] = useSigninMutation();

  const router = useRouter();

  const handleSignIn = () => {
    try {
      signIn({ username: user.username, password: user.password }).then(() =>
        router.push("/todos")
      );
    } catch (error: any) {
      toast.error("sdasd", { duration: 3000, position: "bottom-right" });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSignIn();
      }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          background: "white",
          borderRadius: "1rem",
          p: 6,
          m: 6,
          mb: 8,
          width: "60%",
        }}
      >
        <Stack>
          <FormLabel>User Name</FormLabel>
          <TextField
            placeholder="Enter your User Name"
            inputProps={{
              autocomplete: "new-password",
              form: {
                autocomplete: "off",
              },
            }}
            value={user.username}
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e?.target?.value }))
            }
          />
          <FormHelperText>Use kminchelle as demo username</FormHelperText>
        </Stack>
        <Stack>
          <FormLabel>Password</FormLabel>
          <TextField
            type="password"
            placeholder="Enter your Password"
            value={user.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e?.target?.value }))
            }
          />
          <FormHelperText>Use 0lelplR as demo password</FormHelperText>
        </Stack>
        <Stack direction="row" width="inherit" spacing={2}>
          <Button
            variant={isLoading ? "outlined" : "contained"}
            type="submit"
            disabled={(!user.username && !user.password) || isLoading}
          >
            {isLoading ? <CircularProgress size={"20px"} /> : "Sign In"}
          </Button>
          <Button onClick={() => router.push("/signup")}>Sign Up</Button>
        </Stack>
      </Stack>
    </form>
  );
}
