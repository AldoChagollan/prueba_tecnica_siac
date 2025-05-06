"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const username = process.env.NEXT_PUBLIC_USERNAME;
const password = process.env.NEXT_PUBLIC_PASSWORD;

export default function LoginPage() {
  const [values, setValues] = React.useState({ username: "", password: "" });
  const [show, setShow] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //hacer la validacion
    if (values.username !== username) {
      return enqueueSnackbar("Usuario o contrasena inválidas", {
        variant: "error",
      });
    }
    if (values.password !== password) {
      return enqueueSnackbar("Usuario o contrasena inválidas", {
        variant: "error",
      });
    }

    //redirigir a home y setear token
    sessionStorage.setItem("TOKEN_APP", "SOME TOKEN");
    router.push("/");
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "90vh",
            gap: 1,
            padding: 2,
          }}
        >
          <TextField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            type={show ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShow(!show)}>
                      {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button type="submit">Enviar</Button>
        </Box>
      </form>
    </Container>
  );
}
