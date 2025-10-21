// JAVASCRIPT START
// --- Project Data Structure ---
const projects = {
    'pitch-time': {
        title: 'TURF BOOKING APP - PITCH TIME',
        description: 'The PITCH TIME is a user-friendly mobile application designed to simplify the process of booking sports turfs for football, badminton, cricket, and volleyball. It allows players to search for available turfs by location, sport, and date, and easily reserve their preferred time slots. In addition to turf bookings, the app offers a marketplace where users can rent or purchase sports equipment. Turf owners can list their venues, manage bookings, and track revenue efficiently. The app integrates secure payment gateways for seamless transactions. With push notifications for bookings and reminders, users are kept up-to-date on all their activities. Available on both Android and iOS, the app provides a smooth experience for all users. This platform is ideal for both players and turf owners, creating a unified space for managing the sport',
        technologies: ['Flutter (Mobile)', 'Python Django (Backend)', 'Dart', 'Java (Web/Backend)', 'HTML/CSS', 'Python', 'Visual Studio Code', 'Android Studio', 'Windows/macOS/Linux'],
        role: 'Full-stack Mobile/Web Developer',
        link: 'https://github.com/Ajas010/pitch-time'
    },
    'shop-surprize': {
        title: 'Shop Surprize Website - Gift Shop E-commerce',
        description: 'A dedicated e-commerce storefront for a local gift shop, "Shop Surprize." This project focused heavily on creating an aesthetic and mobile-responsive user interface that showcases products beautifully. The platform includes standard e-commerce features like product categorization, a functional shopping cart, user registration, and a streamlined checkout process. Its core goal was to transition the physical store experience to a successful online environment.',
        technologies: ['React', 'Vite', 'TypeScript', 'shadcn-ui', 'Tailwind\u00A0CSS'],
        role: 'Frontend Developer & UI/UX Designer',
        link: 'https://github.com/Ajas010/surprizegiftz'
    },
    'live-income-dashboard': {
        title: 'LiveIncomeDashboard (Streamlit)',
        description: 'This is a data visualization project built using Python and the Streamlit framework. The Live Income Dashboard is designed to ingest sales data and display key financial performance indicators (KPIs) in real-time. It features interactive charts and filters, allowing stakeholders to monitor income trends, visualize sales distribution by region, and make data-driven decisions quickly and efficiently.',
        technologies: ['Python', 'Streamlit', 'Pandas', 'Data Visualization Libraries'],
        role: 'Data Analyst / Dashboard Developer',
        link: 'https://github.com/Ajas010/LiveIncomeDashboard'
    }
};

// --- Projects Modal Logic ---
const projectDetailModal = document.getElementById('project-detail-modal');
const closeProjectModalBtn = document.getElementById('close-project-modal-btn');
document.querySelectorAll('.project-card').forEach(card => card.addEventListener('click', () => openProjectModal(card.id)));
if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', () => projectDetailModal.classList.add('hidden'));
if (projectDetailModal) projectDetailModal.addEventListener('click', (e) => { if (e.target === projectDetailModal) projectDetailModal.classList.add('hidden'); });
        
function openProjectModal(projectId) {
    const p = projects[projectId];
    if (!p) return;
    document.getElementById('modal-project-title').textContent = p.title;
    document.getElementById('modal-project-role').textContent = p.role;
    document.getElementById('modal-project-description').textContent = p.description;
    document.getElementById('modal-project-link').href = p.link;
    document.getElementById('modal-project-tech').innerHTML = p.technologies.map(t => `<span class="bg-main/20 text-main px-4 py-1 rounded-full text-sm font-medium border border-main">${t}</span>`).join('');
    projectDetailModal.classList.remove('hidden');
}

// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        // Font Awesome 6 uses 'fa-xmark' instead of deprecated 'fa-times'
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });
    document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }));
}

// --- Active Nav Link on Scroll ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a.nav-link');
window.addEventListener('scroll', () => {
    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) link.classList.add('active');
    });
});

// --- Typed.js Text Animation ---
if (window.Typed && document.querySelector('#typed-text')) {
    new Typed('#typed-text', {
        strings: ['SOC Analyst', 'UI/UX Designer','Frontend Developer', 'Data Analyst'],
        typeSpeed: 70, backSpeed: 50, backDelay: 1000, loop: true
    });
}
        
// --- Contact Form (posts to serverless API) ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        const formData = new FormData(contactForm);
        const firstName = (formData.get('firstName') || '').toString().trim();
        const lastName = (formData.get('lastName') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const phone = (formData.get('phone') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();
        const subject = (formData.get('subject') || '').toString().trim();

        const name = `${firstName} ${lastName}`.trim();
        if (!name || !email || !message) {
            if (formStatus) {
                formStatus.textContent = 'Please fill name, email and message.';
                formStatus.style.color = '#ff7b7b';
            }
            return;
        }

        // UI feedback
        if (submitBtn) { submitBtn.innerHTML = '<div class="loader mx-auto"></div>'; submitBtn.disabled = true; }
        if (formStatus) { formStatus.textContent = ''; formStatus.style.color = ''; }

        try {
            const resp = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subject, name, email, phone, message })
            });

            if (!resp.ok) throw new Error('Server error');

            if (formStatus) { formStatus.textContent = 'Message sent successfully!'; formStatus.style.color = '#83f346'; }
            contactForm.reset();
        } catch (err) {
            console.error('Contact form error', err);
            if (formStatus) { formStatus.textContent = 'Failed to send message. Please try again later.'; formStatus.style.color = '#ff7b7b'; }
        } finally {
            if (submitBtn) { submitBtn.textContent = 'Send Message'; submitBtn.disabled = false; }
            setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 8000);
        }
    });
}




// --- Tab Functionality for Skills/Certs ---
const toggleContainer = document.getElementById('toggle-container');
const skillsBtn = document.getElementById('tab-skills-btn');
const certsBtn = document.getElementById('tab-certs-btn');
const skillsContent = document.getElementById('skills-content');
const certsContent = document.getElementById('certs-content');

function openTab(tabName) {
    if (!toggleContainer || !skillsBtn || !certsBtn || !skillsContent || !certsContent) return;
    if (tabName === 'skills') {
        toggleContainer.classList.remove('certs');
        skillsBtn.classList.add('active');
        certsBtn.classList.remove('active');
        skillsContent.classList.remove('hidden');
        certsContent.classList.add('hidden');
        // accessibility
        skillsBtn.setAttribute('aria-selected', 'true');
        certsBtn.setAttribute('aria-selected', 'false');
        skillsBtn.setAttribute('tabindex', '0');
        certsBtn.setAttribute('tabindex', '-1');
        skillsContent.setAttribute('aria-hidden', 'false');
        certsContent.setAttribute('aria-hidden', 'true');
    } else {
        toggleContainer.classList.add('certs');
        certsBtn.classList.add('active');
        skillsBtn.classList.remove('active');
        certsContent.classList.remove('hidden');
        skillsContent.classList.add('hidden');
        // accessibility
        skillsBtn.setAttribute('aria-selected', 'false');
        certsBtn.setAttribute('aria-selected', 'true');
        skillsBtn.setAttribute('tabindex', '-1');
        certsBtn.setAttribute('tabindex', '0');
        skillsContent.setAttribute('aria-hidden', 'true');
        certsContent.setAttribute('aria-hidden', 'false');
    }
}
window.addEventListener('load', () => openTab('skills'));

// --- Open specific tab when clicking elements with data-open-tab ---
document.querySelectorAll('[data-open-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
        const targetTab = el.getAttribute('data-open-tab');
        if (!targetTab) return;
        // Allow anchor default smooth-scroll, but also ensure tab switches
        setTimeout(() => openTab(targetTab), 0);
    });
});

// Also wire up direct tab button clicks (in addition to inline onclick)
if (skillsBtn) {
    skillsBtn.setAttribute('role', 'tab');
    skillsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTab('skills');
    });
}
if (certsBtn) {
    certsBtn.setAttribute('role', 'tab');
    certsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openTab('certs');
    });
}
if (toggleContainer) {
    toggleContainer.setAttribute('role', 'tablist');
}

// --- Certificate image modal ---
const certModal = document.getElementById('cert-modal');
const closeCertModal = document.getElementById('close-cert-modal');
const certModalImg = document.getElementById('cert-modal-img');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalMeta = document.getElementById('cert-modal-meta');

function openCertModal(src, title, meta) {
    if (!certModal || !certModalImg || !certModalTitle) return;
    certModalImg.src = src;
    certModalTitle.textContent = title || 'Certificate';
    if (certModalMeta) certModalMeta.textContent = meta || '';
    certModal.classList.remove('hidden');
    certModal.classList.add('flex');
}
function closeCert() {
    if (!certModal) return;
    certModal.classList.add('hidden');
    certModal.classList.remove('flex');
}
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const src = card.getAttribute('data-cert');
        const title = card.getAttribute('data-title');
        const meta = card.getAttribute('data-meta');
        openCertModal(src, title, meta);
    });
});
if (closeCertModal) closeCertModal.addEventListener('click', closeCert);
if (certModal) certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCert(); });
// JAVASCRIPT END


