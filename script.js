const track = document.getElementById('track');
const images = document.querySelectorAll('.gallery-img');
const currentIdxTxt = document.getElementById('current-idx');
const totalImgs = document.getElementById('total-imgs');
const imgFocada = document.getElementById('img-focada');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.querySelector('.close-lightbox');
const carouselView = document.getElementById('carouselView');

// Atualiza o total de imagens dinamicamente
totalImgs.innerText = images.length;

// Observer para detectar qual imagem está visível durante o scroll
const observerOptions = {
    root: carouselView,
    threshold: 0.5 // 50% da imagem precisa estar visível
};

let currentVisibleIndex = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(images).indexOf(entry.target);
            currentVisibleIndex = index;
            currentIdxTxt.innerText = index + 1;
        }
    });
}, observerOptions);

// Observa todas as imagens
images.forEach(img => {
    observer.observe(img);
});

// Clique para ampliar
images.forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        imgFocada.src = img.src;
        imgFocada.alt = img.alt;
        lightbox.style.display = 'flex';
    });
});

// Fechar modal - botão X
if (closeLightbox) {
    closeLightbox.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        lightbox.style.display = 'none';
    });
}

// Fechar modal - clicando no fundo escuro
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === imgFocada) {
        lightbox.style.display = 'none';
    }
});

// Suporte a setas do teclado para navegar pelas fotos
document.addEventListener('keydown', (e) => {
    // Se o lightbox não estiver aberto, permite navegar pela galeria
    if (lightbox.style.display !== 'flex') {
        if (e.key === "ArrowDown" && currentVisibleIndex < images.length - 1) {
            images[currentVisibleIndex + 1].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
        if (e.key === "ArrowUp" && currentVisibleIndex > 0) {
            images[currentVisibleIndex - 1].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }
    
    // Fechar lightbox com ESC
    if (e.key === "Escape") {
        lightbox.style.display = 'none';
    }
});