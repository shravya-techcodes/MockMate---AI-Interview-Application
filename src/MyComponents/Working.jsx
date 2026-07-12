import "../Styles/Working.css";
import React from 'react'

export default function Working() {
  return (
    <section className="how-it-works">
        <h1 className="section-label">HOW IT WORKS</h1>

    <div className="steps">
        <div className="step">
            <div className="step-icon icon-purple">
                👤
            </div>
            <h4>Sign Up</h4>
            <p>Create your account in seconds.</p>
        </div>

        <div className="arrow">➜</div>

        <div className="step">
            <div className="step-icon icon-green">
                💼
            </div>
            <h4>Choose Role</h4>
            <p>Select the job role you're preparing for.</p>
        </div>

        <div className="arrow">➜</div>

        <div className="step">
            <div className="step-icon icon-purple">
                💬
            </div>
            <h4>Start Interview</h4>
            <p>Answer AI-generated interview questions.</p>
        </div>

        <div className="arrow">➜</div>

        <div className="step">
            <div className="step-icon icon-orange">
                ⭐
            </div>
            <h4>Get Feedback</h4>
            <p>Receive instant feedback and suggestions.</p>
        </div>

        <div className="arrow">➜</div>

        <div className="step">
            <div className="step-icon icon-blue">
                📈
            </div>
            <h4>Improve & Repeat</h4>
            <p>Track progress and keep improving.</p>
        </div>
    </div>
    </section>
  )
}
