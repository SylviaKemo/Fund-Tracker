const Donation = require("../models/donationModel.js");
const Campaign = require("../models/campaignModel");


// Log a new donation
const logDonation = async (req, res) => {
  try {
    const { donorName, amount, campaignId, message } = req.body;

    if (!donorName || !amount || !campaignId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    console.log("🟢 Creating donation:", {
      donorName,
      amount,
      campaignId,
      message,
    });

    const newDonation = await Donation.create({
      donorName,
      amount,
      campaignId,
      message,
    });

    // Update the campaign's donations array
    await Campaign.findByIdAndUpdate(campaignId, {
      $push: { donations: newDonation._id }, // Corrected: newDonation._id instead of donation._id
      $inc: { raisedAmount: amount }, // Optional: Update raisedAmount if needed
    });

    console.log("✅ Donation saved:", newDonation);

    res
      .status(201)
      .json({ message: "Donation logged successfully", donation: newDonation });
  } catch (error) {
    console.error("❌ Donation logging failed:", error.message);
    res.status(500).json({ error: "Failed to log donation" });
  }
};



// Get all donations
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("campaignId", "title");
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

// Get donations for a specific campaign
const getCampaignDonations = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const donations = await Donation.find({ campaignId }).populate(
      "campaignId",
      "title"
    );

    if (!donations.length) {
      return res
        .status(404)
        .json({ message: "No donations found for this campaign" });
    }

    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaign donations" });
  }
};

module.exports = {
  logDonation,
  getDonations,
  getCampaignDonations,
};
