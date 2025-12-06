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
                    backgroundImage: `url('https://images.unsplash.com/photo-1665389666769-9a3300eb4805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRpc20lMjBjaGlsZHJlbiUyMGxlYXJuaW5nJTIwdGhlcmFweXxlbnwxfHx8fDE3NjM5OTYzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
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
