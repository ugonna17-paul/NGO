import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Gallery.css";
import Img from '../assets/IMG-20260112-WA0163.jpg'
import Img2 from '../assets/IMG_20260113_105821_504.jpg'
import Img3 from '../assets/IMG-20260112-WA0161.jpg'
import Img4 from '../assets/IMG_20260113_102640_718.jpg'
import Img5 from '../assets/IMG_20260113_102742_502.jpg'
import Img6 from '../assets/IMG-20260115-WA0075.jpg'

const galleryImages = [
  {
    url: Img,
    // title: "Autism Awareness Campaign",
    // description: "Community education and awareness initiatives",
  },
  {
    url: Img2,
    // title: "Therapeutic Learning Session",
    // description: "One-on-one developmental support for children",
  },
  {
    url: Img3,
    // title: "Teacher Training Workshop",
    // description: "Equipping educators with autism support strategies",
  },
  {
    url: Img4,
    // title: "Family Support Group",
    // description: "Connecting families for mutual support and encouragement",
  },
  {
    url: Img5,
    // title: "Community Outreach Event",
    // description: "Reaching communities with vital autism resources",
  },
  {
    url: Img6,
    // title: "Inclusive Learning Environment",
    // description: "Creating accessible education spaces for all children",
  },
];

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Group images into pairs (2 per slide)
  const slidePairs = [];
  for (let i = 0; i < galleryImages.length; i += 2) {
    slidePairs.push(galleryImages.slice(i, i + 2));
  }

  useEffect(() => {
    AOS.init({ duration: 900, once: true });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidePairs.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slidePairs.length]);

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header" data-aos="fade-up">
          <h2>Our Gallery</h2>
          <p>
            Witness the impact of our programs through moments of learning,
            growth, and community support.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="gallery-carousel"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            className="gallery-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidePairs.map((pair, index) => (
              <div className="gallery-slide" key={index}>
                <div className="gallery-grid">
                  {pair.map((image, i) => (
                    <div className="gallery-card" key={i}>
                      <div className="gallery-image">
                        <img
                          src={image.url}
                          alt={image.title}
                          loading="lazy"
                        />
                      </div>

                      <div className="gallery-overlay">
                        <h4>{image.title}</h4>
                        <p>{image.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="gallery-nav">
          {slidePairs.map((_, index) => (
            <button
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            >
              {index * 2 + 1},{index * 2 + 2}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
