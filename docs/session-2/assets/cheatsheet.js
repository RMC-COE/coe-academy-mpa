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
            const offsetTop = targetSection.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for active section highlighting
const tocObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            tocLinks.forEach(link => link.classList.remove('active'));

            // Add active class to corresponding link
            const sectionId = entry.target.id;
            const activeLink = document.querySelector(`.toc-link[data-section="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');

                // Also activate parent link if this is a subsection
                const parentLi = activeLink.closest('.toc-sublist')?.previousElementSibling;
                if (parentLi && parentLi.classList.contains('toc-link')) {
                    parentLi.classList.add('active');
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
