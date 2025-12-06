import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Brain, Clock, HeartHandshake } from "lucide-react";
import './WhyItMatters.css'

const topics = [
    {
        icon: Brain,
        title: "Understanding Autism",
        description:
            "Autism Spectrum Disorder (ASD) is a developmental condition that affects how people communicate, interact, and experience the world. Every individual with autism is unique, with their own strengths and challenges.",
    },
    {
        icon: Clock,
        title: "Why Early Intervention Matters",
        description:
            "Early diagnosis and intervention can significantly improve outcomes. The earlier children receive support, the better their chances of developing communication skills, social abilities, and independence.",
    },
    {
        icon: HeartHandshake,
        title: "Building Acceptance & Reducing Stigma",
        description:
            "Creating an inclusive society starts with understanding and acceptance. By educating communities and challenging misconceptions, we can build a world where everyone is valued and supported.",
    },
];

export default function WhyItMatters() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="why-section">
            <div className="why-container">

                {/* Header */}
                <div className="why-header" data-aos="fade-up">
                    <h2>Why Our Work Matters</h2>
                    <p>
                        Understanding autism and the importance of early intervention is key to creating a more inclusive society.
                    </p>
                </div>

                {/* Topics Grid */}
                <div className="why-grid">
                    {topics.map((topic, index) => {
                        const Icon = topic.icon;
                        return (
                            <div
                                key={index}
                                className="why-card"
                                data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                                data-aos-delay={index * 100}
                            >
                                <div className="why-icon-wrapper">
                                    <Icon className="why-icon" />
                                </div>

                                <h3>{topic.title}</h3>
                                <p>{topic.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
