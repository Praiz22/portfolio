// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,     // animation duration
        once: true,         // whether animation should happen only once - while scrolling down
        offset: 100,        // offset (in px) from the top of the screen to trigger animations
        easing: 'ease-in-out', // easing for animations
    });

    // Manually trigger AOS refresh if content loads dynamically
    window.addEventListener('load', AOS.refreshHard);
});

// Typing Effect for Hero Section
const typingTextElement = document.getElementById('typing-text');
const texts = ["Web Developer", "UI/UX Designer", "Graphics Designer", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150; // Milliseconds per character
let deletingSpeed = 75; // Milliseconds per character
let delayBeforeNextText = 1500; // Delay before typing next text or deleting

function typeWriter() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        // Deleting text
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 150; // Reset typing speed
            setTimeout(typeWriter, delayBeforeNextText);
        } else {
            setTimeout(typeWriter, deletingSpeed);
        }
    } else {
        // Typing text
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = delayBeforeNextText; // Pause before deleting
            setTimeout(typeWriter, delayBeforeNextText);
        } else {
            setTimeout(typeWriter, typingSpeed);
        }
    }
}

// Start the typing effect when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', typeWriter);

// Skill Meter Animation (on scroll into view)
const skillFills = document.querySelectorAll('.skill .fill');

const animateSkillMeters = () => {
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        // Check if the element is in the viewport
        const isInView = (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight));

        if (isInView && !fill.dataset.animated) {
            const percent = fill.dataset.percent;
            fill.style.width = percent + '%';
            fill.dataset.animated = 'true'; // Mark as animated to prevent re-animation
        }
    });
};

// Initial check and attach to scroll event
window.addEventListener('scroll', animateSkillMeters);
document.addEventListener('DOMContentLoaded', animateSkillMeters); // Check on load

// Counter Animation for About Me Section
const yearsOfExperience = document.getElementById('years-of-experience');
const projectsCompleted = document.getElementById('projects-completed');
const industriesCovered = document.getElementById('industries-covered');

function animateCountUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 10); // Calculate increment for 10ms intervals

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure final value is exact
        }
    };

    // Use Intersection Observer to trigger animation when element is in view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(updateCounter);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of element is visible

    observer.observe(element);
}

document.addEventListener('DOMContentLoaded', () => {
    animateCountUp(yearsOfExperience, 5); // Example target for years of experience
    animateCountUp(projectsCompleted, 20); // Example target for projects
    animateCountUp(industriesCovered, 7); // Example target for industries
});


// Light/Dark Mode Toggle
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference or system preference on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check system preference if no saved theme
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
});

// Form Submission with FormSubmit
const contactForm = document.getElementById('contact-form');
const responseMessageBox = document.getElementById('response-message-box');
const responseMessageText = document.getElementById('response-message-text');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(contactForm);
    const formAction = contactForm.getAttribute('action');

    try {
        const response = await fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            responseMessageText.textContent = "Thank You! Your message has been successfully sent. I will get back to you shortly.";
            contactForm.reset(); // Clear the form
        } else {
            const data = await response.json();
            if (data.message) {
                responseMessageText.textContent = `Error: ${data.message}`;
            } else {
                responseMessageText.textContent = "Oops! There was an error sending your message. Please try again.";
            }
        }
    } catch (error) {
        console.error('Submission error:', error);
        responseMessageText.textContent = "Network error. Please check your internet connection and try again.";
    } finally {
        responseMessageBox.classList.add('show'); // Show the message box regardless of success/failure
    }
});

// Function to hide the custom message box (called by button click in HTML)
function hideMessageBox() {
    responseMessageBox.classList.remove('show');
}

// Dynamic Scrolling for Navbar active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    // Determine the current section in view
    sections.forEach(section => {
        // Adjust for fixed navbar height when calculating section top
        const sectionTop = section.offsetTop - document.querySelector('.navbar').offsetHeight - 20; // Added extra buffer
        const sectionBottom = sectionTop + section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove active from all links
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active'); // Add active to the link corresponding to the current section
        }
    });
});

// Page Loader Control
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
    // Hide the loader after all resources are loaded
    setTimeout(() => {
        loader.classList.add('hidden');
        // Enable scrolling and other interactions after loader is hidden
        document.body.style.overflow = 'auto';
    }, 1000); // Increased delay slightly to ensure animations complete and resources load
    document.body.style.overflow = 'hidden'; // Prevent scrolling while loader is visible
});