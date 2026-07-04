// Preloader Logic
const languages = [
    "Hello", "নমস্কার", "नमस्ते", "Hola", "Bonjour", "Hallo", 
    "こんにちは", "你好", "Привет", "Ciao", "Olá", "안녕하세요", 
    "مرحبا", "Hallo", "Merhaba", "Hej", "Γεια σου", "Xin chào", 
    "Cześć", "Привіт"
];

const preloader = document.getElementById('preloader');
const preloaderText = document.getElementById('preloader-text');
let currentLangIndex = 0;

// Prevent scrolling while preloader is active
document.body.style.overflow = 'hidden';

const flashInterval = setInterval(() => {
    currentLangIndex++;
    if (currentLangIndex < languages.length) {
        preloaderText.textContent = languages[currentLangIndex];
    } else {
        clearInterval(flashInterval);
        setTimeout(() => {
            preloader.classList.add('fade-out');
            document.body.style.overflow = ''; // Restore scroll
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800); // Wait for transition
        }, 300); // Small pause at the end
    }
}, 120);

// Typewriter Logic
const roles = ["tech enthusiast", "software engineer", "full stack developer"];
const typewriterElement = document.getElementById("typewriter");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter after a short delay
setTimeout(typeWriter, 1000);

import { Application } from 'https://esm.sh/@splinetool/runtime';

const canvas = document.getElementById('canvas3d');

// Prevent scroll/wheel events from zooming the 3D scene
canvas.addEventListener('wheel', (e) => {
    // Stop the event from reaching Spline's internal handlers
    e.stopPropagation();
}, { capture: true });

const spline = new Application(canvas);
spline.load('https://prod.spline.design/2ij2s3TCk33dX33K/scene.splinecode')
    .then(() => console.log('Spline scene loaded!'));

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-section');
            observer.unobserve(entry.target); // Optional: animate only once
        }
    });
}, observerOptions);

const hiddenSections = document.querySelectorAll('.hidden-section');
hiddenSections.forEach((el) => observer.observe(el));

// Flip Fade Text Animation Logic
function splitTextIntoChars(element) {
    const chars = [];
    const childNodes = Array.from(element.childNodes);
    
    childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    fragment.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    span.className = 'flip-fade-char';
                    fragment.appendChild(span);
                    chars.push(span);
                }
            }
            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('flip-fade-char')) {
            if (node.classList.contains('gradient-text')) {
                node.classList.add('flip-fade-char');
                chars.push(node);
            } else {
                chars.push(...splitTextIntoChars(node));
            }
        }
    });
    return chars;
}

const flipFadeTargets = document.querySelectorAll('.flip-fade-target');
flipFadeTargets.forEach(target => {
    const chars = splitTextIntoChars(target);
    
    const flipObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            chars.forEach((char, index) => {
                char.style.animationDelay = `${index * 0.05}s`;
                char.classList.add('animate');
            });
        } else {
            chars.forEach((char) => {
                char.classList.remove('animate');
            });
        }
    }, { threshold: 0.5 });
    
    flipObserver.observe(target);
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');

// Timeline Scroll Animation Logic
function updateTimelineProgress() {
    const timeline = document.querySelector('.education-timeline-centered');
    const progressBar = document.querySelector('.edu-timeline-line-progress');
    if (timeline && progressBar) {
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Start filling the timeline when its top enters 75% height of the screen
        const startPoint = windowHeight * 0.75;
        const relativeScroll = startPoint - rect.top;
        
        // Calculate progress percentage relative to the timeline container height
        let progress = (relativeScroll / rect.height) * 100;
        progress = Math.max(0, Math.min(100, progress));
        
        progressBar.style.height = `${progress}%`;
        
        // Sync active states on timeline items (dots and cards)
        const items = timeline.querySelectorAll('.edu-timeline-item');
        items.forEach(item => {
            const dot = item.querySelector('.edu-timeline-dot');
            if (dot) {
                const dotRect = dot.getBoundingClientRect();
                const relativeDotTop = dotRect.top - rect.top;
                
                // If progress line has passed the dot (adding minor offset for dot center alignment)
                if ((progress / 100) * rect.height >= relativeDotTop + 7) {
                    item.classList.add('timeline-active');
                } else {
                    item.classList.remove('timeline-active');
                }
            }
        });
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    updateTimelineProgress();
});

// Run once immediately on load to set initial state
updateTimelineProgress();

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Projects Section Animations (Header Whoosh & Grid Cards Scatter/Gather)
function initProjectsObserver() {
    const projectsSection = document.getElementById('projects');
    const projectsHeader = document.querySelector('.projects-header');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (projectsSection) {
        let timeoutId = null;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                
                if (entry.isIntersecting) {
                    // Header: Slide in from the left
                    if (projectsHeader) {
                        projectsHeader.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease';
                        projectsHeader.style.transform = 'translateX(0)';
                        projectsHeader.style.opacity = '1';
                    }
                    // Grid Cards: Gather into center
                    if (projectsGrid) {
                        projectsGrid.classList.add('grid-active');
                    }
                } else {
                    // Header: Slide out to the right
                    if (projectsHeader) {
                        projectsHeader.style.transition = 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease';
                        projectsHeader.style.transform = 'translateX(100%)';
                        projectsHeader.style.opacity = '0';
                    }
                    // Grid Cards: Scatter outwards
                    if (projectsGrid) {
                        projectsGrid.classList.remove('grid-active');
                    }
                    
                    // Reset header to left once transition finishes
                    if (projectsHeader) {
                        timeoutId = setTimeout(() => {
                            projectsHeader.style.transition = 'none';
                            projectsHeader.style.transform = 'translateX(-100%)';
                        }, 900);
                    }
                }
            });
        }, {
            root: null,
            threshold: 0.05
        });
        
        observer.observe(projectsSection);
    }
}

initProjectsObserver();

// Flip Text Animation for Body
function splitWordsAndChars(node) {
    const chars = [];
    Array.from(node.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent;
            const fragment = document.createDocumentFragment();
            const words = text.split(/(\s+)/); // Preserve spaces
            
            words.forEach(word => {
                if (word.trim() === '') {
                    fragment.appendChild(document.createTextNode(word));
                } else {
                    const wordSpan = document.createElement('span');
                    wordSpan.className = 'flip-text-word';
                    for (let i = 0; i < word.length; i++) {
                        const charSpan = document.createElement('span');
                        charSpan.textContent = word[i];
                        charSpan.className = 'flip-text-char';
                        wordSpan.appendChild(charSpan);
                        chars.push(charSpan);
                    }
                    fragment.appendChild(wordSpan);
                }
            });
            child.replaceWith(fragment);
        } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('flip-text-word')) {
            chars.push(...splitWordsAndChars(child));
        }
    });
    return chars;
}

const flipTextTargets = document.querySelectorAll('.flip-text-target');
flipTextTargets.forEach(target => {
    const chars = splitWordsAndChars(target);
    
    const flipTextObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            chars.forEach((char, index) => {
                // Use a faster stagger for large bodies of text
                char.style.transitionDelay = `${index * 0.015}s`;
                // Set timeout so transition plays after delay is set
                setTimeout(() => char.classList.add('animate'), 10);
            });
        } else {
            chars.forEach((char) => {
                char.style.transitionDelay = '0s';
                char.classList.remove('animate');
            });
        }
    }, { threshold: 0.1 });
    
    flipTextObserver.observe(target);
});

// Diagonal Carousel Logic
const certTrack = document.getElementById('cert-track');
const certPrevBtn = document.getElementById('cert-prev');
const certNextBtn = document.getElementById('cert-next');
const certDotsContainer = document.getElementById('cert-dots');

if (certTrack) {
    const cards = Array.from(certTrack.querySelectorAll('.carousel-card'));
    let currentIndex = Math.floor(cards.length / 2);
    
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => updateCarousel(i));
        certDotsContainer.appendChild(dot);
    });
    
    const dots = Array.from(certDotsContainer.querySelectorAll('.carousel-dot'));
    
    const certificateData = [
        { title: "Programming in Java", desc: "Successfully completed the 12-week NPTEL Online Certification course on Programming in Java (IIT Kharagpur) with 78%.", file: "certificates/programing in JAVA (NPTEL).pdf" },
        { title: "Computer Architecture", desc: "Completed the 12-week NPTEL course on Computer Architecture funded by the Govt. of India (IIT Madras).", file: "certificates/Computer Architecture (NPTEL).pdf" },
        { title: "Cyber Security Training", desc: "Successfully completed 36 hours of rigorous training in Cyber Security by Ardent Computech Pvt. Ltd.", file: "certificates/cyber security BCT TRAINING.pdf" },
        { title: "Deloitte Data Analytics", desc: "Completed practical tasks in Data Analysis and Forensic Technology during the Deloitte Job Simulation.", file: "certificates/Deloitte_Data_Analytics_Job_Simulation_completion_certificate.pdf" },
        { title: "Google Cloud Platform", desc: "Completed Introduction to Google Cloud Platform course by Simplilearn, deepening cloud computing skills.", file: "certificates/skillup_simplilearn_google cloud_certificate.pdf" },
        { title: "GenAI Powered Analytics", desc: "Completed practical Job Simulation on GenAI Powered Data Analytics provided by TATA.", file: "certificates/TATA certificate GenAI Powered Data Analytics Job Simulation.pdf" },
        { title: "TATA ESG Simulation", desc: "Gained practical experience and skills through the TATA ESG Job Simulation program.", file: "certificates/TATA_CERTIFICTE_ESG_completion_certificate.pdf" },
        { title: "Cybersecurity Analyst", desc: "Completed practical tasks as part of the rigorous TATA Cybersecurity Analyst Job Simulation.", file: "certificates/TATA_CERTIFIOCATE_Cybersecurity Analyst Job Simulation_completion_certificate.pdf" },
        { title: "TATA Data Visualisation", desc: "Gained practical skills in Data Visualisation and reporting through the TATA Job Simulation.", file: "certificates/TATA_Data Visualisation_completion_certificate.pdf" }
    ];

    let scrollFactor = 0; // Default to 0 (centered) on load if centered
    const certSection = document.getElementById('certifications');
    const aboutSection = document.getElementById('about');
    const aboutPhoto = document.querySelector('.about-image-wrapper');
    
    function handleScrollAnimations() {
        // Certifications carousel logic
        if (certSection) {
            const rect = certSection.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            
            const dist = Math.abs(sectionCenter - windowCenter);
            scrollFactor = Math.min(1, dist / (window.innerHeight * 0.5));
            
            updateCarousel(currentIndex, true);
        }

        // About Me coin rotate logic
        if (aboutSection && aboutPhoto) {
            const rect = aboutSection.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            
            // Calculate distance relative to viewport height
            // When perfectly centered, dist is 0
            const dist = sectionCenter - windowCenter;
            
            // Map the distance to a rotation degree
            // Multiply by a high number (e.g. 1440) for a rapid coin-spin effect
            const rotateDeg = (dist / window.innerHeight) * 1440;
            
            // Apply the transform (perspective adds a 3D depth effect)
            aboutPhoto.style.transform = `perspective(1000px) rotateY(${rotateDeg}deg)`;
        }
    }
    
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial call to set initial states
    handleScrollAnimations();

    function updateCarousel(newIndex, isScrollEvent = false) {
        if (newIndex < 0 || newIndex >= cards.length) return;
        currentIndex = newIndex;
        
        cards.forEach((card, i) => {
            const offset = i - currentIndex;
            const absOffset = Math.abs(offset);
            
            // Calculate dynamic spread based on scroll position
            // When centered (scrollFactor=0) -> tight spread (0.3)
            // When scrolled away (scrollFactor=1) -> wide spread (1.0)
            const spread = 0.3 + (0.7 * scrollFactor);
            
            const translateX = offset * 350 * spread; 
            const translateY = offset * 220 * spread; 
            const rotate = offset * 15 * spread; 
            const scale = Math.max(0.5, 1 - absOffset * 0.15); 
            const opacity = Math.max(0, 1 - absOffset * 0.4);
            const zIndex = 50 - absOffset;
            
            card.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
            card.style.opacity = opacity;
            card.style.zIndex = zIndex;
            
            // Only render innerHTML once to avoid iframe reloading on scroll
            if (!card.innerHTML.trim()) {
                const cert = certificateData[i] || certificateData[0];
                card.innerHTML = `
                    <iframe src="${encodeURI(cert.file)}#toolbar=0&navpanes=0&scrollbar=0&view=Fit" class="cert-image-slot" style="border:none; pointer-events:none; overflow:hidden;"></iframe>
                    <h3 class="cert-title">${cert.title}</h3>
                    <p class="cert-desc">${cert.desc}</p>
                    <a href="https://www.linkedin.com/in/saikat-som-288477418/details/certifications/" target="_blank" class="cert-btn btn-gradient" style="text-decoration: none; color: #fff;">
                        READ MORE
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                `;
            }
        });
        
        if (!isScrollEvent) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
    }
    
    certPrevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
    certNextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
    
    updateCarouselOnScroll(); // initialize layout based on initial scroll position
}

// Background Particles System
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    let width, height, docHeight;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        docHeight = Math.max(
            document.body.scrollHeight, 
            document.body.offsetHeight, 
            document.documentElement.clientHeight, 
            document.documentElement.scrollHeight, 
            document.documentElement.offsetHeight
        );
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        
        createParticles();
    }
    
    function createParticles() {
        particles = [];
        const totalArea = width * docHeight;
        const numParticles = Math.min(Math.floor(totalArea / 12000), 1500); 
        
        for (let i = 0; i < numParticles; i++) {
            // Using Math.sqrt biases the particles towards the bottom (docHeight)
            // matching the user's request for more particles in deeper/darker sections.
            const yRatio = Math.sqrt(Math.random()); 
            const globalY = docHeight * yRatio;
            
            particles.push({
                x: Math.random() * width,
                globalY: globalY,
                size: Math.random() * 2.5 + 1.5, // Slightly larger for bubble effect
                speedY: Math.random() * 0.8 + 0.2, // Slightly faster upward movement
                opacity: Math.random() * 0.5 + 0.2,
                swingOffset: Math.random() * Math.PI * 2, // For horizontal bubble wobble
                swingSpeed: Math.random() * 0.02 + 0.01,
                swingAmplitude: Math.random() * 15 + 5
            });
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        const scrollY = window.scrollY;
        
        particles.forEach(p => {
            p.globalY -= p.speedY;
            p.swingOffset += p.swingSpeed;
            
            // Loop particles back to the bottom when they float off the top of the page
            if (p.globalY < 0) {
                p.globalY = docHeight + Math.random() * 100;
                p.x = Math.random() * width;
            }
            
            const screenY = p.globalY - scrollY;
            const currentX = p.x + Math.sin(p.swingOffset) * p.swingAmplitude;
            
            if (screenY > -10 && screenY < height + 10) {
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(currentX, screenY, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(resize, 200);
    });
    
    setTimeout(() => {
        resize();
        animate();
    }, 500);
    
    const observer = new ResizeObserver(() => {
        if (Math.abs(docHeight - document.body.scrollHeight) > 100) {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(resize, 200);
        }
    });
    observer.observe(document.body);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

// Education Interactive Title Logic
function initEduSlider() {
    const eduSlider = document.getElementById('edu-slider');
    if (!eduSlider) return;
    
    const handleLeft = document.getElementById('edu-handle-left');
    const handleRight = document.getElementById('edu-handle-right');
    const sliderText = document.getElementById('edu-slider-text');
    
    const MIN_RANGE = 50;
    const ROTATION_DEG = -2.76;
    const THETA = ROTATION_DEG * (Math.PI / 180);
    const COS_THETA = Math.cos(THETA);
    const SIN_THETA = Math.sin(THETA);
    const handleSize = 28;
    
    let sliderWidth = 320; 
    let leftPos = 0;
    let rightPos = sliderWidth;
    let draggingHandle = null;
    let startX = 0, startY = 0, initialLeft = 0, initialRight = 0;
    
    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }
    
    function updateVisuals() {
        const handleMidpoint = (leftPos + rightPos) / 2;
        const sliderCenter = sliderWidth / 2;
        const deviationFactor = (handleMidpoint - sliderCenter) / sliderCenter;
        const dynamicRotation = ROTATION_DEG + (deviationFactor * 3);
        
        eduSlider.style.transform = `rotate(${dynamicRotation}deg)`;
        handleLeft.style.left = `${leftPos}px`;
        handleRight.style.left = `${rightPos - handleSize}px`;
        sliderText.style.clipPath = `inset(0 ${sliderWidth - rightPos}px 0 ${leftPos}px round 1rem)`;
    }
    
    function onPointerDown(e, handle) {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        draggingHandle = handle;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = leftPos;
        initialRight = rightPos;
        e.currentTarget.classList.add('dragging');
    }
    
    handleLeft.addEventListener('pointerdown', (e) => onPointerDown(e, 'left'));
    handleRight.addEventListener('pointerdown', (e) => onPointerDown(e, 'right'));
    
    window.addEventListener('pointermove', (e) => {
        if (!draggingHandle) return;
        const dX = e.clientX - startX;
        const dY = e.clientY - startY;
        const projected = dX * COS_THETA + dY * SIN_THETA;
        
        if (draggingHandle === 'left') {
            leftPos = clamp(initialLeft + projected, 0, rightPos - MIN_RANGE);
        } else {
            rightPos = clamp(initialRight + projected, leftPos + MIN_RANGE, sliderWidth);
        }
        updateVisuals();
    });
    
    function onPointerUp() {
        if (draggingHandle) {
            const handleEl = draggingHandle === 'left' ? handleLeft : handleRight;
            handleEl.classList.remove('dragging');
            draggingHandle = null;
        }
    }
    
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    updateVisuals();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEduSlider);
} else {
    initEduSlider();
}

const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("active");
            }, 500); // slight delay so they see it start
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll(".pointer-highlight-container").forEach(el => highlightObserver.observe(el));

// Spotlight Navbar Logic
function initSpotlightNav() {
    const navList = document.getElementById('spotlight-list');
    const pill = document.getElementById('spotlight-pill');
    const items = document.querySelectorAll('.spotlight-item');
    
    // Hamburger logic
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.spotlight-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        items.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
    
    if (!navList || !pill || items.length === 0) return;
    
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const itemRect = item.getBoundingClientRect();
            const listRect = navList.getBoundingClientRect();
            
            const left = itemRect.left - listRect.left;
            const width = itemRect.width;
            
            pill.style.width = `${width}px`;
            pill.style.transform = `translateX(${left}px)`;
            pill.style.opacity = '1';
        });
    });
    
    navList.addEventListener('mouseleave', () => {
        pill.style.opacity = '0';
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpotlightNav);
} else {
    initSpotlightNav();
}

// Typewriter Text Logic
const typewriterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.typed) {
            entry.target.dataset.typed = 'true';
            
            const el = entry.target;
            const targetText = el.getAttribute('data-typewriter') || el.innerText;
            el.innerHTML = '<span class="typewriter-cursor"></span>'; // Clear and add cursor
            
            let charIndex = 0;
            
            function typeNextChar() {
                if (charIndex < targetText.length) {
                    const textSpan = document.createElement('span');
                    textSpan.textContent = targetText[charIndex];
                    el.insertBefore(textSpan, el.lastChild); // Insert before cursor
                    charIndex++;
                    
                    // Random typing speed between 50ms and 150ms
                    const typingSpeed = Math.random() * 100 + 50;
                    setTimeout(typeNextChar, typingSpeed);
                }
            }
            
            // Start typing after a short delay
            setTimeout(typeNextChar, 500);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.typewriter-text').forEach(el => typewriterObserver.observe(el));