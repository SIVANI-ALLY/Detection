import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadDemoPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [stage, setStage] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = file && region && country && warehouse && stage && length && breadth && height;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("stage_name", stage);
      formData.append("cargo_id", `CARGO-${new Date().getTime()}`);
      formData.append("region", region);
      formData.append("country", country);
      formData.append("warehouse", warehouse);
      formData.append("length", length);
      formData.append("breadth", breadth);
      formData.append("height", height);

      console.log("Sending request to backend...");
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response received:", response.data);
      if (response.data) {
        // Navigate to results page after successful upload
        navigate("/results");
      }
    } catch (err) {
      console.error("Upload error:", err);
      let errorMessage = "An error occurred while uploading the file";
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = err.response.data?.detail || err.response.data?.message || errorMessage;
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = "No response received from server. Please check if the server is running.";
        console.error("No response received:", err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = err.message || errorMessage;
        console.error("Error setting up request:", err.message);
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <Sidebar />
      <div style={styles.main}>
        <h1 style={styles.title}>Upload Demo</h1>
        <div style={styles.subtitle}>
          Upload cargo images or videos to test the AI detection system
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Upload Media</div>
          <div style={styles.cardSubtitle}>
            Upload an image or video of cargo for AI analysis
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.uploadBox}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.mp4,.mov"
              style={{ display: "none" }}
              id="file-upload"
              onChange={e => setFile(e.target.files[0])}
            />
            <label htmlFor="file-upload" style={styles.uploadLabel}>
              {file ? file.name : (
                <>
                  Drag and drop your file here or click to browse<br />
                  <span style={{ color: "#64748b", fontSize: 14 }}>
                    Supports JPG, PNG, GIF, MP4, MOV up to 10MB
                  </span>
                </>
              )}
            </label>
          </div>
          <div style={styles.formRow}>
            <select style={styles.select} value={region} onChange={e => setRegion(e.target.value)}>
              <option value="">Select Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="America">America</option>
            </select>
            <select style={styles.select} value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="Germany">Germany</option>
            </select>
          </div>
          <div style={styles.formRow}>
            <select style={styles.select} value={warehouse} onChange={e => setWarehouse(e.target.value)}>
              <option value="">Select Warehouse</option>
              <option value="Warehouse 1">Warehouse 1</option>
              <option value="Warehouse 2">Warehouse 2</option>
            </select>
            <select style={styles.select} value={stage} onChange={e => setStage(e.target.value)}>
              <option value="">Select Stage</option>
              <option value="Arrival">Arrival</option>
              <option value="Inspection">Inspection</option>
              <option value="Dispatch">Dispatch</option>
            </select>
          </div>
          <div style={styles.dimensionsTitle}>Cargo Dimensions (cm)</div>
          <div style={styles.formRow}>
            <input
              style={styles.input}
              type="number"
              placeholder="Length"
              value={length}
              onChange={e => setLength(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Breadth"
              value={breadth}
              onChange={e => setBreadth(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Height"
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </div>
          <button
            style={{ 
              ...styles.processBtn, 
              background: isFormValid ? "#111827" : "#cbd5e1", 
              cursor: isFormValid ? "pointer" : "not-allowed",
              opacity: loading ? 0.7 : 1
            }}
            disabled={!isFormValid || loading}
            onClick={handleSubmit}
          >
            {loading ? "Processing..." : "Process with AI"}
          </button>
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
    maxWidth: 600,
    margin: "0 auto",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 18,
  },
  uploadBox: {
    border: "2px dashed #cbd5e1",
    borderRadius: 10,
    padding: "32px 0",
    textAlign: "center",
    marginBottom: 24,
    background: "#f8fafc",
    cursor: "pointer",
  },
  uploadLabel: {
    display: "block",
    cursor: "pointer",
    fontSize: 16,
    color: "#111827",
    fontWeight: 500,
  },
  formRow: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
  },
  select: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    fontSize: 15,
    background: "#f8fafc",
    outline: "none",
  },
  dimensionsTitle: {
    fontWeight: 600,
    fontSize: 15,
    margin: "16px 0 8px 0",
    color: "#111827",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #e2e8f0",
    fontSize: 15,
    background: "#f8fafc",
    outline: "none",
  },
  processBtn: {
    width: "100%",
    padding: "14px 0",
    borderRadius: 8,
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    border: "none",
    marginTop: 18,
    transition: "background 0.2s",
  },
  error: {
    color: "#dc2626",
    fontSize: 14,
    marginBottom: 16,
    padding: "8px 12px",
    background: "#fee2e2",
    borderRadius: 6,
  },
};

export default UploadDemoPage; 