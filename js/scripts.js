
const params = new URLSearchParams(window.location.search);
const friend = params.get('friend') || 'Amigo';

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
document.addEventListener('DOMContentLoaded', () => {
    const iconSets = [
        {
            selector: '.visual-heart',
            symbols: ['❤️','💖','💘','💝','💕','💓','💗','💞','💟','🧡','💜','💙','💚','💛','🩷','🩵','🩶','🖤','🤍','🤎']
        },
        {
            selector: '.visual-flower',
            symbols: ['🌸','🌹','🌺','🌻','🌼','🌷','💐','🪻','🥀','🪷','🌱','🌿','🍀','🍃','🍂','🍁']
        },
        {
            selector: '.visual-star',
            symbols: ['✨','⭐','🌟','💫','🌠','🟊','🟉','✴️','✳️','❇️','🔆','🔅','🌞','🌙']
        }
    ];

    iconSets.forEach(({selector, symbols}, idx) => {
        const el = document.querySelector(selector);
        if (!el) return;
        let count = 0;
        const max = 16 + Math.floor(Math.random()*8) + idx*4; // cada uno para y empieza diferente
        const original = el.textContent;
        const interval = setInterval(() => {
            el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
            count++;
            if (count >= max) {
                clearInterval(interval);
                setTimeout(() => {
                    el.textContent = original;
                }, 200);
            }
        }, 460 + idx*20);
    });
});

const container = document.querySelector('.container');
const sections = document.querySelectorAll('.content');

let currentSection = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true;
    currentSection = index;

    const targetPosition = sections[index].offsetTop;

    container.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    setTimeout(() => {
        isScrolling = false;
        // Disparar AOS refresh después del scroll
        if (typeof AOS !== 'undefined') {
            AOS.refreshHard();
        }
    }, 600);
}

// Scroll con rueda
window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    // Solo prevenir si estamos en scroll manual personalizado
    const targetSection = e.deltaY > 0 ? currentSection + 1 : currentSection - 1;
    if (targetSection >= 0 && targetSection < sections.length) {
        e.preventDefault();
        if (e.deltaY > 0) {
            scrollToSection(currentSection + 1);
        } else {
            scrollToSection(currentSection - 1);
        }
    }
}, { passive: false });

// Scroll con teclado
window.addEventListener('keydown', (e) => {
    if (isScrolling) return;

    if (e.key === 'ArrowDown') {
        scrollToSection(currentSection + 1);
    }

    if (e.key === 'ArrowUp') {
        scrollToSection(currentSection - 1);
    }
});

let touchStartY = 0;
let touchEndY = 0;
const swipeThreshold = 50; // sensibilidad del swipe

container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

container.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (isScrolling) return;

    const deltaY = touchStartY - touchEndY;

    if (Math.abs(deltaY) < swipeThreshold) return;

    if (deltaY > 0) {
        // swipe hacia arriba
        scrollToSection(currentSection + 1);
    } else {
        // swipe hacia abajo
        scrollToSection(currentSection - 1);
    }
}

// galería de fotos y mensaje final
const galleryData = {
    mayrelin: [
        { src: 'assets/mayrelin1.jpg', alt: 'Mayrelin en la playa' },
        { src: 'assets/mayrelin2.jpg', alt: 'Risa de Mayrelin' },
        { src: 'assets/mayrelin3.jpg', alt: 'Momento especial' }
    ],
    ariadna: [
        { src: 'assets/ariadna1.jpg', alt: 'Ariadna en el parque' },
        { src: 'assets/ariadna2.jpg', alt: 'Ariadna y su mascota' },
        { src: 'assets/ariadna3.jpg', alt: 'Día inolvidable' }
    ],
    shema: [
        { src: 'assets/shema1.jpg', alt: 'Shema sonriendo' },
        { src: 'assets/shema2.jpg', alt: 'Aventura con Shema' },
        { src: 'assets/shema3.jpg', alt: 'Recuerdo especial' }
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

const qualities = {
    mayrelin: [
        { icon: '🌟', title: 'Resiliencia', desc: 'Tu fuerza inspira.' },
        { icon: '😊', title: 'Sonrisa', desc: 'Ilumina cualquier lugar.' },
        { icon: '🤝', title: 'Lealtad', desc: 'Siempre estás ahí.' }
    ],
    ariadna: [
        { icon: '🍯', title: 'Dulzura', desc: 'Tratas a todos con amor.' },
        { icon: '👂', title: 'Escucha', desc: 'Sabes entender sin juzgar.' },
        { icon: '💖', title: 'Corazón', desc: 'Puro y generoso.' }
    ],
    shema: [
        { icon: '⚡', title: 'Energía', desc: 'Incansable y vibrante.' },
        { icon: '🎉', title: 'Diversión', desc: 'El alma de la fiesta.' },
        { icon: '🛡️', title: 'Lealtad', desc: 'Un amigo de verdad.' }
    ],
    sana: [
        { icon: '🕊️', title: 'Paz', desc: 'Transmites calma.' },
        { icon: '🧠', title: 'Sabiduría', desc: 'Consejos que valen oro.' },
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

// Galería personalizada
const galleryTrack = document.querySelector('.gallery-track');
const friendKey = friend.toLowerCase();
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

// Qualities Populate
const qualitiesGrid = document.querySelector('.qualities-grid');
const friendQualities = qualities[friendKey] || qualities['default'];

qualitiesGrid.innerHTML = friendQualities.map((q, i) => `
    <div class="quality-card" data-aos="flip-left" data-aos-delay="${i * 200}">
        <div class="quality-icon">${q.icon}</div>
        <h3 class="quality-title">${q.title}</h3>
        <p class="quality-desc">${q.desc}</p>
    </div>
`).join('');
