let menuBtn = document.getElementById('menuBtn');
let mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});