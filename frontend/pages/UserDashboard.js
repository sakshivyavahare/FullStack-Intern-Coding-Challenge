import React, { useEffect, useState } from "react";
import API from "../api";
import RatingForm from "../components/RatingForm";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores"); // Backend route to fetch all stores with ratings
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <h2>User Dashboard - Store Ratings</h2>
      {stores.map((store) => (
        <div key={store.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{store.name}</h3>
          <p>Address: {store.address}</p>
          <p>Average Rating: {store.avg_rating || "No ratings yet"}</p>
          <p>Your Rating: {store.user_rating || "Not rated yet"}</p>

          <RatingForm storeId={store.id} existingRating={store.user_rating} onRatingSubmitted={fetchStores} />
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
