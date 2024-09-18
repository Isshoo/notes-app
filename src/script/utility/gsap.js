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
  gsap.from("header", {
    opacity: 0,
    y: -20,
    duration: 2,
    ease: "power2.inOut",
  });
  gsap.from("#formNewNotes", {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: "power2.inOut",
  });
  gsap.from("#formNewNotes h2", {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#formNewNotes * label", {
    opacity: 0,
    x: -20,
    duration: 3,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#formNewNotes * input", {
    opacity: 0,
    x: 20,
    duration: 3,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#formNewNotes * textarea", {
    opacity: 0,
    x: 20,
    duration: 3,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#formNewNotes button", {
    opacity: 0,
    y: 20,
    duration: 4,
    ease: "power2.inOut",
    stagger: 0.2,
  });

  gsap.from("#notesContainer", {
    opacity: 0,
    y: 20,
    duration: 4,
    ease: "power2.inOut",
    stagger: 0.2,
  });

  gsap.from(".judul-notes-container", {
    opacity: 0,
    y: 20,
    duration: 4,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#allNotesBtn", {
    x: -20,
    duration: 5.5,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#archivedListBtn", {
    x: -20,
    duration: 5,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#searchInput", {
    opacity: 0,
    x: 20,
    duration: 5,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("#searchSubmit", {
    opacity: 0,
    x: 20,
    duration: 5.5,
    ease: "power2.inOut",
    stagger: 0.2,
  });
  gsap.from("footer", {
    opacity: 0,
    y: 20,
    duration: 2,
    ease: "power2.inOut",
    stagger: 0.2,
  });
}
