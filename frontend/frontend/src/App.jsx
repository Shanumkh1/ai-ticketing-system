import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ✅ FIXED FUNCTION (POST request)
  const sendTicket = async () => {
    try {
      const res = await fetch(
        "https://ai-ticketing-system-hord.onrender.com/analyze",
        {
          method: "POST", // 🔥 IMPORTANT FIX
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      const newTicket = {
        id: Date.now(),
        text: text,
        category: data.category,
        severity: data.severity,
        department: data.department,
        status:
          data.action === "auto-resolve" ? "Resolved" : "Assigned",
        response: data.response,
      };

      setResult(newTicket);
      setHistory((prev) => [newTicket, ...prev]);
      setText("");
    } catch (error) {
      console.error("ERROR:", error);
      alert("Backend connection failed");
    }
  };

  // 🎨 Severity colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "red";
      case "High":
        return "orange";
      case "Medium":
        return "gold";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  // 🎯 Status colors
  const getStatusColor = (status) => {
    return status === "Resolved" ? "green" : "blue";
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "#f4f6f8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        🚀 AI Ticketing Dashboard
      </h1>

      {/* Input Section */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        <textarea
          placeholder="Describe your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
          rows={4}
        />

        <button
          onClick={sendTicket}
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Ticket
        </button>
      </div>

      {/* Latest Ticket */}
      {result && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "600px",
            margin: "20px auto",
          }}
        >
          <h3>🎯 Latest Ticket</h3>

          <p><b>Issue:</b> {result.text}</p>
          <p><b>Category:</b> {result.category}</p>

          <p>
            <b>Severity:</b>{" "}
            <span style={{ color: getSeverityColor(result.severity) }}>
              {result.severity}
            </span>
          </p>

          <p>
            <b>Status:</b>{" "}
            <span style={{ color: getStatusColor(result.status) }}>
              {result.status}
            </span>
          </p>

          <p><b>Department:</b> {result.department}</p>

          {result.response && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "#e6f7ff",
                borderRadius: "5px",
              }}
            >
              💡 {result.response}
            </div>
          )}
        </div>
      )}

      {/* Ticket History */}
      <div style={{ maxWidth: "800px", margin: "40px auto" }}>
        <h2>📜 Ticket History</h2>

        {history.map((t) => (
          <div
            key={t.id}
            style={{
              background: "white",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <p><b>{t.text}</b></p>

            <p>
              Severity:{" "}
              <span style={{ color: getSeverityColor(t.severity) }}>
                {t.severity}
              </span>
            </p>

            <p>
              Status:{" "}
              <span style={{ color: getStatusColor(t.status) }}>
                {t.status}
              </span>
            </p>

            <p>Department: {t.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;