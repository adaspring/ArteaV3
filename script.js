// Menu functionality (existing code remains the same)
function toggleMenu() {
    const menu = document.getElementById('flyout-menu');
    menu.classList.toggle('open');
    menu.classList.remove('hidden');
    
    if (menu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Close menu when clicking outside (existing code remains the same)
document.addEventListener('click', function(event) {
    const menu = document.getElementById('flyout-menu');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (menu.classList.contains('open') && 
        !menu.contains(event.target) && 
        !hamburger.contains(event.target)) {
        toggleMenu();
    }
});

// Lightbox functionality
function initLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-nav">
                <button class="lightbox-prev" aria-label="Previous image">←</button>
                <button class="lightbox-next" aria-label="Next image">→</button>
            </div>
            <p class="lightbox-caption"></p>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Event listeners for lightbox
    document.querySelectorAll('.carousel-images img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    document.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    document.querySelector('.lightbox-next').addEventListener('click', showNextImage);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox')) {
            closeLightbox();
        }
    });
}

let currentLightboxIndex = 0;
let currentLightboxImages = [];

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const carousel = imgElement.closest('.carousel-images');
    currentLightboxImages = Array.from(carousel.querySelectorAll('img'));
    currentLightboxIndex = currentLightboxImages.indexOf(imgElement);
    
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const currentImg = currentLightboxImages[currentLightboxIndex];
    
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    lightboxCaption.textContent = currentImg.alt;
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxImages.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxImages.length) % currentLightboxImages.length;
    updateLightboxImage();
}

// Touch support for carousels
function addTouchSupport() {
    document.querySelectorAll('.carousel-images').forEach(carousel => {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(carousel);
        }, {passive: true});
    });
}

function handleSwipe(carousel) {
    const id = carousel.id.split('-')[1];
    const threshold = 50;
    
    if (touchStartX - touchEndX > threshold) {
        // Swipe left - next
        updateCarousel(id, 'next');
    } else if (touchEndX - touchStartX > threshold) {
        // Swipe right - prev
        updateCarousel(id, 'prev');
    }
}

// Enhanced carousel functionality (existing code remains the same)
function initCarousels() {
    // ... (existing initCarousels code)
}

function updateCarousel(id, direction) {
    // ... (existing updateCarousel code)
}

function goToSlide(id, index) {
    // ... (existing goToSlide code)
}

// Back to top button functionality (existing code remains the same)
function initBackToTop() {
    // ... (existing initBackToTop code)
}

// Add category descriptions (existing code remains the same)
function addDescriptions() {
    // ... (existing addDescriptions code)
}

// Loading states
function initLoadingStates() {
    document.querySelectorAll('.carousel-images img').forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    initBackToTop();
    addDescriptions();
    initLightbox();
    addTouchSupport();
    initLoadingStates();
});