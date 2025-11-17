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

// Resize iframe when it loads
document.addEventListener("DOMContentLoaded", () => {
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


//Timeline Interactiveness
window.addEventListener('resize', () => {
  drawLine(document.getElementById('oval1'), document.getElementById('oval4'));
  if (activeOval) activateOval(activeOval);
});

const ovals = document.querySelectorAll('.oval');
const infoBox = document.getElementById('info-box');
const highlightCircle = document.getElementById('highlight-circle');

let activeOval = null;

function activateOval(oval) {
  activeOval = oval;
  const rect = oval.getBoundingClientRect();
  const sectionRect = document.getElementById('history').getBoundingClientRect();
  const isMobile = window.innerWidth <= 600;

  let centerX, centerY, highlightSize;

  if (isMobile) {
      centerX = rect.left + rect.width / 2;
      centerY = sectionRect.top + sectionRect.height * 0.55; 
      highlightSize = rect.width * 2;
  } else {
      centerX = rect.left + rect.width / 2 - sectionRect.left;
      centerY = rect.top + rect.height / 2 - sectionRect.top;
      highlightSize = rect.height * 3.6;
  }

  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

  highlightCircle.style.top = centerY - (3.75 * rem)+ 'px';
  highlightCircle.style.left = centerX + 'px';
  highlightCircle.style.width = highlightSize + 'px';
  highlightCircle.style.height = highlightSize + 'px';
  highlightCircle.style.opacity = 1;

  infoBox.style.display = 'block';
  infoBox.textContent = oval.dataset.info;

  highlightCircle.classList.remove("spin");
  void highlightCircle.offsetWidth;
  highlightCircle.classList.add("spin");
}


function deactivateHighlight() {
    highlightCircle.style.opacity = 0;
}

ovals.forEach(oval => {
    oval.addEventListener('mouseenter', () => {
        if (activeOval !== oval) activateOval(oval);
    });

    /* Mobile tap support */
    oval.addEventListener('touchstart', () => {
        if (activeOval !== oval) activateOval(oval);
    });
});

if (ovals.length > 0) {
    activateOval(ovals[0]);
}

function drawLine(startEl, endEl) {
  const line = document.getElementById('connecting-line');
  const sectionRect = document.getElementById('history').getBoundingClientRect();
  const isMobile = window.innerWidth <= 600;

 
      const start = startEl.getBoundingClientRect();
      const end = endEl.getBoundingClientRect();

      const x1 = start.left + start.width / 2 - sectionRect.left;
      const y1 = start.top + start.height / 2 - sectionRect.top;
      const x2 = end.left + end.width / 2 - sectionRect.left;
      const y2 = end.top + end.height / 2 - sectionRect.top;

      const length = Math.hypot(x2 - x1, y2 - y1);
      const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

      line.style.left = x1 + 'px';
      line.style.top = y1 + 'px';
      line.style.width = length + 'px';
      line.style.height = '2px';
      line.style.transform = `rotate(${angle}deg)`;
  
}

drawLine(
  document.getElementById('oval1'),
  document.getElementById('oval4')
);