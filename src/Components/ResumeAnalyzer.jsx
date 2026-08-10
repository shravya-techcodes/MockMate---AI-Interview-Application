import "../Styles/ResumeAnalyzer.css";
import resume from "../assets/resume.jpeg";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const handleChooseFile = () => {
    document.getElementById("resumeInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      setUploadMessage("Please select a PDF or DOCX file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage("File size must be less than 5MB.");
      return;
    }

    setSelectedFile(file);
    setUploadMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a resume first.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:5000/resume/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedFile({
          name: selectedFile.name,
          size: selectedFile.size,
        });
        setAnalysis(data.analysis);
        setUploadMessage(data.message);
      } else {
        setUploadMessage(data.message || "Upload failed.");
      }
    } catch (error) {
      console.error(error);
      setUploadMessage("Unable to connect to the server.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <section className="resume-section">
        <div className="section-header">
          <h1>Resume Analyzer</h1>
          <p>
            Upload your resume and get AI-powered feedback and suggestions to
            improve it.
          </p>
        </div>

        <div className="upload-box">
          <div className="upload-image">
            <img src={resume} alt="Upload illustration" />
          </div>

          <div className="upload-info">
            <h3>Upload Your Resume</h3>
            <p>Upload your resume in PDF or DOCX format.</p>
            <input
              id="resumeInput"
              type="file"
              accept=".pdf,.docx"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button className="btn-upload" onClick={handleChooseFile}>
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Upload
              Resume
            </button>
            <span className="file-hint">PDF, DOCX (Max. 5MB)</span>
          </div>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="drag-drop">
            <div className="file-icon">
              <i className="fa-regular fa-file-lines"></i>
            </div>
            <h4>Drag &amp; Drop your file here</h4>
            <p>Supports PDF, DOCX</p>
          </div>
        </div>
      </section>

      {/*Uploaded file view section */}
      <div className="uploaded-sec">
        <div className="file-status-row">
          <div className="file-card">
            <div className="file-type-icon pdf">
              <i className="fa-solid fa-file-pdf"></i>
            </div>
            <div className="file-details">
              <h4>
                {selectedFile ? selectedFile.name : "No resume selected"}{" "}
              </h4>
              <p>
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(0)} KB`
                  : "No file selected"}{" "}
                &nbsp;•&nbsp;
                {uploadedFile && (
                  <span className="uploaded-text">Uploaded Successfully</span>
                )}
              </p>
            </div>
            <div className="status-check">
              {uploadedFile && <i className="fa-solid fa-circle-check"></i>}
            </div>
          </div>

          <button
            className="btn-analyse"
            onClick={handleUpload}
            disabled={uploading}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {uploading ? "Uploading..." : "Analyse Resume"}
          </button>

          <button
            className="btn-outline-purple"
            onClick={() => navigate("/resumeInterview", {
                state: {
                  analysis: analysis,
                },
              })
            }
          >
            <i className="fa-solid fa-microphone"></i>
            <span>
              Start Interview
              <br />
              Based on Your Resume
            </span>
          </button>
        </div>
      </div>

      {/*Analysis result view section */}
      <section className="analysis-section">
        <h1 className="analysis-title">Analysis Results</h1>

        <div className="analysis-grid">
          {/*Resume Score */}
          <div className="card score-card">
            <h4 className="card-label">Resume Score</h4>
            <div
              className="score-circle"
              style={{ "--percent": analysis?.ats_score || 0 }}
            >
              <div className="score-inner">
                <span className="score-number">{analysis?.ats_score || 0}</span>
                <span className="score-total">/100</span>
              </div>
            </div>
            <h3 className="score-status">Good</h3>
            <p className="score-desc">
              {analysis?.summary ||
                "Upload and analyse your resume to see your score"}
            </p>
          </div>

          {/* Strengths */}
          <div className="card">
            <h4 className="card-title green">
              <i className="fa-solid fa-shield-halved"></i> Strengths
            </h4>
            <ul className="list">
              {analysis?.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          {/*} Weaknesses */}
          <div className="card">
            <h4 className="card-title orange">
              <i className="fa-solid fa-triangle-exclamation"></i> Weaknesses
            </h4>
            <ul className="list">
              {analysis?.weaknesses?.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>

          {/*} Suggestions */}
          <div className="card">
            <h4 className="card-title blue">
              <i className="fa-solid fa-lightbulb"></i> Suggestions
            </h4>
            <ul className="list">
              {analysis?.suggestions?.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="analysis-grid-2">
          {/*Skills Detected */}
          <div className="card">
            <h4 className="card-title purple">
              <i className="fa-solid fa-layer-group"></i> Skills Detected
            </h4>
            <div className="tag-group">
              {analysis?.skills?.map((skill, index) => (
                <span className="tag" key={index}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Interview Topics */}
          <div className="card">
            <h4 className="card-title purple">
              <i className="fa-solid fa-camera"></i> Recommended Interview
              Topics
            </h4>
            <div className="tag-group">
              {analysis?.interview_topics?.map((topic, index) => (
                <span className="tag" key={index}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn-outline" onClick={handleChooseFile}>
            <i className="fa-solid fa-rotate"></i> Analyze Another Resume
          </button>
        </div>
      </section>
    </>
  );
}
