import DashboardNav from "../Components/DashboardNav";
import ResumeAnalyzer from "../Components/ResumeAnalyzer";
import React from 'react'

export default function ResumePage() {
  return (
    <>
    <DashboardNav />
    <div className="main-content">
    <ResumeAnalyzer />
    </div>
    </>
  )
}
