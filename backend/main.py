from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Allow frontend connection
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


# ✅ Ticket Analysis (AI-like logic)
@app.post("/analyze")
def analyze(ticket: dict):
    text = ticket.get("text", "").lower()

    # 🔐 Password issues
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
    elif "salary" in text or "payment" in text or "money" in text:
        return {
            "category": "Billing",
            "summary": "Salary or payment not received",
            "severity": "High",
            "action": "assign",
            "response": "",
            "department": "Finance",
            "sentiment": "Frustrated"
        }

    # 🖥️ Server issues
    elif "server" in text or "down" in text or "not working" in text:
        return {
            "category": "Server",
            "summary": "Server or system outage",
            "severity": "Critical",
            "action": "assign",
            "response": "",
            "department": "Engineering",
            "sentiment": "Frustrated"
        }

    # 🏖️ Leave / HR issues
    elif "leave" in text or "holiday" in text or "vacation" in text:
        return {
            "category": "HR",
            "summary": "Leave or HR related query",
            "severity": "Medium",
            "action": "assign",
            "response": "",
            "department": "HR",
            "sentiment": "Neutral"
        }

    # 🐞 Bug / feature issues
    elif "bug" in text or "error" in text or "issue" in text:
        return {
            "category": "Bug",
            "summary": "System bug or unexpected issue",
            "severity": "Medium",
            "action": "assign",
            "response": "",
            "department": "Engineering",
            "sentiment": "Neutral"
        }

    # 🔧 Default case
    else:
        return {
            "category": "General",
            "summary": "General support request",
            "severity": "Medium",
            "action": "assign",
            "response": "",
            "department": "Support",
            "sentiment": "Neutral"
        }