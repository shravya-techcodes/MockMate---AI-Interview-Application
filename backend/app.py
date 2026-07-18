from flask import Flask, request, jsonify
from db import get_connection
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/signup", methods=['POST'])
def signup():
    data = request.get_json()

    fullname = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s",(email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "message" : "User already registered. Please login!"
        }),409

    sql = """INSERT INTO users (full_name,email,password) VALUES (%s, %s, %s)"""

    cursor.execute(sql, (fullname, email, password))

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

    query = "SELECT * FROM users WHERE email=%s AND password=%s"
    cursor.execute(query, (email, password))

    user = cursor.fetchone()

    cursor.close()
    conn.close()

    if user:
        return jsonify({
            "message": "Login Successful",
            "user": {
                "id": user["user_id"],
                "full_name": user["full_name"],
                "email": user["email"]
            }
        }), 200

    return jsonify({"message": "Invalid Email or Password"}), 401


if __name__ == "__main__":
    app.run(debug=True)