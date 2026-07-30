// resources/js/Pages/Home.jsx
import React from 'react';
import Layout from '../Components/Layout';
import Hero from '../Components/sections/Hero';
import About from '../Components/sections/About';
import Skills from '../Components/sections/Skills';
import Projects from '../Components/sections/Projects';
import Contact from '../Components/sections/Contact';

export default function Home({ 
  profile, 
  about, 
  skillCategories, 
  projects, 
  contactInfo, 
  socialLinks, 
  whatsapp 
}) {
  return (
    <Layout title={`${profile.name} - ${profile.title}`} profile={profile} whatsapp={whatsapp}>
      <Hero profile={profile} />
      <About about={about} />
      
      {/* Dynamic Data Sections */}
      <Skills categories={skillCategories} />
      <Projects projects={projects} />
      <Contact contactInfo={contactInfo} socialLinks={socialLinks} />
    </Layout>
  );
}