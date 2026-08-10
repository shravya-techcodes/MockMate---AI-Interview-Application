import "../Styles/ResumeInterview.css";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResumeInterview() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const analysis = location.state?.analysis;

  // Current time
  function timeNow() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Send message
  async function sendMessage() {
    const text = userInput.trim();
    if (!text) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: text,
        time: timeNow(),
      },
    ]);

    // Clear input
    setUserInput("");

    // Show typing indicator
    setTyping(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/interview/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analysis: analysis,
          }),
        },
      );

      const data = await response.json();
      setTyping(false);
      console.log("Interview questions response:", data);

      // Temporary response
      const questionsText = data.questions.map((question, index) => `${index + 1}. ${question}`).join("\n\n");
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: questionsText,
          time: timeNow(),
        },
      ]);
    } catch (error) {
      setTyping(false);
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I couldn't generate the interview questions.",
          time: timeNow(),
        },
      ]);
    }
  }

  // Scroll chat to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <>
      {/* Chat Section */}
      <div className="chat-section">
        {/* Header */}
        <div className="chat-header">
          <button className="back-btn" onClick={() => navigate("/resume")}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div>
            <h1>Interview Based on Your Resume</h1>

            <p>
              AI will generate questions based on your resume and evaluate your
              answers.
            </p>
          </div>
        </div>

        {/* Resume Card */}
        <div className="resume-card">
          <div className="resume-icon">
            <i className="fa-solid fa-file-lines"></i>
          </div>

          <div>
            <h4>Shravya_Shettigar_Resume.pdf</h4>

            <p>
              Resume Analyzed · ATS Score: <span className="score">82/100</span>
            </p>
          </div>
        </div>

        {/* Chat Box */}
        <div className="chat-box" ref={chatBoxRef}>
          {/* Original AI message */}
          <div className="message bot">
            <div className="avatar">
              <i className="fa-solid fa-robot"></i>
            </div>

            <div className="bubble">
              <div className="msg-head">
                <span>MockMate AI</span>
                <small>10:30 AM</small>
              </div>

              <p>
                Hi Shravya! I've analyzed your resume. Based on your profile,
                I'll ask you 7 interview questions related to your skills,
                experience, and projects.
              </p>

              <p>
                Please answer all questions in one go. I'll review your answers
                and provide detailed feedback with a score out of 10.
              </p>

              <p>Ready when you are!</p>
            </div>
          </div>

          {/* User + Bot messages */}
          {messages.map((message, index) => (
            <div className={`message ${message.type}`} key={index}>
              {/* Bot avatar */}
              {message.type === "bot" && (
                <div className="avatar">
                  <i className="fa-solid fa-robot"></i>
                </div>
              )}

              <div className="bubble">
                <div className="msg-head">
                  {message.type === "bot" && <span>MockMate AI</span>}

                  <small>{message.time}</small>
                </div>

                <p style={{ whiteSpace: "pre-line" }}>{message.text}</p>

                {/* User check mark */}
                {message.type === "user" && (
                  <i className="fa-solid fa-check-double status-tick"></i>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="message bot typing">
              <div className="avatar">
                <i className="fa-solid fa-robot"></i>
              </div>

              <div className="bubble">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Type your answer here..."
          />

          <button onClick={sendMessage}>
            <i className="fa-solid fa-paper-plane"></i>
            Send
          </button>
        </div>

        {/* Note */}
        <p className="note">
          <i className="fa-solid fa-circle-info"></i>
          Please answer all 7 questions together for accurate evaluation.
        </p>
      </div>
    </>
  );
}
