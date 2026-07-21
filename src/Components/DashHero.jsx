import "../Styles/DashHero.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const hour = new Date().getHours();

let greeting = "";

if (hour < 12){
  greeting = "Good Morning";
}else if (hour < 16){
  greeting = "Good Afternoon";
}else{
  greeting = "Good Evening";
}

export default function DashHero() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  return (
    <section className="dash-herosection">
      <div className="dashhero-left">
        <h1>👋 {greeting},</h1>
        <h1 className="highlight">{user.full_name} !</h1>
      </div>

      <button className="resume-btn" onClick={()=>navigate("/resume")}>
        Resume Analyser →
      </button>
    </section>
  );
}
