/* ============================================
   Script - Cute Prank Website
   ============================================ */

// 📥 วางลิงก์ Discord Webhook ของคุณที่นี่ (สำหรับรับข้อความส่งจดหมาย)
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1521161739843010630/BNOeX7_NgZs27YQBi_PVf4mwU6a7W45dqP4uwBa4pUw9KtQAeIfit26-gLfE2Ov_DZnW';

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
            },
            {
                title: 'ข้างกาย',
                artist: 'เพลงที่4ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/oym1pt.mp3'
            },
            {
                title: 'มีแต่เธอ',
                artist: 'เพลงที่5ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/vfxcm6.mp3'
            },
            {
                title: 'Extraordinary',
                artist: 'เพลงที่6ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/higr7h.mp3'
            },
            {
                title: 'คนโปรด',
                artist: 'เพลงที่7ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/0rc84j.mp3'
            },
            {
                title: 'Sunkissed',
                artist: 'เพลงที่8ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/g212ao.mp3'
            },
            {
                title: 'Luxury',
                artist: 'เพลงที่9ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/a1ktxm.mp3'
            },
            {
                title: 'Pink',
                artist: 'เพลงที่10ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/psazoz.mp3'
            },
            {
                title: 'หินหยดลงนำ',
                artist: 'เพลงที่11ครับบบันบัน',
                emoji: '⭐',
                url: 'https://files.catbox.moe/ivnwbb.mp3'
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

        // Update progress bar
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

        this.audio.addEventListener('loadedmetadata', () => {
            this.updateProgress();
        });
    }

    updateProgress() {
        const progressBar = document.getElementById('progressBar');
        const timeDisplay = document.getElementById('timeDisplay');
        if (!progressBar || !timeDisplay) return;

        const currentTime = this.audio.currentTime || 0;
        const duration = this.audio.duration || 0;

        if (duration > 0) {
            progressBar.value = (currentTime / duration) * 100;
        } else {
            progressBar.value = 0;
        }

        const formatTime = (secs) => {
            const m = Math.floor(secs / 60);
            const s = Math.floor(secs % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        };

        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
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
        
        attach('progressBar', 'input', (e) => {
            const duration = this.audio.duration || 0;
            this.audio.currentTime = (e.target.value / 100) * duration;
        });
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
    // Target date: July 5th, 2026 at 00:00:00 (Month 6 is July since 0-indexed)
    const targetDate = new Date(2026, 6, 5, 0, 0, 0).getTime();

    // Set UI date text
    const targetElement = document.getElementById('lockTargetDate');
    if (targetElement) {
        targetElement.textContent = 'ปลดล็อกวันที่: 5 กรกฎาคม 2569';
    }

    const checkDistance = (firstLoad = false) => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            unlockProposal(firstLoad); // firstLoad means instant
            return true;
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
        
        return false;
    };

    // Check immediately on load
    const isUnlocked = checkDistance(true);
    if (isUnlocked) return;

    const timer = setInterval(() => {
        if (checkDistance(false)) {
            clearInterval(timer);
        }
    }, 1000);
}

function unlockProposal(instant = false) {
    const lockOverlay = document.getElementById('proposalLockOverlay');
    const lockIcon = document.getElementById('lockIcon');
    const content = document.getElementById('proposalContent');

    if (!lockOverlay || !content) return;

    if (instant) {
        lockOverlay.classList.add('hidden');
        content.classList.add('visible');
        return;
    }

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

// ==========================================
// 15. DISCORD WEBHOOK & GAME MODALS ENGINE
// ==========================================

let activeGame = null;

function openGameModal(gameId) {
    const overlay = document.getElementById('gameModalOverlay');
    if (!overlay) return;
    
    overlay.classList.add('active');
    
    // Deactivate previous modal cards
    document.querySelectorAll('.game-modal-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Activate target card
    const targetCard = document.getElementById(`gameModal-${gameId}`);
    if (targetCard) {
        targetCard.classList.add('active');
    }
    
    activeGame = gameId;
    
    // Initialize game states
    if (gameId === 'memory') {
        initMemoryGame();
    } else if (gameId === 'catcher') {
        initCatcherGame();
    } else if (gameId === 'flappy') {
        initFlappyGame();
    } else if (gameId === 'tictactoe') {
        initTttGame();
    } else if (gameId === 'blessing') {
        initBlessingBox();
    } else if (gameId === 'simon') {
        initSimonGame();
    } else if (gameId === 'snake') {
        initSnakeGame();
    } else if (gameId === 'breaker') {
        initBreakerGame();
    } else if (gameId === 'wordsearch') {
        initWordsearchGame();
    } else if (gameId === 'pong') {
        initPongGame();
    }
}

function closeGameModal() {
    const overlay = document.getElementById('gameModalOverlay');
    if (overlay) overlay.classList.remove('active');
    
    // Deactivate all modal cards
    document.querySelectorAll('.game-modal-card').forEach(card => {
        card.classList.remove('active');
    });
    
    stopAllGames();
}

function stopAllGames() {
    activeGame = null;
    
    // Stop Heart Catcher
    if (catcherAnimationId) {
        cancelAnimationFrame(catcherAnimationId);
        catcherAnimationId = null;
    }
    
    // Stop Flappy Heart
    if (flappyAnimationId) {
        cancelAnimationFrame(flappyAnimationId);
        flappyAnimationId = null;
    }
    
    // Stop Snake
    if (snakeGameInterval) {
        clearInterval(snakeGameInterval);
        snakeGameInterval = null;
    }
    
    // Stop Breaker
    if (breakerAnimationId) {
        cancelAnimationFrame(breakerAnimationId);
        breakerAnimationId = null;
    }
    
    // Stop Pong
    if (pongAnimationId) {
        cancelAnimationFrame(pongAnimationId);
        pongAnimationId = null;
    }
    
    // Clean up keyboard events
    window.removeEventListener('keydown', handleCatcherKeyDown);
    window.removeEventListener('keyup', handleCatcherKeyUp);
    window.removeEventListener('keydown', handleFlappyJump);
    window.removeEventListener('keydown', handleSnakeKeyDown);
    window.removeEventListener('keydown', handleBreakerKeyDown);
    window.removeEventListener('keyup', handleBreakerKeyUp);
    window.removeEventListener('keydown', handlePongKeyDown);
    window.removeEventListener('keyup', handlePongKeyUp);
}

// --- Game 1: Memory Match ---
let memoryCards = [];
let memoryFlipped = [];
let memoryMatchesCount = 0;
let memoryFlipsCount = 0;
const memoryEmojis = ['💖', '🍭', '🧸', '🍰', '🌸', '🦄', '🍩', '🎀'];

function initMemoryGame() {
    memoryFlipped = [];
    memoryMatchesCount = 0;
    memoryFlipsCount = 0;
    
    const flipsEl = document.getElementById('memoryFlips');
    const matchesEl = document.getElementById('memoryMatches');
    const msgEl = document.getElementById('memoryWinMessage');
    
    if (flipsEl) flipsEl.textContent = '0';
    if (matchesEl) matchesEl.textContent = '0';
    if (msgEl) msgEl.classList.remove('active');
    
    // Double the emojis to make pairs
    const deck = [...memoryEmojis, ...memoryEmojis];
    // Shuffle deck
    deck.sort(() => Math.random() - 0.5);
    
    const board = document.getElementById('memoryBoard');
    if (!board) return;
    board.innerHTML = '';
    
    deck.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        
        card.innerHTML = `
            <div class="memory-card-front">❓</div>
            <div class="memory-card-back">${emoji}</div>
        `;
        
        card.addEventListener('click', () => handleMemoryCardClick(card));
        board.appendChild(card);
    });
}

function handleMemoryCardClick(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || memoryFlipped.length >= 2) {
        return;
    }
    
    card.classList.add('flipped');
    memoryFlipped.push(card);
    
    if (memoryFlipped.length === 2) {
        memoryFlipsCount++;
        const flipsEl = document.getElementById('memoryFlips');
        if (flipsEl) flipsEl.textContent = memoryFlipsCount;
        
        const card1 = memoryFlipped[0];
        const card2 = memoryFlipped[1];
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found!
            card1.classList.add('matched');
            card2.classList.add('matched');
            memoryMatchesCount++;
            const matchesEl = document.getElementById('memoryMatches');
            if (matchesEl) matchesEl.textContent = memoryMatchesCount;
            memoryFlipped = [];
            
            if (memoryMatchesCount === 8) {
                // Game Won!
                setTimeout(() => {
                    const msg = document.getElementById('memoryWinMessage');
                    if (msg) msg.classList.add('active');
                    launchConfetti();
                }, 500);
            }
        } else {
            // No match, flip back (Faster match timing)
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                memoryFlipped = [];
            }, 600);
        }
    }
}

function resetMemoryGame() {
    initMemoryGame();
}

// --- Game 2: Heart Catcher ---
let catcherCanvas = null, catcherCtx = null;
let catcherScore = 0;
let catcherMissed = 0;
let catcherBasket = { x: 175, y: 340, width: 90, height: 18, speed: 15 };
let catcherHearts = [];
let catcherAnimationId = null;
let catcherKeys = {};

function initCatcherGame() {
    catcherCanvas = document.getElementById('catcherCanvas');
    if (!catcherCanvas) return;
    catcherCtx = catcherCanvas.getContext('2d');
    
    catcherScore = 0;
    catcherMissed = 0;
    catcherHearts = [];
    catcherBasket.x = catcherCanvas.width / 2 - catcherBasket.width / 2;
    catcherBasket.y = catcherCanvas.height - 40;
    catcherKeys = {};
    
    const scoreEl = document.getElementById('catcherScore');
    const missedEl = document.getElementById('catcherMissed');
    const msgEl = document.getElementById('catcherMessage');
    
    if (scoreEl) scoreEl.textContent = '0';
    if (missedEl) missedEl.textContent = '0';
    if (msgEl) msgEl.classList.remove('active');
    
    // Keyboard events
    window.removeEventListener('keydown', handleCatcherKeyDown);
    window.addEventListener('keydown', handleCatcherKeyDown);
    window.removeEventListener('keyup', handleCatcherKeyUp);
    window.addEventListener('keyup', handleCatcherKeyUp);
    
    // UI controls replacement (clearing listeners)
    const leftBtn = document.getElementById('catcherLeftBtn');
    const rightBtn = document.getElementById('catcherRightBtn');
    if (leftBtn && rightBtn) {
        const newLeft = leftBtn.cloneNode(true);
        const newRight = rightBtn.cloneNode(true);
        leftBtn.replaceWith(newLeft);
        rightBtn.replaceWith(newRight);
        
        newLeft.addEventListener('mousedown', () => { catcherKeys['ArrowLeft'] = true; });
        newLeft.addEventListener('mouseup', () => { catcherKeys['ArrowLeft'] = false; });
        newLeft.addEventListener('touchstart', (e) => { e.preventDefault(); catcherKeys['ArrowLeft'] = true; });
        newLeft.addEventListener('touchend', (e) => { e.preventDefault(); catcherKeys['ArrowLeft'] = false; });
        
        newRight.addEventListener('mousedown', () => { catcherKeys['ArrowRight'] = true; });
        newRight.addEventListener('mouseup', () => { catcherKeys['ArrowRight'] = false; });
        newRight.addEventListener('touchstart', (e) => { e.preventDefault(); catcherKeys['ArrowRight'] = true; });
        newRight.addEventListener('touchend', (e) => { e.preventDefault(); catcherKeys['ArrowRight'] = false; });
    }
    
    // Mouse and Touch listeners
    catcherCanvas.addEventListener('touchmove', handleCatcherTouch, { passive: false });
    catcherCanvas.addEventListener('mousemove', handleCatcherMouseMove);
    
    if (catcherAnimationId) {
        cancelAnimationFrame(catcherAnimationId);
    }
    catcherGameLoop();
}

function handleCatcherKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        catcherKeys[e.key] = true;
        e.preventDefault();
    }
}

function handleCatcherKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        catcherKeys[e.key] = false;
        e.preventDefault();
    }
}

function handleCatcherTouch(e) {
    if (activeGame !== 'catcher') return;
    if (e.touches.length > 0) {
        e.preventDefault();
        const rect = catcherCanvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const scaleX = catcherCanvas.width / rect.width;
        catcherBasket.x = (touchX * scaleX) - catcherBasket.width / 2;
        keepBasketInBounds();
    }
}

function handleCatcherMouseMove(e) {
    if (activeGame !== 'catcher') return;
    const rect = catcherCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scaleX = catcherCanvas.width / rect.width;
    catcherBasket.x = (mouseX * scaleX) - catcherBasket.width / 2;
    keepBasketInBounds();
}

function keepBasketInBounds() {
    if (catcherBasket.x < 0) catcherBasket.x = 0;
    if (catcherBasket.x > catcherCanvas.width - catcherBasket.width) {
        catcherBasket.x = catcherCanvas.width - catcherBasket.width;
    }
}

function catcherGameLoop() {
    if (activeGame !== 'catcher') return;
    
    updateCatcher();
    drawCatcher();
    
    if (catcherScore >= 15) {
        showCatcherEndMessage(true);
        return;
    }
    
    if (catcherMissed >= 3) {
        showCatcherEndMessage(false);
        return;
    }
    
    catcherAnimationId = requestAnimationFrame(catcherGameLoop);
}

function updateCatcher() {
    if (catcherKeys['ArrowLeft']) catcherBasket.x -= catcherBasket.speed;
    if (catcherKeys['ArrowRight']) catcherBasket.x += catcherBasket.speed;
    keepBasketInBounds();
    
    // Spawn hearts (Faster spawn rate)
    if (Math.random() < 0.05) {
        catcherHearts.push({
            x: Math.random() * (catcherCanvas.width - 24) + 12,
            y: -20,
            size: Math.random() * 8 + 16,
            speedY: Math.random() * 3 + 4.5, // Faster drop speed
            emoji: ['💖', '💗', '💝', '💕'][Math.floor(Math.random() * 4)]
        });
    }
    
    // Update hearts
    for (let i = catcherHearts.length - 1; i >= 0; i--) {
        const heart = catcherHearts[i];
        heart.y += heart.speedY;
        
        // Collision checks
        if (
            heart.y + heart.size/2 >= catcherBasket.y &&
            heart.x >= catcherBasket.x - 10 &&
            heart.x <= catcherBasket.x + catcherBasket.width + 10 &&
            heart.y <= catcherBasket.y + catcherBasket.height
        ) {
            catcherScore++;
            const scoreEl = document.getElementById('catcherScore');
            if (scoreEl) scoreEl.textContent = catcherScore;
            catcherHearts.splice(i, 1);
            continue;
        }
        
        // Off screen check
        if (heart.y > catcherCanvas.height) {
            catcherMissed++;
            const missedEl = document.getElementById('catcherMissed');
            if (missedEl) missedEl.textContent = catcherMissed;
            catcherHearts.splice(i, 1);
        }
    }
}

function drawCatcher() {
    catcherCtx.clearRect(0, 0, catcherCanvas.width, catcherCanvas.height);
    
    // Basket base
    catcherCtx.fillStyle = 'rgba(255, 105, 180, 0.4)';
    catcherCtx.strokeStyle = '#ff85c0';
    catcherCtx.lineWidth = 2;
    catcherCtx.beginPath();
    catcherCtx.roundRect(catcherBasket.x, catcherBasket.y, catcherBasket.width, catcherBasket.height, 6);
    catcherCtx.fill();
    catcherCtx.stroke();
    
    // Cute emojis in basket
    catcherCtx.font = '18px serif';
    catcherCtx.textAlign = 'center';
    catcherCtx.textBaseline = 'middle';
    catcherCtx.fillText('🧺', catcherBasket.x + catcherBasket.width / 2, catcherBasket.y + catcherBasket.height / 2 - 2);
    
    // Hearts
    catcherHearts.forEach(heart => {
        catcherCtx.font = `${heart.size}px serif`;
        catcherCtx.fillText(heart.emoji, heart.x, heart.y);
    });
}

function showCatcherEndMessage(win) {
    const msg = document.getElementById('catcherMessage');
    const title = document.getElementById('catcherMessageTitle');
    const desc = document.getElementById('catcherMessageDesc');
    if (!msg) return;
    
    if (win) {
        if (title) title.textContent = '🎉 ยินดีด้วย! คุณชนะแล้ว';
        if (desc) desc.textContent = 'คุณเก็บสะสมหัวใจได้ครบทั้งหมดเรียบร้อย 🎉';
        launchConfetti();
    } else {
        if (title) title.textContent = '😢 เกมจบแล้ว!';
        if (desc) desc.textContent = 'หัวใจตกร่วงพื้นเกินกำหนด พยายามใหม่อีกครั้งนะ';
    }
    
    msg.classList.add('active');
    
    window.removeEventListener('keydown', handleCatcherKeyDown);
    window.removeEventListener('keyup', handleCatcherKeyUp);
}

function resetCatcherGame() {
    initCatcherGame();
}

// --- Game 3: Flappy Heart ---
let flappyCanvas = null, flappyCtx = null;
let flappyHeart = { x: 60, y: 150, radius: 10, gravity: 0.35, velocity: 0, jump: -5.8 };
let flappyPipes = [];
let flappyScore = 0;
let flappyHighScore = parseInt(localStorage.getItem('flappy_highscore') || '0');
let flappyAnimationId = null;
let flappyGameOver = false;

function initFlappyGame() {
    flappyCanvas = document.getElementById('flappyCanvas');
    if (!flappyCanvas) return;
    flappyCtx = flappyCanvas.getContext('2d');
    
    flappyScore = 0;
    flappyGameOver = false;
    flappyHeart.y = 150;
    flappyHeart.velocity = 0;
    flappyPipes = [];
    
    const scoreEl = document.getElementById('flappyScore');
    const highEl = document.getElementById('flappyHighScore');
    const msgEl = document.getElementById('flappyMessage');
    
    if (scoreEl) scoreEl.textContent = '0';
    if (highEl) highEl.textContent = flappyHighScore;
    if (msgEl) msgEl.classList.remove('active');
    
    window.removeEventListener('keydown', handleFlappyJump);
    window.addEventListener('keydown', handleFlappyJump);
    
    flappyCanvas.replaceWith(flappyCanvas.cloneNode(true));
    flappyCanvas = document.getElementById('flappyCanvas');
    flappyCtx = flappyCanvas.getContext('2d');
    
    flappyCanvas.addEventListener('click', triggerFlappyJump);
    flappyCanvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        triggerFlappyJump();
    });
    
    // Spawn first pipe
    spawnPipe();
    
    if (flappyAnimationId) {
        cancelAnimationFrame(flappyAnimationId);
    }
    flappyGameLoop();
}

function handleFlappyJump(e) {
    if (e.code === 'Space' || e.key === ' ' || e.key === 'ArrowUp') {
        triggerFlappyJump();
        e.preventDefault();
    }
}

function triggerFlappyJump() {
    if (flappyGameOver) return;
    flappyHeart.velocity = flappyHeart.jump;
}

function spawnPipe() {
    const gap = 130;
    const minHeight = 50;
    const maxHeight = flappyCanvas.height - gap - minHeight;
    const height = Math.random() * (maxHeight - minHeight) + minHeight;
    
    flappyPipes.push({
        x: flappyCanvas.width,
        topHeight: height,
        bottomY: height + gap,
        width: 52,
        passed: false
    });
}

function flappyGameLoop() {
    if (activeGame !== 'flappy') return;
    
    updateFlappy();
    drawFlappy();
    
    if (flappyGameOver) {
        showFlappyEndMessage();
        return;
    }
    
    flappyAnimationId = requestAnimationFrame(flappyGameLoop);
}

function updateFlappy() {
    flappyHeart.velocity += flappyHeart.gravity;
    flappyHeart.y += flappyHeart.velocity;
    
    // Floor/Ceiling check
    if (flappyHeart.y + flappyHeart.radius > flappyCanvas.height || flappyHeart.y - flappyHeart.radius < 0) {
        flappyGameOver = true;
    }
    
    // Spawning new pipes
    if (flappyPipes.length > 0 && flappyPipes[flappyPipes.length - 1].x < flappyCanvas.width - 200) {
        spawnPipe();
    }
    
    // Move pipes (Faster scroll speed)
    for (let i = flappyPipes.length - 1; i >= 0; i--) {
        const pipe = flappyPipes[i];
        pipe.x -= 3.2; // horizontal speed
        
        if (pipe.x + pipe.width < 0) {
            flappyPipes.splice(i, 1);
            continue;
        }
        
        // Collisions
        if (
            flappyHeart.x + flappyHeart.radius > pipe.x &&
            flappyHeart.x - flappyHeart.radius < pipe.x + pipe.width
        ) {
            if (
                flappyHeart.y - flappyHeart.radius < pipe.topHeight ||
                flappyHeart.y + flappyHeart.radius > pipe.bottomY
            ) {
                flappyGameOver = true;
            }
        }
        
        // Points scoring
        if (!pipe.passed && pipe.x + pipe.width / 2 < flappyHeart.x) {
            pipe.passed = true;
            flappyScore++;
            const scoreEl = document.getElementById('flappyScore');
            if (scoreEl) scoreEl.textContent = flappyScore;
            
            if (flappyScore > flappyHighScore) {
                flappyHighScore = flappyScore;
                localStorage.setItem('flappy_highscore', flappyHighScore);
                const highEl = document.getElementById('flappyHighScore');
                if (highEl) highEl.textContent = flappyHighScore;
            }
        }
    }
}

function drawFlappy() {
    flappyCtx.clearRect(0, 0, flappyCanvas.width, flappyCanvas.height);
    
    // Draw pipes
    flappyPipes.forEach(pipe => {
        // Top pipe
        flappyCtx.fillStyle = 'rgba(146, 84, 222, 0.4)';
        flappyCtx.strokeStyle = '#d3adf7';
        flappyCtx.lineWidth = 1.5;
        flappyCtx.beginPath();
        flappyCtx.roundRect(pipe.x, 0, pipe.width, pipe.topHeight, [0, 0, 6, 6]);
        flappyCtx.fill();
        flappyCtx.stroke();
        
        // Bottom pipe
        flappyCtx.fillStyle = 'rgba(146, 84, 222, 0.4)';
        flappyCtx.strokeStyle = '#d3adf7';
        flappyCtx.lineWidth = 1.5;
        flappyCtx.beginPath();
        flappyCtx.roundRect(pipe.x, pipe.bottomY, pipe.width, flappyCanvas.height - pipe.bottomY, [6, 6, 0, 0]);
        flappyCtx.fill();
        flappyCtx.stroke();
    });
    
    // Draw flying heart
    flappyCtx.save();
    flappyCtx.translate(flappyHeart.x, flappyHeart.y);
    
    const wingsMotion = Math.sin(Date.now() * 0.015) * 6;
    flappyCtx.font = '22px serif';
    flappyCtx.textAlign = 'center';
    flappyCtx.textBaseline = 'middle';
    
    // Wing left, Heart center, Wing right
    flappyCtx.fillText('💸', wingsMotion > 0 ? -12 : -10, -wingsMotion / 2);
    flappyCtx.fillText('💖', 0, 0);
    flappyCtx.restore();
}

function showFlappyEndMessage() {
    const msg = document.getElementById('flappyMessage');
    const title = document.getElementById('flappyMessageTitle');
    const desc = document.getElementById('flappyMessageDesc');
    if (!msg) return;
    
    if (title) title.textContent = '💥 เกมจบแล้ว! (ทำได้ ' + flappyScore + ' คะแนน)';
    if (desc) desc.textContent = 'พยายามหลบหลีกสิ่งกีดขวางในการเล่นรอบถัดไปนะ';
    
    msg.classList.add('active');
    
    window.removeEventListener('keydown', handleFlappyJump);
}

function resetFlappyGame() {
    initFlappyGame();
}

// --- Game 4: Tic-Tac-Toe ---
let tttBoardState = ['', '', '', '', '', '', '', '', ''];
let tttGameActive = true;
const tttWinConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function initTttGame() {
    tttBoardState = ['', '', '', '', '', '', '', '', ''];
    tttGameActive = true;
    
    const msgEl = document.getElementById('tttMessage');
    if (msgEl) msgEl.classList.remove('active');
    
    const cells = document.querySelectorAll('.ttt-cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'ttt-cell';
        // Clear all listeners by replacing
        cell.replaceWith(cell.cloneNode(true));
    });
    
    const newCells = document.querySelectorAll('.ttt-cell');
    newCells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleTttCellClick(cell, index));
    });
}

function handleTttCellClick(cell, index) {
    if (tttBoardState[index] !== '' || !tttGameActive) return;
    
    // User Move
    tttBoardState[index] = 'X';
    cell.textContent = '💖';
    cell.classList.add('player-move');
    
    if (checkTttWin('X')) {
        showTttResult('win');
        return;
    }
    
    if (tttBoardState.every(c => c !== '')) {
        showTttResult('draw');
        return;
    }
    
    // Block input and computer move (Faster AI response)
    tttGameActive = false;
    setTimeout(() => {
        makeComputerMove();
    }, 150);
}

function makeComputerMove() {
    if (!activeGame || activeGame !== 'tictactoe') return;
    
    let move = findWinningMove('O'); // Check if computer can win
    if (move === null) {
        move = findWinningMove('X'); // Check if player can be blocked
    }
    if (move === null) {
        if (tttBoardState[4] === '') {
            move = 4; // Center preference
        }
    }
    if (move === null) {
        const emptyCells = tttBoardState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
    }
    
    if (move !== null) {
        tttBoardState[move] = 'O';
        const cell = document.querySelector(`.ttt-cell[data-index="${move}"]`);
        if (cell) {
            cell.textContent = '☁️';
            cell.classList.add('computer-move');
        }
        
        if (checkTttWin('O')) {
            showTttResult('lose');
            return;
        }
    }
    
    if (tttBoardState.every(c => c !== '')) {
        showTttResult('draw');
        return;
    }
    
    tttGameActive = true;
}

function findWinningMove(player) {
    for (let cond of tttWinConditions) {
        const [a, b, c] = cond;
        if (tttBoardState[a] === player && tttBoardState[b] === player && tttBoardState[c] === '') return c;
        if (tttBoardState[a] === player && tttBoardState[c] === player && tttBoardState[b] === '') return b;
        if (tttBoardState[b] === player && tttBoardState[c] === player && tttBoardState[a] === '') return a;
    }
    return null;
}

function checkTttWin(player) {
    return tttWinConditions.some(condition => {
        return condition.every(index => tttBoardState[index] === player);
    });
}

function showTttResult(result) {
    tttGameActive = false;
    const msg = document.getElementById('tttMessage');
    const title = document.getElementById('tttMessageTitle');
    const desc = document.getElementById('tttMessageDesc');
    if (!msg) return;
    
    if (result === 'win') {
        if (title) title.textContent = '🎉 ยินดีด้วย! คุณชนะแล้ว';
        if (desc) desc.textContent = 'คุณเอาชนะระบบคอมพิวเตอร์ในรอบนี้ได้สำเร็จ 🎉';
        launchConfetti();
    } else if (result === 'lose') {
        if (title) title.textContent = '💻 คอมพิวเตอร์ชนะ!';
        if (desc) desc.textContent = 'คอมพิวเตอร์เป็นฝ่ายชนะในรอบนี้ ลองเล่นอีกครั้งเพื่อแก้มือนะ';
    } else {
        if (title) title.textContent = '🤝 เสมอกัน!';
        if (desc) desc.textContent = 'ผลการเล่นรอบนี้เสมอกัน ลองกดเล่นใหม่อีกครั้งนะ';
    }
    
    msg.classList.add('active');
}

function resetTttGame() {
    initTttGame();
}

// --- Game 5: Blessing Box (Wishing Board) ---
let blessings = [];
const noteThemes = ['sticky-note-pink', 'sticky-note-peach', 'sticky-note-purple', 'sticky-note-blue'];

function initBlessingBox() {
    const sender = document.getElementById('blessingSender');
    const text = document.getElementById('blessingText');
    
    if (sender) sender.value = '';
    if (text) text.value = '';
    
    loadBlessings();
}

function loadBlessings() {
    blessings = JSON.parse(localStorage.getItem('saved_blessings') || '[]');
    renderWishingBoard();
}

function renderWishingBoard() {
    const wishingBoard = document.getElementById('wishingBoard');
    if (!wishingBoard) return;
    wishingBoard.innerHTML = '';
    
    if (blessings.length === 0) {
        wishingBoard.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted); font-size:0.85rem; padding:var(--space-md);">ยังไม่มีคำอวยพรเขียนเข้ามาเลย เขียนคำแรกเพื่อเริ่มแปะบอร์ดกันน้าา 📝</p>`;
        return;
    }
    
    blessings.forEach((item, index) => {
        const note = document.createElement('div');
        const theme = noteThemes[index % noteThemes.length];
        
        // Consistent rotation based on string length
        const rotation = ((item.text.length + index) % 12) - 6;
        
        note.className = `sticky-note ${theme}`;
        note.style.setProperty('--note-rotation', `${rotation}deg`);
        note.onclick = () => openBlessingReader(index);
        
        note.innerHTML = `
            <div class="sticky-note-text">${escapeHtml(item.text)}</div>
            <div class="sticky-note-sender">จาก: ${escapeHtml(item.sender || 'คนพิเศษ')}</div>
        `;
        wishingBoard.appendChild(note);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

function sendBlessing() {
    const senderEl = document.getElementById('blessingSender');
    const textEl = document.getElementById('blessingText');
    if (!senderEl || !textEl) return;
    
    const sender = senderEl.value.trim();
    const text = textEl.value.trim();
    
    if (!text) {
        alert('กรุณาเขียนคำอวยพรก่อนแปะนะน้าา 🥺');
        return;
    }
    
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
    
    const newBlessing = {
        sender: sender || 'คนพิเศษ',
        text: text,
        date: dateStr
    };
    
    blessings.push(newBlessing);
    localStorage.setItem('saved_blessings', JSON.stringify(blessings));
    
    senderEl.value = '';
    textEl.value = '';
    
    renderWishingBoard();
    launchConfetti();
}

function openBlessingReader(index) {
    const blessing = blessings[index];
    if (!blessing) return;
    
    const readerCard = document.getElementById('blessingReader');
    const boardCard = document.getElementById('gameModal-blessing');
    const contentEl = document.getElementById('readerContent');
    const senderEl = document.getElementById('readerSender');
    const dateEl = document.getElementById('readerDate');
    
    if (!readerCard || !boardCard || !contentEl) return;
    
    contentEl.textContent = blessing.text;
    if (senderEl) senderEl.textContent = `จากคุณ: ${blessing.sender}`;
    if (dateEl) dateEl.textContent = `วันที่: ${blessing.date}`;
    
    boardCard.classList.remove('active');
    readerCard.classList.add('active');
}

function closeBlessingReader() {
    const readerCard = document.getElementById('blessingReader');
    const boardCard = document.getElementById('gameModal-blessing');
    
    if (!readerCard || !boardCard) return;
    
    readerCard.classList.remove('active');
    boardCard.classList.add('active');
}

// --- 16. DIRECT MESSAGE SENDER (DISCORD WEBHOOK) ---
function sendDirectMessage() {
    const senderEl = document.getElementById('directSenderName');
    const textEl = document.getElementById('directMessageText');
    if (!senderEl || !textEl) return;
    
    const sender = senderEl.value.trim();
    const text = textEl.value.trim();
    
    if (!text) {
        alert('กรุณาเขียนข้อความที่ต้องการส่งก่อนนะครับบ 🥺');
        return;
    }
    
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
    
    const webhookUrl = DISCORD_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.startsWith('https://')) {
        alert('ส่งข้อความสำเร็จแล้วน้า! (แต่ระบบหลังบ้านไม่ได้ระบุลิงก์ Discord Webhook)');
        return;
    }
    
    const payload = {
        embeds: [{
            title: "✉️ มีจดหมายกระดาษ/ข้อความใหม่ส่งมาจากเว็บ!",
            color: 16738228, // Pink #ff69b4
            fields: [
                {
                    name: "✍️ ผู้ส่ง",
                    value: sender || 'ผู้ไม่ประสงค์ออกนาม',
                    inline: true
                },
                {
                    name: "📅 วันที่ส่ง",
                    value: dateStr,
                    inline: true
                },
                {
                    name: "💬 ข้อความจดหมาย",
                    value: text
                }
            ],
            footer: {
                text: "Surprise Web Application 💕"
            },
            timestamp: now.toISOString()
        }]
    };
    
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            alert('ส่งข้อความหาเค้าเรียบร้อยแล้วจ้า! จดหมายส่งบินตรงเข้าดิสคอร์ดแล้วน้าา 📬🎉💖');
            senderEl.value = '';
            textEl.value = '';
            launchConfetti();
        } else {
            console.error('Discord webhook responded with error:', response.status);
            alert('ส่งจดหมายลงกล่องเรียบร้อยแล้วจ้า! (แต่มีข้อผิดพลาดส่งไปยัง Discord)');
        }
    })
    .catch(error => {
        console.error('Error posting to Discord Webhook:', error);
        alert('ส่งจดหมายลงกล่องเรียบร้อยแล้วจ้า! (มีปัญหาเชื่อมต่อไปยัง Discord)');
    });
}

// --- Game 6: Love Simon Says ---
let simonSeq = [];
let simonUserSeq = [];
let simonLvl = 1;
let simonHiScore = parseInt(localStorage.getItem('simon_highscore') || '0');
let simonActive = false;
let simonPlayback = false;

function initSimonGame() {
    simonSeq = [];
    simonUserSeq = [];
    simonLvl = 1;
    simonActive = false;
    simonPlayback = false;
    
    const lvlEl = document.getElementById('simonLevel');
    const hiEl = document.getElementById('simonHighScore');
    const msgEl = document.getElementById('simonMessage');
    
    if (lvlEl) lvlEl.textContent = '1';
    if (hiEl) hiEl.textContent = simonHiScore;
    if (msgEl) msgEl.classList.remove('active');
    
    const startBtn = document.getElementById('simonStartBtn');
    if (startBtn) startBtn.style.display = 'block';
    
    // Bind click events to pads
    const pads = document.querySelectorAll('.simon-pad');
    pads.forEach(pad => {
        pad.replaceWith(pad.cloneNode(true));
    });
    
    const newPads = document.querySelectorAll('.simon-pad');
    newPads.forEach(pad => {
        pad.addEventListener('click', () => handleSimonPadClick(parseInt(pad.dataset.index)));
    });
}

function startSimonGame() {
    const startBtn = document.getElementById('simonStartBtn');
    if (startBtn) startBtn.style.display = 'none';
    
    simonActive = true;
    simonSeq = [];
    nextSimonRound();
}

function nextSimonRound() {
    simonUserSeq = [];
    const lvlEl = document.getElementById('simonLevel');
    if (lvlEl) lvlEl.textContent = simonLvl;
    
    simonSeq.push(Math.floor(Math.random() * 4));
    playSimonSequence();
}

function playSimonSequence() {
    simonPlayback = true;
    let delay = 600;
    
    simonSeq.forEach((padIdx, index) => {
        setTimeout(() => {
            if (!simonActive) return;
            flashSimonPad(padIdx);
            if (index === simonSeq.length - 1) {
                setTimeout(() => {
                    simonPlayback = false;
                }, 400);
            }
        }, index * delay + 300);
    });
}

function flashSimonPad(index) {
    const pad = document.querySelector(`.simon-pad[data-index="${index}"]`);
    if (!pad) return;
    pad.classList.add('lit');
    setTimeout(() => {
        pad.classList.remove('lit');
    }, 300);
}

function handleSimonPadClick(index) {
    if (!simonActive || simonPlayback) return;
    
    flashSimonPad(index);
    simonUserSeq.push(index);
    
    const currentStep = simonUserSeq.length - 1;
    if (simonUserSeq[currentStep] !== simonSeq[currentStep]) {
        showSimonEnd(false);
        return;
    }
    
    if (simonUserSeq.length === simonSeq.length) {
        simonLvl++;
        if (simonLvl > simonHiScore) {
            simonHiScore = simonLvl - 1;
            localStorage.setItem('simon_highscore', simonHiScore);
            const hiEl = document.getElementById('simonHighScore');
            if (hiEl) hiEl.textContent = simonHiScore;
        }
        
        if (simonLvl === 6) {
            showSimonEnd(true);
            return;
        }
        
        simonPlayback = true;
        setTimeout(() => {
            nextSimonRound();
        }, 1000);
    }
}

function showSimonEnd(win) {
    simonActive = false;
    const msg = document.getElementById('simonMessage');
    const title = document.getElementById('simonMessageTitle');
    const desc = document.getElementById('simonMessageDesc');
    if (!msg) return;
    
    if (win) {
        if (title) title.textContent = '🎉 ยินดีด้วย! คุณผ่านด่านจำจังหวะ';
        if (desc) desc.textContent = 'คุณสามารถจดจำและกดตามจังหวะได้ถูกต้องทั้งหมด 🎉';
        launchConfetti();
    } else {
        if (title) title.textContent = '😢 กดผิดจังหวะ!';
        if (desc) desc.textContent = 'คุณกดสัญลักษณ์สลับตำแหน่งกัน ลองเริ่มต้นใหม่อีกรอบนะ';
    }
    
    msg.classList.add('active');
}

function resetSimonGame() {
    initSimonGame();
}

// --- Game 7: Love Snake ---
let snakeCanvas = null, snakeCtx = null;
let snakeScore = 0;
let snakeSnake = [];
let snakeDx = 20, snakeDy = 0;
let snakeFood = { x: 0, y: 0 };
let snakeGameInterval = null;

function initSnakeGame() {
    snakeCanvas = document.getElementById('snakeCanvas');
    if (!snakeCanvas) return;
    snakeCtx = snakeCanvas.getContext('2d');
    
    snakeScore = 0;
    const scoreEl = document.getElementById('snakeScore');
    const msgEl = document.getElementById('snakeMessage');
    
    if (scoreEl) scoreEl.textContent = '0';
    if (msgEl) msgEl.classList.remove('active');
    
    snakeSnake = [
        { x: 140, y: 140 },
        { x: 120, y: 140 },
        { x: 100, y: 140 }
    ];
    snakeDx = 20;
    snakeDy = 0;
    
    spawnSnakeFood();
    
    window.removeEventListener('keydown', handleSnakeKeyDown);
    window.addEventListener('keydown', handleSnakeKeyDown);
    
    const up = document.getElementById('snakeUpBtn');
    const down = document.getElementById('snakeDownBtn');
    const left = document.getElementById('snakeLeftBtn');
    const right = document.getElementById('snakeRightBtn');
    
    if (up && down && left && right) {
        const newUp = up.cloneNode(true);
        const newDown = down.cloneNode(true);
        const newLeft = left.cloneNode(true);
        const newRight = right.cloneNode(true);
        
        up.replaceWith(newUp);
        down.replaceWith(newDown);
        left.replaceWith(newLeft);
        right.replaceWith(newRight);
        
        newUp.addEventListener('click', () => changeSnakeDirection(0, -20));
        newDown.addEventListener('click', () => changeSnakeDirection(0, 20));
        newLeft.addEventListener('click', () => changeSnakeDirection(-20, 0));
        newRight.addEventListener('click', () => changeSnakeDirection(20, 0));
    }
    
    if (snakeGameInterval) clearInterval(snakeGameInterval);
    snakeGameInterval = setInterval(snakeTick, 180);
}

function spawnSnakeFood() {
    const maxGrid = 300 / 20;
    snakeFood.x = Math.floor(Math.random() * maxGrid) * 20;
    snakeFood.y = Math.floor(Math.random() * maxGrid) * 20;
    
    const onSnake = snakeSnake.some(cell => cell.x === snakeFood.x && cell.y === snakeFood.y);
    if (onSnake) spawnSnakeFood();
}

function handleSnakeKeyDown(e) {
    if (e.key === 'ArrowUp') changeSnakeDirection(0, -20);
    if (e.key === 'ArrowDown') changeSnakeDirection(0, 20);
    if (e.key === 'ArrowLeft') changeSnakeDirection(-20, 0);
    if (e.key === 'ArrowRight') changeSnakeDirection(20, 0);
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
}

function changeSnakeDirection(dx, dy) {
    if (dx !== 0 && snakeDx === -dx) return;
    if (dy !== 0 && snakeDy === -dy) return;
    
    snakeDx = dx;
    snakeDy = dy;
}

function snakeTick() {
    if (activeGame !== 'snake') {
        if (snakeGameInterval) clearInterval(snakeGameInterval);
        return;
    }
    
    const head = { x: snakeSnake[0].x + snakeDx, y: snakeSnake[0].y + snakeDy };
    
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height) {
        showSnakeEnd(false);
        return;
    }
    
    const selfCollide = snakeSnake.some(cell => cell.x === head.x && cell.y === head.y);
    if (selfCollide) {
        showSnakeEnd(false);
        return;
    }
    
    snakeSnake.unshift(head);
    
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore++;
        const scoreEl = document.getElementById('snakeScore');
        if (scoreEl) scoreEl.textContent = snakeScore;
        
        if (snakeScore >= 10) {
            showSnakeEnd(true);
            return;
        }
        spawnSnakeFood();
    } else {
        snakeSnake.pop();
    }
    
    drawSnake();
}

function drawSnake() {
    if (!snakeCtx) return;
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    // faint grid
    snakeCtx.strokeStyle = 'rgba(255,255,255,0.02)';
    snakeCtx.lineWidth = 1;
    for (let i = 0; i < snakeCanvas.width; i += 20) {
        snakeCtx.beginPath();
        snakeCtx.moveTo(i, 0);
        snakeCtx.lineTo(i, snakeCanvas.height);
        snakeCtx.stroke();
        
        snakeCtx.beginPath();
        snakeCtx.moveTo(0, i);
        snakeCtx.lineTo(snakeCanvas.width, i);
        snakeCtx.stroke();
    }
    
    // Food
    snakeCtx.font = '16px serif';
    snakeCtx.textAlign = 'center';
    snakeCtx.textBaseline = 'middle';
    snakeCtx.fillText('💖', snakeFood.x + 10, snakeFood.y + 10);
    
    // Snake body
    snakeSnake.forEach((cell, idx) => {
        if (idx === 0) {
            snakeCtx.fillStyle = '#ff6b9d';
        } else {
            snakeCtx.fillStyle = 'rgba(255, 105, 180, 0.6)';
        }
        snakeCtx.strokeStyle = 'rgba(255,255,255,0.3)';
        snakeCtx.lineWidth = 1;
        snakeCtx.beginPath();
        snakeCtx.roundRect(cell.x + 1, cell.y + 1, 18, 18, 5);
        snakeCtx.fill();
        snakeCtx.stroke();
    });
}

function showSnakeEnd(win) {
    if (snakeGameInterval) clearInterval(snakeGameInterval);
    
    const msg = document.getElementById('snakeMessage');
    const title = document.getElementById('snakeMessageTitle');
    const desc = document.getElementById('snakeMessageDesc');
    if (!msg) return;
    
    if (win) {
        if (title) title.textContent = '🎉 ยินดีด้วย! คุณชนะแล้ว';
        if (desc) desc.textContent = 'คุณเก็บสะสมคะแนนได้ครบ 10 คะแนนเรียบร้อยแล้ว 🎉';
        launchConfetti();
    } else {
        if (title) title.textContent = '💥 เกมจบแล้ว!';
        if (desc) desc.textContent = 'ชนผนังหรือหางของตัวเอง พยายามหลบสิ่งกีดขวางใหม่อีกครั้งนะ';
    }
    
    msg.classList.add('active');
    window.removeEventListener('keydown', handleSnakeKeyDown);
}

function resetSnakeGame() {
    initSnakeGame();
}

// --- Game 8: Heart Breaker ---
let breakerCanvas = null, breakerCtx = null;
let breakerScore = 0;
let breakerBall = { x: 180, y: 220, dx: 3.5, dy: -3.5, radius: 8 };
let breakerPaddle = { x: 140, y: 295, width: 80, height: 12, speed: 12 };
let breakerBricks = [];
let breakerAnimationId = null;
let breakerKeys = {};

function initBreakerGame() {
    breakerCanvas = document.getElementById('breakerCanvas');
    if (!breakerCanvas) return;
    breakerCtx = breakerCanvas.getContext('2d');
    
    breakerScore = 0;
    const scoreEl = document.getElementById('breakerScore');
    const msgEl = document.getElementById('breakerMessage');
    
    if (scoreEl) scoreEl.textContent = '0';
    if (msgEl) msgEl.classList.remove('active');
    
    breakerBall = { x: breakerCanvas.width / 2, y: breakerCanvas.height - 45, dx: 3.4, dy: -3.4, radius: 8 };
    breakerPaddle.x = breakerCanvas.width / 2 - breakerPaddle.width / 2;
    breakerKeys = {};
    
    // build bricks
    breakerBricks = [];
    const rows = 3;
    const cols = 6;
    const padding = 8;
    const width = 50;
    const height = 15;
    const offsetTop = 40;
    const offsetLeft = 12;
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            breakerBricks.push({
                x: c * (width + padding) + offsetLeft,
                y: r * (height + padding) + offsetTop,
                width: width,
                height: height,
                status: 1
            });
        }
    }
    
    window.removeEventListener('keydown', handleBreakerKeyDown);
    window.addEventListener('keydown', handleBreakerKeyDown);
    window.removeEventListener('keyup', handleBreakerKeyUp);
    window.addEventListener('keyup', handleBreakerKeyUp);
    
    const leftBtn = document.getElementById('breakerLeftBtn');
    const rightBtn = document.getElementById('breakerRightBtn');
    if (leftBtn && rightBtn) {
        const newLeft = leftBtn.cloneNode(true);
        const newRight = rightBtn.cloneNode(true);
        leftBtn.replaceWith(newLeft);
        rightBtn.replaceWith(newRight);
        
        newLeft.addEventListener('mousedown', () => { breakerKeys['ArrowLeft'] = true; });
        newLeft.addEventListener('mouseup', () => { breakerKeys['ArrowLeft'] = false; });
        newLeft.addEventListener('touchstart', (e) => { e.preventDefault(); breakerKeys['ArrowLeft'] = true; });
        newLeft.addEventListener('touchend', (e) => { e.preventDefault(); breakerKeys['ArrowLeft'] = false; });
        
        newRight.addEventListener('mousedown', () => { breakerKeys['ArrowRight'] = true; });
        newRight.addEventListener('mouseup', () => { breakerKeys['ArrowRight'] = false; });
        newRight.addEventListener('touchstart', (e) => { e.preventDefault(); breakerKeys['ArrowRight'] = true; });
        newRight.addEventListener('touchend', (e) => { e.preventDefault(); breakerKeys['ArrowRight'] = false; });
    }
    
    breakerCanvas.addEventListener('touchmove', handleBreakerTouch, { passive: false });
    breakerCanvas.addEventListener('mousemove', handleBreakerMouseMove);
    
    if (breakerAnimationId) {
        cancelAnimationFrame(breakerAnimationId);
    }
    breakerGameLoop();
}

function handleBreakerKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        breakerKeys[e.key] = true;
        e.preventDefault();
    }
}

function handleBreakerKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        breakerKeys[e.key] = false;
        e.preventDefault();
    }
}

function handleBreakerTouch(e) {
    if (activeGame !== 'breaker') return;
    if (e.touches.length > 0) {
        e.preventDefault();
        const rect = breakerCanvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const scaleX = breakerCanvas.width / rect.width;
        breakerPaddle.x = (touchX * scaleX) - breakerPaddle.width / 2;
        keepBreakerPaddleInBounds();
    }
}

function handleBreakerMouseMove(e) {
    if (activeGame !== 'breaker') return;
    const rect = breakerCanvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scaleX = breakerCanvas.width / rect.width;
    breakerPaddle.x = (mouseX * scaleX) - breakerPaddle.width / 2;
    keepBreakerPaddleInBounds();
}

function keepBreakerPaddleInBounds() {
    if (breakerPaddle.x < 0) breakerPaddle.x = 0;
    if (breakerPaddle.x > breakerCanvas.width - breakerPaddle.width) {
        breakerPaddle.x = breakerCanvas.width - breakerPaddle.width;
    }
}

function breakerGameLoop() {
    if (activeGame !== 'breaker') return;
    
    updateBreaker();
    drawBreaker();
    
    if (breakerBricks.every(b => b.status === 0)) {
        showBreakerEnd(true);
        return;
    }
    
    if (breakerBall.y > breakerCanvas.height) {
        showBreakerEnd(false);
        return;
    }
    
    breakerAnimationId = requestAnimationFrame(breakerGameLoop);
}

function updateBreaker() {
    if (breakerKeys['ArrowLeft']) breakerPaddle.x -= breakerPaddle.speed;
    if (breakerKeys['ArrowRight']) breakerPaddle.x += breakerPaddle.speed;
    keepBreakerPaddleInBounds();
    
    breakerBall.x += breakerBall.dx;
    breakerBall.y += breakerBall.dy;
    
    if (breakerBall.x + breakerBall.radius > breakerCanvas.width || breakerBall.x - breakerBall.radius < 0) {
        breakerBall.dx = -breakerBall.dx;
    }
    if (breakerBall.y - breakerBall.radius < 0) {
        breakerBall.dy = -breakerBall.dy;
    }
    
    // paddle collision
    if (
        breakerBall.y + breakerBall.radius >= breakerPaddle.y &&
        breakerBall.x >= breakerPaddle.x &&
        breakerBall.x <= breakerPaddle.x + breakerPaddle.width &&
        breakerBall.dy > 0
    ) {
        const relativeX = (breakerBall.x - (breakerPaddle.x + breakerPaddle.width / 2)) / (breakerPaddle.width / 2);
        breakerBall.dx = relativeX * 4;
        breakerBall.dy = -Math.abs(breakerBall.dy);
    }
    
    // brick collision
    breakerBricks.forEach(b => {
        if (b.status === 0) return;
        
        if (
            breakerBall.x > b.x &&
            breakerBall.x < b.x + b.width &&
            breakerBall.y - breakerBall.radius < b.y + b.height &&
            breakerBall.y + breakerBall.radius > b.y
        ) {
            b.status = 0;
            breakerBall.dy = -breakerBall.dy;
            breakerScore += 10;
            const scoreEl = document.getElementById('breakerScore');
            if (scoreEl) scoreEl.textContent = breakerScore;
        }
    });
}

function drawBreaker() {
    if (!breakerCtx) return;
    breakerCtx.clearRect(0, 0, breakerCanvas.width, breakerCanvas.height);
    
    breakerBricks.forEach(b => {
        if (b.status === 0) return;
        breakerCtx.fillStyle = 'rgba(247, 89, 171, 0.7)';
        breakerCtx.strokeStyle = '#fff';
        breakerCtx.lineWidth = 1;
        breakerCtx.beginPath();
        breakerCtx.roundRect(b.x, b.y, b.width, b.height, 4);
        breakerCtx.fill();
        breakerCtx.stroke();
    });
    
    breakerCtx.fillStyle = 'rgba(255, 105, 180, 0.4)';
    breakerCtx.strokeStyle = '#ff69b4';
    breakerCtx.lineWidth = 2;
    breakerCtx.beginPath();
    breakerCtx.roundRect(breakerPaddle.x, breakerPaddle.y, breakerPaddle.width, breakerPaddle.height, 6);
    breakerCtx.fill();
    breakerCtx.stroke();
    
    breakerCtx.font = '16px serif';
    breakerCtx.textAlign = 'center';
    breakerCtx.textBaseline = 'middle';
    breakerCtx.fillText('💖', breakerBall.x, breakerBall.y);
}

function showBreakerEnd(win) {
    const msg = document.getElementById('breakerMessage');
    const title = document.getElementById('breakerMessageTitle');
    const desc = document.getElementById('breakerMessageDesc');
    if (!msg) return;
    
    if (win) {
        if (title) title.textContent = '🎉 ยินดีด้วย! ทลายกำแพงสำเร็จ';
        if (desc) desc.textContent = 'คุณสามารถทำลายบล็อกอิฐทั้งหมดได้สำเร็จเรียบร้อย 🎉';
        launchConfetti();
    } else {
        if (title) title.textContent = '💔 ลูกบอลตกพื้น!';
        if (desc) desc.textContent = 'ลูกบอลตกร่วงพื้น ลองกดเริ่มใหม่เพื่อพยายามอีกรอบนะ';
    }
    
    msg.classList.add('active');
    
    window.removeEventListener('keydown', handleBreakerKeyDown);
    window.removeEventListener('keyup', handleBreakerKeyUp);
}

function resetBreakerGame() {
    initBreakerGame();
}

// --- Game 9: Word Search ---
let wordsearchBoard = [
    ['B', 'U', 'N', 'B', 'U', 'N', 'L', 'H'],
    ['A', 'X', 'Y', 'Z', 'W', 'Q', 'O', 'E'],
    ['H', 'E', 'A', 'R', 'T', 'O', 'V', 'A'],
    ['K', 'M', 'P', 'Q', 'U', 'V', 'E', 'R'],
    ['S', 'W', 'E', 'E', 'T', 'P', 'S', 'T'],
    ['B', 'C', 'D', 'F', 'G', 'H', 'I', 'J'],
    ['L', 'O', 'V', 'E', 'K', 'M', 'N', 'P'],
    ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y']
];

const wordsearchWordCoords = {
    'BUNBUN': [[0,0], [0,1], [0,2], [0,3], [0,4], [0,5]],
    'HEART': [[2,0], [2,1], [2,2], [2,3], [2,4]],
    'SWEET': [[4,0], [4,1], [4,2], [4,3], [4,4]],
    'LOVE': [[6,0], [6,1], [6,2], [6,3]]
};

let wordsearchFoundWords = [];
let wordsearchSelectedCells = [];

function initWordsearchGame() {
    wordsearchFoundWords = [];
    wordsearchSelectedCells = [];
    
    const msgEl = document.getElementById('wordsearchMessage');
    if (msgEl) msgEl.classList.remove('active');
    
    const wordEls = document.querySelectorAll('.wordsearch-word');
    wordEls.forEach(el => el.classList.remove('found'));
    
    const grid = document.getElementById('wordsearchGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const cell = document.createElement('div');
            cell.className = 'wordsearch-cell';
            cell.dataset.r = r;
            cell.dataset.c = c;
            cell.textContent = wordsearchBoard[r][c];
            
            cell.addEventListener('click', () => handleWordsearchCellClick(cell, r, c));
            grid.appendChild(cell);
        }
    }
}

function handleWordsearchCellClick(cell, r, c) {
    const key = `${r},${c}`;
    
    if (cell.classList.contains('found')) return;
    
    if (cell.classList.contains('selected')) {
        cell.classList.remove('selected');
        wordsearchSelectedCells = wordsearchSelectedCells.filter(item => item !== key);
    } else {
        cell.classList.add('selected');
        wordsearchSelectedCells.push(key);
    }
    
    checkWordsearchMatches();
}

function checkWordsearchMatches() {
    Object.keys(wordsearchWordCoords).forEach(word => {
        if (wordsearchFoundWords.includes(word)) return;
        
        const coords = wordsearchWordCoords[word];
        const allSelected = coords.every(coord => {
            const key = `${coord[0]},${coord[1]}`;
            return wordsearchSelectedCells.includes(key);
        });
        
        if (allSelected) {
            wordsearchFoundWords.push(word);
            
            coords.forEach(coord => {
                const cell = document.querySelector(`.wordsearch-cell[data-r="${coord[0]}"][data-c="${coord[1]}"]`);
                if (cell) {
                    cell.classList.remove('selected');
                    cell.classList.add('found');
                }
                
                const key = `${coord[0]},${coord[1]}`;
                wordsearchSelectedCells = wordsearchSelectedCells.filter(item => item !== key);
            });
            
            const wordEl = document.querySelector(`.wordsearch-word[data-word="${word}"]`);
            if (wordEl) wordEl.classList.add('found');
            
            launchConfetti();
            
            if (wordsearchFoundWords.length === 4) {
                setTimeout(() => {
                    const msg = document.getElementById('wordsearchMessage');
                    if (msg) msg.classList.add('active');
                    launchConfetti();
                }, 600);
            }
        }
    });
}

function resetWordsearchGame() {
    initWordsearchGame();
}

// --- Game 10: Love Pong ---
let pongCanvas = null, pongCtx = null;
let pongPlayerScore = 0;
let pongCpuScore = 0;
let pongBall = { x: 180, y: 150, dx: 3.5, dy: 1.5, radius: 8 };
let pongPlayerPaddle = { y: 110, width: 12, height: 65, speed: 12 };
let pongCpuPaddle = { y: 110, width: 12, height: 65, speed: 2.2 };
let pongKeys = {};
let pongAnimationId = null;

function initPongGame() {
    pongCanvas = document.getElementById('pongCanvas');
    if (!pongCanvas) return;
    pongCtx = pongCanvas.getContext('2d');
    
    pongPlayerScore = 0;
    pongCpuScore = 0;
    const playerEl = document.getElementById('pongPlayerScore');
    const cpuEl = document.getElementById('pongCpuScore');
    const msgEl = document.getElementById('pongMessage');
    
    if (playerEl) playerEl.textContent = '0';
    if (cpuEl) cpuEl.textContent = '0';
    if (msgEl) msgEl.classList.remove('active');
    
    resetPongBall();
    pongPlayerPaddle.y = pongCanvas.height / 2 - pongPlayerPaddle.height / 2;
    pongCpuPaddle.y = pongCanvas.height / 2 - pongCpuPaddle.height / 2;
    pongKeys = {};
    
    window.removeEventListener('keydown', handlePongKeyDown);
    window.addEventListener('keydown', handlePongKeyDown);
    window.removeEventListener('keyup', handlePongKeyUp);
    window.addEventListener('keyup', handlePongKeyUp);
    
    const upBtn = document.getElementById('pongUpBtn');
    const downBtn = document.getElementById('pongDownBtn');
    if (upBtn && downBtn) {
        const newUp = upBtn.cloneNode(true);
        const newDown = downBtn.cloneNode(true);
        upBtn.replaceWith(newUp);
        downBtn.replaceWith(newDown);
        
        newUp.addEventListener('mousedown', () => { pongKeys['ArrowUp'] = true; });
        newUp.addEventListener('mouseup', () => { pongKeys['ArrowUp'] = false; });
        newUp.addEventListener('touchstart', (e) => { e.preventDefault(); pongKeys['ArrowUp'] = true; });
        newUp.addEventListener('touchend', (e) => { e.preventDefault(); pongKeys['ArrowUp'] = false; });
        
        newDown.addEventListener('mousedown', () => { pongKeys['ArrowDown'] = true; });
        newDown.addEventListener('mouseup', () => { pongKeys['ArrowDown'] = false; });
        newDown.addEventListener('touchstart', (e) => { e.preventDefault(); pongKeys['ArrowDown'] = true; });
        newDown.addEventListener('touchend', (e) => { e.preventDefault(); pongKeys['ArrowDown'] = false; });
    }
    
    pongCanvas.addEventListener('touchmove', handlePongTouch, { passive: false });
    pongCanvas.addEventListener('mousemove', handlePongMouseMove);
    
    if (pongAnimationId) {
        cancelAnimationFrame(pongAnimationId);
    }
    pongGameLoop();
}

function handlePongKeyDown(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        pongKeys[e.key] = true;
        e.preventDefault();
    }
}

function handlePongKeyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        pongKeys[e.key] = false;
        e.preventDefault();
    }
}

function handlePongTouch(e) {
    if (activeGame !== 'pong') return;
    if (e.touches.length > 0) {
        e.preventDefault();
        const rect = pongCanvas.getBoundingClientRect();
        const touchY = e.touches[0].clientY - rect.top;
        const scaleY = pongCanvas.height / rect.height;
        pongPlayerPaddle.y = (touchY * scaleY) - pongPlayerPaddle.height / 2;
        keepPongPaddleInBounds();
    }
}

function handlePongMouseMove(e) {
    if (activeGame !== 'pong') return;
    const rect = pongCanvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const scaleY = pongCanvas.height / rect.height;
    pongPlayerPaddle.y = (mouseY * scaleY) - pongPlayerPaddle.height / 2;
    keepPongPaddleInBounds();
}

function keepPongPaddleInBounds() {
    if (pongPlayerPaddle.y < 0) pongPlayerPaddle.y = 0;
    if (pongPlayerPaddle.y > pongCanvas.height - pongPlayerPaddle.height) {
        pongPlayerPaddle.y = pongCanvas.height - pongPlayerPaddle.height;
    }
}

function resetPongBall() {
    pongBall.x = pongCanvas.width / 2;
    pongBall.y = pongCanvas.height / 2;
    pongBall.dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 3);
    pongBall.dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 1);
}

function pongGameLoop() {
    if (activeGame !== 'pong') return;
    
    updatePong();
    drawPong();
    
    if (pongPlayerScore >= 3) {
        showPongEnd(true);
        return;
    }
    if (pongCpuScore >= 3) {
        showPongEnd(false);
        return;
    }
    
    pongAnimationId = requestAnimationFrame(pongGameLoop);
}

function updatePong() {
    if (pongKeys['ArrowUp']) pongPlayerPaddle.y -= pongPlayerPaddle.speed;
    if (pongKeys['ArrowDown']) pongPlayerPaddle.y += pongPlayerPaddle.speed;
    keepPongPaddleInBounds();
    
    const cpuPaddleCenter = pongCpuPaddle.y + pongCpuPaddle.height / 2;
    if (cpuPaddleCenter < pongBall.y - 10) {
        pongCpuPaddle.y += pongCpuPaddle.speed;
    } else if (cpuPaddleCenter > pongBall.y + 10) {
        pongCpuPaddle.y -= pongCpuPaddle.speed;
    }
    
    if (pongCpuPaddle.y < 0) pongCpuPaddle.y = 0;
    if (pongCpuPaddle.y > pongCanvas.height - pongCpuPaddle.height) {
        pongCpuPaddle.y = pongCanvas.height - pongCpuPaddle.height;
    }
    
    pongBall.x += pongBall.dx;
    pongBall.y += pongBall.dy;
    
    if (pongBall.y - pongBall.radius < 0 || pongBall.y + pongBall.radius > pongCanvas.height) {
        pongBall.dy = -pongBall.dy;
    }
    
    if (
        pongBall.x - pongBall.radius <= 22 &&
        pongBall.x - pongBall.radius >= 10 &&
        pongBall.y >= pongPlayerPaddle.y &&
        pongBall.y <= pongPlayerPaddle.y + pongPlayerPaddle.height &&
        pongBall.dx < 0
    ) {
        pongBall.dx = -pongBall.dx;
        pongBall.dx *= 1.05;
        pongBall.dy *= 1.05;
    }
    
    if (
        pongBall.x + pongBall.radius >= pongCanvas.width - 22 &&
        pongBall.x + pongBall.radius <= pongCanvas.width - 10 &&
        pongBall.y >= pongCpuPaddle.y &&
        pongBall.y <= pongCpuPaddle.y + pongCpuPaddle.height &&
        pongBall.dx > 0
    ) {
        pongBall.dx = -pongBall.dx;
        pongBall.dx *= 1.05;
        pongBall.dy *= 1.05;
    }
    
    if (pongBall.x + pongBall.radius > pongCanvas.width) {
        pongPlayerScore++;
        const playerEl = document.getElementById('pongPlayerScore');
        if (playerEl) playerEl.textContent = pongPlayerScore;
        resetPongBall();
    }
    
    if (pongBall.x - pongBall.radius < 0) {
        pongCpuScore++;
        const cpuEl = document.getElementById('pongCpuScore');
        if (cpuEl) cpuEl.textContent = pongCpuScore;
        resetPongBall();
    }
}

function drawPong() {
    if (!pongCtx) return;
    pongCtx.clearRect(0, 0, pongCanvas.width, pongCanvas.height);
    
    pongCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    pongCtx.lineWidth = 2;
    pongCtx.setLineDash([5, 5]);
    pongCtx.beginPath();
    pongCtx.moveTo(pongCanvas.width / 2, 0);
    pongCtx.lineTo(pongCanvas.width / 2, pongCanvas.height);
    pongCtx.stroke();
    pongCtx.setLineDash([]);
    
    pongCtx.fillStyle = 'rgba(255, 105, 180, 0.55)';
    pongCtx.strokeStyle = '#ff85c0';
    pongCtx.lineWidth = 1.5;
    pongCtx.beginPath();
    pongCtx.roundRect(10, pongPlayerPaddle.y, 12, pongPlayerPaddle.height, 4);
    pongCtx.fill();
    pongCtx.stroke();
    
    pongCtx.fillStyle = 'rgba(146, 84, 222, 0.55)';
    pongCtx.strokeStyle = '#b37feb';
    pongCtx.lineWidth = 1.5;
    pongCtx.beginPath();
    pongCtx.roundRect(pongCanvas.width - 22, pongCpuPaddle.y, 12, pongCpuPaddle.height, 4);
    pongCtx.fill();
    pongCtx.stroke();
    
    pongCtx.font = '16px serif';
    pongCtx.textAlign = 'center';
    pongCtx.textBaseline = 'middle';
    pongCtx.fillText('💖', pongBall.x, pongBall.y);
}

function showPongEnd(win) {
    const msg = document.getElementById('pongMessage');
    const title = document.getElementById('pongMessageTitle');
    const desc = document.getElementById('pongMessageDesc');
    if (!msg) return;
    
    if (win) {
        if (title) title.textContent = '🎉 ยินดีด้วย! คุณชนะแล้ว';
        if (desc) desc.textContent = 'คุณเอาชนะระบบคอมพิวเตอร์ในเกมพิงปองรอบนี้ได้สำเร็จ 🎉';
        launchConfetti();
    } else {
        if (title) title.textContent = '💻 คอมพิวเตอร์ชนะ!';
        if (desc) desc.textContent = 'คอมพิวเตอร์ชนะในรอบนี้ ลองเริ่มใหม่อีกครั้งเพื่อท้าทายนะ';
    }
    
    msg.classList.add('active');
    
    window.removeEventListener('keydown', handlePongKeyDown);
    window.removeEventListener('keyup', handlePongKeyUp);
}

function resetPongGame() {
    initPongGame();
}

// ==========================================
// 17. FLOATING CALL ME SIGNAL LOGIC
// ==========================================
function openCallModal() {
    const modal = document.getElementById('callModal');
    const card = document.getElementById('callModalCard');
    const statusMsg = document.getElementById('callStatusMessage');
    const sendBtn = document.getElementById('sendCallSignalBtn');

    if (modal && card) {
        modal.classList.add('active');
        card.classList.add('active');
        if (statusMsg) statusMsg.style.display = 'none';
        if (sendBtn) {
            sendBtn.style.display = 'block';
            sendBtn.disabled = false;
            sendBtn.textContent = 'ส่งสัญญาณโทรหา 🚀';
        }
    }
}

function closeCallModal() {
    const modal = document.getElementById('callModal');
    const card = document.getElementById('callModalCard');
    if (modal && card) {
        modal.classList.remove('active');
        card.classList.remove('active');
    }
}

function sendCallSignal() {
    const sendBtn = document.getElementById('sendCallSignalBtn');
    const statusMsg = document.getElementById('callStatusMessage');
    
    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'กำลังส่งสัญญาณ... 📡';
    }

    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear() + 543}`;
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const webhookUrl = DISCORD_WEBHOOK_URL;
    if (!webhookUrl || !webhookUrl.startsWith('https://')) {
        setTimeout(() => {
            if (sendBtn) sendBtn.style.display = 'none';
            if (statusMsg) {
                statusMsg.textContent = 'ส่งสัญญาณสำเร็จแล้ว! (แต่หลังบ้านไม่มี Webhook) 📞✨';
                statusMsg.style.display = 'block';
            }
            launchConfetti();
        }, 1000);
        return;
    }

    const payload = {
        embeds: [{
            title: "📞 ติ๊งต่อง! มีคนส่งสัญญาณเรียกตัวให้โทรหา!",
            color: 16728919, // Bright Red-Pink #ff4757
            fields: [
                {
                    name: "👤 ผู้เรียก",
                    value: "บันบันนน 💕",
                    inline: true
                },
                {
                    name: "⏰ เวลาส่งสัญญาณ",
                    value: `${dateStr} เวลา ${timeStr} น.`,
                    inline: true
                },
                {
                    name: "💬 ข้อความด่วน",
                    value: "บันบันกำลังคิดถึงคุณ หรือมีเรื่องคุยด่วน และส่งสัญญาณเรียกตัวให้คุณโทรหาใน Discord ตอนนี้เลยครับ! รีบโทรหาด่วนที่สุดเลยนะะ 📞💖"
                }
            ],
            footer: {
                text: "Surprise Web Application 💕"
            },
            timestamp: now.toISOString()
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            if (sendBtn) sendBtn.style.display = 'none';
            if (statusMsg) {
                statusMsg.textContent = 'ส่งสัญญาณเรียบร้อย! เค้าได้รับข้อความโทรหาในดิสคอร์ดแล้วค้าบบ📬✨';
                statusMsg.style.display = 'block';
            }
            launchConfetti();
        } else {
            console.error('Call Webhook error:', response.status);
            if (sendBtn) sendBtn.style.display = 'none';
            if (statusMsg) {
                statusMsg.textContent = 'ส่งสัญญาณเข้ากล่องเรียบร้อย! (แต่มีข้อผิดพลาด Discord) 📞✨';
                statusMsg.style.display = 'block';
            }
            launchConfetti();
        }
    })
    .catch(error => {
        console.error('Error posting call Webhook:', error);
        if (sendBtn) sendBtn.style.display = 'none';
        if (statusMsg) {
            statusMsg.textContent = 'ส่งสัญญาณเข้ากล่องเรียบร้อย! (มีปัญหาเชื่อมต่อ Discord) 📞✨';
            statusMsg.style.display = 'block';
        }
        launchConfetti();
    });
}

