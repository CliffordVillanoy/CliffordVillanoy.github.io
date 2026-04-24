// script.js - SQA Portfolio Interactivity (Liquid Glass UI)

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Icons are now handled via CSS and the [data-theme] attribute
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // --- Liquid Glass Tile Effects (Tilt & Glow) ---
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile, index) => {
        // 1. Entrance animation timing
        setTimeout(() => {
            tile.style.opacity = '1';
        }, 100 * index);

        // 2. Interactive Glass Effects
        tile.addEventListener('mousemove', (e) => {
            // Get coordinates relative to the tile
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS variables for the light reflection pseudo-element
            tile.style.setProperty('--mouse-x', `${x}px`);
            tile.style.setProperty('--mouse-y', `${y}px`);

            // 3D Parallax Tilt Effect
            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; // Max rotation 3deg
            const rotateY = ((x - centerX) / centerX) * 3;

            // Apply smooth 3D transform with slight scale
            tile.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        tile.addEventListener('mouseleave', () => {
            // Reset transform smoothly and fade out reflection
            tile.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            // The reflection opacity fade out is handled in CSS via hover state
        });
    });

    // --- Update copyright year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Resume Modal Logic ---
    const resumeBtn = document.querySelector('.btn-resume');
    const resumeModal = document.getElementById('resume-modal');
    const closeResumeModalBtn = document.getElementById('close-resume-modal');
    const resumeIframe = document.getElementById('resume-iframe');
    const resumePdfUrl = 'resume/Villanoy, Clifford M. - Resume.pdf';

    if (resumeBtn && resumeModal && closeResumeModalBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resumeIframe.src = `${resumePdfUrl}?v=${new Date().getTime()}#toolbar=0&navpanes=0`;
            resumeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeResumeModalBtn.addEventListener('click', () => {
            resumeModal.classList.remove('active');
            document.body.style.overflow = '';
            resumeIframe.src = ''; 
        });

        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
                resumeIframe.src = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                document.body.style.overflow = '';
                resumeIframe.src = '';
            }
        });
    }
});
