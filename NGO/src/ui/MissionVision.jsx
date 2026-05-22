import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MissionVision.css";
import Cup from '../assets/Hands and mugs on white table.png'

export default function MissionVision() {
    useEffect(() => {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    return (
        <section className="mission-vision">
            <div className="mv-container">
                {/* Image */}
                <div
                    className="mv-image"
                    data-aos="fade-right"
                >
                    <img
                        src={Cup}
                        alt="Supporting children with autism through care and inclusion"
                    />
                </div>

                {/* Content */}
                <div
                    className="mv-content"
                    data-aos="fade-left"
                >
                    <h2 className="mv-title">Our Mission & Vision</h2>

                    <div className="mv-block">
                        <h3>Our Mission</h3>
                        <p>
                            Naphtali Initiative for Autism is dedicated to promoting autism
                            awareness, encouraging early diagnosis and intervention, and
                            strengthening support systems for individuals with Autism Spectrum
                            Disorder and their families. Through education, advocacy, and
                            community-based programs, we work to reduce stigma, empower
                            caregivers, and create inclusive environments where every
                            individual can thrive.
                        </p>
                    </div>

                    <div className="mv-block">
                        <h3>Our Vision</h3>
                        <p>
                            We envision a society where individuals with autism are understood,
                            accepted, and supported to reach their full potential. A world
                            where early intervention is accessible, communities are inclusive,
                            and people with autism are valued, respected, and given equal
                            opportunities to live fulfilling lives.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
