
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
    mayrelin: 'Gracias por cada momento compartido, por tu alegría y tu amistad sincera. ¡Eres una persona increíble!',
    ariadna: 'Ariadna, tu compañía hace que cada día sea especial. Gracias por tu apoyo y cariño. ¡Feliz San Valentín!',
    shema: 'Shema, gracias por tu energía y por todos los recuerdos que hemos creado juntos. ¡Te aprecio mucho!',
    sana: 'Sana, tu amistad es un regalo que valoro cada día. Gracias por estar siempre presente. ¡Feliz día!',
    momo: 'Momo, cada momento contigo es único. Gracias por tu amistad y por ser tan especial. ¡Feliz San Valentín!',
    greidy: 'Greidy, tu amor aun te extraño y eres mi solicito, te amo.'
};

// Galería personalizada
const galleryTrack = document.querySelector('.gallery-track');
const friendKey = friend.toLowerCase();
const photos = galleryData[friendKey] || [
    { src: 'assets/default1.jpg', alt: 'Momento especial' },
    { src: 'assets/default2.jpg', alt: 'Recuerdo bonito' },
    { src: 'assets/default3.jpg', alt: 'Día memorable' }
];
galleryTrack.innerHTML = photos.map((photo, i) =>
    `<img class="gallery-photo" src="${photo.src}" alt="${photo.alt}" data-aos="fade-left" data-aos-delay="${i*400}" data-aos-duration="1200">`
).join('');

// Mensaje final personalizado
const finalMessage = document.querySelector('.final-message');
finalMessage.textContent = messages[friendKey] || 'Gracias por todos los momentos vividos y por tu amistad. ¡Feliz Día de San Valentín!';
