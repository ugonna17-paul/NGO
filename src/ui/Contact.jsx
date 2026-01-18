import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail } from "lucide-react";
import './Contact.css'

export default function Contact() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="contact-section" id="contact">
            <div className="contact-container">
                <div className="contact-card" data-aos="fade-up">
                    <Mail className="contact-icon" />
                    <h2>Let's Connect</h2>
                    <p>
                        Reach out to learn more about our programs, collaborate with us, or request support for your community. We're here to help.
                    </p>

                    <a href="mailto:info@naphtaliinitiative.org">
                        <button className="contact-button">Contact Us</button>
                    </a>
                </div>
            </div>
        </section>

    );
}
