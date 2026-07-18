import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import About from "../Components/About";
import Features from "../Components/Features";
import Working from "../Components/Working";
import Footer from "../Components/Footer";
import "../Styles/Navbar.css";

import React from 'react'

export default function LandingPage() {
  return (
    <>
    <Navbar />
    <div className="main-content">
    <Hero />
    <About />
    <Features />
    <Working />
    <Footer />
    </div>
    </>
  )
}
