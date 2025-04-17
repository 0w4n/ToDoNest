const sections = document.querySelectorAll(".section");
const dots = document.querySelectorAll(".dot");

// Intersection Observer to detect visible section
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let index = [...sections].indexOf(entry.target);
        updateActiveSection(index);
      }
    });
  },
  { threshold: 0.6 } // Detect when at least 60% of a section is visible
);

sections.forEach((section) => observer.observe(section));

function updateActiveSection(index) {
  sections.forEach((section, i) => {
    section.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
