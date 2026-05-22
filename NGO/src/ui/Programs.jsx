import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Programs.css'

import { 
  Megaphone, 
  Stethoscope, 
  HeartHandshake, 
  Scale, 
  GraduationCap 
} from "lucide-react";

const programs = [
  {
    icon: Megaphone,
    title: "Autism Awareness Workshops",
    description:
      "Interactive sessions for schools, workplaces, and community groups to foster understanding and acceptance.",
  },
  {
    icon: Stethoscope,
    title: "Early Screening & Diagnostic Referrals",
    description:
      "Free or subsidized screening programs and referrals to qualified diagnostic professionals.",
  },
  {
    icon: HeartHandshake,
    title: "Family Support & Counseling",
    description:
      "Emotional support, peer groups, and professional counseling for families navigating autism.",
  },
  {
    icon: Scale,
    title: "Advocacy & Policy Engagement",
    description:
      "Working with policymakers to improve access to services, education, and inclusion policies.",
  },
  {
    icon: GraduationCap,
    title: "Caregiver & Teacher Training",
    description:
      "Comprehensive training programs to equip caregivers and educators with effective support strategies.",
  },
];

export default function Programs() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="programs-section" id="programs">
      <div className="programs-container">

        {/* Header */}
        <div className="programs-header" data-aos="fade-up">
          <h2>Our Programs</h2>
          <p>
            Comprehensive services designed to support individuals with autism,
            their families, and the wider community.
          </p>
        </div>

        {/* Program Cards */}
        <div className="programs-grid">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="program-card"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="program-icon-wrapper">
                  <Icon className="program-icon" />
                </div>

                <h4>{program.title}</h4>
                <p>{program.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
