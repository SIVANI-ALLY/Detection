import React from "react";
import Sidebar from "./pages/Sidebar";
import { useNavigate } from "react-router-dom";

const demoSessions = [
  {
    time: "about 2 hours ago",
    date: "6/5/2025, 2:16:47 pm",
    type: "Video",
    cargoId: "CARGO-20250425-DEM01",
    detections: 8,
    damages: 2,
    status: "Completed",
  },
  {
    time: "1 day ago",
    date: "5/5/2025, 4:16:47 pm",
    type: "Image",
    cargoId: "CARGO-20250424-DEM03",
    detections: 1,
    damages: 0,
    status: "Completed",
  },
  {
    time: "3 days ago",
    date: "3/5/2025, 4:16:47 pm",
    type: "Video",
    cargoId: "CARGO-20250422-DEM02",
    detections: 12,
    damages: 4,
    status: "Completed",
  },
  {
    time: "6 days ago",
    date: "30/4/2025, 4:16:47 pm",
    type: "Video",
    cargoId: "CARGO-20250419-DEM01",
    detections: 15,
    damages: 3,
    status: "Completed",
  },
  {
    time: "7 days ago",
    date: "29/4/2025, 4:16:47 pm",
    type: "Image",
    cargoId: "CARGO-20250418-DEM04",
    detections: 1,
    damages: 1,
    status: "Completed",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.dashboardTitle}>Demo's Dashboard</h1>
          <div style={styles.dashboardSubtitle}>
            Welcome back, Demo. Here's your cargo inspection overview.
          </div>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Demo Sessions</div>
            <div style={styles.statValue}>3</div>
            <div style={styles.statDesc}>In the last 7 days</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Total Uploads</div>
            <div style={styles.statValue}>12</div>
            <div style={styles.statDesc}>8 videos, 4 images</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statTitle}>Detection Accuracy</div>
            <div style={styles.statValue}>96.5%</div>
            <div style={styles.statDesc}>In demo environment</div>
          </div>
        </div>

        {/* Quick Upload & View Results */}
        <div style={styles.quickRow}>
          <div style={styles.quickCard}>
            <div style={styles.quickTitle}>Quick Upload</div>
            <div style={styles.quickDesc}>
              Upload cargo images or videos to test the AI detection system.
            </div>
            <button style={styles.uploadBtn} onClick={() => navigate("/upload")}>Start New Upload</button>
          </div>
          <div style={styles.quickCard}>
            <div style={styles.quickTitle}>View Results</div>
            <div style={styles.quickDesc}>
              View detection results from previous uploads and sessions.
            </div>
            <button style={styles.viewBtn} onClick={() => navigate("/results")}>View Detection Results</button>
          </div>
        </div>

        {/* Recent Sessions Table */}
        <div style={styles.tableSection}>
          <div style={styles.tableTitle}>Recent Demo Sessions</div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Upload Time</th>
                <th>Type</th>
                <th>Cargo ID</th>
                <th>Detections</th>
                <th>Damages</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demoSessions.map((session, idx) => (
                <tr key={idx}>
                  <td>
                    {session.time}
                    <br />
                    <span style={styles.tableDate}>{session.date}</span>
                  </td>
                  <td>
                    <span
                      style={{
                        ...styles.typeBadge,
                        background: session.type === "Video" ? "#111827" : "#f1f5f9",
                        color: session.type === "Video" ? "#fff" : "#111827",
                      }}
                    >
                      {session.type}
                    </span>
                  </td>
                  <td>{session.cargoId}</td>
                  <td>{session.detections}</td>
                  <td style={{ color: session.damages > 0 ? "#ef4444" : "#111827" }}>
                    {session.damages}
                  </td>
                  <td>
                    <span style={styles.statusBadge}>{session.status}</span>
                  </td>
                  <td>
                    <button style={styles.actionBtn} onClick={() => navigate("/results")}>View Results</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
  },
  sidebar: {
    width: 260,
    background: "#fff",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 0",
    position: "relative",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 32,
  },
  logo: {
    background: "#e0e7ff",
    borderRadius: 8,
    padding: 6,
  },
  brand: {
    fontWeight: 700,
    fontSize: 20,
    color: "#111827",
  },
  brandSub: {
    fontSize: 13,
    color: "#64748b",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 32,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 22,
    color: "#64748b",
  },
  userName: {
    fontWeight: 600,
    fontSize: 16,
    color: "#111827",
  },
  userType: {
    fontSize: 13,
    color: "#64748b",
  },
  menu: {
    width: "100%",
    marginBottom: "auto",
  },
  menuItem: {
    padding: "12px 32px",
    color: "#111827",
    fontWeight: 500,
    cursor: "pointer",
    borderLeft: "4px solid transparent",
    transition: "background 0.2s",
  },
  menuItemActive: {
    padding: "12px 32px",
    color: "#2563eb",
    fontWeight: 600,
    background: "#f1f5f9",
    borderLeft: "4px solid #2563eb",
    cursor: "pointer",
  },
  logoutBtn: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    padding: "10px 0",
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "32px 48px",
    overflowY: "auto",
  },
  header: {
    marginBottom: 24,
  },
  dashboardTitle: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    color: "#111827",
  },
  dashboardSubtitle: {
    color: "#64748b",
    fontSize: 16,
    marginTop: 4,
  },
  statsRow: {
    display: "flex",
    gap: 24,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  statTitle: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  statDesc: {
    fontSize: 13,
    color: "#64748b",
  },
  quickRow: {
    display: "flex",
    gap: 24,
    marginBottom: 32,
  },
  quickCard: {
    flex: 1,
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minHeight: 120,
  },
  quickTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 8,
    color: "#111827",
  },
  quickDesc: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 16,
  },
  uploadBtn: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 0",
    width: "100%",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
  },
  viewBtn: {
    background: "#fff",
    color: "#111827",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: "12px 0",
    width: "100%",
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
  },
  tableSection: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 16,
    color: "#111827",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 15,
  },
  tableDate: {
    color: "#64748b",
    fontSize: 12,
  },
  typeBadge: {
    display: "inline-block",
    padding: "4px 16px",
    borderRadius: 16,
    fontWeight: 600,
    fontSize: 14,
    margin: "2px 0",
  },
  statusBadge: {
    display: "inline-block",
    background: "#f0fdf4",
    color: "#22c55e",
    borderRadius: 16,
    padding: "4px 16px",
    fontWeight: 600,
    fontSize: 14,
  },
  actionBtn: {
    background: "none",
    color: "#2563eb",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default DashboardPage;