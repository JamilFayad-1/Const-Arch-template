/* ================================================
   Meridian Build — Bespoke Luxury Construction
   script.js
   ================================================ */

'use strict';

/* ================================================
   CUSTOM CURSOR
   ================================================ */
const cursor = document.getElementById('cursor');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .project-card, .collaborator, .award').forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor--large'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--large'));
    });
}

/* ================================================
   NAV — HERO MODE + SCROLL SOLID
   ================================================ */
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

function updateNav() {
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    if (heroBottom > 0) {
        nav.classList.add('nav--hero');
        nav.classList.remove('solid');
    } else {
        nav.classList.remove('nav--hero');
        nav.classList.add('solid');
    }
}

updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

/* ================================================
   MOBILE MENU
   ================================================ */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');

if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link) => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
}

/* ================================================
   HERO SLIDESHOW
   ================================================ */
const slides = document.querySelectorAll('.hero__slide');
const slideCounter = document.getElementById('slide-current');
let currentSlide = 0;
let slideTimer;

function goToSlide(index) {
    slides[currentSlide].classList.remove('hero__slide--active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('hero__slide--active');
    if (slideCounter) {
        slideCounter.textContent = String(currentSlide + 1).padStart(2, '0');
    }
}

function startSlideshow() {
    slideTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

if (slides.length > 1) startSlideshow();

/* ================================================
   SCROLL REVEAL
   ================================================ */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
});

revealEls.forEach((el, i) => {
    // Stagger siblings in the same parent
    const siblings = el.parentElement.querySelectorAll('[data-reveal]');
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 0.1}s`;
    revealObserver.observe(el);
});

/* ================================================
   PROJECT DESCRIPTION HOVER TEXT
   ================================================ */
document.querySelectorAll('.project-card__desc').forEach((desc) => {
    const text = desc.textContent;
    desc.setAttribute('aria-label', text);
    desc.textContent = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'project-card__desc-char';
        span.style.setProperty('--char-index', index);
        span.setAttribute('aria-hidden', 'true');
        span.textContent = char === ' ' ? '\u00A0' : char;
        desc.appendChild(span);
    });
});

/* ================================================
   SMOOTH SCROLL — ANCHOR LINKS
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 24, behavior: 'smooth' });
        }
    });
});

/* ================================================
   PROJECT MODAL
   ================================================ */
const projectData = {
    aria: {
        name: 'Aria',
        year: '2025',
        location: 'Rosedale, Montreal',
        type: 'Custom residence',
        scope: 'New luxury build',
        duration: '18 months',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        intro: 'A composed family residence shaped around warm entertaining spaces, generous glazing, and a quiet relationship to the mature landscape.',
        body: [
            'The brief called for a home that could feel intimate day to day and expansive when hosting. Meridian coordinated the structure, envelope, millwork, and finish sequencing to preserve the calm architectural intent.',
            'Large openings, exacting exterior detailing, and layered interior materials give Aria its balance of permanence and softness.',
            'The early construction phase centered on protecting the mature trees that define the site. Access, staging, and excavation were planned around the landscape so the finished home would feel established from the day of handover.',
            'Inside, the main floor was organized around long views and gentle transitions between cooking, dining, and living. Services were carefully routed to keep ceilings quiet and uninterrupted, allowing the architecture to carry the room without visual clutter.',
            'Material selections were deliberately warm: natural timber, fine stone, bronze-toned detailing, and soft neutral surfaces that change character throughout the day. Every junction was reviewed with the design team before installation.',
            'The final result is a home that opens generously to guests while still feeling calm and personal for everyday family life.'
        ],
    },
    obsidian: {
        name: 'Obsidian',
        year: '2024',
        location: 'Forest Hill, Montreal',
        type: 'Family home',
        scope: 'Interior-led bespoke build',
        duration: '14 months',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85',
        intro: 'A restrained, deeply comfortable home with a focus on natural light, private bedroom suites, and carefully resolved interior transitions.',
        body: [
            'Obsidian pairs subtle detailing with robust construction planning. The team worked closely with designers to align concealed services, custom millwork, and soft material junctions.',
            'The result is a measured family home that feels bright, practical, and quietly refined.',
            'A large part of the work happened before finishes arrived on site. Meridian coordinated mechanical routes, lighting locations, and wall build-ups so that the most technical parts of the home disappeared behind a calm interior language.',
            'Bedrooms were treated as private retreats, with special attention given to acoustic separation, natural light control, and storage that feels integrated rather than added later.',
            'The palette relies on contrast: pale walls, dark-framed openings, soft textiles, and precise shadow lines. Each finish was sequenced to protect the crispness of the detailing through construction.',
            'Obsidian is intentionally understated. Its quality comes through in the way rooms meet, doors close, light lands, and daily routines feel easy.'
        ],
    },
    calibre: {
        name: 'Calibre',
        year: '2023',
        location: 'The Annex, Montreal',
        type: 'Architect-led renovation',
        scope: 'Full home renewal',
        duration: '12 months',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
        intro: 'A precise renovation that opened the home to light, water, and indoor-outdoor living while respecting the original urban footprint.',
        body: [
            'Calibre required disciplined coordination between existing structure and new architectural gestures. Meridian managed the structural upgrades, glazing packages, and exterior finish tolerances.',
            'Every stage was sequenced to protect design clarity while navigating the constraints of a dense city site.',
            'The renovation began with careful investigation of the existing home. Conditions were documented, reviewed, and resolved before the new work advanced, reducing surprises during the more delicate phases of construction.',
            'Opening the rear of the home required close coordination between steel, waterproofing, drainage, and glazing. Each trade worked from a shared sequence so the outdoor living areas could feel effortless once complete.',
            'Interior finishes were selected to bridge old and new: refined but durable, architectural but livable. The goal was not to erase the original home, but to give it a clearer and more contemporary rhythm.',
            'Calibre now feels broader, brighter, and more connected, while still belonging naturally to its neighborhood context.'
        ],
    },
    pinnacle: {
        name: 'Pinnacle',
        year: '2022',
        location: 'Bridle Path, Montreal',
        type: 'New build luxury home',
        scope: 'Custom construction',
        duration: '20 months',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85',
        intro: 'A highly detailed custom build focused on craftsmanship, technical precision, and a polished handover experience.',
        body: [
            'From early planning through final installation, Pinnacle demanded careful trade coordination and consistent quality control. The project emphasized durable assemblies and refined finish execution.',
            'Its quieter strength is in the details: clean junctions, exact alignment, and spaces built for long-term everyday use.',
            'The project required a high level of documentation before construction began. Meridian translated design intent into buildable sequences, aligning structure, envelope performance, custom interiors, and specialist installations.',
            'Site meetings focused on resolving details before they became field compromises. Mockups, samples, and finish reviews helped maintain consistency across rooms with different uses and levels of formality.',
            'The exterior was built for presence without excess, using disciplined proportions and durable assemblies. Inside, the emphasis shifted to comfort, lighting control, and tactile materials that hold up over time.',
            'Pinnacle was handed over with the kind of quiet confidence that comes from patient coordination: nothing feels rushed, and every major decision has a reason behind it.'
        ],
    },
};

const projectModal = document.getElementById('project-modal');
const projectModalImage = document.getElementById('project-modal-image');
const projectModalMeta = document.getElementById('project-modal-meta');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalIntro = document.getElementById('project-modal-intro');
const projectModalFacts = document.getElementById('project-modal-facts');
const projectModalBody = document.getElementById('project-modal-body');
let lastFocusedProject = null;

function wrapModalTitle(element) {
    const text = element.textContent;
    element.setAttribute('aria-label', text);
    element.textContent = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'project-modal__title-letter';
        span.style.setProperty('--title-delay', `${index * 38}ms`);
        span.setAttribute('aria-hidden', 'true');
        span.textContent = char === ' ' ? '\u00A0' : char;
        element.appendChild(span);
    });

    return Math.max(0, (text.length - 1) * 38 + 220);
}

function animateProjectModalText() {
    const titleDuration = wrapModalTitle(projectModalTitle);
    projectModal.querySelector('.project-modal__content')
        ?.style.setProperty('--modal-rest-delay', `${titleDuration + 650}ms`);

    const revealEls = [
        projectModalMeta,
        projectModalIntro,
        projectModalFacts,
        ...projectModalBody.querySelectorAll('p'),
    ];

    revealEls.forEach((el, index) => {
        el.classList.add('project-modal__reveal-item');
        el.style.setProperty('--modal-item-delay', `${index * 95}ms`);
    });
}

function openProjectModal(projectKey) {
    const project = projectData[projectKey];
    if (!project || !projectModal) return;

    lastFocusedProject = document.activeElement;
    projectModal.classList.remove('open', 'is-animating');
    projectModalImage.src = project.image;
    projectModalImage.alt = `Project ${project.name}`;
    projectModalMeta.textContent = `${project.year} — ${project.location}`;
    projectModalTitle.textContent = project.name;
    projectModalIntro.textContent = project.intro;
    projectModalFacts.innerHTML = [
        ['Type', project.type],
        ['Scope', project.scope],
        ['Location', project.location],
        ['Timeline', project.duration],
    ].map(([label, value]) => `
        <div class="project-modal__fact">
            <span class="project-modal__fact-label">${label}</span>
            <span class="project-modal__fact-value">${value}</span>
        </div>
    `).join('');
    projectModalBody.innerHTML = project.body.map((paragraph) => `<p>${paragraph}</p>`).join('');
    animateProjectModalText();

    projectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
        projectModal.classList.add('open');
        projectModal.querySelector('.project-modal__close')?.focus();
        requestAnimationFrame(() => {
            projectModal.classList.add('is-animating');
        });
    });
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open', 'is-animating');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedProject) lastFocusedProject.focus();
}

document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
});

document.querySelectorAll('[data-close-project]').forEach((el) => {
    el.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
        closeProjectModal();
    }
});

/* ================================================
   TESTIMONIAL CAROUSEL (placeholder)
   ================================================ */
const testimonials = [
    {
        quote: '"Meridian is the most genuine, trustworthy builder — they construct the most intricate structures with ease, and work tirelessly to make your dreams come to life."',
        cite: 'Michael & Kathryn — Project Aria',
    },
    {
        quote: '"From the first conversation to handover, the communication was exceptional. We always felt informed, respected, and confident in the process."',
        cite: 'Anna & Jeremy — Project Pinnacle',
    },
    {
        quote: '"The level of craftsmanship was beyond what we imagined possible. Every detail was considered, every finish impeccable."',
        cite: 'Rob & Cindy — Project Calibre',
    },
];

let currentTestimonial = 0;
const quoteEl = document.querySelector('.testimonial__quote');
const citeEl = document.querySelector('.testimonial__cite');

function showTestimonial(index) {
    if (!quoteEl || !citeEl) return;
    const t = testimonials[index];
    quoteEl.style.opacity = '0';
    citeEl.style.opacity = '0';
    setTimeout(() => {
        quoteEl.textContent = t.quote;
        citeEl.textContent = t.cite;
        quoteEl.style.opacity = '1';
        citeEl.style.opacity = '1';
    }, 300);
}

quoteEl && (quoteEl.style.transition = 'opacity 0.4s ease');
citeEl && (citeEl.style.transition = 'opacity 0.4s ease');

document.getElementById('next-testimonial')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

document.getElementById('prev-testimonial')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

/* ================================================
   CONTACT FORM
   ================================================ */
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const original = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '✓ Enquiry Sent';
            btn.style.background = '#3a3830';
            setTimeout(() => {
                btn.textContent = original;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 3000);
        }, 1400);
    });
}

/* ================================================
   PAGE LOAD FADE IN
   ================================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.7s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
