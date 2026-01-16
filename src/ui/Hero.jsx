import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "lucide-react";
import './Hero.css'

export default function Hero() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="hero">
            {/* Background */}
            <div
                className="hero-bg"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1609554674944-486e4f397ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwY2hpbGQlMjBsZWFybmluZyUyMGZhbWlseSUyMHN1cHBvcnR8ZW58MXx8fHwxNzY4NDgyODgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                }}
            >
                <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            <div className="hero-content">
                <div className="hero-text" data-aos="fade-right">
                    <h1>
                        Supporting Autism Awareness, Early Intervention & Community
                        Empowerment
                    </h1>

                    <p>
                        Naphtali Intervention & Enlightenment Initiative for Autism is dedicated to improving
                        awareness, early diagnosis, support systems, and community inclusion for individuals
                        with Autism Spectrum Disorder and their families.
                    </p>

                    <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
                        <button className="btn-primary">
                            Get Involved
                            <ArrowRight size={20} />
                        </button>

                        <button className="btn-outline">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
