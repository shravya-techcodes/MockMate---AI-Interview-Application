import "../Styles/Practice.css";
import React from "react";

export default function Practice() {
  return (
    <>
      <section className="practice-section">
        <h2>How would you like to practice today?</h2>
        <div className="underline"></div>

        <div className="practice-grid">
          <button className="practice-card card-purple">
            <div className="icon-circle circle-purple">
              <i className="fa-solid fa-brain"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">Aptitude</span>
          </button>

          <button className="practice-card card-blue">
            <div className="icon-circle circle-blue">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">Technical</span>
          </button>

          <button className="practice-card card-orange">
            <div className="icon-circle circle-orange">
              <i className="fa-solid fa-people-arrows"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">HR Round</span>
          </button>

          <button className="practice-card card-green">
            <div className="icon-circle circle-green">
              <i className="fa-solid fa-code"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">Coding</span>
          </button>

          <button className="practice-card card-pink">
            <div className="icon-circle circle-pink">
              <i className="fa-solid fa-video"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">Mock Interview</span>
          </button>

          <button className="practice-card card-yellow">
            <div className="icon-circle circle-yellow">
              <i className="fa-solid fa-file-lines"></i>
            </div>
            <i className="fa-solid fa-chevron-right arrow-icon"></i>
            <span className="card-title">Practice based on Resume</span>
          </button>
        </div>
      </section>

      {/*PROGRESS TRACKING SECTION*/}

      <section className="stats-section">
        <button className="stat-card stat-purple">
          <div className="stat-icon-circle circle-purple-solid">
            <i className="fa-solid fa-arrow-trend-up"></i>
          </div>
          <div className="stat-text">
            <h3>Progress</h3>
            <p>Track your performance and improvement</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <button className="stat-card stat-blue">
          <div className="stat-icon-circle circle-blue-solid">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <div className="stat-text">
            <h3>Track History</h3>
            <p>View your past interviews and results</p>
          </div>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </section>
    </>
  );
}
