import React, { useEffect, useRef, useState } from "react";
import "./fadeInSection.css";

export default function FadeInSection({ children }){
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.2 } // Adjust threshold to control when to trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${isVisible ? "visible" : ""}`}
    >
      {children}
    </div>
  );
};
