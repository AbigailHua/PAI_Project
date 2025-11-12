// Function to resize iframe to fit content
function resizeIframe(iframe) {
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    if (iframeDoc) {
      // Get the actual content height
      const height = Math.max(
        iframeDoc.body.scrollHeight,
        iframeDoc.documentElement.scrollHeight
      );
      iframe.style.height = height + "px";
    }
  } catch (e) {
    console.warn("Could not access iframe content:", e);
  }
}

// Observe all sections
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollToPlugin);

  const sections = document.querySelectorAll("section");
  let currentSection = 0;
  let isScrolling = false;

  function getCurrentSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].offsetTop;
      const sectionBottom = sectionTop + sections[i].offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        return i;
      }
    }
    return 0;
  }

  currentSection = getCurrentSection();

  function goToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    currentSection = index;

    gsap.to(window, {
      duration: 0.3,
      scrollTo: { y: sections[index], offsetY: 0 },
      ease: "power1.out",
      immediateRender: true,
      overwrite: true,
      onComplete: () => {
        isScrolling = false;
      },
    });
  }

  window.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      if (direction > 0 && currentSection < sections.length - 1) {
        e.preventDefault();
        goToSection(currentSection + 1);
      } else if (direction < 0 && currentSection > 0) {
        e.preventDefault();
        goToSection(currentSection - 1);
      }
    },
    { passive: false }
  );

  // Resize iframe when it loads
  const iframe = document.getElementById("confusion-matrices-iframe");
  if (iframe) {
    iframe.addEventListener("load", () => {
      resizeIframe(iframe);
      // Also resize after a short delay to account for dynamic content
      setTimeout(() => resizeIframe(iframe), 100);
      setTimeout(() => resizeIframe(iframe), 500);
    });
  }
});
