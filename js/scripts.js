// --- Navegación horizontal con flechas ---
const timeline = document.querySelector('.timeline');
const sections = Array.from(document.querySelectorAll('.timeline-section'));
const leftArrow = document.querySelector('.nav-arrow-left');
const rightArrow = document.querySelector('.nav-arrow-right');

let currentSection = 0;

function scrollToSection(idx) {
    if (idx < 0 || idx >= sections.length) return;
    const section = sections[idx];
    section.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    currentSection = idx;
    updateArrows();
}

function updateArrows() {
    if (leftArrow) leftArrow.style.display = currentSection === 0 ? 'none' : '';
    if (rightArrow) rightArrow.style.display = currentSection === sections.length - 1 ? 'none' : '';
}

if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => scrollToSection(currentSection - 1));
    rightArrow.addEventListener('click', () => scrollToSection(currentSection + 1));
    updateArrows();
}

// Actualizar sección actual al hacer scroll manual
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Buscar la sección más visible
        let maxVisible = 0, idx = 0;
        sections.forEach((sec, i) => {
            const rect = sec.getBoundingClientRect();
            const visible = Math.max(0, Math.min(window.innerWidth, rect.right) - Math.max(0, rect.left));
            if (visible > maxVisible) {
                maxVisible = visible;
                idx = i;
            }
        });
        currentSection = idx;
        updateArrows();
    }, 100);
});

const params = new URLSearchParams(window.location.search);
const friend = params.get('friend') || 'Amigo';

// Personalización de nombre
const span = document.querySelector('#friend_name .handwrite');
let text = '';
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
    default:
        text = `Para ${friend}, con cariño`;
}
span.textContent = text;

// Personalización de galería de fotos y mensaje final
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
        { src: 'assets/sana1.jpg', alt: 'Sana en la fiesta' },
        { src: 'assets/sana2.jpg', alt: 'Sana y amigos' },
        { src: 'assets/sana3.jpg', alt: 'Momento divertido' }
    ],
    momo: [
        { src: 'assets/momo1.jpg', alt: 'Momo en el café' },
        { src: 'assets/momo2.jpg', alt: 'Momo y la música' },
        { src: 'assets/momo3.jpg', alt: 'Día especial' }
    ]
};

const messages = {
    mayrelin: 'Gracias por cada momento compartido, por tu alegría y tu amistad sincera. ¡Eres una persona increíble!',
    ariadna: 'Ariadna, tu compañía hace que cada día sea especial. Gracias por tu apoyo y cariño. ¡Feliz San Valentín!',
    shema: 'Shema, gracias por tu energía y por todos los recuerdos que hemos creado juntos. ¡Te aprecio mucho!',
    sana: 'Sana, tu amistad es un regalo que valoro cada día. Gracias por estar siempre presente. ¡Feliz día!',
    momo: 'Momo, cada momento contigo es único. Gracias por tu amistad y por ser tan especial. ¡Feliz San Valentín!'
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


