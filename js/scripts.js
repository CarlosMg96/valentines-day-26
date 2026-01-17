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
    default:
        text = `Para ${friend}, con cariño`;
}

// Coloca el texto (la animación la hace el CSS)
span.textContent = text;


