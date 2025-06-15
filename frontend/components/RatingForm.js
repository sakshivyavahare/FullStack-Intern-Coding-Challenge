import React, { useState } from "react";
import API from "../api";

const RatingForm = ({ storeId, existingRating, onRatingSubmitted }) => {
  const [rating, setRating] = useState(existingRating || "");
  const [loading, setLoading] = useState(false);

  const submitRating = async () => {
    if (!rating) return alert("Please select a rating from 1 to 5");
    try {
      setLoading(true);
      await API.post("/ratings", { storeId, rating }); // Backend handles new or update
      alert("Rating submitted!");
      onRatingSubmitted(); // refresh parent
    } catch (err) {
      alert("Error submitting rating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <button onClick={submitRating} disabled={loading}>
        {existingRating ? "Update Rating" : "Submit Rating"}
      </button>
    </div>
  );
};

export default RatingForm;
