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

      {/*Analysis result view section */}
      <section className="analysis-section">
        <h1 className="analysis-title">Analysis Results</h1>

        <div className="analysis-grid">
          {/*Resume Score */}
          <div className="card score-card">
            <h4 className="card-label">Resume Score</h4>
            <div className="score-circle" style={{"--percent": 82}}>
              <div className="score-inner">
                <span className="score-number">82</span>
                <span className="score-total">/100</span>
              </div>
            </div>
            <h3 className="score-status">Good</h3>
            <p className="score-desc">Your resume is good, but can be improved.</p>
          </div>

          {/* Strengths */}
          <div className="card">
            <h4 className="card-title green">
              <i className="fa-solid fa-shield-halved"></i> Strengths
            </h4>
            <ul className="list">
              <li>Clear contact information</li>
              <li>Good use of headings</li>
              <li>Relevant skills included</li>
              <li>Professional summary present</li>
            </ul>
          </div>

          {/*} Weaknesses */}
          <div className="card">
            <h4 className="card-title orange">
              <i className="fa-solid fa-triangle-exclamation"></i> Weaknesses
            </h4>
            <ul className="list">
              <li>Summary is a bit too long</li>
              <li>Some skills need more context</li>
              <li>Lack of measurable achievements</li>
              <li>Inconsistent formatting</li>
            </ul>
          </div>

          {/*} Suggestions */}
          <div className="card">
            <h4 className="card-title blue">
              <i className="fa-solid fa-lightbulb"></i> Suggestions
            </h4>
            <ul className="list">
              <li>Keep summary concise (3-4 lines)</li>
              <li>Add more quantifiable results</li>
              <li>Include relevant certifications</li>
              <li>Improve bullet points</li>
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
              <span className="tag">Python</span>
              <span className="tag">JavaScript</span>
              <span className="tag">React</span>
              <span className="tag">SQL</span>
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">Flask</span>
              <span className="tag">MySQL</span>
              <span className="tag">Git</span>
              <span className="tag">Problem Solving</span>
              <span className="tag">Data Structures</span>
              <span className="tag">Algorithms</span>
              <span className="tag">DBMS</span>
            </div>
          </div>

          {/* Recommended Interview Topics */}
          <div className="card">
            <h4 className="card-title purple">
              <i className="fa-solid fa-camera"></i> Recommended Interview Topics
            </h4>
            <div className="tag-group">
              <span className="tag">Data Structures</span>
              <span className="tag">Algorithms</span>
              <span className="tag">DBMS</span>
              <span className="tag">System Design</span>
              <span className="tag">Python Basics</span>
              <span className="tag">Flask</span>
              <span className="tag">SQL Queries</span>
              <span className="tag">React Concepts</span>
            </div>
          </div>
        </div>

        <div className="bottom-actions">
          <button className="btn-outline">
            <i className="fa-solid fa-rotate"></i> Analyze Another Resume
          </button>
        </div>
      </section>
    </>
  );
}
