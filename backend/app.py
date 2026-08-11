from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask import Flask, request, jsonify
from db import get_connection
from flask_cors import CORS
import bcrypt
import os
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader
from docx import Document
from google import genai
import json
import uuid

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

client = genai.Client(api_key = os.getenv("GEMINI_API_KEY"))

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

    original_filename = secure_filename(file.filename)

    name, extension = os.path.splitext(original_filename)

    unique_filename = f"{name}_{uuid.uuid4().hex}{extension}"

    upload_path = os.path.join(
        app.config["UPLOAD_FOLDER"],
        unique_filename
    )

    file.save(upload_path)

    # Extract resume text
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

    # Send resume text to Gemini
    try:

        prompt = f"""
You are an AI resume analyzer.

Analyze the following resume carefully.

Return the analysis as JSON with exactly these fields:

{{
    "summary": "A short professional summary of the candidate",
    "skills": [],
    "strengths": [],
    "weaknesses": [],
    "experience": [],
    "education": [],
    "projects": [],
    "suggestions": [],
    "interview_topics": ["Give topics to prepare based on the resume skills, projects, experience and education"],
    "ats_score": 0
}}

Rules:
- skills should contain important technical and soft skills.
- strengths should contain positive aspects of the resume.
- weaknesses should contain areas that could be improved.
- experience should contain work or internship experience.
- education should contain education details.
- projects should contain important projects.
- suggestions should contain practical recommendations.
- ats_score should be a number from 0 to 100.
- Return ONLY valid JSON.
- Do not use Markdown.
- Do not add explanations outside the JSON.
- Do not invent information.

Resume:

{extracted_text}
"""

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt,
            config={
                "response_mime_type": "application/json"
            }
        )

        gemini_response = response.text

        print("\n========== GEMINI RESPONSE ==========")
        print(gemini_response)
        print("=====================================\n")

        # Convert Gemini JSON string into Python dictionary
        analysis = json.loads(gemini_response)

    except json.JSONDecodeError as e:

        print("\n========== JSON ERROR ==========")
        print(str(e))
        print("================================\n")

        return jsonify({
            "message": "Gemini returned invalid JSON",
            "error": str(e)
        }), 500

    except Exception as e:

        print("\n========== GEMINI ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("==================================\n")

        return jsonify({
            "message": "Failed to analyze resume with Gemini",
            "error": str(e)
        }), 500

    user_id = get_jwt_identity()

    return jsonify({
        "message": "Resume analyzed successfully",
        "filename": original_filename,
        "user_id": user_id,
        "analysis": analysis
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

@app.route("/interview/questions", methods=["POST"])
def interview_questions():
    data = request.get_json()
    analysis = data.get("analysis")
    if not analysis:
        return jsonify({
            "message": "Resume analysis is required"
        }), 400
    prompt = f"""
You are an AI interviewer conducting a job interview based on a candidate's resume.
Here is the candidate's resume analysis:
{json.dumps(analysis, indent=2)}
Generate exactly 7 interview questions based on this candidate's resume.
Requirements:
1. Generate exactly 7 questions.
2. Ask all 7 questions in one response.
3. Questions must be relevant to the candidate's resume.
4. Include questions about skills, projects, and experience when relevant.
5. Ask very basic and easy questions like dieerence between class and object etc..
6. Include technical and project-based  easy questions.
7. Do not ask questions unrelated to the resume.
8. Return ONLY valid JSON.
9. Do not use Markdown.
10. Use this exact JSON format:

{{
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6",
        "Question 7"
    ]
}}
"""
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )
    print("Gemini response:")
    print(response.text)
    questions_data = json.loads(response.text)
    return jsonify({
        "message": "Questions generated successfully",
        "questions": questions_data["questions"]
    }), 200

@app.route("/interview/evaluate", methods=["POST"])
def evaluate_interview():

    data = request.get_json()

    questions = data.get("questions")
    answers = data.get("answers")

    if not questions:
        return jsonify({
            "message": "Questions are required"
        }), 400

    if not answers:
        return jsonify({
            "message": "Answers are required"
        }), 400

    print("Received questions:")
    print(questions)

    print("Received answers:")
    print(answers)

    prompt = f"""
You are an AI interview evaluator.

Evaluate the candidate's answers to the following 7 interview questions.

INTERVIEW QUESTIONS AND ANSWERS:

Question 1:
{questions[0]}

Answer 1:
{answers[0]}

Question 2:
{questions[1]}

Answer 2:
{answers[1]}

Question 3:
{questions[2]}

Answer 3:
{answers[2]}

Question 4:
{questions[3]}

Answer 4:
{answers[3]}

Question 5:
{questions[4]}

Answer 5:
{answers[4]}

Question 6:
{questions[5]}

Answer 6:
{answers[5]}

Question 7:
{questions[6]}

Answer 7:
{answers[6]}


Evaluate the interview based on:
- Accuracy
- Relevance
- Clarity
- Communication
- Technical knowledge where applicable
- Quality of explanation

Return ONLY valid JSON.
Do not use Markdown or code blocks.

The JSON must contain:

{{
    "overall_score": 0,
    "question_scores": [
        {{
            "question_number": 1,
            "score": 0,
            "feedback": ""
        }}
    ],
    "improvement_suggestions": []""
}}

Rules:
- overall_score must be between 0 and 10.
- Each question score must be between 0 and 10.
- Give a score and feedback for all 7 questions.
- improvement_suggestions should contain practical suggestions and feedback upto 10 points.
"""
    print("Gemini evaluation prompt created")
    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )
    print("Gemini response:")
    print(response.text)

    evaluation = json.loads(response.text)
    print("Parsed evaluation:")
    print(evaluation)
    return jsonify(evaluation), 200

if __name__ == "__main__":
    app.run(debug=True)