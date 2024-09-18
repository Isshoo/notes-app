import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function gsapJs() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({
    scrollTrigger: {
      trigger: "section",
      start: "top bottom",
      end: "bottom bottom",
      toggleActions: "play none none reverse",
    },
  });
  gsap.from("section", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.inOut",
  });
  gsap.from("section h2", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });

  gsap.from("section form", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });

  gsap.from("notes-list", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.2,
  });
}
