import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const sendTicket = async () => {
    try {
      const res = await fetch(
        "https://ai-ticketing-system-hord.onrender.com/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();

      console.log("API RESPONSE:", data);

      const newTicket = {
        id: Date.now(),
        text,
        category: data.category || "N/A",
        severity: data.severity || "N/A",
        department: data.department || "N/A",
        status:
          data.action === "auto-resolve" ? "Resolved" : "Assigned",
        response: data.response || "",
      };

      setResult(newTicket);
      setHistory([newTicket, ...history]);
      setText("");
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

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

  const getStatusColor = (status) => {
    return status === "Resolved" ? "green" : "blue";
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", background: "#f4f6f8" }}>
      <h1 style={{ textAlign: "center" }}>🚀 AI Ticketing Dashboard</h1>

      {/* Input */}
      <div style={{ background: "white", padding: "20px", maxWidth: "600px", margin: "auto" }}>
        <textarea
          placeholder="Describe your issue..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
          rows={4}
        />

        <button
          onClick={sendTicket}
          style={{ marginTop: "10px", padding: "10px", background: "#007bff", color: "white" }}
        >
          Submit Ticket
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{ background: "white", padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
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
            <div style={{ marginTop: "10px", padding: "10px", background: "#e6f7ff" }}>
              💡 {result.response}
            </div>
          )}
        </div>
      )}

      {/* History */}
      <div style={{ maxWidth: "800px", margin: "40px auto" }}>
        <h2>📜 Ticket History</h2>

        {history.map((t) => (
          <div key={t.id} style={{ background: "white", padding: "10px", marginBottom: "10px" }}>
            <p><b>{t.text}</b></p>
            <p>Severity: <span style={{ color: getSeverityColor(t.severity) }}>{t.severity}</span></p>
            <p>Status: <span style={{ color: getStatusColor(t.status) }}>{t.status}</span></p>
            <p>Dept: {t.department}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;