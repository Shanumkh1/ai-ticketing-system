from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Enable CORS (frontend can connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Home route
@app.get("/")
def home():
    return {"message": "AI Ticketing Backend Running 🚀"}


# ✅ Ticket Analysis
@app.post("/analyze")
def analyze(ticket: dict):
    text = str(ticket.get("text", "")).lower()

    # 🔐 Password / login issues
    if "password" in text or "login" in text:
        return {
            "category": "Access",
            "summary": "User unable to login / password issue",
            "severity": "Low",
            "action": "auto-resolve",
            "response": "Use 'Forgot Password' option to reset your password.",
            "department": "IT",
            "sentiment": "Neutral"
        }

    # 💰 Salary / payment issues
    if "salary" in text or "payment" in text or "credited" in text:
        return {
            "category": "Billing",
            "summary": "Salary or payment issue",
            "severity": "High",
            "action": "assign",
            "response": "",
            "department": "Finance",
            "sentiment": "Frustrated"
        }

    # 🖥️ Server / system issues
    if "server" in text or "down" in text or "not working" in text:
        return {
            "category": "Server",
            "summary": "Server or system outage",
            "severity": "Critical",
            "action": "assign",
            "response": "",
            "department": "Engineering",
            "sentiment": "Frustrated"
        }

    # 🏖️ HR / leave issues
    if "leave" in text or "holiday" in text or "vacation" in text:
        return {
            "category": "HR",
            "summary": "Leave or HR related request",
            "severity": "Medium",
            "action": "assign",
            "response": "",
            "department": "HR",
            "sentiment": "Neutral"
        }

    # 🐞 Bug / general issues
    if "bug" in text or "error" in text or "issue" in text:
        return {
            "category": "Bug",
            "summary": "System bug or issue",
            "severity": "Medium",
            "action": "assign",
            "response": "",
            "department": "Engineering",
            "sentiment": "Neutral"
        }

    # 🔧 Default fallback
    return {
        "category": "General",
        "summary": "General support request",
        "severity": "Medium",
        "action": "assign",
        "response": "",
        "department": "Support",
        "sentiment": "Neutral"
    }