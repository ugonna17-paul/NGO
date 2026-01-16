import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./ImpactMetrics.css";
import Img from '../assets/IMG-20260112-WA0163.jpg'
const metrics = [
    { value: 3, label: "Communities Supported", suffix: "+" },
];

function CountingNumber({ end, suffix, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const increment = end / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <div ref={ref} className="impact-count">
            {count.toLocaleString()}
            {suffix}
        </div>
    );
}

export default function ImpactMetrics() {
    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-out", once: true });
    }, []);

    return (
        <section className="impact-section" id="impact">
            <div className="impact-wrapper">

                {/* Image */}
                <div className="impact-image" data-aos="fade-right">
                    <img
                        src={Img}
                        alt="Community autism support"
                    />
                    <div className="impact-image-overlay">
                        <span>Making Real Impact</span>
                    </div>
                </div>

                {/* Content */}
                <div className="impact-content" data-aos="fade-left">
                    <div className="impact-header">
                        <h2>Our Impact</h2>
                        <p>
                            Real numbers that reflect our commitment to making a meaningful
                            difference in the lives of those affected by autism.
                        </p>
                    </div>

                    <div className="impact-grid">
                        {metrics.map((metric, index) => (
                            <div key={index} className="impact-card">
                                <CountingNumber
                                    end={metric.value}
                                    suffix={metric.suffix}
                                />
                                <p className="impact-label">{metric.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
