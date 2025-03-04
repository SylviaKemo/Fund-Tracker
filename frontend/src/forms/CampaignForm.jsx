import React, { useState, useEffect } from "react";
import { useCampaignsContext } from "../hooks/useCampaignContext";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Box,
} from "@mui/material";


const CampaignForm = ({ campaign = null, onCancel }) => {
  const { dispatch } = useCampaignsContext();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    category: "Education",
    status: "Active",
    location: "",
    organizer: userId || "",
  });

  useEffect(() => {
    if (campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        goalAmount: campaign.goalAmount,
        deadline: campaign.deadline.split("T")[0], // Format date
        category: campaign.category,
        status: campaign.status,
        location: campaign.location,
        organizer: campaign.organizer,
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const method = campaign ? "PUT" : "POST";
    const url = campaign ? `/api/campaign/${campaign._id}` : "/api/campaign";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        if (campaign) {
          dispatch({ type: "UPDATE_CAMPAIGN", payload: result });
        } else {
          dispatch({ type: "CREATE_CAMPAIGN", payload: result });
        }

        setFormData({
          title: "",
          description: "",
          goalAmount: "",
          deadline: "",
          category: "Education",
          status: "Active",
          location: "",
          organizer: userId || "",
        });

        if (onCancel) onCancel();
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div>
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Box sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 2, textAlign: "center" }}
          >
            {campaign ? "Update Campaign" : "Create a Campaign"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Campaign Title"
              variant="outlined"
              fullWidth
              margin="normal"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <TextField
              label="Goal Amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              id="goalAmount"
              name="goalAmount"
              value={formData.goalAmount}
              onChange={handleChange}
              required
            />

            <TextField
              label="Deadline"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              label="Category"
              select
              variant="outlined"
              fullWidth
              margin="normal"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {[
                "Education",
                "Medical",
                "Non-Profit",
                "Community",
                "Personal",
                "Other",
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                marginTop: 2,
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                {campaign ? "Update Campaign" : "Create Campaign"}
              </Button>
              {campaign && (
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default CampaignForm;
