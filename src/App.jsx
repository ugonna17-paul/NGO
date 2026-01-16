import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './ui/Navbar'
import Hero from './ui/Hero'
import AboutUs from './ui/AboutUs'
import AimsObjectives from './ui/AimsObjectives'
import Programs from './ui/Programs'
import ImpactMetrics from './ui/ImpactMetrics'
import Testimonials from './ui/Testimonials'
import WhyItMatters from './ui/WhyItMatters'
import GetInvolved from './ui/GetInvolved'
import Team from './ui/Team'
import Contact from './ui/Contact'
import Footer from './ui/Footer'
import MissionVision from './ui/MissionVision'
import Gallery from './ui/Gallery'

function App() {


  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <MissionVision />
      <AimsObjectives />
      <Programs />
      <ImpactMetrics />
      <Testimonials />
      <WhyItMatters />
      <GetInvolved />
      <Gallery />
      <Team />
      <Contact />
      <Footer />
    </>
  )
}

export default App
