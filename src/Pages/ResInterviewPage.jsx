import DashboardNav from "../Components/DashboardNav";
import ResumeInterview from "../Components/ResumeInterview";
import React from 'react'


export default function ResInterviewPage() {
  return (
    <>
    <DashboardNav />
    <div className="main-content">
    <ResumeInterview />
    </div>
    </>
  )
}
