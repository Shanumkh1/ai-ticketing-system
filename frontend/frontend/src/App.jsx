import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const sendTicket = async () => {
    const res = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();

    const newTicket = {
      id: Date.now(),
      text,
      status: data.action === "auto-resolve" ? "Resolved" : "Assigned",
      ...data
    };

    setResult(newTicket);
    setHistory([newTicket, ...history]);
    setText("");
  };

  // 🎨 Severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "red";
      case "High": return "orange";
      case "Medium": return "gold";
      case "Low": return "green";
      default: return "gray";
    }
  };

  // 🎯 Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved": return "green";
      case "Assigned": return "blue";
      case "New": return "gray";
      default: return "black";
    }
  };

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>

      <h1 style={{ textAlign: "center" }}>🚀 AI Ticketing Dashboard</h1>

      {/* Input Card */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "20px auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
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
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Submit Ticket
        </button>
      </div>

      {/* Latest Result */}
      {result && (
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "20px auto",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
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
            <div style={{
              marginTop: "10px",
              padding: "10px",
              background: "#e6f7ff",
              borderRadius: "5px"
            }}>
              💡 {result.response}
            </div>
          )}
        </div>
      )}

      {/* History */}
      <div style={{ maxWidth: "900px", margin: "40px auto" }}>
        <h2>📜 Ticket History</h2>

        {history.map((t) => (
          <div key={t.id} style={{
            background: "white",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)"
          }}>
            <p><b>Issue:</b> {t.text}</p>

            <p>
              <b>Severity:</b>{" "}
              <span style={{ color: getSeverityColor(t.severity) }}>
                {t.severity}
              </span>
            </p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ color: getStatusColor(t.status) }}>
                {t.status}
              </span>
            </p>

            <p><b>Department:</b> {t.department}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;