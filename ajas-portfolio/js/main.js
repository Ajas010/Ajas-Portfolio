// This file contains the JavaScript code for the portfolio, handling interactivity and dynamic behavior.

// Function to toggle the mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Function to handle the tab switching for skills and certifications
function openTab(tabName) {
    const skillsContent = document.getElementById('skills-content');
    const certsContent = document.getElementById('certs-content');
    const tabSkillsBtn = document.getElementById('tab-skills-btn');
    const tabCertsBtn = document.getElementById('tab-certs-btn');

    if (tabName === 'skills') {
        skillsContent.classList.remove('hidden');
        certsContent.classList.add('hidden');
        tabSkillsBtn.classList.add('active');
        tabCertsBtn.classList.remove('active');
    } else {
        skillsContent.classList.add('hidden');
        certsContent.classList.remove('hidden');
        tabSkillsBtn.classList.remove('active');
        tabCertsBtn.classList.add('active');
    }
}

// Function to handle the certificate modal display
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('cert-modal');
const certModalImg = document.getElementById('cert-modal-img');
const certModalTitle = document.getElementById('cert-modal-title');
const certModalMeta = document.getElementById('cert-modal-meta');
const closeCertModal = document.getElementById('close-cert-modal');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        certModal.classList.remove('hidden');
        certModalImg.src = card.dataset.cert;
        certModalTitle.textContent = card.dataset.title;
        certModalMeta.textContent = card.dataset.meta;
    });
});

closeCertModal.addEventListener('click', () => {
    certModal.classList.add('hidden');
});

// Function to handle project detail modal display
const projectCards = document.querySelectorAll('.project-card');
const projectDetailModal = document.getElementById('project-detail-modal');
const modalProjectTitle = document.getElementById('modal-project-title');
const modalProjectRole = document.getElementById('modal-project-role');
const modalProjectDescription = document.getElementById('modal-project-description');
const modalProjectTech = document.getElementById('modal-project-tech');
const modalProjectLink = document.getElementById('modal-project-link');
const closeProjectModalBtn = document.getElementById('close-project-modal-btn');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        projectDetailModal.classList.remove('hidden');
        modalProjectTitle.textContent = card.querySelector('h3').textContent;
        modalProjectRole.textContent = 'Project Role: Developer'; // Example role
        modalProjectDescription.textContent = card.querySelector('p').textContent;
        modalProjectTech.innerHTML = card.querySelector('.text-main').textContent; // Example tech
        modalProjectLink.href = '#'; // Add the actual project link here
    });
});

closeProjectModalBtn.addEventListener('click', () => {
    projectDetailModal.classList.add('hidden');
});

// Typed.js initialization for dynamic text
const typed = new Typed('#typed-text', {
    strings: ['Web Developer', 'Designer', 'Tech Enthusiast'],
    typeSpeed: 50,
    backSpeed: 25,
    loop: true
});