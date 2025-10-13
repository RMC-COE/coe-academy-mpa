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
const observer = new IntersectionObserver((entries) => {
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
    observer.observe(part);
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
const sections = document.querySelectorAll('section[id], .step-part[id]');

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
sections.forEach(section => {
    tocObserver.observe(section);
});
