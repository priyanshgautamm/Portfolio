document.addEventListener("DOMContentLoaded", () => {
  const interactive = document.querySelector(".interactive");
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    interactive.style.left = `${x}px`;
    interactive.style.top = `${y}px`;
  });
});

function splitWords() {
  const paragraphs = document.querySelectorAll(".reveal-paragraph");
  paragraphs.forEach((paragraph) => {
    const text = paragraph.textContent.trim();
    const words = text.split(/\s+/);
    paragraph.innerHTML = ""; // clear original text
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.classList.add("word");
      span.textContent = word;
      span.style.transitionDelay = `${i * 0.05}s`;
      paragraph.appendChild(span);
      paragraph.appendChild(document.createTextNode(" ")); // add real space
    });
  });
}

function handleScroll() {
  const paragraphs = document.querySelectorAll(".reveal-paragraph");
  paragraphs.forEach((paragraph) => {
    const rect = paragraph.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    const words = paragraph.querySelectorAll(".word");
    words.forEach((word) => {
      if (inView) {
        word.classList.add("visible");
      } else {
        word.classList.remove("visible");
      }
    });
  });
}

window.addEventListener("load", () => {
  splitWords();
  handleScroll();
});

window.addEventListener("scroll", handleScroll);






const text = document.getElementById("repel-text");
  const chars = text.textContent.split("");
  text.textContent = "";
  
  // Wrap each character in a span
  chars.forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    text.appendChild(span);
  });

  const spans = text.querySelectorAll("span");

  document.addEventListener("mousemove", (e) => {
    spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      const repelRadius = 100;
      if (distance < repelRadius) {
        const angle = Math.atan2(dy, dx);
        const repelStrength = (repelRadius - distance) / 4;
        const x = -Math.cos(angle) * repelStrength;
        const y = -Math.sin(angle) * repelStrength;
        span.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        span.style.transform = "translate(0, 0)";
      }
    });
  });
