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
