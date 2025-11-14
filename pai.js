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
