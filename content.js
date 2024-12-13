// Hardcoded whitelist of allowed domains
const whitelist = ["example.com", "another-example.com"];

// Function to check if the current domain is in the whitelist
function isWhitelisted() {
  const currentDomain = window.location.hostname;
  return whitelist.some((domain) => currentDomain.endsWith(domain));
}

// Block file input elements
function blockFileInputs() {
  if (!isWhitelisted()) {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.setAttribute("disabled", "true");
      input.style.display = "none"; // Optionally hide the input
      console.log("File uploads are blocked on this site.");
    });
  }
}

// Block drag-and-drop functionality
function blockDragAndDrop(event) {
  if (!isWhitelisted()) {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "none"; // Disable the visual feedback
    console.log("File uploads are blocked on this site.");
  }
}

// Add event listeners for drag-and-drop at the document level
document.addEventListener("dragover", blockDragAndDrop, false);
document.addEventListener("drop", blockDragAndDrop, false);
document.addEventListener("dragenter", blockDragAndDrop, false);
document.addEventListener("dragleave", blockDragAndDrop, false);

// Function to observe and block new file inputs and drag-and-drop areas
function observeDOMChanges() {
  const observer = new MutationObserver(() => {
    blockFileInputs(); // Reapply blocking to new file inputs
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Run the blocking function on page load
blockFileInputs();
observeDOMChanges();
