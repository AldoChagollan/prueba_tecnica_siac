"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import useAuth from "@/hooks/useAuth";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import CardsComponent from "@/components/CardsComponent";
import { Logout, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const getApiData = async (endpoint) =>
  axios.get(process.env.NEXT_PUBLIC_URL_API + endpoint).then((res) => res.data);

export default function Home() {
  const authenticated = useAuth();
  const [filterValue, setFilterValue] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter(); //hook para proteger la vista si no tiene un token actiuvo
  if (!authenticated) return null;

  const logout = () => {
    sessionStorage.removeItem("TOKEN_APP");
    router.push("/login");
  };

  const searchCharacter = (e) => {
    setFilterValue(e.target.value);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSearch(filterValue);
  };

  return (
    <Container>
      <form onSubmit={handleSubmitSearch}>
        <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 5 }}>
          <TextField
            fullWidth
            size="small"
            sx={{ flexGrow: 1 }}
            placeholder="rick and morty api"
            onChange={searchCharacter}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            variant="contained"
            type="button"
            disableElevation
            startIcon={<Logout />}
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </form>
      <CardContainer query={search} />
    </Container>
  );
}

const CardContainer = ({ query = "" }) => {
  const { data, error, isLoading } = useSWR(
    `/character?name=${query}`,
    getApiData
  );

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar</p>;

  return (
    <Grid container spacing={2}>
      {data.results?.map((res, index) => (
        <CardsComponent key={index} data={res} />
      ))}
    </Grid>
  );
};
