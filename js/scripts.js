
const params = new URLSearchParams(window.location.search);
const friend = params.get('friend') || 'Amigo';
const friendKey = friend.toLowerCase();

const span = document.querySelector('#friend_name .handwrite');

let text = "";

switch (friend.toLowerCase()) {
        case 'mayrelin':
                text = 'Mayrelin';
                break;
        case 'ariadna':
                text = 'Ariadna';
                break;
        case 'shema':
                text = 'Shema';
                break;
        case 'sana':
                text = 'Sana';
                break;
        case 'momo':
                text = 'Momo';
                break;
        case 'greidy':
                text = 'Greidy';
                break;
        default:
                text = `${friend}`;
}

span.textContent = text;

// Animación tipo ruleta para los íconos de .visuals
// Qualities Data Definition (moved up)
const qualities = {
    mayrelin: [
        { icon: '🌟', title: 'Resiliencia', desc: 'Tu fuerza inspira.' },
        { icon: '💖', title: 'Corazón', desc: 'Puro y generoso.' },
        { icon: '🔥', title: 'Chispa', desc: 'Siempre ocurrente.' },
    ],
    ariadna: [
        { icon: '🧠', title: 'Sabiduría', desc: 'Consejos que valen oro.' },
        { icon: '👂', title: 'Escucha', desc: 'Sabes entender sin juzgar.' },
         { icon: '🛡️', title: 'Lealtad', desc: 'Un amigo de verdad.' }
    ],
    shema: [
        { icon: '⚡', title: 'Energía', desc: 'Incansable y vibrante.' },
        { icon: '🌟', title: 'Resiliencia', desc: 'Tu fuerza inspira.' },
        { icon: '🎉', title: 'Diversión', desc: 'El alma de la fiesta.' },
    ],
    sana: [
        { icon: '🍯', title: 'Dulzura', desc: 'Tratas a todos con amor.' },
        { icon: '🕊️', title: 'Paz', desc: 'Transmites calma.' },
        { icon: '✨', title: 'Confianza', desc: 'Se puede contar contigo.' }
    ],
    momo: [
        { icon: '🎨', title: 'Creatividad', desc: 'Ves el mundo diferente.' },
        { icon: '🔥', title: 'Chispa', desc: 'Siempre ocurrente.' },
        { icon: '🌈', title: 'Alegría', desc: 'Contagias felicidad.' }
    ],
    greidy: [
        { icon: '☀️', title: 'Mi Sol', desc: 'La luz de mis días.' },
        { icon: '❤️', title: 'Amor', desc: 'Un sentimiento eterno.' },
        { icon: '🌹', title: 'Belleza', desc: 'Por dentro y por fuera.' }
    ],
    default: [
        { icon: '✨', title: 'Autenticidad', desc: 'Eres única/o.' },
        { icon: '💫', title: 'Bondad', desc: 'Tu corazón es noble.' },
        { icon: '🚀', title: 'Pasión', desc: 'Haces todo con ganas.' }
    ]
};

// Define friendQualities early so slot animation can use it
const friendQualities = qualities[friendKey] || qualities['default'];

// Slot Machine Animation Logic
const visualSection = document.getElementById('section-2');
const iconElements = [
    document.querySelector('.visual-heart'),
    document.querySelector('.visual-flower'),
    document.querySelector('.visual-star')
];

// Symbols pool for the shuffling effect
const allSymbols = ['❤️','💖','🌸','🌹','✨','⭐','🌟','🍯','⚡','🕊️','🎨','☀️'];

let animationPlayed = false;

function runSlotAnimation() {
    if (animationPlayed) return;
    animationPlayed = true;

    // Determine target icons from the friend's qualities
    const targets = [
        friendQualities[0]?.icon || '❤️',
        friendQualities[1]?.icon || '🌸',
        friendQualities[2]?.icon || '✨'
    ];

    iconElements.forEach((el, index) => {
        if (!el) return;
        
        const targetSymbol = targets[index];
        const duration = 2000 + (index * 1000); // 2s, 3s, 4s duration
        const intervalTime = 100;
        let elapsed = 0;

        const interval = setInterval(() => {
            el.textContent = allSymbols[Math.floor(Math.random() * allSymbols.length)];
            elapsed += intervalTime;

            if (elapsed >= duration) {
                clearInterval(interval);
                el.textContent = targetSymbol;
                
                // Add a pop effect
                el.style.transform = "scale(1.5)";
                el.style.transition = "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                setTimeout(() => el.style.transform = "scale(1)", 300);

                // If this is the last icon, trigger auto-scroll
                if (index === iconElements.length - 1) {
                    setTimeout(() => {
                        scrollToSection(currentSection + 1);
                    }, 1200); // Wait 1.2s after animation finishes before scrolling
                }
            }
        }, intervalTime);
    });
}
// Observe section-2 for triggering animation
const slotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animationPlayed) {
            runSlotAnimation();
        }
    });
}, { threshold: 0.6 });

if (visualSection) {
    slotObserver.observe(visualSection);
}

// Qualities Populate (Simple render now)
const qualitiesGrid = document.querySelector('.qualities-grid');
qualitiesGrid.innerHTML = friendQualities.map((q, i) => `
    <div class="quality-card" data-aos="flip-left" data-aos-delay="${i * 200}">
        <div class="quality-icon">${q.icon}</div>
        <h3 class="quality-title">${q.title}</h3>
        <p class="quality-desc">${q.desc}</p>
    </div>
`).join('');

const container = document.querySelector('.container');
const sections = document.querySelectorAll('.content');


let currentSection = 0;

// Button controls
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[index].scrollIntoView({ behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => {
    scrollToSection(currentSection - 1);
});

nextBtn.addEventListener('click', () => {
    scrollToSection(currentSection + 1);
});

// Update currentSection based on visibility
const observerOptions = {
    root: container,
    threshold: 0.5 // Consider active if >50% visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Find index of this section
            const index = Array.from(sections).indexOf(entry.target);
            if (index !== -1) {
                currentSection = index;
                // Optional: Disable buttons at ends
                prevBtn.style.opacity = index === 0 ? '0.5' : '1';
                prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';
                
                nextBtn.style.opacity = index === sections.length - 1 ? '0.5' : '1';
                nextBtn.style.pointerEvents = index === sections.length - 1 ? 'none' : 'auto';
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Keyboard navigation (optional, native is usually fine but this allows "snapping" logic behavior if desired)
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault(); // Prevent double scroll if we want strict section navigation
        scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
    }
});

// galería de fotos y mensaje final
const galleryData = {
    mayrelin: [
        { src: 'assets/images/mayrelin_1.jpg', alt: 'Mayrelin en la playa' },
        { src: 'assets/images/mayrelin_2.jpg', alt: 'Risa de Mayrelin' },
        { src: 'assets/images/shrek_2.jpeg', alt: 'Momento especial' }
    ],
    ariadna: [
        { src: 'assets/images/ariadna_1.jpeg', alt: 'Ariadna en el parque' },
        { src: 'assets/images/ariadna_2.jpeg', alt: 'Ariadna y su mascota' },
        { src: 'assets/images/ariadna_3.jpeg', alt: 'Día inolvidable' }
    ],
    shema: [
        { src: 'assets/images/shema_1.jpeg', alt: 'Shema sonriendo' },
        { src: 'assets/images/shema_2.jpeg', alt: 'Aventura con Shema' },
        { src: 'assets/images/shema_3.jpeg', alt: 'Otra momento con la Shema' }
    ],
    sana: [
        { src: 'assets/images/sana_1.jpeg', alt: 'Sana en la fiesta' },
        { src: 'assets/images/sana_2.jpeg', alt: 'Sana y amigos' },
        { src: 'assets/images/sana_3.jpeg', alt: 'Momento divertido' }
    ],
    momo: [
        { src: 'assets/images/momo_1.jpeg', alt: 'Momo en el café' },
        { src: 'assets/images/momo_2.jpeg', alt: 'Momo y la música' },
        { src: 'assets/images/momo_3.jpeg', alt: 'Día especial' }
    ],
    greidy: [
        { src: 'assets/images/greidy_1.jpeg', alt: 'Greidy en la montaña' },
        { src: 'assets/images/greidy_2.jpeg', alt: 'Greidy y su sonrisa' },
        { src: 'assets/images/greidy_3.jpeg', alt: 'Recuerdo con Greidy' }
    ]
};

const messages = {
    mayrelin: 'Mayrelin, tu alegría es contagiosa y tu capacidad para ver lo bueno en todo ilumina los días de quienes te rodean. Gracias por ser esa amiga incondicional con la que siempre se puede contar. ¡Que este día te devuelva todo el cariño que das!',
    ariadna: 'Ari, tienes un corazón de oro y una dulzura que desarma. Cada charla contigo es un refugio. Gracias por estar ahí, por escuchar y por compartir tu tiempo conmigo. ¡Eres verdaderamente especial!',
    shema: 'Shema, compañero de mil batallas y risas interminables. Tu energía y lealtad son un regalo. Gracias por todos esos recuerdos épicos y por los que aún nos faltan por crear. ¡Un abrazo enorme en este día!',
    sana: 'Sana, tu presencia irradia paz y confianza. Valoro profundamente nuestra conexión y la forma en que haces que todo parezca más sencillo. Gracias por tu amistad sincera y duradera.',
    momo: 'Momo, eres creatividad y chispa pura. No hay momento aburrido contigo. Gracias por pintar mi vida de colores con tu ocurrencias y tu cariño. ¡Nunca cambies esa esencia única!',
    greidy: 'Greidy, aunque la distancia o el tiempo se interpongan, lo que siento permanece intacto. Eres mi solcito y mi pensamiento constante. Te extraño y te llevo en el corazón, hoy y siempre.'
};



// Galería personalizada
const galleryTrack = document.querySelector('.gallery-track');
const photos = galleryData[friendKey] || [
    { src: 'https://placehold.co/600x800/ffb7b2/ffffff?text=Momento+1', alt: 'Momento especial' },
    { src: 'https://placehold.co/600x800/ff9a9e/ffffff?text=Momento+2', alt: 'Recuerdo bonito' },
    { src: 'https://placehold.co/600x800/fad0c4/ffffff?text=Momento+3', alt: 'Día memorable' }
];
galleryTrack.innerHTML = photos.map((photo, i) =>
    `<img class="gallery-photo" src="${photo.src}" alt="${photo.alt}" data-aos="fade-left" data-aos-delay="${i*400}" data-aos-duration="1200">`
).join('');

// Mensaje final personalizado
const finalMessage = document.querySelector('.final-message');
finalMessage.textContent = messages[friendKey] || 'Gracias por todos los momentos vividos y por tu amistad. ¡Feliz Día de San Valentín!';


