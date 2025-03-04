const Campaign = require("../models/campaignModel");
const mongoose = require("mongoose");

// Create a new campaign
const createCampaign = async (req, res) => {
  const {
    title,
    description,
    goalAmount,
    raisedAmount,
    deadline,
    category,
    status,
    location,
    organizer,
  } = req.body;

  try {
    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      raisedAmount,
      deadline,
      category,
      status,
      location,
      organizer,
    });
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ organizer: req.user._id })
      .sort({ createdAt: -1 })
      .populate("organizer", "name email");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single campaign
const getCampaignById = async (req, res) => {
  const { id } = req.params;

  // this method checks if the id that we got is valid in mongoose
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const campaign = await Campaign.findById(id)
  .populate("organizer", "name email")
  .populate("donations");
  
  

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }
  res.status(200).json(campaign);
};

// Update a campaign
const updateCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such campaign" });
  }

  const campaign = await Campaign.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  res.status(200).json(campaign);
};

// Delete a campaign
const deleteCampaign = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such campaign" });
  }
  const campaign = await Campaign.findOneAndDelete({ _id: id });
  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }
  res.status(200).json(campaign);
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
};
