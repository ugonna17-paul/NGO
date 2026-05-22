import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './AboutUs.css'

export default function AboutUs() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="about-section" id="about">
            <div className="about-container">
                <div className="about-grid">

                    {/* Text Content */}
                    <div className="about-text" data-aos="fade-right">
                        <h2>About Us</h2>
                        <p>
                            We are committed to improving awareness, early diagnosis, support
                            systems, and community inclusion for individuals with Autism Spectrum
                            Disorder (ASD) and their families.
                        </p>

                        <p>
                            Our organization believes that with the right support, education, and
                            understanding, every individual with autism can thrive and contribute
                            meaningfully to society.
                        </p>

                        <p>
                            Through compassionate intervention, community engagement, and
                            evidence-based practices, we strive to create a more inclusive world
                            where differences are celebrated and every person has the opportunity
                            to reach their full potential.
                        </p>
                    </div>

                    {/* Image */}
                    <div className="about-image-wrapper" data-aos="fade-left">
                        <div className="about-image-container">
                            <img
                                src="https://images.unsplash.com/photo-1617080090911-91409e3496ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBzdXBwb3J0JTIwY29tbXVuaXR5fGVufDF8fHx8MTc2MzkyMjc3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Community support"
                                className="about-image"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
