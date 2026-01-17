import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Quote } from "lucide-react";
import './Testimonials.css'

const testimonials = [
  {
    name: "Mrs. Ololade Adamolekun",
    role: "Founder, Jesus Kids – Ibadan",
    quote:
      "I am more than grateful for this great support, including the financial assistance provided toward the care and wellbeing of children with special needs in our orphanage. I truly appreciate everything you have done for us. May God bless you abundantly and grant all your heart’s desires. Thank you so much for your kindness, generosity, and continued support.",
  },
  {
    name: "Mr. Oloche",
    role: "Candlelight Foundation – Lagos",
    quote:
      "Thank you so much for your incredibly generous support and kindness towards our work. We are deeply grateful for your trust, belief, and love. Your support will go a long way in strengthening and advancing the impact we are making. We are honoured to be connected with you and look forward to a continued, transparent, and impactful collaboration.",
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
