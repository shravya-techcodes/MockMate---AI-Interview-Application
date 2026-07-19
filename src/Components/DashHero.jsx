import "../Styles/DashHero.css";
import React from "react";

export default function DashHero() {
  return (
    <section className="dash-herosection">
      <div className="dashhero-left">
        <h1>👋 Good Evening,</h1>
        <h1 className="highlight">Shravya</h1>
      </div>

      <button className="resume-btn">
        Resume Analyser →
      </button>
    </section>
  );
}
