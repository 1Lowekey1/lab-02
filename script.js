const photoWrapper = document.querySelector('.photo-wrapper');
const photoFrame = document.querySelector('.photo-frame');

photoWrapper.addEventListener('mouseenter', () => {
    photoFrame.style.borderColor = '#555';
});

photoWrapper.addEventListener('mouseleave', () => {
    photoFrame.style.borderColor = '#333';
});