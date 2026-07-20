import DashboardNav from "../Components/DashboardNav";
import DashHero from "../Components/DashHero";
import Practice from "../Components/Practice";
import React from 'react'

export default function DashboardPage() {
  return (
    <>
    <DashboardNav />
    <div className="main-content">
    <DashHero />
    <Practice />
    </div>
    </>
  )
}
