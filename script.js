// script.js - SQA Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Reveal tiles on load with a slight delay
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.style.opacity = '1';
        }, 100 * index);
    });

    // Update copyright year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Add subtle parallax effect to gradients on mouse move
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        const overlays = document.querySelectorAll('.gradient-overlay, .gradient-overlay-stack, .pattern-gradient');
        overlays.forEach(overlay => {
            overlay.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
        });
    });



    // Smooth scroll for any internal links (if added)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resume Modal Logic
    const resumeBtn = document.querySelector('.btn-resume');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const resumeIframe = document.getElementById('resume-iframe');
    const resumePdfUrl = 'resume/Villanoy, Clifford M. - Resume.pdf';

    if (resumeBtn && resumeModal && closeResumeModalBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Set src on click with a timestamp to bypass browser cache
            resumeIframe.src = `${resumePdfUrl}?v=${new Date().getTime()}#toolbar=0&navpanes=0`;
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
            resumeIframe.src = ''; // Unload PDF when closed
        });

        // Close when clicking outside content
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
                resumeIframe.src = '';
            }
        });

        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
                resumeIframe.src = '';
            }
        });
    }
});
