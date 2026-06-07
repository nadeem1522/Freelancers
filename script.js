lucide.createIcons();

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    gsap.to(preloader, { delay: 2.5, opacity: 0, duration: 0.8, onComplete: () => { 
        preloader.style.display = 'none'; 
        initAnimations(); 
    }});
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
    if(!cursorDot || !cursorRing) return;
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorRing.style.left = `${posX}px`;
    cursorRing.style.top = `${posY}px`;
});

document.querySelectorAll('a, button, .magnetic-btn, .social-icon-btn, .facility-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if(cursorRing) { cursorRing.style.width = '60px'; cursorRing.style.height = '60px'; cursorRing.style.backgroundColor = 'rgba(255, 234, 0, 0.1)'; }
    });
    el.addEventListener('mouseleave', () => {
        if(cursorRing) { cursorRing.style.width = '40px'; cursorRing.style.height = '40px'; cursorRing.style.backgroundColor = 'transparent'; }
    });
});

const menuBtn = document.getElementById('menu-btn');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isOpen = mobileMenu.style.transform === 'translateX(0%)';
    mobileMenu.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0%)';
}

menuBtn.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('bg-brand-navy/90', 'backdrop-blur-md', 'shadow-lg');
        nav.classList.remove('py-6');
        nav.classList.add('py-4');
    } else {
        nav.classList.remove('bg-brand-navy/90', 'backdrop-blur-md', 'shadow-lg');
        nav.classList.add('py-6');
        nav.classList.remove('py-4');
    }
});

const trainerSlider = document.getElementById('trainer-slider');
const btnPrev = document.getElementById('trainer-prev');
const btnNext = document.getElementById('trainer-next');

if(trainerSlider && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
        trainerSlider.scrollBy({ left: 370, behavior: 'smooth' });
    });
    btnPrev.addEventListener('click', () => {
        trainerSlider.scrollBy({ left: -370, behavior: 'smooth' });
    });
}

const baContainer = document.getElementById('ba-container');
const baOverlay = document.getElementById('ba-overlay');
const baHandle = document.getElementById('ba-handle');
let isDragging = false;

if (baContainer) {
    baContainer.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    baContainer.addEventListener('mouseleave', () => isDragging = false);

    baContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const rect = baContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percent = (x / rect.width) * 100;
        baOverlay.style.width = `${percent}%`;
        baHandle.style.left = `${percent}%`;
    });
    
    baContainer.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    baContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const rect = baContainer.getBoundingClientRect();
        let x = e.touches[0].clientX - rect.left;
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        const percent = (x / rect.width) * 100;
        baOverlay.style.width = `${percent}%`;
        baHandle.style.left = `${percent}%`;
    }, {passive: true});
}

const faqBtns = document.querySelectorAll('.faq-btn');
faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        const isOpen = content.style.maxHeight;

        document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
        document.querySelectorAll('.faq-btn i').forEach(i => i.style.transform = 'rotate(0deg)');
        document.querySelectorAll('.faq-btn').forEach(b => b.classList.remove('text-brand-yellow'));

        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = 'rotate(180deg)';
            btn.classList.add('text-brand-yellow');
        }
    });
});

function showBMIResult() {
    const view1 = document.getElementById('bmi-view-1');
    const view2 = document.getElementById('bmi-view-2');
    
    view1.style.transform = 'translateX(-100%)';
    view1.style.opacity = '0';
    view1.style.pointerEvents = 'none';
    
    view2.style.transform = 'translateX(0)';
    view2.style.opacity = '1';
    view2.style.pointerEvents = 'auto';
}

function showBMIForm() {
    const view1 = document.getElementById('bmi-view-1');
    const view2 = document.getElementById('bmi-view-2');
    
    view2.style.transform = 'translateX(100%)';
    view2.style.opacity = '0';
    view2.style.pointerEvents = 'none';

    view1.style.transform = 'translateX(0)';
    view1.style.opacity = '1';
    view1.style.pointerEvents = 'auto';
}

const bmiForm = document.getElementById('bmi-form');
if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const weight = parseFloat(document.getElementById('bmi-weight').value);
        const heightCm = parseFloat(document.getElementById('bmi-height').value);
        
        if (weight > 0 && heightCm > 0) {
            const heightM = heightCm / 100;
            const bmi = (weight / (heightM * heightM)).toFixed(1);
            
            document.getElementById('bmi-score').innerText = bmi;
            
            let category = '';
            let message = '';
            let color = '';

            if (bmi < 18.5) {
                category = 'Underweight';
                message = 'Time to build mass! Our hypertrophy and nutrition program is perfect for you.';
                color = '#FFEA00';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = 'Normal Weight';
                message = 'Great baseline! Let’s focus on strength, conditioning, and toning.';
                color = '#00D26A';
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = 'Overweight';
                message = 'Let’s shred some fat and build lean muscle with our elite coaching.';
                color = '#FF5722';
            } else {
                category = 'Obese';
                message = 'Transformation begins now. We are with you every step of the way. Let\'s talk.';
                color = '#FF0000';
            }

            const catEl = document.getElementById('bmi-category');
            catEl.innerText = category;
            catEl.style.color = color;
            document.getElementById('bmi-message').innerText = message;
            
            showBMIResult();
        }
    });
}

const recalculateBtn = document.getElementById('bmi-recalculate');
if (recalculateBtn) {
    recalculateBtn.addEventListener('click', showBMIForm);
}

gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    gsap.from(".gsap-hero", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    const revealElements = document.querySelectorAll(".gsap-reveal");
    revealElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power1.out"
                });
            }
        });
    });
}