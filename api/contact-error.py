import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from http.server import BaseHTTPRequestHandler


DEFAULT_CONTACT_EMAIL = "eight888studios@gmail.com"
DEFAULT_SUBJECT = "✗ Something went wrong"


def build_error_body(payload):
    lines = [
        payload.get("error_message", "Contact form delivery failed."),
        "",
        "Submitted contact details:",
        f"Name: {payload.get('name', '').strip() or 'Not provided'}",
        f"Email: {payload.get('email', '').strip() or 'Not provided'}",
        f"Service: {payload.get('service', '').strip() or 'Not selected'}",
        "",
        "Message:",
        payload.get("message", "").strip() or "Not provided",
        "",
        f"Page: {payload.get('page', '').strip() or 'Unknown'}",
        f"User agent: {payload.get('user_agent', '').strip() or 'Unknown'}",
    ]
    return "\n".join(lines)


def send_error_email(payload):
    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")
    to_address = os.environ.get("CONTACT_ERROR_TO", DEFAULT_CONTACT_EMAIL)
    from_address = os.environ.get("SMTP_FROM", smtp_user or "")
    reply_to = payload.get("email") or os.environ.get("CONTACT_REPLY_TO", DEFAULT_CONTACT_EMAIL)

    missing = [name for name, value in {
        "SMTP_USER": smtp_user,
        "SMTP_PASS": smtp_pass,
        "CONTACT_ERROR_TO": to_address,
        "SMTP_FROM or SMTP_USER": from_address,
    }.items() if not value]
    if missing:
        raise RuntimeError("Missing email configuration: " + ", ".join(missing))

    msg = MIMEMultipart()
    msg["From"] = from_address
    msg["To"] = to_address
    msg["Reply-To"] = reply_to
    msg["Subject"] = DEFAULT_SUBJECT
    msg.attach(MIMEText(build_error_body(payload), "plain"))

    with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
        if os.environ.get("SMTP_USE_TLS", "true").lower() != "false":
            server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(from_address, [to_address], msg.as_string())


class handler(BaseHTTPRequestHandler):
    def send_json(self, status_code, payload):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Allow", "POST, OPTIONS")
        self.end_headers()

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 65536:
                self.send_json(400, {"ok": False, "error": "Invalid request size."})
                return

            raw_body = self.rfile.read(length).decode("utf-8")
            payload = json.loads(raw_body)
            send_error_email(payload)
            self.send_json(202, {"ok": True})
        except Exception as exc:
            self.send_json(500, {"ok": False, "error": str(exc)})
