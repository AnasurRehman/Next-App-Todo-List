"use client";
import { useSignupMutation } from "../../lib/services/authService";
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
    const [user, setData] = useState<{ firstName: string, lastName: string ,username: string; password: string }>({
      firstName: "",
      lastName: "",
        username: "",
        password: "",
      });
      const [signUp] = useSignupMutation();
    return (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp(user)
          .then((respo: any) => router.replace('/'));
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
            value={user.username}
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e?.target?.value }))
            }
          />
          <TextField
            label="First Name"
            placeholder="Enter your First Name"
            value={user.firstName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, firstName: e?.target?.value }))
            }
          />
          <TextField
            label="Last Name"
            placeholder="Enter your Last Name"
            value={user.lastName}
            onChange={(e) =>
              setData((prev) => ({ ...prev, lastName: e?.target?.value }))
            }
          />
          <TextField
            label="Password"
            placeholder="Enter your Password"
            type="password"
            value={user.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e?.target?.value }))
            }
          />
          <Stack direction="row" width="inherit" spacing={2}>
            <Button variant="contained" type="submit" disabled={!user.username && !user.password}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </form>
    )
}