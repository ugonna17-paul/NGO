import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './Team.css'

const trustees = [
  { name: "Alli Bisola Basirat", role: "President" },
  { name: "Raimi Julianah Titiola", role: "Trustee" },
  { name: "Akerele Olamide", role: "Trustee" },
  { name: "Alli Kaosarat Adeola", role: "Trustee" },
  { name: "Olutayo Abiola Esther", role: "Trustee" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Team() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="team-section" id="team">
      <div className="team-container">

        {/* Header */}
        <div className="team-header" data-aos="fade-up">
          <h2>Our Leadership Team</h2>
          <p>
            Meet the dedicated trustees guiding our mission to support individuals with autism and their families.
          </p>
        </div>

        {/* Trustees Grid */}
        <div className="team-grid">
          {trustees.map((trustee, index) => (
            <div
              key={index}
              className="team-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="team-avatar">
                {getInitials(trustee.name)}
              </div>
              <h4>{trustee.name}</h4>
              <p>{trustee.role}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
