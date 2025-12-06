import { useState, useEffect } from "react";
import './Navbar.css'
import logoImg from '../assets/naph.jpeg'
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
                        <button className="cta-btn">Get Involved</button>
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
                        <button className="cta-btn mobile-cta">Get Involved</button>
                    </div>
                )}
            </div>
        </nav>
    );
}
