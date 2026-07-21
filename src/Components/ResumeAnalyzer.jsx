import "../Styles/ResumeAnalyzer.css";
import resume from "../assets/resume.jpeg";
import React from "react";

export default function ResumeAnalyzer() {
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
            <button className="btn-upload">
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
              <h4>Shravya_Shettigar_Resume.pdf</h4>
              <p>
                123 KB &nbsp;•&nbsp;{" "}
                <span className="uploaded-text">Uploaded Successfully</span>
              </p>
            </div>
            <div className="status-check">
              <i className="fa-solid fa-circle-check"></i>
            </div>
          </div>

          <button className="btn-analyse">
            <i className="fa-solid fa-wand-magic-sparkles"></i> Analyze Resume
          </button>

          <button className="btn-outline-purple">
            <i className="fa-solid fa-microphone"></i>
            <span>
              Start Interview
              <br />
              Based on Your Resume
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
