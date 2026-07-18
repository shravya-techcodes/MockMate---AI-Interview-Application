import "../Styles/About.css";
import aboutImage from "../assets/aboutImage.jpeg";
import React from "react";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-left">
        <img src={aboutImage} alt="About Mock Mate" className="about-img" />
      </div>

      <div className="about-right">
        <div className="about-card">
          <span className="about-title">
            Mock<span className="highlight">Mate</span>
          </span> <hr />

          <p className="about-text">
            MockMate is an AI-powered interview preparation platform designed to
            help students and job seekers build confidence and improve their
            interview performance. It provides realistic mock interviews in a
            user-friendly environment, allowing users to practice anytime and
            anywhere.
          </p>

          <p className="about-text">
            The platform simulates real interview experiences with AI-generated
            questions, webcam-based interview sessions, instant performance
            analysis, and personalized feedback. Users can strengthen their
            communication skills, identify areas for improvement, and track
            their progress over time.
          </p>
        </div>
      </div>
    </section>
  );
}
