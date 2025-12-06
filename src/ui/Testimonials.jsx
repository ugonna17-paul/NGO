import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote } from "lucide-react";
import './Testimonials.css'

const testimonials = [
  {
    name: "Mrs. Adebayo",
    role: "Parent",
    quote:
      "The support and guidance we received changed our family's life. We now understand autism better and know how to help our son thrive.",
  },
  {
    name: "Mr. Okafor",
    role: "Teacher",
    quote:
      "The training program equipped me with practical strategies to create an inclusive classroom. My students with autism are now more engaged than ever.",
  },
  {
    name: "Dr. Amina",
    role: "Healthcare Professional",
    quote:
      "Partnering with this organization has amplified our reach. Together, we're making early intervention accessible to more families.",
  },
];

export default function Testimonials() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">

        {/* Header */}
        <div className="testimonials-header" data-aos="fade-up">
          <h2>Success Stories</h2>
          <p>
            Hear from families, educators, and partners whose lives have been touched by our work.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card"
              data-aos="fade-in"
              data-aos-delay={index * 100}
            >
              <Quote className="testimonial-quote-icon" />
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
