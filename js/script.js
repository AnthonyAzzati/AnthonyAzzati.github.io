let hamburger = document.getElementById('hamburgerbtn');

let mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function(){
    mobileMenu.classList.toggle('active');
});