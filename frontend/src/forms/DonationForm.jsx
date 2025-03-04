import React, { useState } from "react";
import "../styles/donation.css";

const DonationForm = ({ campaignId, onClose }) => {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token"); // JWT for authentication

    try {
      const response = await fetch("/api/donation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          donorName,
          amount: Number(amount),
          campaignId, // Automatically set
          message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to log donation");
      }

      setSuccess("Donation logged successfully!");
      setDonorName("");
      setAmount("");
      setMessage("");
      onClose(); // Close the form after successful donation
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal donation-form">
      <div className="modal-content">
        <h2>Donate to Campaign</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Donor Name:
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />
          </label>

          <label>
            Amount (Ksh):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>

          <label>
            Message (Optional):
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Donate"}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
