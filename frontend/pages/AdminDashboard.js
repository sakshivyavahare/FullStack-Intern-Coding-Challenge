import React, { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch failed", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users", { params: { filter } });
      setUsers(res.data);
    } catch (err) {
      console.error("Users fetch failed", err);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.get("/admin/stores", { params: { filter } });
      setStores(res.data);
    } catch (err) {
      console.error("Stores fetch failed", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
  }, [filter]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: "flex", gap: "30px", marginBottom: "20px" }}>
        <p>Total Users: {stats.users}</p>
        <p>Total Stores: {stats.stores}</p>
        <p>Total Ratings: {stats.ratings}</p>
      </div>

      <input
        placeholder="Search by Name / Email / Address / Role"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <h3>Users</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Stores</h3>
      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.avg_rating || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
