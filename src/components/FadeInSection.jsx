import React, { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children, alwaysVisible = false }){
  const [isVisible, setIsVisible] = useState(alwaysVisible);
  const sectionRef = useRef(null);

  useEffect(() => {
    // If the component is already visible, we don't need to set up an observer.
    if (isVisible) {
      return;
    }

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
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      {children}
    </div>
  );
};