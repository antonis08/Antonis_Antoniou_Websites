/**
 * ==============================================
 * script.js for Antonis Antoniou's Portfolio
 * * This script handles:
 * 1. Dark Mode Toggling & Persistence
 * 2. Mobile Menu Toggling
 * 3. Smooth Scrolling for Anchor Links
 * 4. Adding a shadow to the header on scroll
 * ==============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const html = document.documentElement;

    // Function to apply the correct theme on load
    const applyTheme = () => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            html.classList.remove('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    // Toggle theme on button click
    darkModeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        sunIcon.classList.toggle('hidden');
        moonIcon.classList.toggle('hidden');
        
        // Save the user's theme preference to localStorage
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close the mobile menu when a navigation link is clicked
    mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Find the target element and scroll to it
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Header shadow on scroll ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        // Add a shadow to the header if user scrolls down more than 50 pixels
        if (window.scrollY > 50) {
            header.classList.add('shadow-xl');
        } else {
            header.classList.remove('shadow-xl');
        }
    });

    // Initial call to set the theme when the page loads
    applyTheme();
});



//Form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission (page reload)

        formStatus.textContent = 'Sending message...'; // Show loading message
        formStatus.className = 'mt-4 text-center text-blue-500'; // Apply some styling

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Accept': 'application/json' // Crucial for AJAX response from Formspree
                },
                body: formData // FormData object automatically sets Content-Type for form data
            });

            if (response.ok) {
                // Formspree returns a 200 OK status on success
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'mt-4 text-center text-green-500'; // Success styling
                form.reset(); // Clear the form fields
            } else {
                // Handle errors (e.g., validation errors, server errors)
                const errorData = await response.json(); // Formspree sends JSON error details
                console.error('Formspree error:', errorData);
                formStatus.textContent = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'mt-4 text-center text-red-500'; // Error styling
            }
        } catch (error) {
            // Handle network errors (e.g., no internet connection)
            console.error('Network or fetch error:', error);
            formStatus.textContent = 'Network error. Please check your internet connection.';
            formStatus.className = 'mt-4 text-center text-red-500'; // Error styling
        }
    });
});