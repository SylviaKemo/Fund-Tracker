const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

const router = express.Router();

// Define routes for campaign operations

// Post a new campaign
router.post("/", protect, createCampaign);

// Get all campaigns
router.get("/", protect, getAllCampaigns);


// Get a specific campaign by ID
router.get("/:id", protect, getCampaignById);


// Update a campaign by ID
router.put("/:id", protect, updateCampaign);

// Delete a campaign by ID
router.delete("/:id", protect, deleteCampaign);

module.exports = router;
