import "../Styles/Features.css";
import React from 'react'

export default function Features() {
  return (
    <section className="features">
        <h1 className="section-label">FEATURES</h1>

        <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon icon-purple">🤖</div>
                <h3>AI Mock Interviews</h3>
                <p>Realistic AI-generated interview questions.</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon icon-green">💬</div>
                <h3>Instant Feedback</h3>
                <p>Get detailed feedback after every answer.</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon icon-orange">📊</div>
                <h3>Performance Tracking</h3>
                <p>Track your progress and improve continuously.</p>
            </div>

            <div className="feature-card">
                <div className="feature-icon icon-blue">📄</div>
                <h3>Resume Analysis</h3>
                <p>Upload your resume and get AI suggestions to improve.</p>
            </div>
        </div>
    </section>
  )
}
