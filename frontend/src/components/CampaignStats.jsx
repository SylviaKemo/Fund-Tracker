import React from "react";
import { Box, Typography, LinearProgress, Paper, Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CampaignStats = ({ campaign }) => {
const progress =
  Math.min((campaign?.raisedAmount / campaign?.goalAmount) * 100, 100) || 0;

  // Sample data for charts (replace with actual data)
  const donations = campaign.donations.map((d) => d.amount);
  const labels = campaign.donations.map((_, index) => `Donor ${index + 1}`);

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Donation Amount",
        data: donations,
        backgroundColor: "#3f51b5",
      },
    ],
  };

  const pieChartData = {
    labels,
    datasets: [
      {
        data: donations,
        backgroundColor: [
          "#3f51b5",
          "#ff5722",
          "#4caf50",
          "#ffc107",
          "#9c27b0",
        ],
      },
    ],
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Progress
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <Typography variant="body2">
          {campaign.raisedAmount} / {campaign.goalAmount} ({progress.toFixed(2)}
          %)
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Statistics Summary
        </Typography>
        <Typography variant="body2">
          Total Contributions: {campaign.donations.length}
        </Typography>
        <Typography variant="body2">
          Highest Contribution: ${Math.max(...donations) || 0}
        </Typography>
        <Typography variant="body2">
          Average Donation: $
          {(
            donations.reduce((a, b) => a + b, 0) / donations.length || 0
          ).toFixed(2)}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Donations Bar Chart
            </Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Donations Distribution (Pie Chart)
            </Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CampaignStats;
