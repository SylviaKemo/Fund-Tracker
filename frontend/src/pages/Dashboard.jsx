import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Paper } from "@mui/material";
import CampaignDetails from "../components/CampaignDetails";
import CampaignForm from "../forms/CampaignForm";
import { CircularProgress } from "@mui/material";




const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/dashboard/userdashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        setError("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!user)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );


  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3}>
        {/* Left Section - 60% */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <CampaignDetails />
          </Paper>
        </Grid>

        {/* Right Section - 30% */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <CampaignForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
