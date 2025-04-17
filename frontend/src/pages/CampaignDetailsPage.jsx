import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Modal,
  TextField,
  IconButton,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";


const CampaignDetailsPage = () => {
  const { id: campaignId } = useParams();
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`/api/campaign/${campaignId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCampaign(data);
        } else {
          console.log("Failed to fetch campaign details");
        }
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  const handleDonate = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/donation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donorName,
          amount: Number(amount),
          campaignId,
          message,
        }),
      });

      if (response.ok) {
        console.log("Donation successful");
        setOpenModal(false);
        setDonorName("");
        setAmount("");
        setMessage("");
      } else {
        const errorData = await response.json();
        console.log("Donation failed", errorData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h4" color="primary" sx={{ marginBottom: 2 }}>
          {campaign.title}
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {campaign.description}
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid item xs={6}>
            <Typography>
              <strong>Goal:</strong> ${campaign.goalAmount}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Raised:</strong> ${campaign.raisedAmount}
            </Typography>
          </Grid>
        </Grid>
        <Typography>
          <strong>Deadline:</strong>{" "}
          {format(new Date(campaign.deadline), "MMMM dd, yyyy")}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          <strong>Status:</strong> {campaign.status}
        </Typography>
        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h5" color="secondary" sx={{ marginBottom: 2 }}>
          Donations
        </Typography>
        {campaign?.donations?.length > 0 ? (
          campaign.donations.map((donation, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                padding: 2,
                marginBottom: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {donation?.donorName
                  ? donation.donorName.charAt(0).toUpperCase()
                  : "A"}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between", // Distribute space
                  alignItems: "center", // Align items vertically
                  gap: 1,
                }}
              >
                <Typography variant="body2">
                  <strong>@</strong>
                  {donation?.donorName || "Anonymous"}
                </Typography>

                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {donation?.message || "No message"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ alignSelf: "flex-end", whiteSpace: "nowrap" }}
                >
                 Ksh{donation?.amount || "N/A"}
                </Typography>
              </Box>
            </Paper>
          ))
        ) : (
          <Typography>No donations yet.</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: 3 }}
          onClick={() => setOpenModal(true)}
        >
          Donate
        </Button>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxWidth: 400,
              width: "90%",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom>
              Make a Donation
            </Typography>
            <TextField
              fullWidth
              label="Donor Name"
              variant="outlined"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Amount"
              type="number"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDonate}
            >
              Submit Donation
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Box>
  );
};

export default CampaignDetailsPage;
