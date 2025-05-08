import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // For now, we'll use a mock cargo ID. In a real app, you'd want to fetch all results or paginate them
        const response = await axios.get("http://localhost:8000/damage_info/CARGO-20250425-DEM01");
        if (response.data && response.data.damage_info) {
          setResults(response.data.damage_info);
        }
      } catch (err) {
        setError("Failed to fetch results. Please try again later.");
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.title}>Detection Results</h1>
        <div style={styles.subtitle}>View detection results from previous uploads and sessions.</div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Results Table</div>
          {error && <div style={styles.error}>{error}</div>}
          {loading ? (
            <div style={styles.loading}>Loading results...</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Cargo ID</th>
                  <th>Stage</th>
                  <th>Defect Class</th>
                  <th>Confidence</th>
                  <th>Timestamp</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx}>
                    <td>{result.Cargo_id}</td>
                    <td>{result.Stage_name}</td>
                    <td>{result.Defect_class}</td>
                    <td>{(result.Confidence * 100).toFixed(2)}%</td>
                    <td>{new Date(result.Timestamp).toLocaleString()}</td>
                    <td>
                      {result.Output_image_path && (
                        <a 
                          href={`http://localhost:8000/${result.Output_image_path}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={styles.imageLink}
                        >
                          View Image
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
  main: {
    flex: 1,
    padding: "32px 48px",
    overflowY: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    margin: 0,
    color: "#111827",
  },
  subtitle: {
    color: "#64748b",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    maxWidth: 900,
    margin: "0 auto",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 16,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 15,
  },
  loading: {
    textAlign: "center",
    padding: "20px",
    color: "#64748b",
  },
  error: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 16,
    padding: "8px 12px",
    background: "#fee2e2",
    borderRadius: 6,
  },
  imageLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
};

export default ResultsPage; 