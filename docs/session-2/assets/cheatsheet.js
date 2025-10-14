// Progress tracker
const progressSteps = document.querySelectorAll('.progress-step');
const stepParts = document.querySelectorAll('.step-part');

progressSteps.forEach((step, index) => {
    step.addEventListener('click', () => {
        const targetPart = document.getElementById(`part-${index + 1}`);
        if (targetPart) {
            targetPart.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Mark steps as completed when scrolled past
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const partId = entry.target.id;
            const stepNumber = partId.split('-')[1];
            const correspondingStep = document.querySelector(`.progress-step[data-step="${stepNumber}"]`);
            if (correspondingStep) {
                correspondingStep.classList.add('completed');
            }
        }
    });
}, {
    threshold: 0.5
});

stepParts.forEach(part => {
    stepObserver.observe(part);
});

// Checklist persistence
const checklistItems = document.querySelectorAll('.checklist-item input[type="checkbox"]');
checklistItems.forEach((checkbox, index) => {
    // Load saved state
    const savedState = localStorage.getItem(`checklist-${index}`);
    if (savedState === 'true') {
        checkbox.checked = true;
    }

    // Save state on change
    checkbox.addEventListener('change', () => {
        localStorage.setItem(`checklist-${index}`, checkbox.checked);
    });
});

// Table of Contents functionality
const tocLinks = document.querySelectorAll('.toc-link');
const tocSections = document.querySelectorAll('section[id], .step-part[id]');

// Smooth scroll on TOC link click
tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Check if it's a step part (part-1, part-2, etc.)
            const isStepPart = targetId.startsWith('part-');

            if (isStepPart) {
                // For step parts, align the top of the content with the top of the sidebar sticky position
                // The sidebar sticks at 120px from top, so we scroll to align them
                const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const scrollTo = targetTop - 120; // 120px is the sticky top position

                window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                });
            } else {
                // For other sections, use standard offset
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for active section highlighting
const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const activeLink = document.querySelector(`.toc-link[data-section="${sectionId}"]`);

            if (activeLink) {
                // Remove active class from all links
                tocLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                activeLink.classList.add('active');

                // If this is a substep (part-X), also activate parent link
                if (sectionId.startsWith('part-')) {
                    const parentLink = document.querySelector(`.toc-link[data-section="steps"]`);
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
            }
        }
    });
}, {
    rootMargin: '-100px 0px -66%',
    threshold: 0
});

// Observe all sections
tocSections.forEach(section => {
    tocObserver.observe(section);
});

// Accordion functionality - make it globally accessible
window.toggleAccordion = function(header) {
    const accordionItem = header.closest('.accordion-item');
    const isActive = accordionItem.classList.contains('active');

    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't already open
    if (!isActive) {
        accordionItem.classList.add('active');
    }
};

// Browser mockup expand/collapse functionality
const browserMockup = document.getElementById('browserMockup');
const mockupOverlay = document.getElementById('mockupOverlay');

if (browserMockup && mockupOverlay) {
    browserMockup.addEventListener('click', (e) => {
        // Don't expand if clicking on carousel buttons or indicators
        if (e.target.closest('.carousel-btn') || e.target.closest('.indicator')) {
            return;
        }

        browserMockup.classList.toggle('expanded');
        mockupOverlay.classList.toggle('active');
        document.body.style.overflow = browserMockup.classList.contains('expanded') ? 'hidden' : '';
    });

    mockupOverlay.addEventListener('click', () => {
        browserMockup.classList.remove('expanded');
        mockupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && browserMockup.classList.contains('expanded')) {
            browserMockup.classList.remove('expanded');
            mockupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Screenshot carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Ensure index is within bounds
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('active');
    }
    if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
    }

    // Move the carousel track
    const track = document.getElementById('carouselTrack');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}

// Make functions globally accessible for onclick handlers
window.moveCarousel = function(direction) {
    showSlide(currentSlide + direction);
};

window.goToSlide = function(index) {
    showSlide(index);
};

// Keyboard navigation for carousel (only when not expanded or when expanded)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

// Auto-advance carousel (optional - uncomment to enable)
// setInterval(() => {
//     moveCarousel(1);
// }, 5000); // Change slide every 5 seconds

// Initialize carousel
if (slides.length > 0) {
    showSlide(0);
}

// Screenshot mapping for each step
const stepScreenshots = {
    'part-1': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_123724_make.powerautomate.com.jpeg', caption: 'Create new automated cloud flow' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_12463_make.powerautomate.com.jpeg', caption: 'Configure SharePoint trigger and list' }
    ],
    'part-2': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_124648_make.powerautomate.com.jpeg', caption: 'Initialize variables for the flow' }
    ],
    'part-3': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_124919_make.powerautomate.com.jpeg', caption: 'Add condition to check rebate amount' }
    ],
    'part-4': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_125510_make.powerautomate.com.jpeg', caption: 'Configure approval action' }
    ],
    'part-5': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_12577_make.powerautomate.com.jpeg', caption: 'Check approval response outcome' }
    ],
    'part-6': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_125850_make.powerautomate.com.jpeg', caption: 'Update when approved' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14046_make.powerautomate.com.jpeg', caption: 'Update when rejected' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14434_make.powerautomate.com.jpeg', caption: 'Update when auto-accepted' }
    ],
    'part-7': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_1333_make.powerautomate.com.jpeg', caption: 'Email notification - Approved' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_1412_make.powerautomate.com.jpeg', caption: 'Email notification - Rejected' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14446_make.powerautomate.com.jpeg', caption: 'Email notification - Auto-accepted' }
    ],
    'part-8': [
        { src: 'assets/screenshots/Screenshot_9-10-2025_14518_make.powerautomate.com.jpeg', caption: 'Save and test the flow' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14621_amadeusworkplace.sharepoint.com.jpeg', caption: 'Create test item in SharePoint' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_1484_make.powerautomate.com.jpeg', caption: 'Flow run with errors' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14847_make.powerautomate.com.jpeg', caption: 'Debugging the errors' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14916_make.powerautomate.com.jpeg', caption: 'Fixing configuration issues' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141043_make.powerautomate.com.jpeg', caption: 'Complete flow overview' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14143_make.powerautomate.com.jpeg', caption: 'Successful test run' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141430_make.powerautomate.com.jpeg', caption: 'Approval email received' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141445_make.powerautomate.com.jpeg', caption: 'Approval response details' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141510_make.powerautomate.com.jpeg', caption: 'Flow continues after approval' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141529_make.powerautomate.com.jpeg', caption: 'Update action executes' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_14161_make.powerautomate.com.jpeg', caption: 'Email sent successfully' },
        { src: 'assets/screenshots/Screenshot_9-10-2025_141636_make.powerautomate.com.jpeg', caption: 'Complete successful run' }
    ]
};

// Sidebar screenshot carousel functionality
let currentSidebarSlide = 0;
let currentStepId = null;

function updateSidebarImages(stepId) {
    const sidebar = document.getElementById('screenshotSidebar');
    const track = document.getElementById('sidebarCarouselTrack');
    const indicators = document.getElementById('sidebarIndicators');
    const prevBtn = document.querySelector('.sidebar-carousel-btn.prev');
    const nextBtn = document.querySelector('.sidebar-carousel-btn.next');

    if (!sidebar || !track || !indicators) return;

    currentStepId = stepId;
    const screenshots = stepScreenshots[stepId];

    if (!screenshots || screenshots.length === 0) {
        sidebar.style.display = 'none';
        return;
    }

    sidebar.style.display = 'block';
    currentSidebarSlide = 0;

    // Build carousel slides
    track.innerHTML = screenshots.map((img, index) => `
        <div class="sidebar-slide ${index === 0 ? 'active' : ''}">
            <img src="${img.src}" alt="${img.caption}">
            <div class="sidebar-caption">${img.caption}</div>
        </div>
    `).join('');

    // Build indicators
    if (screenshots.length > 1) {
        indicators.innerHTML = screenshots.map((_, index) => `
            <span class="sidebar-indicator ${index === 0 ? 'active' : ''}" onclick="goToSidebarSlide(${index})"></span>
        `).join('');
        indicators.style.display = 'flex';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        indicators.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    // Add click listeners to images
    setTimeout(() => {
        addImageClickListeners();
    }, 100);
}

function showSidebarSlide(newIndex) {
    if (!currentStepId) return;

    const screenshots = stepScreenshots[currentStepId];
    if (!screenshots) return;

    const totalSlides = screenshots.length;

    // Ensure index is within bounds
    if (newIndex >= totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }

    currentSidebarSlide = newIndex;

    // Update slides
    const slides = document.querySelectorAll('.sidebar-slide');
    const indicators = document.querySelectorAll('.sidebar-indicator');

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSidebarSlide);
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSidebarSlide);
    });

    // Move track
    const track = document.getElementById('sidebarCarouselTrack');
    if (track) {
        track.style.transform = `translateX(-${currentSidebarSlide * 100}%)`;
    }
}

window.moveSidebarCarousel = function(direction) {
    const newIndex = currentSidebarSlide + direction;
    showSidebarSlide(newIndex);
};

window.goToSidebarSlide = function(index) {
    showSidebarSlide(index);
};

// Observer for step parts to update sidebar
const sidebarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stepId = entry.target.id;
            if (stepScreenshots[stepId]) {
                updateSidebarImages(stepId);
            }
        }
    });
}, {
    rootMargin: '-120px 0px -50%',
    threshold: 0.1
});

// Observe all step parts
document.querySelectorAll('.step-part').forEach(part => {
    sidebarObserver.observe(part);
});

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (lightbox && lightboxImage && lightboxCaption) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeLightbox = function() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Add click listeners to sidebar images
function addImageClickListeners() {
    document.querySelectorAll('.sidebar-slide img').forEach(img => {
        img.addEventListener('click', function() {
            const caption = this.closest('.sidebar-slide').querySelector('.sidebar-caption').textContent;
            openLightbox(this.src, caption);
        });
    });
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Confetti Animation
class Confetti {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.colors = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7', '#f0fdf4'];
        this.animationFrame = null;
        this.isAnimating = false;

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: -10,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        };
    }

    start() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Create initial burst of particles
        for (let i = 0; i < 80; i++) {
            this.particles.push(this.createParticle());
        }

        this.animate();

        // Stop after 4 seconds
        setTimeout(() => {
            this.stop();
        }, 4000);
    }

    stop() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        // Fade out remaining particles
        const fadeOut = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles = this.particles.filter(p => p.y < this.canvas.height);

            if (this.particles.length > 0) {
                this.particles.forEach(p => this.drawParticle(p));
                this.particles.forEach(p => this.updateParticle(p));
                requestAnimationFrame(fadeOut);
            }
        };
        fadeOut();
    }

    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation * Math.PI / 180);
        this.ctx.fillStyle = particle.color;

        if (particle.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        } else {
            this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }

        this.ctx.restore();
    }

    updateParticle(particle) {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;
        particle.speedY += 0.1; // Gravity
    }

    animate() {
        if (!this.isAnimating) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Remove particles that are off screen
        this.particles = this.particles.filter(p => p.y < this.canvas.height + 10);

        // Add new particles occasionally
        if (Math.random() > 0.85 && this.particles.length < 100) {
            this.particles.push(this.createParticle());
        }

        // Draw and update all particles
        this.particles.forEach(particle => {
            this.drawParticle(particle);
            this.updateParticle(particle);
        });

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

// Initialize confetti when celebration section comes into view
const celebrationContainer = document.getElementById('celebrationContainer');
const confettiCanvas = document.getElementById('confettiCanvas');

if (celebrationContainer && confettiCanvas) {
    const confetti = new Confetti(confettiCanvas);
    let hasTriggered = false;

    const celebrationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTriggered) {
                hasTriggered = true;
                confetti.start();
            }
        });
    }, {
        threshold: 0.5
    });

    celebrationObserver.observe(celebrationContainer);
}
