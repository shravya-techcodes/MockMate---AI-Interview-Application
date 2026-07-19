import "../Styles/SideBar.css";
import React from 'react'

export default function SideBar() {
  return (
    <aside className="sidebar">
        <ul className="sidebar-menu">
            <li><a href="#"><i className="fa-solid fa-house icon"></i> Home </a></li>
            <li><a href="#"><i className="fa-solid fa-microphone icon"></i> Mock Interviews </a></li>
            <li><a href="#"><i className="fa-solid fa-code icon"></i> Coding Interviews </a></li>
            <li><a href="#"><i className="fa-solid fa-clock-rotate-left icon"></i> Interview History </a></li>
            <li><a href="#"><i className="fa-solid fa-chart-line icon"></i> Performance </a></li>
            <li><a href="#"><i className="fa-solid fa-file-lines icon"></i> Resume Analyzer </a></li>
            <li><a href="#"><i className="fa-solid fa-gear icon"></i> Settings </a></li>
        </ul>
    </aside>
  )
}
