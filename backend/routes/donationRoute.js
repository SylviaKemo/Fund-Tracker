const express = require("express");
const {
  logDonation,
  getDonations,
  getCampaignDonations,
} = require("../controllers/donationController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Log a new donation
router.post("/", protect, logDonation);

// Get all donations
router.get("/", protect, getDonations);

// Get donations for a specific campaign
router.get("/:campaignId", protect, getCampaignDonations);

module.exports = router;
