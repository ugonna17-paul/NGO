import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Heart, Users, Lightbulb, Handshake } from "lucide-react";
import './AimsObjectives.css'

const objectives = [
    {
        icon: Heart,
        title: "Raise Awareness",
        description:
            "Educate the public about autism spectrum disorder, reduce stigma, and promote understanding and acceptance.",
    },
    {
        icon: Lightbulb,
        title: "Promote Early Intervention",
        description:
            "Increase early screening, diagnosis, and access to therapy services for better developmental outcomes.",
    },
    {
        icon: Users,
        title: "Build Community Support",
        description:
            "Create safe spaces and support networks for families, caregivers, and individuals with autism.",
    },
    {
        icon: Handshake,
        title: "Foster Collaboration",
        description:
            "Partner with government agencies, NGOs, and international organizations to expand our reach and impact.",
    },
];

export default function AimsObjectives() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="aims-section">
            <div className="aims-container">

                {/* Header */}
                <div className="aims-header" data-aos="fade-up">
                    <h2>Our Aims & Objectives</h2>
                    <p>
                        We are driven by a clear mission to transform lives and communities
                        through comprehensive autism support and advocacy.
                    </p>
                </div>

                {/* Objective Cards */}
                <div className="aims-grid">
                    {objectives.map((objective, index) => {
                        const Icon = objective.icon;

                        return (
                            <div
                                key={index}
                                className="aim-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="aim-icon-wrapper">
                                    <Icon className="aim-icon" />
                                </div>

                                <h4>{objective.title}</h4>
                                <p>{objective.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
