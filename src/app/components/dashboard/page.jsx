"use client"

import withAuth from "../withAuth";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-lg mt-4">Bienvenido al panel principal.</p>
    </div>
  );
};

export default withAuth(Dashboard);
