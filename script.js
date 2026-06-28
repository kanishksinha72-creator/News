// Safely opens external tracking paths directly into native Chrome windows
function chromeRedirect(url) {
    if (url) {
        window.open(url, '_blank');
    }
}

// Data Array rotating inside the unbranded popup panel
const sequentialFlashes = [
    { text: "GBA routes extra Metro train runs for June 27 mass city environmental drive.", url: "https://www.google.com/search?q=Bengaluru+1.5+million+saplings+plantation+drive+June+27" },
    { text: "US and Iran sign historic peace framework memorandum in Switzerland brokered by Qatari mediators.", url: "https://www.google.com/search?q=US+Iran+Switzerland+talks+roadmap" }
];

let activeFlashIdx = 0;

function updateFloatingHeadline() {
    const popupFrame = document.getElementById('breakingPopup');
    const headlineContainer = document.getElementById('popupHeadline');
    
    if (activeFlashIdx < sequentialFlashes.length) {
        headlineContainer.innerText = sequentialFlashes[activeFlashIdx].text;
        popupFrame.setAttribute('data-url', sequentialFlashes[activeFlashIdx].url);
        activeFlashIdx++;
    }
}

// Page execution controller
window.addEventListener('DOMContentLoaded', () => {
    updateFloatingHeadline();

    // Toggle news text objects every 4 seconds
    const flashRotationTimer = setInterval(() => {
        if (activeFlashIdx < sequentialFlashes.length) {
            updateFloatingHeadline();
        }
    }, 4000);

    // Completely drop popup down out of view and release intervals after 9.5 seconds
    setTimeout(() => {
        clearInterval(flashRotationTimer);
        document.getElementById('breakingPopup').classList.add('popup-fade-out');
    }, 9500);

    // Listen to explicit direct popup object navigation clicks
    document.getElementById('breakingPopup').addEventListener('click', function() {
        chromeRedirect(this.getAttribute('data-url'));
    });
});