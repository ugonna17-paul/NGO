import { useState, useEffect } from "react";
import './Navbar.css'
import logoImg from '../assets/Logo.png'
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "About", href: "#about" },
        { name: "Programs", href: "#programs" },
        { name: "Impact", href: "#impact" },
        { name: "Team", href: "#team" },
        { name: "Contact", href: "#contact" },
    ];

  return (
  <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
    <div className="nav-container">
      <div className="nav-content">
        {/* Logo */}
        <div className="logo-wrapper">
          <div className="logo-box">
            <img src={logoImg} alt="" />
          </div>
          <span className="logo-title">Naphtali Initiative For Autism</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          {/* Replaced old Get Involved with Donate */}
          <a 
            href="https://your-donation-link-here.com" 
            className="donate-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
             Get Involved
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg width="24" height="24">
              <line x1="5" y1="5" x2="19" y2="19" stroke="#1F4E4F" strokeWidth="2" />
              <line x1="19" y1="5" x2="5" y2="19" stroke="#1F4E4F" strokeWidth="2" />
            </svg>
          ) : (
            <svg width="24" height="24">
              <line x1="3" y1="6" x2="21" y2="6" stroke="#1F4E4F" strokeWidth="2" />
              <line x1="3" y1="12" x2="21" y2="12" stroke="#1F4E4F" strokeWidth="2" />
              <line x1="3" y1="18" x2="21" y2="18" stroke="#1F4E4F" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="nav-links-mobile">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          {/* Replaced old Get Involved with Donate (mobile version) */}
          <a 
            href="" 
            className="donate-btn mobile-donate"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Get Involved
          </a>
        </div>
      )}
    </div>
  </nav>
);
}
