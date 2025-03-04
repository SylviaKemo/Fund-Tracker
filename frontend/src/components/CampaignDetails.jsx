import React, { useState, useEffect } from "react";
import { useCampaignsContext } from "../hooks/useCampaignContext";
import CampaignForm from "../forms/CampaignForm";
import DonationForm from "../forms/DonationForm";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Modal,
  Chip,
} from "@mui/material";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { FiberManualRecord } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
// import "../styles/campaign.css";

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { dispatch, campaigns } = useCampaignsContext();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("/api/campaign", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: "SET_CAMPAIGNS", payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCampaigns();
  }, [dispatch]);

  const handleOpenDeleteModal = (campaignId) => {
    setCampaignToDelete(campaignId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCampaignToDelete(null);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/campaign/${campaignToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch({ type: "DELETE_CAMPAIGN", payload: campaignToDelete });
        handleCloseDeleteModal();
      } else {
        console.log("Failed to delete campaign");
      }
    } catch (error) {
      console.log("Error deleting campaign:", error);
    }
  };

  const handleOpenEditModal = (campaign) => {
    setSelectedCampaign(campaign);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCampaign(null);
    setOpenEditModal(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {campaigns.length === 0 ? (
        <Typography variant="body1">No campaigns available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {campaigns.map((campaign) => (
            <Grid item xs={12} key={campaign._id}>
              <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {campaign.status.toLowerCase() === "active" && (
                      <FiberManualRecord
                        color="success"
                        sx={{ fontSize: 12, marginRight: 1 }}
                      />
                    )}
                    {campaign.title}
                  </Typography>
                  <Box>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => handleOpenEditModal(campaign)}
                      startIcon={<MdOutlineEdit />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="text"
                      color="error"
                      onClick={() => handleOpenDeleteModal(campaign._id)}
                      startIcon={<MdDeleteOutline />}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  {campaign.description}
                </Typography>

                  <Box sx={{ display: "flex", alignItems: "center",justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate(`/campaign/${campaign._id}`)}
                >
                  More Info
                </Button>
                <Typography variant="body2" color="textSecondary">
                  {formatDistanceToNowStrict(new Date(campaign.createdAt), {
                    addSuffix: true,
                  })}
                </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
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
          }}
        >
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete this campaign?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button onClick={handleCloseDeleteModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Campaign Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
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
            width: 500,
          }}
        >
          <Typography variant="h6">Edit Campaign</Typography>
          <CampaignForm
            campaign={selectedCampaign}
            onCancel={handleCloseEditModal}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CampaignDetails;
