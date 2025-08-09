// ==================== A. UI/UX Logic ====================
        
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Theme Toggle (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navMenu.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi fade-in saat di-scroll
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Logika Header dan Back to Top & Social Bar
const header = document.getElementById('main-header');
const backToTopBtn = document.getElementById('back-to-top');
const socialBar = document.getElementById('social-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        backToTopBtn.style.display = 'block';
    } else {
        header.classList.remove('scrolled');
        backToTopBtn.style.display = 'none';
    }

    // Show social bar after scrolling past the hero section
    if (window.scrollY > window.innerHeight) {
        socialBar.classList.add('visible');
    } else {
        socialBar.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Particle.js Configuration
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
        "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "onresize": { "enable": true, "density_auto": true } },
        "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
    },
    "retina_detect": true
});

// Phrase of the Day Logic
const phrases = [
    "Actions speak louder than words.",
    "Practice makes perfect.",
    "The early bird catches the worm.",
    "Where there's a will, there's a way.",
    "All that glitters is not gold."
];
function displayPhraseOfTheDay() {
    const phraseTextElement = document.getElementById('phrase-text');
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    phraseTextElement.textContent = `"${randomPhrase}"`;
}
window.addEventListener('load', displayPhraseOfTheDay);

// ==================== B. Registration Form Logic ====================

// Logika Pilihan Salam
const islamBtn = document.getElementById('islam-btn');
const nonislamBtn = document.getElementById('nonislam-btn');
const salamText = document.getElementById('salam-text');

let selectedGreeting = "";

islamBtn.addEventListener('click', () => {
    salamText.innerHTML = 'Assalamualaikum Wr. Wb. 👋 <br> Setelah mengisi form dan klik "Confirm & Copy Data", pesan Anda akan otomatis tersalin. Anda akan dialihkan ke grup WhatsApp untuk menempelkan pesan tersebut.';
    islamBtn.classList.add('active');
    nonislamBtn.classList.remove('active');
    selectedGreeting = "Assalamualaikum Wr. Wb. 👋";
});

nonislamBtn.addEventListener('click', () => {
    salamText.innerHTML = 'Greetings to all! 👋 <br> Setelah mengisi form dan klik "Confirm & Copy Data", pesan Anda akan otomatis tersalin. Anda akan dialihkan ke grup WhatsApp untuk menempelkan pesan tersebut.';
    nonislamBtn.classList.add('active');
    islamBtn.classList.remove('active');
    selectedGreeting = "Greetings to all! 👋";
});

// Script untuk menyalin teks dan mengalihkan ke WhatsApp
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nama = document.getElementById('nama').value;
    const namaPanggilan = document.getElementById('nama-panggilan').value;
    const kelas = document.getElementById('kelas').value;

    if (selectedGreeting === "") {
        alert('Silakan pilih salah satu salam terlebih dahulu.');
        return;
    }

    const textToCopy = `${selectedGreeting}
Hello English Club SPENAM!
I would like to register as a new member.
My details are:
- Name: ${nama}
- Nickname: ${namaPanggilan}
- Class: ${kelas}

I'm excited to join and learn with all of you! ✨`;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Data pendaftaran Anda berhasil disalin. Anda akan dialihkan ke grup WhatsApp. Silakan tempel data tersebut di sana.');
            window.location.href = 'https://chat.whatsapp.com/KnxFk4hsQpD4WdilH2Honm?mode=ac_t';
        })
        .catch(err => {
            alert('Gagal menyalin data. Silakan salin secara manual atau coba lagi.');
            console.error('Error copying text: ', err);
        });
});


// ==================== C. AI Helper Pop-up Logic (UPDATED) ====================
const aiModal = document.getElementById('aiModal');
const aiButton = document.getElementById('ai-button');
const closeBtn = document.querySelector('.close-btn');

aiButton.addEventListener('click', () => {
    aiModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    aiModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == aiModal) {
        aiModal.style.display = 'none';
    }
});

const aiInput = document.getElementById('ai-input');
const sendAiBtn = document.getElementById('send-ai-btn');
const chatArea = document.getElementById('chat-area');

async function sendMessage() {
    const userMessage = aiInput.value.trim();
    if (userMessage === '') return;

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user';
    userMessageDiv.textContent = userMessage;
    chatArea.appendChild(userMessageDiv);
    aiInput.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;

    const typingIndicatorDiv = document.createElement('div');
    typingIndicatorDiv.className = 'typing-indicator';
    typingIndicatorDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    chatArea.appendChild(typingIndicatorDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

    try {
        const response = await fetch('/api/gemini-api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userMessage }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        chatArea.removeChild(typingIndicatorDiv);

        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'chat-message ai';
        aiMessageDiv.textContent = data.response;
        chatArea.appendChild(aiMessageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;

    } catch (error) {
        console.error('Error:', error);
        chatArea.removeChild(typingIndicatorDiv);

        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.className = 'chat-message ai';
        errorMessageDiv.textContent = 'Sorry, something went wrong. Please try again later.';
        chatArea.appendChild(errorMessageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }
}

sendAiBtn.addEventListener('click', sendMessage);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
