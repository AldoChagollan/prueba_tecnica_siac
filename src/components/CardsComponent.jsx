import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import Image from "next/image";

export default function CardsComponent({ data }) {

  const getColorStatus = (status) => {
    if (status === "Alive") {
      return "success";
    } else if (status === "Dead") {
      return "error";
    } else {
      return "default";
    }
  };

  return (
    <Grid size={{ md: 6, xs: 2 }}>
      <Box sx={{ display: "flex", borderRadius: 1 }} boxShadow={3}>
        <Image src={data.image} alt={data.name} width={200} height={200} />
        <Box sx={{ px: 2 }}>
          <Box my={1}>
            <Typography variant="caption">Nombre</Typography>
            <Typography>{data.name}</Typography>
          </Box>
          <Box my={1} sx={{display: "flex", gap: 1}}>
            <Chip label={data.status} color={getColorStatus(data.status)} size="small" /> 
            <Chip label={data.species} color="default" size="small" /> 
            <Chip label={data.gender} color="default" size="small" /> 
          </Box>
          <Box my={1}>
            <Typography variant="caption">Lugar</Typography>
            <Typography>{data.location.name}</Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
