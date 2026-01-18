import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css'

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-section">
            <div className="footer-container">

                {/* Grid */}
                <div className="footer-grid">

                    {/* About */}
                    <div className="footer-column">
                        <h4>Naphtali Initiative For Autism</h4>
                        <p>Supporting autism awareness, early intervention, and community empowerment.</p>
                        <div className="footer-socials">
                            {/* <a href="#"><Facebook className="footer-icon" /></a> */}
                            {/* <a href="#"><Twitter className="footer-icon" /></a> */}
                            <a href="#"><Instagram className="footer-icon" /></a>
                            {/* <a href="#"><Linkedin className="footer-icon" /></a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Programs</a></li>
                            <li><a href="#">Get Involved</a></li>
                            <li><a href="#">Resources</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="footer-column">
                        <h4>Our Programs</h4>
                        <ul>
                            <li><a href="#">Awareness Workshops</a></li>
                            <li><a href="#">Early Screening</a></li>
                            <li><a href="#">Family Support</a></li>
                            <li><a href="#">Advocacy</a></li>
                            <li><a href="#">Training Programs</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4>Contact Info</h4>
                        <ul className="footer-contact">
                            <li><MapPin className="footer-contact-icon" /><span>Lagos, Nigeria</span></li>
                            <li><Mail className="footer-contact-icon" /><span>info@naphtaliinitiative.org</span></li>
                            <li><Phone className="footer-contact-icon" /><span>+1(301) 793-4161</span></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>© {currentYear} Naphtali Intervention & Enlightenment Initiative for Autism. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}
