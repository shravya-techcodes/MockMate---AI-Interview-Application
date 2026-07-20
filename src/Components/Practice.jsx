import "../Styles/Practice.css";
import React from "react";

export default function Practice() {
  return (
    <section class="practice-section">
      <h2>How would you like to practice today?</h2>
      <div class="underline"></div>

      <div class="practice-grid">
        <button class="practice-card card-purple">
          <div class="icon-circle circle-purple">
            <i class="fa-solid fa-brain"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">Aptitude</span>
        </button>

        <button class="practice-card card-blue">
          <div class="icon-circle circle-blue">
            <i class="fa-solid fa-laptop-code"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">Technical</span>
        </button>

        <button class="practice-card card-orange">
          <div class="icon-circle circle-orange">
            <i class="fa-solid fa-people-arrows"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">HR Round</span>
        </button>

        <button class="practice-card card-green">
          <div class="icon-circle circle-green">
            <i class="fa-solid fa-code"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">Coding</span>
        </button>

        <button class="practice-card card-pink">
          <div class="icon-circle circle-pink">
            <i class="fa-solid fa-video"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">Mock Interview</span>
        </button>

        <button class="practice-card card-yellow">
          <div class="icon-circle circle-yellow">
            <i class="fa-solid fa-file-lines"></i>
          </div>
          <i class="fa-solid fa-chevron-right arrow-icon"></i>
          <span class="card-title">Practice based on Resume</span>
        </button>
      </div>
    </section>
  );
}
