/* ============================================
   Script - Cute Prank Website
   ============================================ */

// ==========================================
// 1. PARTICLE SYSTEM (Floating Hearts & Stars)
// ==========================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 40;
        this.emojis = ['💖', '💕', '✨', '⭐', '🌸', '💗', '🌟', '💫', '🦋', '🌷'];

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: this.canvas.height + 20,
            size: Math.random() * 20 + 14,
            speedY: -(Math.random() * 1.2 + 0.3),
            speedX: (Math.random() - 0.5) * 0.8,
            emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
            opacity: Math.random() * 0.6 + 0.2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.02 + 0.01,
        };
    }

    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.createParticle();
            p.y = Math.random() * this.canvas.height;
            this.particles.push(p);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((p, index) => {
            p.y += p.speedY;
            p.wobble += p.wobbleSpeed;
            p.x += p.speedX + Math.sin(p.wobble) * 0.5;
            p.rotation += p.rotationSpeed;

            if (p.y < -30 || p.x < -30 || p.x > this.canvas.width + 30) {
                this.particles[index] = this.createParticle();
                return;
            }

            this.ctx.save();
            this.ctx.globalAlpha = p.opacity;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.font = `${p.size}px serif`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(p.emoji, 0, 0);
            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// 2. CLICK EFFECTS
// ==========================================
function createClickEffect(x, y) {
    const container = document.getElementById('clickEffects');
    const hearts = ['💖', '💕', '✨', '💗', '🌸', '⭐'];
    const count = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = 'click-heart';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
        el.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
        el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        container.appendChild(el);

        setTimeout(() => el.remove(), 1500);
    }
}

document.addEventListener('click', (e) => {
    createClickEffect(e.clientX, e.clientY);
});

// ==========================================
// 3. LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loadingScreen');
        loading.classList.add('hidden');
        setTimeout(() => loading.remove(), 800);
    }, 2200);
});

// ==========================================
// 4. NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link
    updateActiveNavLink();
});

// Hamburger
hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// 5. TYPEWRITER EFFECT (Hero)
// ==========================================
const typewriterTexts = [
    'สวัสดีคนน่ารักกก 💕',
    'คิดถึงบันบันนะะ~ 🥺',
    'เว็บนี้ทำให้บันบันคนเดียวว 💖',
    'บันบันน่ารักมากเลยย ✨',
    'ยิ้มให้หน่อยสิิิ~ 😊'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriterText');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 2500);

// ==========================================
// 6. QUIZ SYSTEM
// ==========================================
let currentQuiz = 0;
const totalQuizzes = 3;

// Initialize quiz dots
const dotsContainer = document.getElementById('quizDots');
for (let i = 0; i < totalQuizzes; i++) {
    const dot = document.createElement('div');
    dot.className = 'quiz-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToQuiz(i);
    dotsContainer.appendChild(dot);
}

// Initialize rating buttons
const ratingContainer = document.getElementById('ratingContainer');
for (let i = 1; i <= 10; i++) {
    const btn = document.createElement('button');
    btn.className = 'rating-btn';
    btn.textContent = i;
    btn.onclick = () => handleRating(i, btn);
    ratingContainer.appendChild(btn);
}

function changeQuiz(direction) {
    const newIndex = currentQuiz + direction;
    if (newIndex >= 0 && newIndex < totalQuizzes) {
        goToQuiz(newIndex);
    }
}

function goToQuiz(index) {
    const cards = document.querySelectorAll('.quiz-card');
    const dots = document.querySelectorAll('.quiz-dot');

    cards[currentQuiz].classList.remove('active');
    dots[currentQuiz].classList.remove('active');

    currentQuiz = index;

    cards[currentQuiz].classList.add('active');
    dots[currentQuiz].classList.add('active');

    document.getElementById('prevQuiz').disabled = currentQuiz === 0;
    document.getElementById('nextQuiz').disabled = currentQuiz === totalQuizzes - 1;
}

// Dodging NO button
function dodgeButton(btn) {
    const container = btn.closest('.quiz-card-inner');
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width - 20;
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX) - maxX / 2;
    const randomY = Math.floor(Math.random() * maxY) - maxY / 2;

    btn.style.position = 'relative';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transition = '0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function handleYes() {
    launchConfetti();
    document.querySelector('[data-quiz="1"] h3').textContent = 'เย้้้้! 🎉 เค้าก็ชอบบันบันเหมือนกันนน 💖💖💖';
    document.querySelector('[data-quiz="1"] .quiz-options').innerHTML = `
        <div style="font-size: 3rem; animation: heartbeat 1s ease-in-out infinite;">
            💖💕💖
        </div>
    `;
    document.querySelector('[data-quiz="1"] .quiz-hint').textContent = 'ขอบคุณนะะะ~ 🥰';
}

// Rating responses
const ratingResponses = {
    1: '😤 โกหก! ให้ใหม่! เลยย',
    2: '😢 ใจร้ายจัง... ครับบันบันน',
    3: '🥺 ให้เค้าแค่นี้เองหรออ',
    4: '😒 แปลกๆ ลองใหม่่่',
    5: '🤔 งืมม... พอรับได้้้',
    6: '😊 เอาวะ ขอบคุณณ~',
    7: '🥰 อิอิ ขอบคุณนะะะ',
    8: '😍 เย้เย้ ชอบคำตอบนี้ครับบ',
    9: '🤩 เกือบได้ 10 แล้ววว',
    10: '💖💖💖 บันบันน่ารักมากกก ให้ 10 เต็มมม 🎉✨'
};

function handleRating(rating, btnEl) {
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
    btnEl.classList.add('selected');
    document.getElementById('ratingResult').textContent = ratingResponses[rating];

    if (rating >= 8) {
        launchConfetti();
    }

    if (rating <= 4) {
        btnEl.classList.remove('selected');
        setTimeout(() => {
            document.getElementById('ratingResult').textContent = '⬆️ ลองเลือกใหม่สิ~ ให้มากกว่านี้ได้น้า 🥺';
        }, 1500);
    }
}

// Date responses
function handleDate(btn, choice) {
    document.querySelectorAll('.date-btn').forEach(b => b.classList.remove('selected'));
    if (btn) btn.classList.add('selected');

    const responses = {
        '🎡 สวนสนุก': '🎡 เย้้เย้้ ไปเล่นเครื่องเล่นที่บันบันอยากเล่นด้วยกันนะะ~ 💕',
        '🏖️ ทะเล': '🏖️ ดูพระอาทิตย์ตกด้วยกันน้าาา~ 🌅💖',
        '🎬 ดูหนัง': '🎬 จะดูหนังผีมั้ยยย~ 😏💕',
        '🍜 กินข้าว': '🍜 ไปกินอะไรอร่อยๆ ด้วยกันนะ~ 🥰',
        '🏡 อยู่บ้าน': '🏡 ดูหนัง กินขนม นอนเล่นนน~  💕',
        '💫 ไปไหนก็ได้': '💫 ไปที่บันบันอยากไปตามใจบันบันเลยย~ 🥺💖'
    };

    const resultEl = document.getElementById('dateResult');
    if (resultEl) resultEl.textContent = responses[choice] || '💕 ไปด้วยกันนะะะ~';
    launchConfetti();
}

// ==========================================
// 7. SECRET MESSAGE / ENVELOPE
// ==========================================
const letterLines = [
    'บันบันรู้มั้ย...',
    'ตั้งแต่วันที่เจอบันบัน',
    'ทุกวันก็ดูสดใสขึ้นเลยย 🌸',
    '',
    'บางทีก็อยากบอกบันบันว่า...',
    'บันบันเป็นหมูนะะ 💖',
    'เค้าล้อเล่นอย่าโกรธกันเลยนะครับบ',
    'น่ารักที่สุดเลยเนี่ยบันบันน ✨',
    '',
    'ป.ล. ยิ้มให้เค้าหน่อยยย 😊',
    'เพราะบันบันน่ารักมากเวลายิ้มม 💕'
];

let envelopeOpened = false;

function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContainer = document.getElementById('letterContainer');

    envelopeContainer.classList.add('opened');
    letterContainer.classList.add('visible');

    // Set date
    const now = new Date();
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    document.getElementById('letterDate').textContent =
        `${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543}`;

    // Typewriter for letter
    const letterBody = document.getElementById('letterBody');
    letterBody.innerHTML = '';

    letterLines.forEach((line, index) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = 'typed-line';
            p.textContent = line || '\u00A0';
            p.style.animationDelay = '0s';
            letterBody.appendChild(p);

            if (index === letterLines.length - 1) {
                launchConfetti();
            }
        }, index * 400);
    });
}

// ==========================================
// 8. REASONS
// ==========================================
const reasons = [
    { emoji: '💖', text: 'ทุกครั้งที่เห็นบันบัน โลกของเค้าก็สดใสขึ้น' },
    { emoji: '🌸', text: 'รอยยิ้มของบันบันทำให้หัวใจพองโต' },
    { emoji: '✨', text: 'บันบันน่ารักที่สุดในสายตาของเค้า' },
    { emoji: '🎀', text: 'บันบันเอาใจใส่และเป็นเอกลักษณ์เหลือเกิน' },
    { emoji: '🎶', text: 'เสียงหัวเราะของบันบันฟังแล้วอุ่นใจ' },
    { emoji: '🌹', text: 'บันบันทำให้เค้าอยากเป็นคนที่ดีขึ้นทุกวัน' },
    { emoji: '🍰', text: 'อยู่กับบันบันแล้ววันธรรมดาก็พิเศษ' },
    { emoji: '💌', text: 'ข้อความนี้เขียนด้วยความรู้สึกจริงใจ' },
    { emoji: '🌙', text: 'คิดถึงบันบันก่อนนอนแล้วยิ้มได้ทุกคืน' },
    { emoji: '🥰', text: 'เค้าชอบบันบันมากกว่าคำพูดจะบอกได้' }
];

const reasonsGrid = document.getElementById('reasonsGrid');
if (reasonsGrid) {
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="reason-number">${index + 1}</div>
            <span class="reason-emoji">${reason.emoji}</span>
            <p class="reason-text">${reason.text}</p>
        `;
        reasonsGrid.appendChild(card);
    });
}

// Intersection Observer for reasons
const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reason-card').forEach(card => {
    reasonObserver.observe(card);
});

// ==========================================
// 9. FORTUNE TELLER
// ==========================================
const fortunes = [
    { emoji: '💕', title: 'ดวงความรัก', text: 'มีคนแอบชอบเธออยู่นะ... ลองมองรอบๆ ตัวสิ~ อาจจะใกล้กว่าที่คิด 💖' },
    { emoji: '💘', title: 'คนนี้แหละใช่', text: 'คนที่ส่งเว็บนี้ให้บันบันน... เค้าชอบบันบันจริงๆ นะะะ 🥰' },
    { emoji: '🌟', title: 'ดวงดีมาก!', text: 'วันนี้ดวงดี๊ดี! โชคดีเรื่องความรักกก~ ✨' },
    { emoji: '🔮', title: 'ลึกลับ~', text: 'มีเซอร์ไพรส์กำลังจะเกิดขึ้นเร็วๆ นี้... เตรียมตัวไว้นะะะ 🎁' },
    { emoji: '💫', title: 'ดาวเรียงตัว', text: 'ดวงดาวบอกว่า... คนที่เหมาะกับบันบันกำลังอ่านข้อความนี้อยู่ 🌙' },
    { emoji: '🌹', title: 'ดอกกุหลาบ', text: 'ความรักกำลังบานสะพรั่งเลยย~  🌸' },
    { emoji: '💝', title: 'ของขวัญพิเศษ', text: 'มีคนอยากให้บันบันมีความสุข... คนนั้นส่งเว็บนี้มาให้บันบันไงครับบ~ 🎀' },
];

let isShaking = false;

function shakeFortune() {
    if (isShaking) return;
    isShaking = true;

    const ball = document.getElementById('fortuneBall');
    const card = document.getElementById('fortuneCard');

    ball.classList.add('shaking');
    card.classList.remove('visible');

    setTimeout(() => {
        ball.classList.remove('shaking');

        const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        document.getElementById('fortuneEmoji').textContent = fortune.emoji;
        document.getElementById('fortuneTitle').textContent = fortune.title;
        document.getElementById('fortuneText').textContent = fortune.text;
        document.getElementById('fortuneNumber').textContent = fortune.emoji;

        card.classList.add('visible');
        launchConfetti();

        isShaking = false;
    }, 800);
}

// ==========================================
// 10. CONFETTI SYSTEM
// ==========================================
class ConfettiSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isActive = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    launch() {
        this.isActive = true;
        this.particles = [];

        const colors = ['#ff69b4', '#ff85c0', '#b37feb', '#9254de', '#ffd700', '#ff6b9d', '#c44dff'];

        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 3 + 2,
                speedX: (Math.random() - 0.5) * 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
            });
        }

        this.animate();
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let activeCount = 0;

        this.particles.forEach(p => {
            if (p.opacity <= 0) return;
            activeCount++;

            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            p.speedY += 0.05; // gravity

            if (p.y > this.canvas.height * 0.8) {
                p.opacity -= 0.02;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            this.ctx.restore();
        });

        if (activeCount > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

const confetti = new ConfettiSystem('confettiCanvas');

function launchConfetti() {
    confetti.launch();
}

// ==========================================
// ==========================================
// 11. MUSIC PLAYER (HTML5 Audio)
// ==========================================
class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.isMuted = false;
        this.volume = 0.7;
        this.currentSongIndex = -1;

        // 🎵 ใส่ลิ้งก์เพลง (URL ของไฟล์ .mp3 หรือไฟล์เสียงอื่นๆ ที่โหลดได้โดยตรง) ไว้ที่นี่ได้เลยครับ
        this.songs = [
            {
                title: 'RIFLE X SARAN - ที่สุดเลย (Lyric Video)',
                artist: 'เพลงที่1ครับบันบัน',
                emoji: '🌸',
                url: 'https://files.catbox.moe/4mkfw9.mp3'
            },
            {
                title: 'YOUNGOHM - Jert-jarat (Official Lyric Video)',
                artist: 'เพลงที่2ครับบันบัน',
                emoji: '💖',
                url: 'https://files.catbox.moe/qcjroe.mp3'
            },
            {
                title: 'Love You 24 Hrs Loey Der Ja w/ The Ge (COVER)',
                artist: 'เพลงที่3ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/11c76s.mp3'
            }
        ];

        this.initAudio();
        this.initUI();
        this.bindEvents();
    }

    initAudio() {
        this.audio.volume = this.volume;

        // When song ends, play next
        this.audio.addEventListener('ended', () => {
            this.nextSong();
        });
    }

    initUI() {
        const playlist = document.getElementById('playlist');
        if (!playlist) return;
        playlist.innerHTML = ''; // Clear existing
        this.songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.onclick = () => this.playSong(index);
            li.innerHTML = `
                <span class="playlist-item-icon">${song.emoji}</span>
                <div class="playlist-item-info">
                    <p class="playlist-item-title">${song.title}</p>
                    <p class="playlist-item-duration">${song.artist}</p>
                </div>
            `;
            playlist.appendChild(li);
        });
    }

    bindEvents() {
        const attach = (id, event, handler) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener(event, handler);
        };

        attach('musicToggleBtn', 'click', () => this.togglePanel());
        attach('closeMusicPanel', 'click', () => this.togglePanel());
        attach('playPauseBtn', 'click', () => this.togglePlayPause());
        attach('prevBtn', 'click', () => this.prevSong());
        attach('nextBtn', 'click', () => this.nextSong());
        attach('muteBtn', 'click', () => this.toggleMute());
        attach('volumeSlider', 'input', (e) => this.setVolume(e.target.value / 100));
    }

    togglePanel() {
        const panel = document.getElementById('musicPanel');
        if (panel) panel.classList.toggle('active');
    }

    playSong(index) {
        if (index < 0 || index >= this.songs.length) return;

        // If it's a new song, change source
        if (this.currentSongIndex !== index) {
            this.currentSongIndex = index;
            const song = this.songs[index];
            this.audio.src = song.url;
            this.audio.load();

            // Update UI
            const titleEl = document.getElementById('songTitle');
            const artistEl = document.getElementById('songArtist');
            const albumEl = document.getElementById('albumArt');

            if (titleEl) titleEl.textContent = song.title;
            if (artistEl) artistEl.textContent = song.artist;
            if (albumEl) albumEl.querySelector('span').textContent = song.emoji;

            // Highlight active playlist item
            document.querySelectorAll('.playlist-item').forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        } else {
            // Restart if it has ended
            if (this.audio.duration && this.audio.currentTime >= this.audio.duration) {
                this.audio.currentTime = 0;
            }
        }

        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.isPlaying = true;
                document.getElementById('playPauseBtn').textContent = '⏸';
                document.getElementById('albumArt').classList.add('spinning');
                document.getElementById('musicToggleBtn').classList.add('playing');
            }).catch(err => {
                console.error("Audio play failed:", err);
                this.isPlaying = false;
            });
        }
    }

    pauseSong() {
        this.audio.pause();
        this.isPlaying = false;
        document.getElementById('playPauseBtn').textContent = '▶';
        document.getElementById('albumArt').classList.remove('spinning');
        document.getElementById('musicToggleBtn').classList.remove('playing');
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pauseSong();
        } else if (this.currentSongIndex >= 0) {
            this.playSong(this.currentSongIndex);
        } else {
            this.playSong(0); // Start first song if nothing selected
        }
    }

    prevSong() {
        if (this.songs.length === 0) return;
        const index = this.currentSongIndex <= 0 ? this.songs.length - 1 : this.currentSongIndex - 1;
        this.playSong(index);
    }

    nextSong() {
        if (this.songs.length === 0) return;
        const index = (this.currentSongIndex + 1) % this.songs.length;
        this.playSong(index);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        document.getElementById('muteBtn').textContent = this.isMuted ? '🔇' : '🔊';
    }

    setVolume(value) {
        this.volume = value;
        this.audio.volume = value;
        if (this.isMuted && value > 0) {
            this.toggleMute();
        }
    }
}

// ==========================================
// 13. PROPOSAL COUNTDOWN & LOGIC
// ==========================================
function initProposalCountdown() {
    // Target date: 5th of next month (July 5th, 2026)
    const targetDate = new Date('2026-07-05T00:00:00').getTime();

    // Set UI date text
    const targetElement = document.getElementById('lockTargetDate');
    if (targetElement) {
        targetElement.textContent = 'ปลดล็อกวันที่: 5 กรกฎาคม 2569';
    }

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(timer);
            unlockProposal();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const cdDays = document.getElementById('countDays');
        if (cdDays) cdDays.textContent = days.toString().padStart(2, '0');

        const cdHours = document.getElementById('countHours');
        if (cdHours) cdHours.textContent = hours.toString().padStart(2, '0');

        const cdMinutes = document.getElementById('countMinutes');
        if (cdMinutes) cdMinutes.textContent = minutes.toString().padStart(2, '0');

        const cdSeconds = document.getElementById('countSeconds');
        if (cdSeconds) cdSeconds.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

function unlockProposal() {
    const lockOverlay = document.getElementById('proposalLockOverlay');
    const lockIcon = document.getElementById('lockIcon');
    const content = document.getElementById('proposalContent');

    if (!lockOverlay || !content) return;

    if (lockIcon) lockIcon.classList.add('unlocking');

    setTimeout(() => {
        lockOverlay.classList.add('hidden');
        content.classList.add('visible');
        launchConfetti();
    }, 1500);
}

function nextProposalStep() {
    const current = document.querySelector('.proposal-step.active');
    if (!current) return;
    const next = current.nextElementSibling;

    if (next) {
        current.classList.remove('active');
        next.classList.add('active');
    }
}

function dodgeProposalNo(btn) {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 100;

    btn.style.position = 'absolute';
    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    btn.style.transition = '0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function handleProposalYes() {
    nextProposalStep();
    launchConfetti();

    // Set anniversary date
    const now = new Date();
    const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    const el = document.getElementById('anniversaryDate');
    if (el) {
        el.textContent = `${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543}`;
    }
}

// ==========================================
// 14. INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Start particle system
    new ParticleSystem('particleCanvas');

    // Initialize music player
    window.musicPlayer = new MusicPlayer();

    // Start countdown for proposal
    initProposalCountdown();

    // Auto-play music on first user interaction
    const startAudio = () => {
        if (window.musicPlayer && !window.musicPlayer.isPlaying && window.musicPlayer.currentSongIndex === -1) {
            window.musicPlayer.playSong(0);
        }
    };
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
});
