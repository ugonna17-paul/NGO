import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserPlus, Handshake, Heart } from "lucide-react";
import './GetInvolved.css'

const cards = [
    {
        icon: UserPlus,
        title: "Volunteer With Us",
        description:
            "Join our team of dedicated volunteers making a real difference in the lives of individuals with autism and their families.",
    },
    {
        icon: Handshake,
        title: "Partner With Us",
        description:
            "Collaborate with us as an organization, institution, or business to expand our reach and create lasting impact.",
    },
    {
        icon: Heart,
        title: "Donate or Support Our Work",
        description:
            "Your financial support helps us provide free services, training programs, and community outreach initiatives.",
    },
];

export default function GetInvolved() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section className="getinvolved-section">
            <div className="getinvolved-container">

                {/* Header */}
                <div className="getinvolved-header" data-aos="fade-up">
                    <h2>Get Involved</h2>
                    <p>
                        There are many ways you can contribute to our mission and help create a more inclusive world for individuals with autism.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="getinvolved-grid">
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="getinvolved-card"
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                            >
                                <div className="getinvolved-icon-wrapper">
                                    <Icon className="getinvolved-icon" />
                                </div>

                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <button className="getinvolved-button">
                                    Learn More <span>→</span>
                                </button>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
