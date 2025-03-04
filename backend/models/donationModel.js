const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    message: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
