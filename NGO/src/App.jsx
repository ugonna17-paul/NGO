import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
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
import BankModal from './ui/BankModal'
import Resources from './ui/Resources'
import ResourceDetail from './ui/ResourceDetail'

function Home() {
  return (
    <>
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
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenBankModal={() => setIsBankModalOpen(true)} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
      </Routes>
      <Footer />
      <BankModal isOpen={isBankModalOpen} onClose={() => setIsBankModalOpen(false)} />
    </>
  )
}

export default App
