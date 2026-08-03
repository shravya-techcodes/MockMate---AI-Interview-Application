from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask import Flask, request, jsonify
from db import get_connection
from flask_cors import CORS
import bcrypt
import os
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from docx import Document

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)
CORS(app)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024
ALLOWED_EXTENSIONS = {"pdf", "docx"}

def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )

@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()

    fullname = data.get("full_name")
    email = data.get("email")
    password = data.get("password")
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s",(email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "message" : "User already registered. Please login!"
        }),409

    sql = """INSERT INTO users (full_name,email,password) VALUES (%s, %s, %s)"""

    cursor.execute(sql, (fullname, email, hashed_password))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message" : "Registered successfully!"}),201

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM users WHERE email=%s"
    cursor.execute(query, (email,))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user and bcrypt.checkpw(
        password.encode("utf-8"),
        user["password"].encode("utf-8")
    ):
        access_token = create_access_token(identity=str(user["user_id"]))

        return jsonify({
            "message": "Login Successful",
            "token" : access_token,
            "user": {
                "id": user["user_id"],
                "full_name": user["full_name"],
                "email": user["email"]
            }
        }), 200

    return jsonify({"message": "Invalid Email or Password"}), 401

@app.route("/resume/upload", methods=["POST"])
@jwt_required()
def upload_resume():

    if "resume" not in request.files:
        return jsonify({
            "message": "No resume file provided"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "message": "No file selected"
        }), 400

    if not allowed_file(file.filename):
        return jsonify({
            "message": "Only PDF and DOCX files are allowed"
        }), 400

    filename = secure_filename(file.filename)

    upload_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        filename
    )

    file.save(upload_path)

    # Extracting the resume text
    try:
        extracted_text = extract_text_from_resume(upload_path)

        print("\n========== EXTRACTED RESUME TEXT ==========")
        print(extracted_text)
        print("============================================\n")

    except Exception as e:
        return jsonify({
            "message": "Failed to extract resume text",
            "error": str(e)
        }), 500

    user_id = get_jwt_identity()

    return jsonify({
        "message": "Resume uploaded successfully",
        "filename": filename,
        "user_id": user_id,
        "text": extracted_text
    }), 200

# Extracting the text from the uploaded file to send it to the API
def extract_text_from_resume(file_path):
    extension = os.path.splitext(file_path)[1].lower()

    # PDF
    if extension == ".pdf":
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text.strip()

    # DOCX
    elif extension == ".docx":
        document = Document(file_path)
        text = ""
        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text.strip()

    else:
        raise ValueError("Unsupported file type")

if __name__ == "__main__":
    app.run(debug=True)