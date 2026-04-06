from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI Ticketing Backend Running 🚀"}


@app.post("/analyze")
def analyze(ticket: dict):
    text = str(ticket.get("text", "")).lower()

    # PASSWORD
    if "password" in text or "login" in text:
        return {
            "category": "Access",
            "summary": "Password issue",
            "severity": "Low",
            "action": "auto-resolve",
            "response": "Use 'Forgot Password' option to reset your password.",
            "department": "IT",
            "sentiment": "Neutral"
        }

    # SALARY
    if "salary" in text or "credited" in text or "payment" in text:
        return {
            "category": "Billing",
            "summary": "Salary issue",
            "severity": "High",
            "action": "assign",
            "response": "",
            "department": "Finance",
            "sentiment": "Frustrated"
        }

    # SERVER
    if "server" in text or "down" in text:
        return {
            "category": "Server",
            "summary": "Server issue",
            "severity": "Critical",
            "action": "assign",
            "response": "",
            "department": "Engineering",
            "sentiment": "Frustrated"
        }

    # DEFAULT
    return {
        "category": "General",
        "summary": "General issue",
        "severity": "Medium",
        "action": "assign",
        "response": "",
        "department": "Support",
        "sentiment": "Neutral"
    }