import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SparklingCursor from "./Component/SparklingCursor";
import SiteLayout from "./Component/SiteLayout";
import HomeContent from "./Component/HomeContent";
import AboutMe from "./Component/AboutMe";
import Project from "./Component/Project";
import Experience from "./Component/Experience";
import Skills from "./Component/Skills";
import Contact from "./Component/Contact";
import Insights from "./Component/Insights";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-dvh bg-gray-50">
        <SparklingCursor />
        <Routes>
          <Route path="/insights" element={<Insights />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomeContent />} />
            <Route path="/about" element={<Project />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
